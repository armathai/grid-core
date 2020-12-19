/**
 * Encapsulates a 2D rectangle with an | x, y, width, height | component
 */
export class Rect {
    /**
     *
     * @param x The X coordinate of the top left corner of the Rectangle.
     * @param y The Y coordinate of the top left corner of the Rectangle.
     * @param width The width of the Rectangle.
     * @param height The height of the Rectangle.
     */
    public constructor(public x: number, public y: number, public width: number, public height: number) {}

    /**
     * @description The x coordinate of the left of the Rectangle.
     */
    public get left(): number {
        return this.x;
    }

    /**
     * @description The sum of the x and width properties.
     */
    public get right(): number {
        return this.x + this.width;
    }

    /**
     * @description The y coordinate of the top of the Rectangle.
     */
    public get top(): number {
        return this.y;
    }

    /**
     * @description The sum of the y and height properties.
     */
    public get bottom(): number {
        return this.y + this.height;
    }
}
