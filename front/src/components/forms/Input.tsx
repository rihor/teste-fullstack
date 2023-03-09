import { forwardRef, ForwardRefRenderFunction, HTMLProps, ReactNode } from "react"
import { FieldErrors, FieldValues } from "react-hook-form";
import styles from "./forms.module.scss";

interface Props extends HTMLProps<HTMLInputElement> {
  rightContent?: ReactNode;
  validationsError?: FieldErrors<FieldValues>;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = ({ rightContent, validationsError, ...props }, ref) => {
  const messageError = props.name && validationsError?.[props.name]?.message;

  return (
    <div className={styles.input}>
      <div className={styles.input_wrapper}>
        <input ref={ref} {...props} />
        {rightContent}
      </div>
      {messageError && (
        <span className={styles.error_message}>{messageError.toString()}</span>
      )}
    </div>
  )
}

export const Input = forwardRef(InputComponent);
