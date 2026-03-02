import { Menu, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";
import { AdminMenu, DoctorMenu, PatientMenu } from "./DesktopMenus";
import { AdminMobileMenu, DoctorMobileMenu, MobileNavLink, PatientMobileMenu } from "./MobileMenus";

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

export default Navigation;
