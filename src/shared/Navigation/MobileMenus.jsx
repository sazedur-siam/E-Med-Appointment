import { Link } from "react-router-dom";

export const AdminMobileMenu = ({ handleLogout, setMobileMenuOpen }) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">
      Admin Dashboard
    </div>
    <MobileNavLink to="/addnewdoctor" onClick={() => setMobileMenuOpen(false)}>
      Add Doctors
    </MobileNavLink>
    <MobileNavLink to="/mngdoctors" onClick={() => setMobileMenuOpen(false)}>
      Manage Doctors
    </MobileNavLink>
    <MobileNavLink to="/mngadmins" onClick={() => setMobileMenuOpen(false)}>
      Manage Admins
    </MobileNavLink>
    <MobileNavLink to="/user-profile" onClick={() => setMobileMenuOpen(false)}>
      All Users Profile
    </MobileNavLink>
    <MobileNavLink to="/pdetails" onClick={() => setMobileMenuOpen(false)}>
      All Patient Appointments
    </MobileNavLink>
    <button
      onClick={() => {
        handleLogout();
        setMobileMenuOpen(false);
      }}
      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      Logout
    </button>
  </div>
);

export const PatientMobileMenu = ({
  user,
  handleLogout,
  setMobileMenuOpen,
}) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">
      {user.displayName}
    </div>
    <MobileNavLink to="/myappointment" onClick={() => setMobileMenuOpen(false)}>
      My Appointments
    </MobileNavLink>
    <MobileNavLink to="/empres" onClick={() => setMobileMenuOpen(false)}>
      E-Medic Prescription
    </MobileNavLink>
    <MobileNavLink
      to="/myprescription"
      onClick={() => setMobileMenuOpen(false)}
    >
      All Prescriptions
    </MobileNavLink>
    <button
      onClick={() => {
        handleLogout();
        setMobileMenuOpen(false);
      }}
      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      Logout
    </button>
  </div>
);

export const DoctorMobileMenu = ({ user, handleLogout, setMobileMenuOpen }) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">
      {user.displayName}
    </div>
    <MobileNavLink to="/docdash" onClick={() => setMobileMenuOpen(false)}>
      Appointed Patients
    </MobileNavLink>
    <button
      onClick={() => {
        handleLogout();
        setMobileMenuOpen(false);
      }}
      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      Logout
    </button>
  </div>
);

// Helper Component
export const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
  >
    {children}
  </Link>
);
