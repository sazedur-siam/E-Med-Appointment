import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Calendar, FileText, Users, UserPlus, UserCog } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";

const Navigation = () => {
  const { user, logout, admin, doctor } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAdmin = Boolean(admin);
  const isDoctor = Boolean(doctor);
  const isPatient = Boolean(user?.email) && !isAdmin && !isDoctor;

  useEffect(() => {
    if (admin) {
      localStorage.setItem("isAdm", admin);
    }
  }, [admin]);

  useEffect(() => {
    if (doctor) {
      localStorage.setItem("isDoc", doctor);
    }
  }, [doctor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <img 
              src="/logo_brand.png" 
              alt="E-Med Appointment" 
              className="h-10 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/home" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            
            {!isAdmin && !isDoctor && (
              <Link 
                to="/doctors" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Doctors
              </Link>
            )}

            <a
              href="https://www.emedicshops.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              E-Medic Shop
            </a>

            <a
              href="https://drive.google.com/file/d/17VcJjftxXqmw3hty8WZP1INK8c5caxNQ/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Reminder App
            </a>

            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              {isAdmin ? (
                <AdminMenu 
                  dropdownOpen={dropdownOpen} 
                  setDropdownOpen={setDropdownOpen}
                  handleLogout={handleLogout}
                />
              ) : isPatient ? (
                <PatientMenu 
                  user={user}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  handleLogout={handleLogout}
                />
              ) : isDoctor ? (
                <DoctorMenu 
                  user={user}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                  handleLogout={handleLogout}
                />
              ) : (
                <Button 
                  variant="default" 
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 glass-effect">
          <div className="px-4 py-3 space-y-2">
            <MobileNavLink to="/home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            
            {!isAdmin && !isDoctor && (
              <MobileNavLink to="/doctors" onClick={() => setMobileMenuOpen(false)}>
                Doctors
              </MobileNavLink>
            )}

            {isAdmin && <AdminMobileMenu handleLogout={handleLogout} setMobileMenuOpen={setMobileMenuOpen} />}
            {isPatient && <PatientMobileMenu user={user} handleLogout={handleLogout} setMobileMenuOpen={setMobileMenuOpen} />}
            {isDoctor && <DoctorMobileMenu user={user} handleLogout={handleLogout} setMobileMenuOpen={setMobileMenuOpen} />}
            
            {!user?.email && (
              <Button 
                variant="default" 
                className="w-full mt-3"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Menu Components
const AdminMenu = ({ dropdownOpen, setDropdownOpen, handleLogout }) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
    >
      <UserCog className="w-4 h-4" />
      <span>Admin Dashboard</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white border border-gray-200 py-2 z-50">
        <DropdownLink to="/addnewdoctor" icon={<UserPlus className="w-4 h-4" />}>
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

const PatientMenu = ({ user, dropdownOpen, setDropdownOpen, handleLogout }) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary-600 text-white hover:bg-secondary-700 transition-colors"
    >
      <User className="w-4 h-4" />
      <span>{user.displayName}</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white border border-gray-200 py-2 z-50">
        <DropdownLink to="/myappointment" icon={<Calendar className="w-4 h-4" />}>
          My Appointments
        </DropdownLink>
        <DropdownLink to="/empres" icon={<FileText className="w-4 h-4" />}>
          E-Medic Prescription
        </DropdownLink>
        <DropdownLink to="/myprescription" icon={<FileText className="w-4 h-4" />}>
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

const DoctorMenu = ({ user, dropdownOpen, setDropdownOpen, handleLogout }) => (
  <>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
    >
      <User className="w-4 h-4" />
      <span>{user.displayName}</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
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

// Mobile Menu Components
const AdminMobileMenu = ({ handleLogout, setMobileMenuOpen }) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">Admin Dashboard</div>
    <MobileNavLink to="/addnewdoctor" onClick={() => setMobileMenuOpen(false)}>Add Doctors</MobileNavLink>
    <MobileNavLink to="/mngdoctors" onClick={() => setMobileMenuOpen(false)}>Manage Doctors</MobileNavLink>
    <MobileNavLink to="/mngadmins" onClick={() => setMobileMenuOpen(false)}>Manage Admins</MobileNavLink>
    <MobileNavLink to="/user-profile" onClick={() => setMobileMenuOpen(false)}>All Users Profile</MobileNavLink>
    <MobileNavLink to="/pdetails" onClick={() => setMobileMenuOpen(false)}>All Patient Appointments</MobileNavLink>
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

const PatientMobileMenu = ({ user, handleLogout, setMobileMenuOpen }) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">{user.displayName}</div>
    <MobileNavLink to="/myappointment" onClick={() => setMobileMenuOpen(false)}>My Appointments</MobileNavLink>
    <MobileNavLink to="/empres" onClick={() => setMobileMenuOpen(false)}>E-Medic Prescription</MobileNavLink>
    <MobileNavLink to="/myprescription" onClick={() => setMobileMenuOpen(false)}>All Prescriptions</MobileNavLink>
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

const DoctorMobileMenu = ({ user, handleLogout, setMobileMenuOpen }) => (
  <div className="space-y-2 border-t border-gray-200 pt-2 mt-2">
    <div className="text-sm font-semibold text-gray-700 px-3 py-2">{user.displayName}</div>
    <MobileNavLink to="/docdash" onClick={() => setMobileMenuOpen(false)}>Appointed Patients</MobileNavLink>
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

// Helper Components
const DropdownLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default Navigation;
