'use client'

import React, { useState } from 'react'

type ReportData = any

export default function SummaryGenerator( { report }: { report: ReportData } ){

  const [summary, setSummary] = useState('')

  async function generateSummary(){
    setSummary('Generating report...');
    const res = await fetch( '/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( report ),
    })
    const result = await res.json()
    setSummary(result.summary || 'No summary generated (error 500).')
  }

  return (
    <>
      <div className="p-4 mb-4 border rounded bg-white min-h-[80px] whitespace-pre-wrap">
        {summary
          ? summary
          : <span className="italic text-gray-500">Click the button below to have AI generate a summary.</span>
        }
      </div>
      <div className="flex justify-end">
        <button
          onClick={generateSummary}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Generate Summary
        </button>
      </div>
    </>
  )
}
