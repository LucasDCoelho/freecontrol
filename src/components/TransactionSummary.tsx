interface Props {
    transactions: {
      amount: number
      type: 'entrada' | 'saida'
    }[]
  }
  
  export default function TransactionSummary({ transactions }: Props) {
    const income = transactions
      .filter((t) => t.type === 'entrada')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  
    const expense = transactions
      .filter((t) => t.type === 'saida')
      .reduce((acc, curr) => acc + Number(curr.amount), 0)
  
    const balance = income - expense
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 bg-green-100 dark:bg-green-900">
          <h2 className="font-semibold text-green-800 dark:text-green-200">Entradas</h2>
          <p className="text-2xl font-bold">R$ {income.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl p-4 bg-red-100 dark:bg-red-900">
          <h2 className="font-semibold text-red-800 dark:text-red-200">Saídas</h2>
          <p className="text-2xl font-bold">R$ {expense.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl p-4 bg-blue-100 dark:bg-blue-900">
          <h2 className="font-semibold text-blue-800 dark:text-blue-200">Saldo</h2>
          <p className="text-2xl font-bold">R$ {balance.toFixed(2)}</p>
        </div>
      </div>
    )
  }
  