import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";
import { z } from "zod";

export const mySubtitle = z.object({
  zhLabel: z.string(),
  enLabel: z.string()
});

const subtitle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: 40,
  textAlign: "center",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#ddd",
  lineHeight: "66px",
  width: "100%"
};

export const Subtitle: React.FC<z.infer<typeof mySubtitle>> = ({
  zhLabel,
  enLabel
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0]
  );
  return (
    <div style={{ ...subtitle, opacity }}>
      <div>{enLabel}</div>
      <div>{zhLabel}</div>
    </div>
  );
};
