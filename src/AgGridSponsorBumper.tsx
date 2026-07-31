import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const ink = "#F8FAFF";
const muted = "rgba(248, 250, 255, 0.66)";
const introZurichLogoWidth = 960;
const zurichLogoWidth = 620;
const agGridLogoWidth = 780;

const timing = {
  zurichIn: [10, 54],
  zurichOut: [72, 104],
  agGridIn: [92, 132],
  taglineIn: [138, 174],
  finalIn: [182, 224],
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const fit = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: ease,
  });

const lineStyle: CSSProperties = {
  fontFamily: "Inter, Arial, Helvetica, sans-serif",
  letterSpacing: 0,
  fontWeight: 700,
  color: ink,
};

export const AgGridSponsorBumper: React.FC = () => {
  const frame = useCurrentFrame();

  const zurichIntro = fit(frame, timing.zurichIn as [number, number], [0, 1]);
  const zurichOut = fit(frame, timing.zurichOut as [number, number], [0, 1]);
  const agGridIntro = fit(
    frame,
    timing.agGridIn as [number, number],
    [0, 1],
  );
  const taglineIntro = fit(frame, timing.taglineIn as [number, number], [0, 1]);
  const finalIntro = fit(frame, timing.finalIn as [number, number], [0, 1]);

  const introZurichOpacity = zurichIntro * (1 - zurichOut);
  const introZurichLift =
    interpolate(zurichIntro, [0, 1], [32, 0], clamp) - zurichOut * 18;
  const introZurichScale =
    interpolate(zurichIntro, [0, 1], [0.96, 1], clamp) - zurichOut * 0.03;

  const agGridReveal = interpolate(agGridIntro, [0, 1], [0.22, 1], clamp);
  const taglineReveal = interpolate(taglineIntro, [0, 1], [0, 1], clamp);
  const taglineSlide = interpolate(taglineIntro, [0, 1], [-34, 0], clamp);
  const topLogoDrop = interpolate(finalIntro, [0, 1], [-90, 0], clamp);
  const sponsorLift = interpolate(finalIntro, [0, 1], [84, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 52%, #18232A 0%, #080B10 54%, #020304 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(85, 178, 198, 0.2), transparent 38%, rgba(255, 139, 0, 0.12) 72%, transparent)",
          opacity: 0.68,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: introZurichOpacity,
          transform: `translateY(${introZurichLift}px) scale(${introZurichScale})`,
          zIndex: 2,
        }}
      >
        <Img
          src={staticFile("wordmark-conf-white.svg")}
          style={{
            width: introZurichLogoWidth,
            height: "auto",
            filter: "drop-shadow(0 24px 60px rgba(0, 0, 0, 0.35))",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: agGridIntro,
          transform: `translateY(${interpolate(agGridIntro, [0, 1], [24, 0], clamp)}px) scale(${interpolate(agGridIntro, [0, 1], [0.96, 1], clamp)})`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: agGridLogoWidth,
            height: (agGridLogoWidth / 425.2) * 73.47,
            overflow: "hidden",
            clipPath: `inset(0 ${100 - agGridReveal * 100}% 0 0)`,
          }}
        >
          <Img
            src={staticFile("aggrid.svg")}
            style={{
              width: agGridLogoWidth,
              height: "auto",
              filter: "drop-shadow(0 24px 80px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 630,
          width: agGridLogoWidth,
          overflow: "hidden",
          clipPath: `inset(0 ${100 - taglineReveal * 100}% 0 0)`,
          opacity: taglineIntro,
          transform: `translateX(calc(-50% + ${taglineSlide}px))`,
          zIndex: 4,
        }}
      >
        <div
          style={{
            ...lineStyle,
            width: agGridLogoWidth,
            fontSize: 24,
            lineHeight: 1.2,
            fontWeight: 500,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          The best JavaScript Data Grid in the world
        </div>
      </div>

      <Img
        src={staticFile("wordmark-conf-white.svg")}
        style={{
          position: "absolute",
          left: "50%",
          top: 230,
          width: zurichLogoWidth,
          height: "auto",
          opacity: finalIntro,
          transform: `translate(-50%, ${topLogoDrop}px)`,
          filter: "drop-shadow(0 18px 48px rgba(0, 0, 0, 0.34))",
          zIndex: 4,
        }}
      />

      <div
        style={{
          ...lineStyle,
          position: "absolute",
          left: "50%",
          bottom: 154,
          opacity: finalIntro,
          transform: `translate(-50%, ${sponsorLift}px)`,
          fontSize: 44,
          fontWeight: 650,
          color: muted,
          zIndex: 4,
        }}
      >
        Platinum Sponsor
      </div>
    </AbsoluteFill>
  );
};
