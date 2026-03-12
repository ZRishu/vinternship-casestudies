import { Navigate, Route, Routes } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import DoctorPatientDetails from "./pages/DoctorPatientDetails";
import "./App.css";

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route
          path="/doctors/:doctorId/patients/:patientId"
          element={<DoctorPatientDetails />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
