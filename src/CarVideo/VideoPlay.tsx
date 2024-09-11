import React from "react";
import { interpolate, useCurrentFrame, OffthreadVideo } from "remotion";
import { z } from "zod";

export const myVideoPlay = z.object({
  src: z.string()
});

export const VideoPlay: React.FC<z.infer<typeof myVideoPlay>> = ({ src }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1]);
  return (
    <div style={{ opacity }}>
      <OffthreadVideo src={src} />
    </div>
  );
};
