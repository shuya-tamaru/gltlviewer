import { Box } from "@chakra-ui/react";
import { LineWave } from "react-loader-spinner";

type Props = {
  containerWidth?: string;
  containerHeight?: string;
  iconWidth?: string;
  iconHeight?: string;
  background?: string;
  iconColor?: string;
};

export default function ({ containerWidth, containerHeight, iconWidth, iconHeight, background, iconColor }: Props) {
  return (
    <Box
      width={containerWidth ? containerWidth : "100vw"}
      height={containerHeight ? containerHeight : "100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={background ? background : "#f5f5f5"}
    >
      <LineWave
        width={iconWidth ? iconWidth : "100"}
        height={iconHeight ? iconHeight : "100"}
        color={iconColor ? iconColor : "#6b48ff"}
        ariaLabel="line-wave"
        visible={true}
      />
    </Box>
  );
}
