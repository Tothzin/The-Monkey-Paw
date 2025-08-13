'use client'

import { useState } from 'react'

export default function Home() {
  const [effect, setEffect] = useState<null | {
    advantage: string
    disadvantage: string
    flavor_text: string
  }>(null)
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    setEffect(null)

    const res = await fetch('/api/generateEffect', {
      method: 'POST',
    })

    const data = await res.json()
    setEffect(data)
    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">The Monkey Paw</h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white rounded mb-4 hover:bg-green-700 disabled:opacity-50"
      >
        Gerar vantagem e desvantagem
      </button>

      {loading && <p>Gerando...</p>}

      {effect && !effect.error && (
        <div className="max-w-xl p-4 border rounded shadow">
          <p><strong>Vantagem:</strong> {effect.advantage}</p>
          <p><strong>Desvantagem:</strong> {effect.disadvantage}</p>
          <p><em>{effect.flavor_text}</em></p>
        </div>
      )}

      {effect?.error && (
        <p className="text-red-600">Erro: {effect.error}</p>
      )}
    </main>
  )
}
