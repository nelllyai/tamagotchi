abstract class Button {
  protected _x: number;
  protected _y: number;
  protected _color: string;

  constructor(x: number, y: number, color: string) {
    this._x = x;
    this._y = y;
    this._color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

class IconButton extends Button {
  private _icon: HTMLImageElement;
  protected _w: number;
  protected _h: number;
  protected _radii: number;

  constructor(x: number, y: number, color: string, icon: HTMLImageElement) {
    super(x, y, color);
    this._w = 50;
    this._h = 50;
    this._radii = 8;
    this._icon = icon;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._color;
    ctx.roundRect(this._x, this._y, this._w, this._h, this._radii);
    ctx.fill();
    ctx.drawImage(this._icon, this._x, this._y, 50, 50);
  }
}

export class RoundButton extends Button {
  private _radius: number;

  constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color);
    this._radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._color;
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Panel {
  private _ctx: CanvasRenderingContext2D;

  private _x: number;
  private _y: number;

  private _w: number;
  private _h: number;

  private _radii: number;

  private _buttons: IconButton[];

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
    const sleepIcon = document.getElementById("sleep") as HTMLImageElement;
    const chatIcon = document.getElementById("chat") as HTMLImageElement;
    const cureIcon = document.getElementById("cure") as HTMLImageElement;

    this._buttons.push(new IconButton(160, 191, "#D9D9D9", playIcon));
    this._buttons.push(new IconButton(237, 191, "#D9D9D9", feedIcon));
    this._buttons.push(new IconButton(313, 191, "#D9D9D9", batheIcon));
    this._buttons.push(new IconButton(390, 191, "#D9D9D9", cleanIcon));

    this._buttons.push(new IconButton(160, 421, "#D9D9D9", sleepIcon));
    this._buttons.push(new IconButton(237, 421, "#D9D9D9", chatIcon));
    this._buttons.push(new IconButton(313, 421, "#D9D9D9", cureIcon));
    // this._buttons.push(new Button(780, 842));
  }

  draw() {
    this._ctx.beginPath();
    this._ctx.fillStyle = "#F0F0F0";
    this._ctx.roundRect(150, 176, 300, 300, 16);
    this._ctx.fill();

    this._buttons.forEach((btn) => btn.draw(this._ctx));

    this._ctx.beginPath();
    this._ctx.fillStyle = "#D9D9D9";
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

  private _needs: {
    feed: number;
    bathe: number;
    clean: number;
    chat: number;
    play: number;
    cure: number;
    sleep: number;
  };

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

    this._needs = {
      feed: 50,
      bathe: 50,
      clean: 50,
      chat: 50,
      play: 50,
      cure: 50,
      sleep: 50,
    };

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
