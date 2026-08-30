import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BLACK = "#050505";
const BLUE = "#2389d7";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const smooth = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const ZurichJsMark: React.FC<{size: number}> = ({size}) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      overflow: "hidden",
      backgroundColor: "white",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: BLUE,
        clipPath: "polygon(0 0, 0 100%, 100% 100%)",
      }}
    />
  </div>
);

const ConferenceLabel: React.FC<{frame: number; isSquare: boolean}> = ({
  frame,
  isSquare,
}) => {
  const progress = smooth(frame, 28, 54);

  return (
    <div
      style={{
        position: "absolute",
        top: isSquare ? 76 : 72,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: isSquare ? 12 : 15,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [28, 0])}px) scale(${interpolate(progress, [0, 1], [0.97, 1])})`,
      }}
    >
      <ZurichJsMark size={isSquare ? 38 : 45} />
      <div
        style={{
          fontSize: isSquare ? 46 : 58,
          fontWeight: 760,
          letterSpacing: isSquare ? -1.6 : -2.1,
        }}
      >
        ZurichJS Conf 2026
      </div>
    </div>
  );
};

const Headline: React.FC<{frame: number; isSquare: boolean}> = ({
  frame,
  isSquare,
}) => {
  const progress = smooth(frame, 58, 91);

  return (
    <div
      style={{
        position: "absolute",
        top: isSquare ? 210 : 232,
        left: isSquare ? 54 : 250,
        right: isSquare ? 54 : 250,
        overflow: "hidden",
        clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
      }}
    >
      <div
        style={{
          fontSize: isSquare ? 72 : 86,
          fontWeight: 780,
          lineHeight: 1.04,
          letterSpacing: isSquare ? -2.8 : -3.4,
          textAlign: "center",
          transform: `translateX(${interpolate(progress, [0, 1], [-90, 0])}px)`,
        }}
      >
        Where Swiss devs meet
        <br />
        international experts
      </div>
    </div>
  );
};

const Categories: React.FC<{frame: number; isSquare: boolean; fps: number}> = ({
  frame,
  isSquare,
  fps,
}) => {
  const items = ["Meetup", "Workshops", "Conference"];

  return (
    <div
      style={{
        position: "absolute",
        top: isSquare ? 456 : 514,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: isSquare ? 16 : 30,
        fontSize: isSquare ? 34 : 45,
        fontWeight: 700,
        letterSpacing: -1.2,
      }}
    >
      {items.map((item, index) => {
        const start = 98 + index * 11;
        const drop = spring({
          frame: frame - start,
          fps,
          config: {damping: 14, stiffness: 130, mass: 0.75},
          durationInFrames: 26,
        });

        return (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isSquare ? 16 : 30,
              opacity: interpolate(drop, [0, 0.2, 1], [0, 1, 1], clamp),
              transform: `translateY(${interpolate(drop, [0, 1], [-70, 0])}px)`,
            }}
          >
            {index > 0 ? (
              <span style={{fontSize: isSquare ? 25 : 33}}>•</span>
            ) : null}
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};

const Footer: React.FC<{frame: number; isSquare: boolean}> = ({
  frame,
  isSquare,
}) => {
  const progress = smooth(frame, 144, 174);
  const lift = interpolate(progress, [0, 1], [26, 0]);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        bottom: isSquare ? 38 : 66,
        left: isSquare ? 40 : 72,
        right: isSquare ? 40 : 72,
        display: "flex",
        flexDirection: isSquare ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isSquare ? "center" : undefined,
        gap: isSquare ? 10 : 0,
        color: "white",
        fontSize: isSquare ? 27 : 33,
        fontWeight: 450,
        letterSpacing: -0.5,
        opacity: progress,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div>September 9–11, 2026&nbsp; • &nbsp;Technopark, Zurich</div>
      <div>Late Bird tickets available</div>
    </div>
  );
};

export const GoogleAdsCampaign: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isSquare = width === height;
  const skylineProgress = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 85, mass: 1.15},
    durationInFrames: 46,
  });
  const skylineY = interpolate(skylineProgress, [0, 1], [560, 0]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 44% 18%, #fff48c 0%, #f7df53 48%, #f1cf2f 100%)",
        color: BLACK,
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
        overflow: "hidden",
      }}
    >
      <ConferenceLabel frame={frame} isSquare={isSquare} />
      <Headline frame={frame} isSquare={isSquare} />
      <Categories frame={frame} isSquare={isSquare} fps={fps} />

      <Img
        src={staticFile("zurich-skyline.svg")}
        style={{
          position: "absolute",
          zIndex: 2,
          left: 0,
          bottom: isSquare ? -10 : -20,
          width: "100%",
          height: "auto",
          transform: `translateY(${skylineY}px)`,
        }}
      />

      <Footer frame={frame} isSquare={isSquare} />
    </AbsoluteFill>
  );
};
