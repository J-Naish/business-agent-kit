import { Img } from "@react-email/components";

interface TrackingPixelProps {
  /** Tracking server URL that returns a 1x1 transparent image. */
  src: string;
}

/**
 * 1x1 transparent pixel for open tracking.
 * Place it near the end of the email and count image loads as opens.
 *
 * @example
 * <TrackingPixel src="https://track.example.com/open?id=abc123" />
 */
export function TrackingPixel({ src }: TrackingPixelProps) {
  return (
    <Img
      src={src}
      width="1"
      height="1"
      alt=""
      style={{
        display: "block",
        width: "1px",
        height: "1px",
        border: "0",
      }}
    />
  );
}
