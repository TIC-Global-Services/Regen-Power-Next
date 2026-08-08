export type PointNum = 1 | 2;

export type Step =
  | { kind: "home" }
  | { kind: "forward"; point: PointNum }
  | { kind: "boom-fwd"; point: PointNum }
  | { kind: "boom-rev"; point: PointNum }
  | { kind: "reverse"; point: PointNum };

export const HOME_SRC = "/vid/static_loop.mp4";

export const POINT_SRC: Record<PointNum, string> = {
  1: "/vid/point_1.mp4",
  2: "/vid/point_2.mp4",
};

export const POINT_REV_SRC: Record<PointNum, string> = {
  1: "/vid/point_1_rev.mp4",
  2: "/vid/point_2_rev.mp4",
};

export const HOME_HOTSPOTS: {
  x: number;
  y: number;
  label: string;
  point: PointNum;
  icon: "charging" | "solar";
}[] = [
  { x: 35, y: 60, label: "Charging Station", point: 1, icon: "charging" },
  { x: 25, y: 30, label: "Solar Panel", point: 2, icon: "solar" },
];

export const BACK_HOTSPOT = { x: 50, y: 90, label: "Back" };

export const TAIL_SECONDS = 2;
export const SCENE_FADE_MS = 350;
export const BOOMERANG_FADE_MS = 0;

export const ALL_VIDEO_SRCS = [
  HOME_SRC,
  POINT_SRC[1],
  POINT_SRC[2],
  POINT_REV_SRC[1],
  POINT_REV_SRC[2],
];
