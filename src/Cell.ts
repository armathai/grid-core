import { CellAlign, CellScale, ICellConfig, IRawBounds, IRawPadding, IRawPoint } from './Types';
import { Point } from './utils/geom/Point';
import { Rect } from './utils/geom/Rect';
import { fillRect, numberToRect, px2number, rawToRect } from './utils/Utils';

export class Cell<T> {
  public static readonly MIN_SIZE: number = 1 / Number.MAX_SAFE_INTEGER;

  private readonly _config: ICellConfig;
  private readonly _name: string;
  private readonly _cells: Cell<T>[];
  private readonly _bounds: Rect;
  private readonly _scale: CellScale;
  private readonly _align: CellAlign;
  private readonly _padding: Rect;
  private readonly _offset: Point;
  private readonly _contents: T[];

  /**
   * @param config Input configuration object.
   */
  constructor(config: ICellConfig) {
    const { name, bounds, cells, scale, align, padding, offset } = config;

    this._config = config;
    this._name = this._getName(name);
    this._scale = this._getScale(scale);
    this._align = this._getAlign(align);
    this._offset = this._getOffset(offset);
    this._contents = this._getContents();
    this._bounds = this._getBounds(bounds);
    this._padding = this._buildPadding(this._getPadding(padding));
    this._cells = this._buildCells(this._getCells(cells));
  }

  /**
   * @description Configuration object reference passed in constructor
   * @returns {ICellConfig} configuration object
   */
  get config(): ICellConfig {
    return this._config;
  }

  /**
   * @description Cell name defined in configuration object
   * @returns {string} cell name
   */
  get name(): string {
    return this._name;
  }

  /**
   * @description Array of child cells
   * @returns {Cell[]} child cells
   */
  get cells(): Cell<T>[] {
    return this._cells;
  }

  /**
   * @description Bounds area in pixels
   * @returns {Rect} bounds area
   */
  get bounds(): Rect {
    return this._bounds;
  }

  /**
   * @description Padding area in pixels
   * @returns {Rect} padding area
   */
  get padding(): Rect {
    return this._padding;
  }

  /**
   * @description Scale type, used to scale contents
   * @returns {CellScale} scale type
   */
  get scale(): CellScale {
    return this._scale;
  }

  /**
   * @description Align type, used to align contents
   * @returns {CellAlign} align type
   */
  get align(): CellAlign {
    return this._align;
  }

  /**
   * @description Contents
   * @returns {T[]} cell contents
   */
  get contents(): T[] {
    return this._contents;
  }

  /**
   * @description Cell bounds considered paddings
   * @returns {Rect} Rectangle considered paddings
   */
  get area(): Rect {
    return this._padding;
  }

  /**
   * @description Cell offset
   * @returns {Point} cell offset
   */
  get offset(): Point {
    return this._offset;
  }

  /**
   * @description Returns cells way down of the tree, recursively
   * @returns {Cell[]} Array of cells
   */
  public getCells(): Cell<T>[] {
    const cells = [];
    cells.push(this);
    this._cells.forEach(cell => cells.push(...cell.getCells()));

    return cells;
  }

  /**
   * @description Returns cell based on given name
   * @param name The name of the cell
   * @returns {Cell | undefined}
   */
  public getCellByName(name: string): Cell<T> | undefined {
    return this.getCells().find(cell => cell._name === name);
  }

  public getCellByContent(content: T): Cell<T> | undefined {
    return this.getCells().find(cell => cell.contents.includes(content));
  }

  private _getName(rawName: string): string {
    return rawName;
  }

  private _getScale(rawScale: CellScale | undefined): CellScale {
    return rawScale || CellScale.Fit;
  }

  private _getAlign(rawAlign: CellAlign | undefined): CellAlign {
    return rawAlign || CellAlign.Center;
  }

  private _getOffset(rawOffset: IRawPoint | undefined): Point {
    return rawOffset ? new Point(rawOffset.x || 0, rawOffset.y || 0) : new Point(0, 0);
  }

  private _getContents(): T[] {
    return new Array(0);
  }

  private _getCells(rawCells: ICellConfig[] | undefined): ICellConfig[] {
    return rawCells || new Array(0);
  }

  private _getBounds(rawBounds: IRawBounds | undefined): Rect {
    const b = rawBounds ? rawToRect(rawBounds) : new Rect(0, 0, Cell.MIN_SIZE, Cell.MIN_SIZE);
    const o = this.offset;

    return new Rect(b.x + o.x, b.y + o.y, b.width, b.height);
  }

  private _getPadding(rawPadding: IRawPadding | undefined): Rect {
    return rawPadding
      ? typeof rawPadding === 'number'
        ? numberToRect(rawPadding)
        : fillRect(rawPadding)
      : new Rect(0, 0, 1, 1);
  }

  private _buildPadding(padding: Rect) {
    const { x: px, y: py, width: pw, height: ph } = padding;
    const { x: bx, y: by, width: bw, height: bh } = this._bounds;

    return new Rect(bx + px * bw, by + py * bh, bw * pw, bh * ph);
  }

  private _buildCells(rawCells: ICellConfig[]): Cell<T>[] {
    const cells = [];

    const { width: bw, height: bh, left: bl, right: br, top: bt, bottom: bb } = this.area;

    for (const rawCell of rawCells) {
      const { bounds = new Rect(0, 0, 0, 0) } = rawCell;
      const configBounds = { ...bounds };

      bounds.x =
        bounds.x !== undefined
          ? typeof bounds.x === 'string'
            ? bl + px2number(bounds.x)
            : bl + bounds.x * bw
          : Math.max(bl, ...cells.map(({ _bounds: b }) => b.right));

      bounds.y =
        bounds.y !== undefined
          ? typeof bounds.y === 'string'
            ? bt + px2number(bounds.y)
            : bt + bounds.y * bh
          : Math.max(bt, ...cells.map(({ _bounds: b }) => b.bottom));

      bounds.width =
        bounds.width !== undefined
          ? typeof bounds.width === 'string'
            ? px2number(bounds.width)
            : bounds.width * bw
          : br - bounds.x;

      bounds.height =
        bounds.height !== undefined
          ? typeof bounds.height === 'string'
            ? px2number(bounds.height)
            : bounds.height * bh
          : bb - bounds.y;

      const cell = new Cell<T>(rawCell);
      cell.config.bounds = configBounds;
      cells.push(cell);
    }

    return cells;
  }
}
