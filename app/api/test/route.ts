import { NextResponse } from 'next/server'

export async function GET(){
  return NextResponse.json({
    message: 'API is working. Send a POST request to see echo.',
  })
}

export async function POST( req: Request ){
  const body = await req.json()
  console.log( 'POST received:', body )
  return NextResponse.json({
    received: body,
  })
}
