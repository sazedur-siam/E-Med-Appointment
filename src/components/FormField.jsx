import { motion } from "framer-motion";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";

const FormField = ({
  type = "text",
  label,
  error,
  icon: Icon,
  options,
  rows,
  ...props
}) => {
  const renderInput = () => {
    if (type === "select" && options) {
      return (
        <Select label={label} error={error} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }

    if (type === "textarea") {
      return <Textarea label={label} error={error} rows={rows} {...props} />;
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
          <Input
            type={type}
            className={Icon ? "pl-10" : ""}
            error={error}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {renderInput()}
    </motion.div>
  );
};

export default FormField;
