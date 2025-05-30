import React from "react";
import { Box, ThemeProvider } from "@mui/material";

export default function Circle({ position, top, left, right, bottom, borderRadius, bgColor }) {
  return (
    <>
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: bgColor,
            },
          },
        }}
      >
        <Box
          sx={{
            position: position,
            top: top,
            left: left,
            right: right,
            bottom: bottom,
            width: 250,
            height: 250,
            borderRadius: borderRadius,
            zIndex: -99,
            overflow: "hidden",
            bgcolor: "primary.main",
          }}
        />
      </ThemeProvider>
    </>
  );
}
