import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  href?: string;
}

export function Button({ children, type, href, ...props }: Props) {
  if (href) {
    return <a {...props} href={href} >{children}</a>
  }

  return <button type="button" {...props} >{children}</button>
}
