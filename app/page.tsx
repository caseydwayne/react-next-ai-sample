import data from './lib/data'
import SeverityBadge from './ui/SeverityBadge'
import SummaryGenerator from './ui/SummaryGenerator'

async function generateSummary(){
  const res = await fetch( '/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  })

  const result = await res.json()
  console.log( result.summary )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">

      <main className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-1">{data.facility}</h1>
          <p className="text-gray-600">{data.location}</p>
          <p className="text-sm text-gray-500 mt-1">
            Reporting period: {data.date_range.start} — {data.date_range.end}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Staff Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {data.staff.map( (staff) => (
              <div
                key={staff.id}
                className={`border rounded-lg p-4 shadow-sm ${
                  staff.shifts_missed > 0 ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              >
                <p className="font-medium">{staff.name}</p>
                <p className="text-sm text-gray-600">{staff.role}</p>
                <p className="text-sm">
                  Shifts Missed:{' '}
                  <span className={staff.shifts_missed > 0 ? 'font-bold text-red-600' : ''}>
                    {staff.shifts_missed}
                  </span>
                </p>
              </div>
            )) }
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Report Summary{' '}
            <span className="text-sm text-gray-500 font-normal">(AI Generated)</span>
          </h2>
          <SummaryGenerator report={data} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Incident Reports</h2>
          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {data.incidents.map( (incident) => (
              <div
                key={incident.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg capitalize">{incident.type}</h3>
                  <SeverityBadge level={incident.severity} />
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Date:</strong> {incident.date}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Location:</strong> {incident.location}
                </p>
                {incident.patient_id && (
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Patient ID:</strong> {incident.patient_id}
                  </p>
                )}
                <p className="text-sm text-gray-800">{incident.notes}</p>
              </div>
            )) }
          </div>
        </section>

      </main>
    </div>
  );
}
