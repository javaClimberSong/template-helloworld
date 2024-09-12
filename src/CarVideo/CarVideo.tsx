import { AbsoluteFill, Sequence } from "remotion";
import { VideoPlay } from "./VideoPlay";
import { Subtitle } from "./Subtitle";
import { z } from "zod";

export const myCompCarVideo = z.object({
  elements: z.any(),
  fps: z.number()
});

export const CarVideo: React.FC<z.infer<typeof myCompCarVideo>> = (props) => {
  const { elements, fps } = props;
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {elements.map((ele) =>
        ele?.elements.map((item) => (
          <>
            {item.type === "video" ? (
              <Sequence
                from={item.time * fps}
                durationInFrames={item.duration * fps}
              >
                <VideoPlay src={item.value} />
              </Sequence>
            ) : (
              item.type === "text" && (
                <Sequence
                  from={item.time * fps}
                  durationInFrames={item.duration * fps || 60}
                >
                  <Subtitle label={item.value} offsetY={item.offsetY} />
                </Sequence>
              )
            )}
          </>
        ))
      )}
    </AbsoluteFill>
  );
};
