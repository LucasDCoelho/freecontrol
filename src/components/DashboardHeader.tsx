'use client'

import { Button } from './ui/button'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface Props {
  user: User
}

export default function DashboardHeader({ user }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Olá {user.email}!</h1>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  )
}
