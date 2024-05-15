import {
  forwardRef,
  ComponentProps,
  ReactNode,
} from "react";

export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  children?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full"
        {...rest}
      >
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-bold text-blue-500">{title}</h3>
          <p className="mt-2 text-base text-gray-300 flex-1">{description}</p>
          <div className="pt-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
