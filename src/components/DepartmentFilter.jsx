import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const DepartmentFilter = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  counts = {},
  showMobile = false,
  onToggle,
}) => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        className="w-full lg:hidden mb-4"
        onClick={onToggle}
      >
        <Filter className="w-4 h-4 mr-2" />
        {showMobile ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Filters Card */}
      <Card
        className={`overflow-hidden transition-all ${
          showMobile ? "block" : "hidden lg:block"
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Filter className="w-5 h-5 mr-2 text-primary-600" />
              Filters
            </h3>
          </div>

          <div className="space-y-2">
            {departments.map((dept) => {
              const isSelected = selectedDepartment === dept.id;
              const count = counts[dept.id] || 0;

              return (
                <motion.button
                  key={dept.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDepartmentChange(dept.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    isSelected
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{dept.name}</span>
                  </div>
                  <Badge
                    variant={isSelected ? "secondary" : "default"}
                    className={isSelected ? "bg-white text-primary-600" : ""}
                  >
                    {count}
                  </Badge>
                </motion.button>
              );
            })}
          </div>
        </div>
      </Card>
    </>
  );
};

export default DepartmentFilter;
