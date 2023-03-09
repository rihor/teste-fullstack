import { HTMLProps, ReactNode } from "react"

interface Props extends HTMLProps<HTMLInputElement> {
  rightContent?: ReactNode;
}

export function Input({ rightContent, ...props }: Props) {
  return <div>
    <input {...props} />
    {rightContent}
  </div>

}
