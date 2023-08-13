class Button {
  // private _icon: SVGElement;
  protected _x: number;
  protected _y: number;
  protected _w: number;
  protected _h: number;
  protected _radii: number;

  constructor(x: number, y: number) {
    // this._icon = icon;
    this._x = x;
    this._y = y;
    this._w = 100;
    this._h = 100;
    this._radii = 8;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
    ctx.fill();
  }
}

class IconButton extends Button {
  private _icon: HTMLImageElement;

  constructor(x: number, y: number, icon: HTMLImageElement) {
    super(x, y);
    this._icon = icon;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
    ctx.fill();
    ctx.drawImage(this._icon, this._x, this._y, 100, 100);
  }
}

class RoundButton extends Button {}

export class Panel {
  private _ctx: CanvasRenderingContext2D;

  private _x: number;
  private _y: number;

  private _w: number;
  private _h: number;

  private _radii: number;

  private _buttons: Button[];

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    radii: number
  ) {
    this._ctx = ctx;

    this._x = x;
    this._y = y;

    this._w = w;
    this._h = h;
    this._radii = radii;

    this._buttons = [];

    const playIcon = document.getElementById("play") as HTMLImageElement;
    const feedIcon = document.getElementById("feed") as HTMLImageElement;
    const batheIcon = document.getElementById("bathe") as HTMLImageElement;
    const cleanIcon = document.getElementById("clean") as HTMLImageElement;

    this._buttons.push(new IconButton(320, 382, playIcon));
    this._buttons.push(new IconButton(473.33, 382, feedIcon));
    this._buttons.push(new IconButton(626.67, 382, batheIcon));
    this._buttons.push(new IconButton(780, 382, cleanIcon));

    this._buttons.push(new Button(320, 842));
    this._buttons.push(new Button(473.33, 842));
    this._buttons.push(new Button(626.67, 842));
    this._buttons.push(new Button(780, 842));
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.roundRect(300, 362, 600, 600, 16);
    this._ctx.fillStyle = "#F0F0F0";
    this._ctx.fill();

    this._ctx.fillStyle = "#D9D9D9";
    this._buttons.forEach((btn) => btn.draw(this._ctx));

    this._ctx.beginPath();
    this._ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
    this._ctx.fill();
  }
}

export class Pet {
  private _ctx: CanvasRenderingContext2D;

  private _image: HTMLImageElement;

  private _x: number;
  private _y: number;

  private _w: number;
  private _h: number;

  private readonly _minX: number;
  private readonly _minY: number;
  private readonly _maxX: number;
  private readonly _maxY: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) {
    this._ctx = ctx;

    this._image = image;

    this._minX = minX;
    this._minY = minY;
    this._maxX = maxX;
    this._maxY = maxY;

    this._x = x;
    this._y = y;

    this._w = w;
    this._h = h;

    this.checkPosition();
  }

  public draw() {
    this._ctx.drawImage(this._image, this._x, this._y, this._w, this._h);
  }

  public move(dx: number, dy: number) {
    this._x += dx;
    this._y += dy;

    this.checkPosition();
  }

  private checkPosition() {
    if (this._x + this._w > this._maxX) {
      this._x = this._maxX - this._w;
    }

    if (this._x < this._minX) {
      this._x = this._minX;
    }

    if (this._y + this._h > this._maxY) {
      this._y = this._maxY - this._h;
    }

    if (this._y < this._minY) {
      this._y = this._minY;
    }
  }
}
