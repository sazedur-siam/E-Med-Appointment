import { motion } from "framer-motion";
import { Activity, Heart, Stethoscope, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Your
              <span className="text-primary-600">
                {" "}
                Medical Appointment
              </span>{" "}
              Online
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with top healthcare professionals. Schedule appointments,
              manage prescriptions, and access quality healthcare from the
              comfort of your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/doctors">
                <Button size="lg" className="shadow-lg hover:shadow-xl">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Find Doctors
                </Button>
              </Link>
              <Link to="/registration">
                <Button variant="outline" size="lg">
                  <User className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600">10k+</div>
                <div className="text-sm text-gray-600">Patients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/doctor.svg"
                alt="Healthcare Professional"
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 -left-10 glass-effect px-4 py-3 rounded-xl shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold">
                    Heart Rate: 72 bpm
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 -right-10 glass-effect px-4 py-3 rounded-xl shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold">
                    Health: Excellent
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
