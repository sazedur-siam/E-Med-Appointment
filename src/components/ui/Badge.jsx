import React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-primary-100 text-primary-700 border-primary-200",
      secondary: "bg-secondary-100 text-secondary-700 border-secondary-200",
      success: "bg-green-100 text-green-700 border-green-200",
      warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
      danger: "bg-red-100 text-red-700 border-red-200",
      outline: "border-2 border-gray-300 text-gray-700",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
