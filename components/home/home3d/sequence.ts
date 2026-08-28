export const FRAME_COUNT = 674;

export const FRAME_SRC = (index: number) =>
  `/sequence/frame_${String(index + 1).padStart(4, "0")}.webp`;

// Native resolution of the exported frames — used to size decode-time
// downscaling so cached frames never hold more resolution than the device
// can actually display.
export const FRAME_NATIVE_WIDTH = 1920;
export const FRAME_NATIVE_HEIGHT = 1080;

// Frames 1-91: plays once on load.
export const INTRO_RANGE = { start: 0, end: 90 };
export const INTRO_FPS = 30;

// Frames 92-241: loops until the user starts scrolling.
export const LOOP_RANGE = { start: 91, end: 240 };
export const LOOP_FPS = 30;

// Frames 242-674: scroll-driven, starts once the user takes over.
export const SCROLL_START = 241;

// Scroll distance (in viewport heights) the scroll-driven portion plays over.
export const SCROLL_LENGTH_VH = 400;

// After the main scroll sequence ends, continued scrolling scrubs back through
// frames 1-91 (the intro range), then loops the same range as LOOP_RANGE while
// the user holds position — scrolling further hands off to whatever section
// follows the hero.
export const OUTRO_RANGE = { start: 0, end: 90 };

// Scroll distance (in viewport heights) the outro portion plays over.
export const OUTRO_LENGTH_VH = 100;
