import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { CarVideo, myCompCarVideo } from "./CarVideo/CarVideo";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

export const RemotionRoot: React.FC = () => {
  const root = {
    duration: 14,
    width: 1920,
    height: 1080,
    fps: 30,
    id: "CarVideo",
    elements: [
      {
        time: 1,
        duration: 2,
        labelDuration: 2,
        type: "composition",
        zhLabel: "人类对汽车有什么期望",
        enLabel: "WHAT WE CAN BRING TO PEOPLE",
        cover_video_url: ""
      },
      {
        time: 3,
        duration: 2,
        type: "composition",
        zhLabel: "运动",
        enLabel: "SPORTS",
        cover_video_url:
          "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car1.mp4"
      },
      {
        time: 5,
        duration: 3,
        type: "composition",
        zhLabel: "时尚",
        enLabel: "FASHION",
        cover_video_url:
          "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car2.mp4"
      },
      {
        time: 8,
        duration: 3,
        type: "composition",
        zhLabel: "自由",
        enLabel: "FREE",
        cover_video_url:
          "https://byering-web-assets.oss-cn-hangzhou.aliyuncs.com/newDhf/assets/car3.mp4"
      },
      {
        time: 11,
        duration: 3,
        labelDuration: 3,
        type: "composition",
        zhLabel: "开阔人生  无畏前行",
        enLabel: "奥迪 RS7",
        cover_video_url: ""
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
