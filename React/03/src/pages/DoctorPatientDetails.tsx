import { Link, useParams } from 'react-router-dom'
import type { DoctorPatientRouteParams } from '../types/routes'

const DoctorPatientDetails = () => {
  const { doctorId, patientId } = useParams<DoctorPatientRouteParams>()

  if (!doctorId || !patientId) {
    return (
      <section className="panel">
        <h1>Invalid Route</h1>
        <p>Missing doctor or patient ID.</p>
        <Link className="link-button" to="/">
          Back to doctor list
        </Link>
      </section>
    )
  }

  const numericDoctorId = Number(doctorId)
  const numericPatientId = Number(patientId)

  if (Number.isNaN(numericDoctorId) || Number.isNaN(numericPatientId)) {
    return (
      <section className="panel">
        <h1>Invalid Route</h1>
        <p>Doctor ID and Patient ID must be numeric.</p>
        <Link className="link-button" to="/">
          Back to doctor list
        </Link>
      </section>
    )
  }

  return (
    <section className="panel">
      <h1>Doctor & Patient Details</h1>
      <p>
        Doctor ID: <strong>{numericDoctorId}</strong>
      </p>
      <p>
        Patient ID: <strong>{numericPatientId}</strong>
      </p>
      <Link className="link-button" to="/">
        Back to doctor list
      </Link>
    </section>
  )
}

export default DoctorPatientDetails
