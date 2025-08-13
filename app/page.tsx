'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Skull } from 'lucide-react'

export default function Home() {
  const [advantage, setAdvantage] = useState<string | null>(null)
  const [disadvantage, setDisadvantage] = useState<string | null>(null)
  const [flavorText, setFlavorText] = useState<string | null>(null)
  const [loadingAdvantage, setLoadingAdvantage] = useState(false)
  const [loadingDisadvantage, setLoadingDisadvantage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerateAdvantage() {
    setLoadingAdvantage(true)
    setError(null)

    try {
      const res = await fetch('/api/generateEffect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'advantage' }),
      })

      const data = await res.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setAdvantage(data.advantage)
        setDisadvantage(data.disadvantage)
        setFlavorText(data.flavor_text)
      }
    } catch (err) {
      setError('Error generating advantage')
    } finally {
      setLoadingAdvantage(false)
    }
  }

  async function handleGenerateDisadvantage() {
    setLoadingDisadvantage(true)
    setError(null)

    try {
      const res = await fetch('/api/generateEffect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'disadvantage' }),
      })

      const data = await res.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setAdvantage(data.advantage)
        setDisadvantage(data.disadvantage)
        setFlavorText(data.flavor_text)
      }
    } catch (err) {
      setError('Error generating disadvantage')
    } finally {
      setLoadingDisadvantage(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            The Monkey Paw
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be careful what you wish for... Every advantage comes with a sinister price
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
          <Button
            onClick={handleGenerateAdvantage}
            disabled={loadingAdvantage || loadingDisadvantage}
            variant="success"
            size="lg"
            className="text-lg px-6 py-6 h-16 w-48 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-3 h-6 w-6" />
            {loadingAdvantage ? 'Generating Advantage...' : 'Generate Advantage'}
          </Button>

          <Button
            onClick={handleGenerateDisadvantage}
            disabled={loadingAdvantage || loadingDisadvantage}
            variant="danger"
            size="lg"
            className="text-lg px-6 py-6 h-16 w-48 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Skull className="mr-3 h-6 w-6" />
            {loadingDisadvantage ? 'Generating Disadvantage...' : 'Generate Disadvantage'}
          </Button>
        </div>

        {/* Loading State */}
        {(loadingAdvantage || loadingDisadvantage) && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-400"></div>
            <p className="text-gray-300 mt-3 text-lg">Generating magical effects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-red-500 bg-red-900/20">
            <CardContent className="pt-6">
              <p className="text-red-400 text-center text-lg">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {(advantage || disadvantage) && !loadingAdvantage && !loadingDisadvantage && (
          <div className="space-y-8">
            {advantage && (
              <Card className="border-green-500 bg-green-900/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-green-300 flex items-center text-2xl">
                    <Sparkles className="mr-3 h-6 w-6" />
                    Advantage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-200 text-xl leading-relaxed">{advantage}</p>
                </CardContent>
              </Card>
            )}

            {disadvantage && (
              <Card className="border-red-500 bg-red-900/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center text-2xl">
                    <Skull className="mr-3 h-6 w-6" />
                    Disadvantage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-200 text-xl leading-relaxed">{disadvantage}</p>
                </CardContent>
              </Card>
            )}

            {flavorText && (
              <Card className="border-purple-500 bg-purple-900/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-2xl">Magical Commentary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 text-xl italic leading-relaxed">"{flavorText}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Instructions */}
        {!advantage && !disadvantage && !loadingAdvantage && !loadingDisadvantage && (
          <Card className="bg-black/30 border-purple-500/30 text-center">
            <CardContent className="pt-8 pb-8">
              <p className="text-gray-300 text-xl mb-3">
                Click one of the buttons above to begin your magical journey...
              </p>
              <p className="text-gray-400 text-lg">
                But remember: every advantage has its price!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
