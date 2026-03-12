import { Link } from 'react-router-dom'
import { doctorPatientRows } from '../data/doctors'

const DoctorList = () => {
  return (
    <section className="panel">
      <h1>Doctor Directory</h1>
      <p>Select a doctor-patient pair to open details via typed route params.</p>

      <ul className="card-list">
        {doctorPatientRows.map((row) => (
          <li key={`${row.doctorId}-${row.patientId}`}>
            <div>
              <strong>{row.doctorName}</strong>
              <p>Patient: {row.patientName}</p>
            </div>
            <Link
              className="link-button"
              to={`/doctors/${row.doctorId}/patients/${row.patientId}`}
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DoctorList
