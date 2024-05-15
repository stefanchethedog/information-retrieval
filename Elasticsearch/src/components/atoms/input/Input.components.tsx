import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = {
  className?: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...rest }, ref) => {
    const classes = twMerge("px-2 py-4 w-[22rem] border-2", className);

    return (
      <div className="flex w-[30rem] justify-between items-center my-4">
        <span className="text-black text-2xl font-bold">{label}</span>
        <input className={classes} ref={ref} {...rest} />
      </div>
    );
  }
);

export default Input;
