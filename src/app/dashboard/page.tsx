'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/auth/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }

    getSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Olá, {user.email}</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Aqui entrarão os cards de resumo e lista de transações */}
        <p>Bem-vindo ao seu dashboard financeiro 👋</p>
      </div>
    </div>
  )
}
