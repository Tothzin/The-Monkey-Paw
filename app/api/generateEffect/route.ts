import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type } = body

    let prompt = ''
    
    if (type === 'advantage') {
      prompt = `
      Generate a fantastic and absurd positive effect that a person could receive.
      Then generate a sinister and bizarre negative effect as a direct consequence.
      Add a short and humorous text to accompany this combination.
      Format as JSON with keys: advantage, disadvantage, flavor_text.
      `
    } else if (type === 'disadvantage') {
      prompt = `
      Generate a sinister and bizarre negative effect that a person could receive.
      Then generate a fantastic and absurd positive effect as a direct consequence.
      Add a short and humorous text to accompany this combination.
      Format as JSON with keys: advantage, disadvantage, flavor_text.
      `
    } else {
      prompt = `
      Generate a fantastic positive effect that a person could receive, in a creative and absurd way.
      Then generate a sinister and bizarre negative effect as a direct consequence.
      Add a short and humorous text to accompany this combination.
      Format as JSON with keys: advantage, disadvantage, flavor_text.
      `
    }

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
      return NextResponse.json({ error: 'Failed to interpret AI response' }, { status: 500 })
    }

    // Save to Supabase
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
    return NextResponse.json({ error: 'Unexpected error: ' + (err as Error).message }, { status: 500 })
  }
}
