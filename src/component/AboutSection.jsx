import { motion } from "framer-motion";
import { ArrowRight, Brain, Eye, Heart, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const AboutSection = () => {
  const specialties = [
    { icon: Heart, name: "Cardiology", color: "text-red-500" },
    { icon: Brain, name: "Neurology", color: "text-purple-500" },
    { icon: Eye, name: "Ophthalmology", color: "text-blue-500" },
    { icon: Pill, name: "Medicine", color: "text-green-500" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/mcc.svg"
              alt="Medical Support"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Medical Support
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              E-Medic is Bangladesh's most advanced medical platform, providing
              smart solutions for both doctors and patients. We ensure the best
              healthcare services through our innovative digital platform.
            </p>
            <div className="space-y-4 mb-8">
              <FeatureItem text="Easy doctor search and appointment booking" />
              <FeatureItem text="Secure storage of medical prescriptions" />
              <FeatureItem text="Digital prescription management for doctors" />
              <FeatureItem text="Fast medicine delivery service" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={specialty.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center space-x-3">
                      <specialty.icon
                        className={`w-6 h-6 ${specialty.color}`}
                      />
                      <span className="font-medium text-gray-700">
                        {specialty.name}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Link to="/doctors">
              <Button size="lg" className="group">
                Explore Our Services
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
      <svg
        className="w-4 h-4 text-primary-600"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <span className="text-gray-700">{text}</span>
  </div>
);

export default AboutSection;
