import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
}

export function Button({
  children,
  className = "",
  isActive = false,
  type = "button",
  ...props
}: ButtonProps): React.ReactNode {
  const classNames = ["ui-button", isActive ? "active" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} type={type} {...props}>
      {children}
    </button>
  );
}
