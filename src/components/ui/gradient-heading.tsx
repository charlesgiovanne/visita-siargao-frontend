import * as React from "react";
import { componentStyles } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const GradientHeading = React.forwardRef<HTMLHeadingElement, GradientHeadingProps>(
  ({ className, as = "h2", size = "2xl", children, ...props }, ref) => {
    const HeadingTag = as;
    const sizeClass = sizeClasses[size];

    return (
      <HeadingTag
        className={cn(componentStyles.headings.gradient, sizeClass, "font-bold", className)}
        ref={ref}
        {...props}
      >
        {children}
      </HeadingTag>
    );
  }
);

GradientHeading.displayName = "GradientHeading";

export { GradientHeading };
