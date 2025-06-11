import { ArrowDown, ArrowUp } from 'lucide-react'
import dayjs from 'dayjs'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'entrada' | 'saida'
}

interface Props {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: Props) {
  if (transactions.length === 0) {
    return <p className="mt-6 text-center text-gray-500">Nenhuma transação encontrada.</p>
  }

  return (
    <div className="mt-8 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Transações</h2>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-gray-500">
                {t.category} • {dayjs(t.date).format('DD/MM/YYYY')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {t.type === 'entrada' ? (
                <ArrowUp className="text-green-500" size={20} />
              ) : (
                <ArrowDown className="text-red-500" size={20} />
              )}
              <p
                className={`font-semibold ${
                  t.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                R$ {Number(t.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
