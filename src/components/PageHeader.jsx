import { motion } from "framer-motion";

const PageHeader = ({
  title,
  subtitle,
  gradient = "from-primary-600 to-primary-700",
  className = "",
  children,
}) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white py-12 mb-8 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-white/90 mb-6">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
