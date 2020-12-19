import { CellAlign, CellScale, IDimension, IRawBounds, IRawRect } from '../Types';
import { Point } from './geom/Point';
import { Rect } from './geom/Rect';

export function rawToRect({ x = 0, y = 0, width = 0, height = 0 }: IRawBounds): Rect {
    return new Rect(
        typeof x === 'string' ? px2number(x) : x,
        typeof y === 'string' ? px2number(y) : y,
        typeof width === 'string' ? px2number(width) : width,
        typeof height === 'string' ? px2number(height) : height,
    );
}

export function numberToRect(value: number): Rect {
    return new Rect(value, value, 1 - 2 * value, 1 - 2 * value);
}

export function fillRect({ x = 0, y = 0, width = 1 - (x ? x : 0), height = 1 - (y ? y : 0) }: IRawRect): Rect {
    return new Rect(x, y, width, height);
}

export function px2number(value: string): number {
    return parseInt(value, 10);
}

/**
 * @description Represents scale difference needed to scale first dimension compared with second based on scale type
 * @param d1 Dimension to scale
 * @param d2 Dimension to compare with
 * @param scaleType Scale type
 * @returns {Point}
 */
export function fit(d1: IDimension, d2: IDimension, scaleType: CellScale): Point {
    switch (scaleType) {
        case CellScale.fit:
            return internalFit(d1, d2);
        case CellScale.fill:
            return internalFill(d1, d2);
        case CellScale.showAll:
            return internalShowAll(d1, d2);
        case CellScale.envelop:
            return internalEnvelop(d1, d2);
        case CellScale.none:
            return new Point(1, 1);
        default:
            throw new Error(`Unknown scale type: ${scaleType}`);
    }
}

/**
 * @description Represents position difference needed to align dimension in rect based on align type
 * @param dimension Dimension to align
 * @param rect Rect to align to
 * @param alignType Align type
 * @returns {Point}
 */
export function align(dimension: IDimension, rect: Rect, alignType: CellAlign): Point {
    const { width: w1, height: h1 } = dimension;
    const { x: x2, y: y2, width: w2, height: h2 } = rect;
    const pos = new Point(x2, y2);

    switch (alignType) {
        case CellAlign.center:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1) / 2);
        case CellAlign.centerTop:
            return pos.set(x2 + (w2 - w1) / 2, y2);
        case CellAlign.centerBottom:
            return pos.set(x2 + (w2 - w1) / 2, y2 + (h2 - h1));
        case CellAlign.leftCenter:
            return pos.set(x2, y2 + (h2 - h1) / 2);
        case CellAlign.leftTop:
            return pos;
        case CellAlign.leftBottom:
            return pos.set(x2, y2 + (h2 - h1));
        case CellAlign.rightCenter:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1) / 2);
        case CellAlign.rightTop:
            return pos.set(x2 + (w2 - w1), y2);
        case CellAlign.rightBottom:
            return pos.set(x2 + (w2 - w1), y2 + (h2 - h1));
        case CellAlign.none:
            return pos;
        default:
            throw new Error(`Unknown align: ${align}`);
    }
}

function internalFit(d1: IDimension, d2: IDimension): Point {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.min(w2 / w1, h2 / h1);

    return s < 1 ? new Point(s, s) : new Point(1, 1);
}

function internalShowAll(d1: IDimension, d2: IDimension): Point {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.min(w2 / w1, h2 / h1);

    return new Point(s, s);
}

function internalEnvelop(d1: IDimension, d2: IDimension): Point {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;
    const s = Math.max(w2 / w1, h2 / h1);

    return new Point(s, s);
}

function internalFill(d1: IDimension, d2: IDimension): Point {
    const { width: w1, height: h1 } = d1;
    const { width: w2, height: h2 } = d2;

    return new Point(w2 / w1, h2 / h1);
}
