'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { CurrencyInput } from './ui/CurrencyInput'


interface Props {
  userId: string
}

type Category = {
  id: string
  name: string
  type: 'entrada' | 'saida'
}

export default function AddTransactionForm({ userId }: Props) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    category_id: '',
    amount: '',
    date: '',
    type: 'entrada',
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .eq('type', form.type)

      if (data) setCategories(data)
    }

    fetchCategories()
  }, [userId, form.type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(form.date)

    if (selectedDate < today) {
      setError('A data não pode ser anterior ao dia de hoje.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('transactions').insert([
      {
        title: form.title,
        category_id: form.category_id,
        amount: Number(form.amount),
        date: form.date,
        type: form.type,
        user_id: userId,
      },
    ])

    if (error) {
      setError(error.message)
    } else {
      setForm({
        title: '',
        category_id: '',
        amount: '',
        date: '',
        type: 'entrada',
      })
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm space-y-4 mt-4"
    >
      <Input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
      />

      <CurrencyInput
        name="amount"
        value={form.amount}
        placeholder="Valor"
        onValueChange={(values) => {
          const { floatValue } = values
          setForm((prev) => ({ ...prev, amount: floatValue?.toString() || '' }))
        }}
        required
      />

      <Input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800"
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800"
        required
      >
        <option value="">Selecione a categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Transação'}
      </Button>
    </form>
  )
}
