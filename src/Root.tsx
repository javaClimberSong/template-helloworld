import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { CarVideo, myCompCarVideo } from "./CarVideo/CarVideo";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

export const RemotionRoot: React.FC = () => {
  const root = {
    duration: 10,
    width: 1920,
    height: 1080,
    fps: 30,
    id: "CarVideo",
    useage: {
      slot_config: {
        text1: { type: "text", index: 1 },
        text1_2: { type: "text", index: 2 },
        text2: { type: "text", index: 3 },
        text2_2: { type: "text", index: 4 },
        video1: { type: "video", index: 5 },
        text3: { type: "text", index: 6 },
        text3_2: { type: "text", index: 7 },
        video2: { type: "video", index: 8 },
        text4: { type: "text", index: 9 },
        text4_2: { type: "text", index: 10 },
        video3: { type: "video", index: 11 }
      }
    },
    elements: [
      {
        elements: [
          {
            slot: "text1",
            time: 0,
            duration: 2,
            offsetY: "30px",
            type: "text",
            value: "人类对汽车有什么期望"
          },
          {
            slot: "text1_2",
            time: 0,
            duration: 2,
            offsetY: "-30px",
            type: "text",
            value: "WHAT WE CAN BRING TO PEOPLE"
          }
        ]
      },
      {
        elements: [
          {
            slot: "video1",
            time: 2,
            duration: 2,
            type: "video",
            value:
              "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car1.mp4"
          },
          {
            slot: "text2",
            time: 2,
            duration: 2,
            type: "text",
            offsetY: "30px",
            value: "运动"
          },
          {
            slot: "text2_2",
            time: 2,
            duration: 2,
            offsetY: "-30px",
            type: "text",
            value: "SPORTS"
          }
        ]
      },
      {
        elements: [
          {
            slot: "video2",
            time: 4,
            duration: 3,
            type: "video",
            value:
              "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car2.mp4"
          },
          {
            slot: "text3",
            time: 4,
            duration: 3,
            type: "text",
            offsetY: "30px",
            value: "时尚"
          },
          {
            slot: "text3_2",
            time: 4,
            offsetY: "-30px",
            duration: 3,
            type: "text",
            value: "FASHION"
          }
        ]
      },
      {
        elements: [
          {
            slot: "video3",
            time: 7,
            duration: 3,
            type: "video",
            value:
              "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car3.mp4"
          },
          {
            slot: "text4",
            time: 7,
            offsetY: "30px",
            duration: 3,
            type: "text",
            value: "自由"
          },
          {
            slot: "text4_2",
            time: 7,
            offsetY: "-30px",
            duration: 3,
            type: "text",
            value: "FREE"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Byering",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7"
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const
        }}
      />
      <Composition
        fps={root.fps}
        id={root.id}
        width={root.width}
        height={root.height}
        durationInFrames={root.fps * root.duration}
        component={CarVideo}
        schema={myCompCarVideo}
        defaultProps={{ ...root }}
      />
    </>
  );
};
