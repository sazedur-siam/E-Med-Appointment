import { motion } from "framer-motion";
import { AlertCircle, FileX, SearchX, UserX } from "lucide-react";
import { Button } from "./ui/Button";

const iconMap = {
  search: SearchX,
  file: FileX,
  user: UserX,
  alert: AlertCircle,
};

const EmptyState = ({
  icon = "search",
  title = "No results found",
  description = "Try adjusting your search or filter criteria",
  actionLabel,
  onAction,
  className = "",
}) => {
  const Icon = iconMap[icon] || SearchX;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-16 px-4 ${className}`}
    >
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
