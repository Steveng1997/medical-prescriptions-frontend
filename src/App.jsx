import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import LoginPage from "./app/login/page";
import AdminDashboard from "./app/admin/dashboard/page";
import AdminUsers from "./app/admin/users/page";
import DoctorListPage from "./app/doctor/prescriptions/page";
import NewPrescriptionPage from "./app/doctor/prescriptions/new/page";
import DoctorDetailPage from "./app/doctor/prescriptions/[id]/page";
import PatientListPage from "./app/patient/prescriptions/page";
import PatientDetailPage from "./app/patient/prescriptions/[id]/page";

export default function App() {
  const { user, role } = useUserStore();

  const getRedirectPath = () => {
    if (!role) return "/login";
    const userRole = role.toLowerCase();
    return userRole === "admin"
      ? "/admin/dashboard"
      : `/${userRole}/prescriptions`;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        <Route path="/doctor/prescriptions" element={<DoctorListPage />} />
        <Route
          path="/doctor/prescriptions/new"
          element={<NewPrescriptionPage />}
        />
        <Route
          path="/doctor/prescriptions/:id"
          element={<DoctorDetailPage />}
        />

        <Route path="/patient/prescriptions" element={<PatientListPage />} />
        <Route
          path="/patient/prescriptions/:id"
          element={<PatientDetailPage />}
        />

        <Route
          path="/"
          element={
            user ? (
              <Navigate to={getRedirectPath()} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
