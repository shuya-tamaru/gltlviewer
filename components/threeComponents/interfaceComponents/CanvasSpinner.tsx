import { Html } from "@react-three/drei";
import { LineWave } from "react-loader-spinner";

function CanvasSpinner({ progress }: { progress: number }) {
  return (
    <Html center>
      <LineWave width={"100"} height={"100"} color={"#fff"} ariaLabel="line-wave" visible={true} />
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
      <h1 style={{ color: "#fff", fontWeight: "700", animation: `flash 1.0s linear infinite`, textAlign: "center" }}>
        Loading...
      </h1>
      <h1
        style={{
          color: "#fff",
          fontWeight: "700",
          animation: `flash 1.0s linear infinite`,
          textAlign: "center",
          marginRight: "5px",
        }}
      >
        {progress * 100 + "%"}
      </h1>
    </Html>
  );
}

export default CanvasSpinner;
