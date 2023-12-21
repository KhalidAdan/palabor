import { cn } from "../../lib/utils";
import { ComponentProps } from "react";

export const H1 = ({ children, className }: ComponentProps<"h1">) => (
  <h1
    className={cn(
      className,
      "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
    )}
  >
    {children}.
  </h1>
);

export const Lead = ({ children, className }: ComponentProps<"p">) => (
  <p
    className={cn(
      className,
      "text-lg text-muted-foreground leading-relaxed tracking-tight  md:text-xl"
    )}
  >
    {children}
  </p>
);
