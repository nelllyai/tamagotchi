abstract class Button {
  protected _x: number;
  protected _y: number;
  protected _isFocused: boolean;
  protected _mainColor: string;
  protected _focusColor: string;

  constructor(x: number, y: number, mainColor: string, focusColor: string) {
    this._x = x;
    this._y = y;
    this._isFocused = false;
    this._mainColor = mainColor;
    this._focusColor = focusColor;
  }

  public toggleFocus() {
    this._isFocused = !this._isFocused;
  }

  get isFocused() {
    return this._isFocused;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export class IconButton extends Button {
  private _icon: HTMLImageElement;
  protected _w: number;
  protected _h: number;
  protected _radii: number;
  protected _action: string;

  constructor(
    x: number,
    y: number,
    mainColor: string,
    focusColor: string,
    icon: HTMLImageElement,
    action: string
  ) {
    super(x, y, mainColor, focusColor);
    this._w = 50;
    this._h = 50;
    this._radii = 8;
    this._icon = icon;
    this._action = action;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._mainColor;
    ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
    ctx.fill();
    ctx.drawImage(this._icon, this._x, this._y, 50, 50);

    if (this._isFocused) {
      ctx.beginPath();
      ctx.strokeStyle = this._focusColor;
      ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  get action() {
    return this._action;
  }
}

export class RoundButton extends Button {
  private _radius: number;

  constructor(
    x: number,
    y: number,
    mainColor: string,
    focusColor: string,
    radius: number
  ) {
    super(x, y, mainColor, focusColor);
    this._radius = radius;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._mainColor;
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fill();

    if (this._isFocused) {
      ctx.beginPath();
      ctx.strokeStyle = this._focusColor;
      ctx.arc(this._x, this._y, this._radius + 6, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }
}
