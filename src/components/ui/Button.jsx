import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    const variants = {
      default:
        "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
      secondary:
        "bg-secondary-600 text-white hover:bg-secondary-700 shadow-sm hover:shadow-md",
      outline:
        "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
      ghost: "hover:bg-gray-100 text-gray-700",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
    };

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-8 px-4 text-sm",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
