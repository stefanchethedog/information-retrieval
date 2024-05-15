import React, { SelectHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectProps = {
  className?: string;
  label: string;
  options: SelectOptions[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, ...rest }, ref) => {
    const classes = twMerge("h-16 w-[22rem]", className);

    return (
      <div className="flex w-[30rem] justify-between items-center my-4">
        <span className="text-black text-2xl font-bold">{label}</span>
        <select className={classes} ref={ref} {...rest}>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
