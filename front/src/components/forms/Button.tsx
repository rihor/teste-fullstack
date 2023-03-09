import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./forms.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  href?: string;
}

export function Button({ children, type, href, ...props }: Props) {
  if (href) {
    return <a {...props} href={href} className={styles.button}>{children}</a>
  }

  return <button type="button" {...props} className={styles.button}>{children}</button>
}
