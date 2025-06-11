'use client'

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if(error){
            setError(error.message);
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
        <form
          onSubmit={handleRegister}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center">Criar Conta</h1>
  
          <Input
            placeholder="Seu e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
  
          <Input
            placeholder="Senha (mín. 6 caracteres)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  
          {error && <p className="text-sm text-red-500">{error}</p>}
  
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    );
}