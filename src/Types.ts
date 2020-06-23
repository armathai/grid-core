export type IRawPoint = { x?: number; y?: number };

export type IRawRect = { x?: number; y?: number; width?: number; height?: number };

export type IRawBounds = {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
};

export type IRawPadding = number | IRawRect;

export type IDebug = { color?: number; fill?: boolean };

export type ICellConfig = {
  name: string;
  debug?: IDebug;
  scale?: CellScale;
  align?: CellAlign;
  cells?: ICellConfig[];
  bounds?: IRawBounds;
  padding?: IRawPadding;
  offset?: IRawPoint;
};

export type IDimension = {
  width: number;
  height: number;
};

export enum CellScale {
  None = 1,
  Fit,
  Fill,
  ShowAll,
  Envelop,
  Custom,
}

export enum CellAlign {
  None = 1,
  Center,
  CenterTop,
  CenterBottom,
  LeftCenter,
  LeftTop,
  LeftBottom,
  RightCenter,
  RightTop,
  RightBottom,
}
