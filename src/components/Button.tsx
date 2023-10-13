import React from "react";

import combineClassnames from "../utilities/combineClassnames";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
};

export default function Button({ className, disabled, ...otherProps }: Props) {
  const borderClassName = disabled
    ? "bor-1-second-darkest"
    : "bor-1-second-darker";
  const colorClassName = disabled ? "color-grayer" : "color-white";
  const pointerClassName = disabled ? "" : "cursor-pointer";

  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={combineClassnames(
        "bg-second hover:bg-second-lighter",
        borderClassName,
        colorClassName,
        pointerClassName,
        className,
      )}
    />
  );
}
