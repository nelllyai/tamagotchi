import { getRandom } from "./getRandom";

export class Pet {
  private _isAlive: boolean;
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

  private _toShowBalloon: boolean;

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
    this._isAlive = true;
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

    this._toShowBalloon = false;

    this.checkPosition();
  }

  get isAlive() {
    return this._isAlive;
  }

  public live() {
    const toNotChange = getRandom(0, 3);
    if (!toNotChange) {
      const stateToChange = Object.keys(this._needs)[
        getRandom(0, 6)
      ] as keyof typeof this._needs;
      this._needs[stateToChange] -= getRandom(10, 20);
    }
  }

  public checkForBalloon() {
    this._toShowBalloon = false;

    for (let key in this._needs) {
      if (this._needs[key as keyof typeof this._needs] < 20) {
        this._toShowBalloon = true;
      }
    }
  }

  public checkForDead() {
    for (let key in this._needs) {
      if (this._needs[key as keyof typeof this._needs] <= 0) {
        this._isAlive = false;
        this._toShowBalloon = true;
      }
    }
  }

  public draw() {
    if (this._isAlive) {
      this._ctx.drawImage(this._image, this._x, this._y, this._w, this._h);
    } else {
      this._ctx.save();
      this._ctx.scale(1, -1);
      this._ctx.drawImage(
        this._image,
        this._x,
        this._h * -1 - this._y,
        this._w,
        this._h
      );
      this._ctx.restore();
    }
  }

  public drawBalloon() {
    if (this._toShowBalloon || !this._isAlive) {
      this._ctx.beginPath();
      this._ctx.fillStyle = "#FFFFFF";
      this._ctx.roundRect(237, 35, 125, 125, 40);
      this._ctx.fill();

      this._ctx.beginPath();
      this._ctx.moveTo(290, 160);
      this._ctx.bezierCurveTo(290, 176, 310, 176, 310, 160);
      this._ctx.fill();

      if (this._isAlive) {
        let statusToDraw = "";
        let statusMin = 100;

        for (let key in this._needs) {
          if (this._needs[key as keyof typeof this._needs] < statusMin) {
            statusMin = this._needs[key as keyof typeof this._needs];
            statusToDraw = key;
          }
        }

        const imageStatus = document.getElementById(
          "status-" + statusToDraw
        ) as HTMLImageElement;
        this._ctx.drawImage(imageStatus, 275, 72, 50, 50);
      } else {
        const deathImage = document.getElementById("dead") as HTMLImageElement;
        this._ctx.drawImage(deathImage, 275, 72, 50, 50);
      }
    }
  }

  public move(dx: number, dy: number) {
    this._x += dx;
    this._y += dy;

    this.checkPosition();
  }

  public interact(need: string) {
    const upCount = getRandom(10, 30);
    this._needs[need as keyof typeof this._needs] += upCount;
    if (this._needs[need as keyof typeof this._needs] > 100) {
      this._needs[need as keyof typeof this._needs] = 100;
    }
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
