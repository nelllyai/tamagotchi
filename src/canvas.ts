import { Panel } from "./control";

import { Pet } from "./control";

class Context {
  private _ctx: CanvasRenderingContext2D;

  private _w: number;
  private _h: number;

  private _panel: Panel;
  private _pet: Pet;

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

    this._ctx.beginPath();
    this._ctx.arc(370, 1170, 70, 0, Math.PI * 2);
    this._ctx.fillStyle = "#FFE500";
    this._ctx.fill();

    this._ctx.beginPath();
    this._ctx.arc(830, 1170, 70, 0, Math.PI * 2);
    this._ctx.fill();

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

const panel = new Panel(ctx, 320, 512, 560, 300, 8);
const pet = new Pet(ctx, petImage, 641, 562, 200, 200, 330, 522, 870, 802);

const context = new Context(ctx, panel, pet, caseImage);
context.init();
