import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Select = forwardRef(
  ({ className, children, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500",
              "transition-all duration-200",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };

// Specialized Department Select Component
export const DepartmentSelect = forwardRef(({ className, ...props }, ref) => {
  const departments = [
    "Chest",
    "Medicine",
    "Dermatology",
    "Psychiatry",
    "General Physician",
    "Diabetes",
    "Neuromedicine",
    "Gynaecology",
    "Nutritionest",
    "Eye",
    "Cardiology",
  ];

  return (
    <Select ref={ref} label="Department" className={className} {...props}>
      <option value="">Select Department</option>
      {departments.map((dept) => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </Select>
  );
});

DepartmentSelect.displayName = "DepartmentSelect";

// Gender Select Component
export const GenderSelect = forwardRef(({ className, ...props }, ref) => {
  return (
    <Select ref={ref} label="Gender" className={className} {...props}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </Select>
  );
});

GenderSelect.displayName = "GenderSelect";
