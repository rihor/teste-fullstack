import { HTMLProps, ReactNode } from "react"
import styles from "./forms.module.scss";

interface Props extends HTMLProps<HTMLInputElement> {
  rightContent?: ReactNode;
}

export function Input({ rightContent, ...props }: Props) {
  return (
    <div className={styles.input}>
      <input {...props} />
      {rightContent}
    </div>
  )
}
