import { Panel } from "./control";
import { RoundButton } from "./control";
import { Pet } from "./control";

class Context {
  private _ctx: CanvasRenderingContext2D;

  private _w: number;
  private _h: number;

  private _panel: Panel;
  private _pet: Pet;

  private _buttons: RoundButton[];

  private _bg: HTMLImageElement;

  private _timePoint: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    panel: Panel,
    pet: Pet,
    bg: HTMLImageElement
  ) {
    this._ctx = ctx;

    this._w = canvas.width;
    this._h = canvas.height;

    this._panel = panel;
    this._pet = pet;

    this._buttons = [
      new RoundButton(185, 585, "#FFE500", 35),
      new RoundButton(415, 585, "#FFE500", 35),
    ];

    this._bg = bg;

    this._timePoint = Date.now();
  }

  public init(): void {
    this.update();
  }

  private update = (): void => {
    console.log(this);
    this._ctx.clearRect(0, 0, this._w, this._h);

    this._ctx.drawImage(this._bg, 0, 0, this._w, this._h);
    this._buttons.forEach((btn) => btn.draw(this._ctx));

    this._panel.draw();
    this._pet.draw();

    const timeNow = Date.now();

    if (timeNow - this._timePoint >= 1000) {
      const randomX = this.getRandom(-100, 100);
      const randomY = this.getRandom(-50, 50);

      this._pet.move(randomX, randomY);

      this._timePoint = timeNow;
    }

    requestAnimationFrame(this.update);
  };

  private getRandom(from: number, to: number) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const caseImage = document.getElementById("case") as HTMLImageElement;
const petImage = document.getElementById("pet") as HTMLImageElement;

const panel = new Panel(ctx, 160, 256, 280, 150, 8);
const pet = new Pet(ctx, petImage, 321, 326, 100, 100, 165, 261, 435, 401);

const context = new Context(ctx, panel, pet, caseImage);
context.init();
