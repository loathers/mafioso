import combineClassnames from "../utilities/combineClassnames";

import "../styles/spinner.css";

type Props = {
  className?: string;
  spinnerColor?: string;
  spinnerWidth?: number;
  size?: number;
};

export default function LoaderComponent({
  className,
  spinnerColor = "white",
  spinnerWidth = 6,
  size = 50,
}: Props) {
  return (
    <div
      className={combineClassnames("zindex-8", className)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="zindex-9 spinner"
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          marginLeft: (size / 2) * -1,
          width: size,
          height: size,
          borderColor: spinnerColor,
          borderWidth: spinnerWidth,
        }}
      />
    </div>
  );
}
