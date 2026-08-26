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
const tiptapLogoWidth = 720;
const tiptapLogoAspect = 1142 / 272;

const timing = {
  zurichIn: [10, 54],
  zurichOut: [72, 104],
  tiptapIn: [92, 132],
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

export const TipTapSponsorBumper: React.FC = () => {
  const frame = useCurrentFrame();

  const zurichIntro = fit(frame, timing.zurichIn as [number, number], [0, 1]);
  const zurichOut = fit(frame, timing.zurichOut as [number, number], [0, 1]);
  const tiptapIntro = fit(
    frame,
    timing.tiptapIn as [number, number],
    [0, 1],
  );
  const finalIntro = fit(frame, timing.finalIn as [number, number], [0, 1]);

  const introZurichOpacity = zurichIntro * (1 - zurichOut);
  const introZurichLift =
    interpolate(zurichIntro, [0, 1], [32, 0], clamp) - zurichOut * 18;
  const introZurichScale =
    interpolate(zurichIntro, [0, 1], [0.96, 1], clamp) - zurichOut * 0.03;

  const tiptapOpacity = tiptapIntro;
  const tiptapReveal = interpolate(tiptapIntro, [0, 1], [0.26, 1], clamp);

  const sponsorOpacity = finalIntro;
  const topLogoDrop = interpolate(finalIntro, [0, 1], [-90, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 52%, #121527 0%, #070810 54%, #02030A 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(38, 139, 204, 0.18), transparent 38%, rgba(28, 50, 255, 0.2) 72%, transparent)",
          opacity: 0.62,
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
          opacity: tiptapOpacity,
          transform: `translateY(${interpolate(tiptapIntro, [0, 1], [24, 0], clamp)}px) scale(${interpolate(tiptapIntro, [0, 1], [0.96, 1], clamp)})`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              ...lineStyle,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 4,
              color: muted,
              textAlign: "center",
            }}
          >
            PROUDLY SPONSORED BY
          </div>
          <div
            style={{
              width: tiptapLogoWidth,
              height: tiptapLogoWidth / tiptapLogoAspect,
              overflow: "hidden",
              clipPath: `inset(0 ${100 - tiptapReveal * 100}% 0 0)`,
            }}
          >
            <Img
              src={staticFile("Logo_tiptap_white.png")}
              style={{
                width: tiptapLogoWidth,
                height: "auto",
                filter: "drop-shadow(0 24px 80px rgba(0, 0, 0, 0.24))",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Img
        src={staticFile("wordmark-conf-white.svg")}
        style={{
          position: "absolute",
          left: "50%",
          top: 230,
          width: zurichLogoWidth,
          height: "auto",
          opacity: sponsorOpacity,
          transform: `translate(-50%, ${topLogoDrop}px)`,
          filter: "drop-shadow(0 18px 48px rgba(0, 0, 0, 0.34))",
          zIndex: 4,
        }}
      />
    </AbsoluteFill>
  );
};
