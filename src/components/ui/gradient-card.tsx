import * as React from "react";
import { Card } from "./card";
import { componentStyles } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface GradientCardProps extends React.ComponentProps<"div"> {
  variant?: "base" | "hover" | "interactive";
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, variant = "base", ...props }, ref) => {
    let cardStyle = "";
    
    switch (variant) {
      case "hover":
        cardStyle = `${componentStyles.card.base} ${componentStyles.card.hover}`;
        break;
      case "interactive":
        cardStyle = componentStyles.card.interactive;
        break;
      default:
        cardStyle = componentStyles.card.base;
    }

    return (
      <Card
        className={cn(cardStyle, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientCard.displayName = "GradientCard";

export { GradientCard };
