import { motion } from "framer-motion";
import { Filter, Search, Stethoscope, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorCard from "../../components/DoctorCard";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { departments, doctorsData } from "../../data/doctorsData";
import useDoctorlist from "../../hooks/useDoctorlist";

const DoctorsList = () => {
  const [doctorlists] = useDoctorlist();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Combine API data with demo data (use demo data if API is empty)
  const allDoctors = doctorlists.length > 0 ? doctorlists : doctorsData;

  useEffect(() => {
    let result = allDoctors;

    // Filter by department
    if (selectedDepartment !== "all") {
      result = result.filter(
        (doctor) => doctor.department === selectedDepartment,
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.speciality
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredDoctors(result);
  }, [selectedDepartment, searchQuery, allDoctors]);

  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setSelectedDepartment("all");
    setSearchQuery("");
  };

  // Calculate department counts
  const departmentCounts = departments.reduce((acc, dept) => {
    acc[dept.id] =
      dept.id === "all"
        ? allDoctors.length
        : allDoctors.filter((d) => d.department === dept.id).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <ToastContainer />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Appointment with Our Expert Doctors
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Choose from {allDoctors.length} qualified specialists across
              multiple departments
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by doctor name, specialty, or department..."
                className="w-full pl-12 pr-4 py-6 text-lg bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Department Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-64 flex-shrink-0"
          >
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="w-full lg:hidden mb-4"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {/* Filters Card */}
            <Card
              className={`sticky top-4 overflow-hidden transition-all ${
                showMobileFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-primary-600" />
                    Departments
                  </h3>
                  {(selectedDepartment !== "all" || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {departments.map((dept) => {
                    const Icon = iconMap[dept.icon] || Stethoscope;
                    const isSelected = selectedDepartment === dept.id;
                    const deptCount =
                      dept.id === "all"
                        ? allDoctors.length
                        : allDoctors.filter((d) => d.department === dept.id)
                            .length;

                    return (
                      <motion.button
                        key={dept.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDepartmentChange(dept.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          isSelected
                            ? "bg-primary-600 text-white shadow-lg"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{dept.name}</span>
                        </div>
                        <Badge
                          variant={isSelected ? "secondary" : "default"}
                          className={
                            isSelected ? "bg-white text-primary-600" : ""
                          }
                        >
                          {deptCount}
                        </Badge>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content - Doctors List */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedDepartment === "all"
                      ? "All Doctors"
                      : departments.find((d) => d.id === selectedDepartment)
                          ?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredDoctors.length} doctor
                    {filteredDoctors.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedDepartment !== "all" || searchQuery) && (
                <div className="flex flex-wrap gap-2">
                  {selectedDepartment !== "all" && (
                    <Badge variant="default" className="px-3 py-1">
                      {
                        departments.find((d) => d.id === selectedDepartment)
                          ?.name
                      }
                      <button
                        onClick={() => setSelectedDepartment("all")}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="default" className="px-3 py-1">
                      Search: {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </motion.div>

            {/* Doctors Grid */}
            <div className="space-y-6">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <DoctorCard key={doctor._id} doctor={doctor} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
