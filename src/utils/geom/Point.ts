/**
 * Defines a Point in 2D space, with an | x, y | component.
 */
export class Point {
    /**
     *
     * @param x The x coordinate of this Point.
     * @param y The y coordinate of this Point.
     */
    public constructor(public x: number, public y: number) {}

    /**
     * @description Set the x and y coordinates of the point to the given values.
     * @param x The x coordinate of this Point.
     * @param y The y coordinate of this Point.
     */
    public set(x: number, y: number): this {
        this.x = x;
        this.y = y;

        return this;
    }
}
