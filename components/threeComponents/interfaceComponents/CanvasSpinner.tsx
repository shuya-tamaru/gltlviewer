import { Html } from "@react-three/drei";
import Spiner from "../../nextComponents/spiner";

function CanvasSpinner() {
  return (
    <Html center>
      <style>
        {`@keyframes flash {
            0%,100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }`}
      </style>
      <Spiner containerWidth={"100%"} containerHeight={"100%"} background={"#283b4f"} iconColor={"#fff"} />
      <h1 style={{ color: "#fff", fontWeight: "700", animation: `flash 1.0s linear infinite` }}>Loading...</h1>
    </Html>
  );
}

export default CanvasSpinner;
