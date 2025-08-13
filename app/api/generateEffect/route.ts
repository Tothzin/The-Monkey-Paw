import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST() {
  try {
    const prompt = `
    Gere um efeito positivo fantástico que uma pessoa poderia receber, de forma criativa e absurda.
    Depois gere um efeito negativo sinistro e bizarro como consequência direta.
    Adicione um texto curto e engraçado para acompanhar essa combinação.
    Formate em JSON com as chaves: advantage, disadvantage, flavor_text.
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    })

    const text = completion.choices[0].message?.content || ''
    let json

    try {
      json = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Falha ao interpretar resposta da IA' }, { status: 500 })
    }

    // Salvar no Supabase
    const { data, error } = await supabase.from('effects').insert({
      advantage: json.advantage,
      disadvantage: json.disadvantage,
      flavor_text: json.flavor_text,
    }).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      advantage: data.advantage,
      disadvantage: data.disadvantage,
      flavor_text: data.flavor_text,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Erro inesperado: ' + (err as Error).message }, { status: 500 })
  }
}
