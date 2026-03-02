import { motion } from "framer-motion";
import { Card } from "./ui/Card";

const FormContainer = ({
  children,
  title,
  subtitle,
  onSubmit,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="shadow-xl">
        {(title || subtitle) && (
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            )}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        <div className="p-6">
          {onSubmit ? (
            <form onSubmit={onSubmit} className="space-y-4">
              {children}
            </form>
          ) : (
            <div className="space-y-4">{children}</div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default FormContainer;
