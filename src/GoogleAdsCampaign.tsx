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
type Layout = "wide" | "square" | "portrait";

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

const ConferenceLabel: React.FC<{frame: number; layout: Layout}> = ({
  frame,
  layout,
}) => {
  const progress = smooth(frame, 28, 54);
  const isCompact = layout !== "wide";

  return (
    <div
      style={{
        position: "absolute",
        top: layout === "portrait" ? 92 : layout === "square" ? 76 : 72,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: isCompact ? 12 : 15,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [28, 0])}px) scale(${interpolate(progress, [0, 1], [0.97, 1])})`,
      }}
    >
      <ZurichJsMark size={isCompact ? 38 : 45} />
      <div
        style={{
          fontSize: isCompact ? 46 : 58,
          fontWeight: 760,
          letterSpacing: isCompact ? -1.6 : -2.1,
        }}
      >
        ZurichJS Conf 2026
      </div>
    </div>
  );
};

const Headline: React.FC<{frame: number; layout: Layout}> = ({
  frame,
  layout,
}) => {
  const progress = smooth(frame, 58, 91);

  return (
    <div
      style={{
        position: "absolute",
        top: layout === "portrait" ? 250 : layout === "square" ? 210 : 232,
        left: layout === "wide" ? 250 : 54,
        right: layout === "wide" ? 250 : 54,
        overflow: "hidden",
        clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
      }}
    >
      <div
        style={{
          fontSize: layout === "portrait" ? 70 : layout === "square" ? 72 : 86,
          fontWeight: 780,
          lineHeight: 1.04,
          letterSpacing: layout === "wide" ? -3.4 : -2.8,
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

const Categories: React.FC<{frame: number; layout: Layout; fps: number}> = ({
  frame,
  layout,
  fps,
}) => {
  const items = ["Meetup", "Workshops", "Conference"];
  const isCompact = layout !== "wide";

  return (
    <div
      style={{
        position: "absolute",
        top: layout === "portrait" ? 500 : layout === "square" ? 456 : 514,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: isCompact ? 16 : 30,
        fontSize: layout === "portrait" ? 36 : layout === "square" ? 34 : 45,
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
              gap: isCompact ? 16 : 30,
              opacity: interpolate(drop, [0, 0.2, 1], [0, 1, 1], clamp),
              transform: `translateY(${interpolate(drop, [0, 1], [-70, 0])}px)`,
            }}
          >
            {index > 0 ? (
              <span style={{fontSize: isCompact ? 25 : 33}}>•</span>
            ) : null}
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};

const Footer: React.FC<{frame: number; layout: Layout}> = ({
  frame,
  layout,
}) => {
  const progress = smooth(frame, 144, 174);
  const lift = interpolate(progress, [0, 1], [26, 0]);
  const isCompact = layout !== "wide";

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        bottom: layout === "portrait" ? 46 : layout === "square" ? 38 : 66,
        left: isCompact ? 40 : 72,
        right: isCompact ? 40 : 72,
        display: "flex",
        flexDirection: isCompact ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isCompact ? "center" : undefined,
        gap: isCompact ? 10 : 0,
        color: "white",
        fontSize: layout === "portrait" ? 29 : layout === "square" ? 27 : 33,
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
  const layout: Layout = height > width ? "portrait" : width === height ? "square" : "wide";
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
      <ConferenceLabel frame={frame} layout={layout} />
      <Headline frame={frame} layout={layout} />
      <Categories frame={frame} layout={layout} fps={fps} />

      <Img
        src={staticFile("zurich-skyline.svg")}
        style={{
          position: "absolute",
          zIndex: 2,
          left: 0,
          bottom: layout === "wide" ? -20 : -10,
          width: "100%",
          height: "auto",
          transformOrigin: "center bottom",
          transform: `translateY(${skylineY}px) scale(${layout === "portrait" ? 1.4 : 1})`,
        }}
      />

      <Footer frame={frame} layout={layout} />
    </AbsoluteFill>
  );
};
