import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: (props) => ({
      color: mode("white", "whiteAlpha.900")(props),
      bg: mode("#4130AC", "#5140BD")(props),
      _hover: {
        bg: mode("#5140BD", "#4130AC")(props),
      },
    }),
    outline: (props) => ({
      _hover: {
        bg: mode("#8884d8", "#7161a1")(props),
      },
    }),
    ghost: (props) => ({
      color: mode("#4130AC", "whiteAlpha.900")(props),
      _hover: {
        bg: mode("#ded9ff", "#7161a1")(props),
      },
    }),
    oauth: (props) => ({
      height: "34px",
      border: "1px solid",
      borderColor: mode("gray.300", "gray.600")(props),
      _hover: {
        bg: mode("gray.100", "gray.700")(props),
      },
    }),
    icon: {
      height: "30px",
      width: "30px",
    },
  },
};
