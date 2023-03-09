import { forwardRef, ForwardRefRenderFunction, HTMLProps, ReactNode } from "react"
import styles from "./forms.module.scss";

interface Props extends HTMLProps<HTMLInputElement> {
  rightContent?: ReactNode;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = ({ rightContent, ...props }, ref) => {
  return (
    <div className={styles.input}>
      <input ref={ref} {...props} />
      {rightContent}
    </div>
  )
}

export const Input = forwardRef(InputComponent);
