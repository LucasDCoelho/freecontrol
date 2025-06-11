'use client'

import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import AddTransactionForm from './AddTransactionForm'
import AddCategoryForm from './AddCategoryForm'

interface Props {
  userId: string
}

export default function AddTransactionSection({ userId }: Props) {
  const [showTransaction, setShowTransaction] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-xl font-semibold">Transações & Categorias</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            setShowCategory((prev) => !prev)
            setShowTransaction(false)
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Nova categoria
          </Button>

          <Button variant="outline" onClick={() => {
            setShowTransaction((prev) => !prev)
            setShowCategory(false)
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Nova transação
          </Button>
        </div>
      </div>

      {showTransaction && (
        <Collapsible.Root open>
          <Collapsible.Content>
            <AddTransactionForm userId={userId} />
          </Collapsible.Content>
        </Collapsible.Root>
      )}

      {showCategory && (
        <Collapsible.Root open>
          <Collapsible.Content>
            <AddCategoryForm userId={userId} />
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  )
}
