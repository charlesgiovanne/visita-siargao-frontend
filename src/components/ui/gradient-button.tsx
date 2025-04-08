import * as React from "react";
import { Button } from "./button";
import { componentStyles } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const gradientStyle = variant === "primary" 
      ? componentStyles.button.primary 
      : componentStyles.button.outline;

    return (
      <Button
        className={cn(gradientStyle, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
