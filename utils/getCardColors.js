import { darken, getLuminance, lighten } from "polished";

const MIN_LUMINANCE_DIFFERENCE = 0.75;
const STEP = 0.02;

// Returns a background and text color whose luminance difference is above
// MIN_LUMINANCE_DIFFERENCE. The background is darkened (white text) or
// lightened (black text) only as far as needed to reach that contrast.
export default function getCardColors(color) {
  const useWhiteText = getLuminance(color) < 0.5;
  const textColor = useWhiteText ? "#ffffff" : "#000000";
  const textLuminance = useWhiteText ? 1 : 0;

  let background = color;
  while (
    Math.abs(textLuminance - getLuminance(background)) <=
    MIN_LUMINANCE_DIFFERENCE
  ) {
    background = useWhiteText
      ? darken(STEP, background)
      : lighten(STEP, background);
  }

  // The gradient end moves away from the text color, so contrast only grows.
  const gradientEnd = useWhiteText
    ? darken(0.08, background)
    : lighten(0.08, background);

  return { background, gradientEnd, textColor };
}
