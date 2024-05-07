import React, { MouseEventHandler } from "react";

const Button = ({
  style = "default",
  title,
  className,
  onPress,
}: {
  style?: "default" | "outlined";
  title: string;
  className?: string;
  onPress?: MouseEventHandler;
}) => {
  return (
    <div className="flex">
      <button
        className={`flex-1 text-center font-semibold py-3 px-6 rounded-lg text-white border-2 ${
          style === "default"
            ? "border-blue-600 bg-blue-600 hover:bg-blue-600/25 hover:text-blue-600"
            : "bg-blue-600/25 hover:bg-blue-600 text-blue-600 hover:text-white"
        }  active:bg-blue-600/75 transition-colors duration-50 ${className}`}
        onClick={onPress}
      >
        {title || "Click Me"}
      </button>
    </div>
  );
};

export default Button;
