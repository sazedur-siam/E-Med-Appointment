import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

const DoctorCard = ({ doctor, index }) => {
  const {
    _id,
    name,
    fee,
    degree,
    speciality,
    chember,
    department,
    time,
    img,
    rating,
    experience,
    patients,
  } = doctor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 h-full">
        <div className="grid md:grid-cols-3 gap-0">
          {/* Doctor Image */}
          <div className="relative md:col-span-1 h-64 md:h-auto overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
            <img
              src={
                img ||
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
              }
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge
                variant="default"
                className="bg-white text-primary-600 shadow-lg"
              >
                {department}
              </Badge>
            </div>
            {rating && (
              <div className="absolute bottom-4 left-4 glass-effect px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">{rating}</span>
                </div>
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="md:col-span-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Name & Degree */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {name}
                  </h3>
                  <p className="text-primary-600 font-medium">{degree}</p>
                  <p className="text-gray-700 font-semibold mt-1">
                    {speciality}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-4">
                  {experience && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Briefcase className="w-4 h-4 text-primary-500" />
                      <span className="text-sm">{experience}</span>
                    </div>
                  )}
                  {patients && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4 text-primary-500" />
                      <span className="text-sm">{patients} patients</span>
                    </div>
                  )}
                </div>

                {/* Chamber & Time */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{chember}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-sm">
                      {time || "9:00 AM - 5:00 PM"}
                    </span>
                  </div>
                </div>

                {/* Fee & Appointment Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Visit Fee</p>
                    <p className="text-2xl font-bold text-primary-600">
                      ৳{fee}
                    </p>
                  </div>
                  <Link to={`/appointment/${_id}`}>
                    <Button className="group">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DoctorCard;
