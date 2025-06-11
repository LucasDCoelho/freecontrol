'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import DashboardHeader from '@/components/DashboardHeader'
import TransactionSummary from '@/components/TransactionSummary'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import TransactionList from '@/components/TransactionList'
import AddTransactionSection from '@/components/AddTransactionSection'

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>();
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/auth/login')
        return
      }
      setUser(session.user)

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)

        
        if (data) setTransactions(data)
      setLoading(false)
    }

    fetchData()
  }, [router])

  if (loading) {
    return <p className="text-center mt-10">Carregando dashboard...</p>
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <DashboardHeader user={user!} />
      <TransactionSummary transactions={transactions} /> 
      <AddTransactionSection userId={user!.id} />   
      <TransactionList transactions={transactions}/>
      
    </main>
  )
}
