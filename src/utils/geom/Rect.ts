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
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  /**
   * @description The x coordinate of the left of the Rectangle.
   */
  get left() {
    return this.x;
  }

  /**
   * @description The sum of the x and width properties.
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * @description The y coordinate of the top of the Rectangle.
   */
  get top() {
    return this.y;
  }

  /**
   * @description The sum of the y and height properties.
   */
  get bottom() {
    return this.y + this.height;
  }
}
