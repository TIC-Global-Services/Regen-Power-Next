export type PointNum = 1 | 2 | 3;

export type Step =
  | { kind: "home" }
  | { kind: "forward"; point: PointNum }
  | { kind: "loop"; point: PointNum }
  | { kind: "reverse"; point: PointNum };

export const HOME_SRC = "/final/static.mp4";

export const POINT_SRC: Record<PointNum, string> = {
  1: "/final/point_1.mp4",
  2: "/final/point_2.mp4",
  3: "/final/point_3.mp4",
};

export const POINT_LOOP_SRC: Record<PointNum, string> = {
  1: "/final/point_1_end_loop.mp4",
  2: "/final/point_2_end_loop.mp4",
  3: "/final/point_3_end_loop.mp4",
};

export const POINT_REV_SRC: Record<PointNum, string> = {
  1: "/final/point_1_rev.mp4",
  2: "/final/point_2_rev.mp4",
  3: "/final/point_3_rev.mp4",
};

export const HOME_HOTSPOTS: {
  x: number;
  y: number;
  label: string;
  point: PointNum;
  icon: "charging" | "solar" | "store";
}[] = [
  { x: 35, y: 60, label: "Charging Station", point: 1, icon: "charging" },
  { x: 25, y: 30, label: "Solar Panel", point: 2, icon: "solar" },
  { x:70, y: 65, label: "Store Room", point: 3, icon: "store" },
];

export const BACK_HOTSPOT = { x: 50, y: 90, label: "Back" };

export const SCENE_FADE_MS = 350;
export const LOOP_FADE_MS = 0;

export const ALL_VIDEO_SRCS = [
  HOME_SRC,
  POINT_SRC[1],
  POINT_LOOP_SRC[1],
  POINT_REV_SRC[1],
  POINT_SRC[2],
  POINT_LOOP_SRC[2],
  POINT_REV_SRC[2],
  POINT_SRC[3],
  POINT_LOOP_SRC[3],
  POINT_REV_SRC[3],
];
