import type { ReactNode } from "react";
import type { TypographyVariants } from "../../types";

export default function Typography({
  variant = "text",
  children,
}: {
  variant?: TypographyVariants;
  children: ReactNode;
}) {
  return (
    <>
      {variant === "title" && (
        <h3 className="font-heading font-bold text-[24px]">{children}</h3>
      )}{" "}
      {variant === "small-title" && (
        <h3 className="font-heading font-semibold text-[18px]">{children}</h3>
      )}{" "}
      {variant === "text" && (
        <span className="font-sans font-normal text-[16px]">{children}</span>
      )}
    </>
  );
}
