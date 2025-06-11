'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">Entrar</h1>

                <Input
                    placeholder="Seu e-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    placeholder="Sua senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-sm text-red-500">{error}</p>}



                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>



                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Ainda não tem uma conta?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    )
}
