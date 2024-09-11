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
      {elements.map((item) => (
        <>
          {item.cover_video_url && (
            <Sequence
              from={item.time * fps}
              durationInFrames={item.duration * fps}
            >
              <VideoPlay src={item.cover_video_url} />
            </Sequence>
          )}
          <Sequence
            from={
              item.time * fps +
              (item.labelDuration ? 0 : (item.duration * fps - 60) / 2)
            }
            durationInFrames={item.labelDuration * fps || 60}
          >
            <Subtitle zhLabel={item.zhLabel} enLabel={item.enLabel} />
          </Sequence>
        </>
      ))}
    </AbsoluteFill>
  );
};
