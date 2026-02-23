import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, MapPin, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import useDoctorlist from "../hooks/useDoctorlist";

const TopDoctorsSection = () => {
  const [doctorlists] = useDoctorlist();
  const topDoctors = doctorlists.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get Appointments from Our
            <span className="text-primary-600"> Top Doctors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals and book your
            appointment today
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topDoctors.map((doctor, index) => (
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/doctors">
            <Button size="lg" variant="outline" className="group">
              View All Doctors
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const DoctorCard = ({ doctor, index }) => {
  const { img, name, degree, speciality, chember } = doctor;
  const defaultImage =
    "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
        {/* Doctor Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
          <img
            src={img || defaultImage}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          <div className="absolute top-4 right-4">
            <Badge
              variant="success"
              className="bg-green-500 text-white border-0"
            >
              Available
            </Badge>
          </div>
        </div>

        {/* Doctor Info */}
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">{name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {degree && (
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{degree}</span>
            </div>
          )}

          {speciality && (
            <div className="flex items-start space-x-3">
              <Stethoscope className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{speciality}</span>
            </div>
          )}

          {chember && (
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 text-sm">{chember}</span>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Link to="/doctors" className="w-full">
            <Button className="w-full" variant="default">
              Book Appointment
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TopDoctorsSection;
