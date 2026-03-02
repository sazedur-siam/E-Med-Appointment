import { Navigate, Outlet } from "react-router-dom";

export default function DoctorOutlet() {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ?  <Outlet /> : <Navigate to="/login" />;
}
