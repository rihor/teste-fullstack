import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./forms.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  href?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export function Button({ children, type, href, ...props }: Props) {
  if (href) {
    return <a {...props} href={href} className={styles.button}>{children}</a>
  }

  return <button {...props} type={type || 'button'} className={styles.button}>{children}</button>
}
