import {
  Calendar,
  ChevronDown,
  LogOut,
  User,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export const AdminMenu = ({ dropdownOpen, setDropdownOpen, handleLogout }) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
    >
      <UserCog className="w-4 h-4" />
      <span>Admin Dashboard</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
      />
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white border border-gray-200 py-2 z-50">
        <DropdownLink
          to="/addnewdoctor"
          icon={<UserPlus className="w-4 h-4" />}
        >
          Add Doctors
        </DropdownLink>
        <DropdownLink to="/mngdoctors" icon={<Users className="w-4 h-4" />}>
          Manage Doctors
        </DropdownLink>
        <DropdownLink to="/mngadmins" icon={<UserCog className="w-4 h-4" />}>
          Manage Admins
        </DropdownLink>
        <DropdownLink to="/user-profile" icon={<User className="w-4 h-4" />}>
          All Users Profile
        </DropdownLink>
        <DropdownLink to="/pdetails" icon={<Calendar className="w-4 h-4" />}>
          All Patient Appointments
        </DropdownLink>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    )}
  </>
);

export const PatientMenu = ({
  user,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary-600 text-white hover:bg-secondary-700 transition-colors"
    >
      <User className="w-4 h-4" />
      <span>{user.displayName}</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
      />
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white border border-gray-200 py-2 z-50">
        <DropdownLink
          to="/myappointment"
          icon={<Calendar className="w-4 h-4" />}
        >
          My Appointments
        </DropdownLink>
        <DropdownLink to="/empres" icon={<Calendar className="w-4 h-4" />}>
          E-Medic Prescription
        </DropdownLink>
        <DropdownLink
          to="/myprescription"
          icon={<Calendar className="w-4 h-4" />}
        >
          All Prescriptions
        </DropdownLink>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    )}
  </>
);

export const DoctorMenu = ({
  user,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
    >
      <User className="w-4 h-4" />
      <span>{user.displayName}</span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
      />
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white border border-gray-200 py-2 z-50">
        <DropdownLink to="/docdash" icon={<Calendar className="w-4 h-4" />}>
          Appointed Patients
        </DropdownLink>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    )}
  </>
);

// Helper Component
const DropdownLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {icon}
    <span>{children}</span>
  </Link>
);
