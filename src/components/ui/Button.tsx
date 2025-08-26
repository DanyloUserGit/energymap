import type { ReactNode } from "react";
import type { ButtonVariants } from "../../types";

export default function Button({
  onClick,
  variant,
  children,
}: {
  onClick: () => void;
  variant: ButtonVariants;
  children: ReactNode;
}) {
  return (
    <button
      className={`
        rounded-[8px]
        text-black 
        text-[16px]
        font-medium
        transition
        ${
          variant === "primary" &&
          "bg-brand-yellow  hover:bg-brand-yellowDark px-[8px] py-[4px]"
        }
        ${
          variant === "secondary" &&
          "border-brand-yellow border-[1px] bg-transparent  hover:bg-brand-yellow/70 px-[8px] py-[4px]"
        }
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
