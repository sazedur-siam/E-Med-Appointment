import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./component/Loading/Loading";
import AuthProvider from "./context/AuthProvider";
import Navigation from "./shared/Navigation/Navigation";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home/Home"));
const Registration = lazy(() => import("./pages/Registration/Registration"));
const DoctorsList = lazy(() => import("./pages/DoctorsList/DoctorsList"));
const Login = lazy(() => import("./pages/Registration/Login"));
const DoctorLogin = lazy(() => import("./pages/Registration/DoctorLogin"));
const Test = lazy(() => import("./pages/Test"));
const Lab = lazy(() => import("./pages/Lab"));
const Appointment = lazy(() => import("./pages/Appointment/Appointment"));
const MyAppointment = lazy(() => import("./pages/MyAppointment/MyAppointment"));
const MultiUpload = lazy(() => import("./pages/MultiUpload/MultiUpload"));
const EMPmain = lazy(() => import("./pages/EmedicPrescription/EMPmain"));
const Docx = lazy(() => import("./usersx/Doctor/Docx"));
const ViewPresData = lazy(() => import("./usersx/Doctor/ViewPresData"));
const CreatePrescription = lazy(() => import("./usersx/Doctor/CreatePrescription"));
const AddNewDoctor = lazy(() => import("./usersx/Admin/AddNewDoctor/AddNewDoctor"));
const ManageDoctor = lazy(() => import("./usersx/Admin/ManageDoctor/ManageDoctor"));
const PatientDetails = lazy(() => import("./usersx/Admin/PatientDetails/PatientDetails"));
const UserProfile = lazy(() => import("./usersx/Admin/UserProfile/UserProfile"));
const ManageAdmins = lazy(() => import("./usersx/Admin/ManageAdmins/ManageAdmins"));
const PrivateOutlet = lazy(() => import("./routes/PrivateOutlet"));
const DoctorOutlet = lazy(() => import("./routes/DoctorOutlet"));
const AdminOutlet = lazy(() => import("./routes/AdminOutlet"));

function App() {
  const [load, setLoad] = useState(false);
  
  useEffect(() => {
    setLoad(true);
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Loading />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Navigation />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <Loading />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/emedic" element={<Test />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/doctorlogin" element={<DoctorLogin />} />
              <Route path="/lab" element={<Lab />} />
              
              {/* Private Routes */}
              <Route path="/*" element={<PrivateOutlet />}>
                <Route path="appointment/:pakId" element={<Appointment />} />
                <Route path="empres" element={<EMPmain />} />
                <Route path="myappointment" element={<MyAppointment />} />
                <Route path="myprescription" element={<MultiUpload />} />
              </Route>
              
              {/* Doctor Routes */}
              <Route path="/" element={<DoctorOutlet />}>
                <Route path="docdash" element={<Docx />} />
                <Route path="create-prescription/:doctor/:mail/:name/:id" element={<CreatePrescription />} />
                <Route path="docdash/viewpdata/:mail/:name" element={<ViewPresData />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/*" element={<AdminOutlet />}>
                <Route path="mngdoctors" element={<ManageDoctor />} />
                <Route path="pdetails" element={<PatientDetails />} />
                <Route path="addnewdoctor" element={<AddNewDoctor />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="mngadmins" element={<ManageAdmins />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
