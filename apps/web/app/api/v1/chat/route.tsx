import { OpenAIStream, StreamingTextResponse } from 'ai'
import { type Message } from 'ai/react'
import { Configuration, OpenAIApi } from 'openai-edge'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-4-1106-preview',
    stream: true,
    temperature: 0.7,
    messages,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
