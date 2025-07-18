export default {
  "facility": "Sample Facility Alpha",
  "facility_id": "alpha-001",
  "location": "Knoxville, TN",
  "date_range": {
    "start": "2025-06-01",
    "end": "2025-07-15"
  },
  "staff": [
    { "id": "S001", "name": "Alice Johnson", "role": "CNA", "shifts_missed": 2 },
    { "id": "S002", "name": "Bob Martinez", "role": "Nurse", "shifts_missed": 0 },
    { "id": "S003", "name": "Carlos Diaz", "role": "Nurse", "shifts_missed": 1 },
    { "id": "S004", "name": "Diana Smith", "role": "Supervisor", "shifts_missed": 0 }
  ],
  "incidents": [
    {
      "id": "INC1001",
      "date": "2025-07-01",
      "type": "fall",
      "location": "Hallway",
      "severity": "moderate",
      "patient_id": "P100",
      "notes": "Patient fell while walking to dining room. No fractures detected. Staff Alice Johnson present."
    },
    {
      "id": "INC1002",
      "date": "2025-07-03",
      "type": "medication error",
      "location": "Nurse Station",
      "severity": "low",
      "patient_id": "P102",
      "notes": "Missed dose of blood pressure medication. Nurse Bob Martinez notified."
    },
    {
      "id": "INC1003",
      "date": "2025-07-05",
      "type": "aggression",
      "location": "Room 108",
      "severity": "high",
      "patient_id": "P101",
      "notes": "Patient agitated, verbal aggression toward staff. Intervention by Carlos Diaz."
    },
    {
      "id": "INC1004",
      "date": "2025-07-08",
      "type": "equipment failure",
      "location": "Kitchen",
      "severity": "medium",
      "notes": "Oven malfunctioned, delayed meal prep. Supervisor Diana Smith informed."
    },
    {
      "id": "INC1005",
      "date": "2025-07-10",
      "type": "fall",
      "location": "Room 204",
      "severity": "high",
      "patient_id": "P103",
      "notes": "Patient found on floor beside bed, severe bruising. Emergency response activated."
    },
    {
      "id": "INC1006",
      "date": "2025-07-12",
      "type": "documentation error",
      "location": "Nurse Station",
      "severity": "low",
      "notes": "Incomplete patient vitals documentation for shift. Follow-up required."
    }
  ],
  "shift_logs": [
    {
      "staff_id": "S001",
      "date": "2025-07-01",
      "shift": "day",
      "hours_worked": 8,
      "notes": "Patient supervision during meals."
    },
    {
      "staff_id": "S002",
      "date": "2025-07-01",
      "shift": "night",
      "hours_worked": 10,
      "notes": "Medication rounds completed."
    },
    {
      "staff_id": "S003",
      "date": "2025-07-03",
      "shift": "day",
      "hours_worked": 8,
      "notes": "Responded to patient agitation."
    },
    {
      "staff_id": "S004",
      "date": "2025-07-08",
      "shift": "day",
      "hours_worked": 6,
      "notes": "Equipment issue escalation."
    }
  ],
  "disciplinary_actions": [
    {
      "staff_id": "S001",
      "date": "2025-07-02",
      "reason": "Late arrival",
      "notes": "Warning issued for repeated tardiness."
    }
  ]
}
