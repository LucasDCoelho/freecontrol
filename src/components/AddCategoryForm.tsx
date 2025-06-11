'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Props {
  userId: string
}

export default function AddCategoryForm({ userId }: Props) {
  const [form, setForm] = useState({
    name: '',
    type: 'entrada',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('categories').insert([
      {
        name: form.name,
        type: form.type,
        user_id: userId,
      },
    ])

    if (error) {
      setError(error.message)
    } else {
      setForm({ name: '', type: 'entrada' })
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm space-y-4 mt-8"
    >
      <h2 className="text-xl font-semibold">Nova Categoria</h2>

      <Input
        name="name"
        placeholder="Nome da categoria"
        value={form.name}
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar Categoria'}
      </Button>
    </form>
  )
}
