import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import OpenAI from 'openai'

interface StaffMember {
  id: string
  name: string
  role: string
  shifts_missed: number
}

interface DisciplinaryAction {
  staff_id: string
  date: string
  reason: string
  notes: string
}

interface Incident {
  id: string
  date: string
  type: string
  location: string
  severity: string
  patient_id?: string
  notes: string
}

interface ShiftLog {
  staff_id: string
  date: string
  shift: string
  hours_worked: number
  notes: string
}

interface ReportData {
  facility: string
  location: string
  date_range: {
    start: string
    end: string
  }
  staff: StaffMember[]
  disciplinary_actions: DisciplinaryAction[]
  incidents: Incident[]
  shift_logs: ShiftLog[]
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function GET() {
  return NextResponse.json({
    message: 'Route available. Send a POST request to generate report.',
  })
}

export async function POST(req: NextRequest) {
  try {
    const body: ReportData = await req.json()

    if (!body?.facility || !body?.staff || !body?.incidents) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
    }

    const prompt = buildPromptFromData(body)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `
            You are an administrative assistant tasked with creating a brief, high-level report for a facility administrator. 
            Summarize staffing, incidents, and shift issues into a short, readable paragraph. Be clear and professional. 
            Keep it factual and concise — no more than 3-5 sentences ideally. 
            DO NOT EXCEED 360 CHARACTERS. 
          `.trim(),
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    })

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function buildPromptFromData(data: ReportData): string {
  const { facility, location, date_range, incidents, staff, disciplinary_actions, shift_logs } = data

  const summaryLines = [
    `Facility: ${facility} (${location})`,
    `Time Period: ${date_range.start} to ${date_range.end}`,
    '',
    `Staffing Issues:`,
    ...staff
      .filter((s) => s.shifts_missed > 0)
      .map((s) => `- ${s.name} (${s.role}) missed ${s.shifts_missed} shift(s)`),
    '',
    `Disciplinary Actions:`,
    ...disciplinary_actions.map((d) => {
      const staffName = staff.find((s) => s.id === d.staff_id)?.name ?? d.staff_id
      return `- ${staffName} on ${d.date} for ${d.reason}: ${d.notes}`
    }),
    '',
    `Incidents:`,
    ...incidents.map(
      (i) =>
        `- [${i.date}] ${i.type} (${i.severity}) in ${i.location}: ${i.notes}`
    ),
    '',
    `Shift Logs:`,
    ...shift_logs.map((l) => {
      const staffName = staff.find((s) => s.id === l.staff_id)?.name ?? l.staff_id
      return `- ${l.date} (${l.shift}): ${staffName} worked ${l.hours_worked} hrs — ${l.notes}`
    }),
  ]

  return summaryLines.join('\n')
}
