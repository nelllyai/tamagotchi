import { Panel } from "./panel";
import { RoundButton } from "./buttons";
import { Pet } from "./pet";
import { getRandom } from "./getRandom";

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
      new RoundButton(185, 585, "#FFE500", "#FF7A00", 35),
      new RoundButton(300, 633, "#FFE500", "#FF7A00", 35),
      new RoundButton(415, 585, "#FFE500", "#FF7A00", 35),
    ];

    this._buttons[0].toggleFocus();

    this._bg = bg;

    this._timePoint = Date.now();
  }

  public init(): void {
    this.update();
  }

  private update = (): void => {
    this.staticDraw();

    const timeNow = Date.now();

    if (timeNow - this._timePoint >= 1000) {
      const randomX = getRandom(-100, 100);
      const randomY = getRandom(-50, 50);

      this._pet.move(randomX, randomY);
      this._pet.live();
      this._pet.checkForDead();

      if (!this._pet.isAlive) {
        this.staticDraw();
      }

      this._timePoint = timeNow;
    }

    document.addEventListener("keydown", this.keyDown);
    this._pet.checkForBalloon();
    this._pet.drawBalloon();

    const requestId = requestAnimationFrame(this.update);
    if (!this._pet.isAlive) {
      cancelAnimationFrame(requestId);
    }
  };

  private keyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const currentFocusedIndex = this._buttons.findIndex((btn) => btn.isFocused);

    switch (e.code) {
      case "ArrowLeft":
        this._buttons[currentFocusedIndex].toggleFocus();
        this._buttons[0].toggleFocus();
        this._panel.focusOnLeft();
        break;
      case "ArrowRight":
        this._buttons[currentFocusedIndex].toggleFocus();
        this._buttons[2].toggleFocus();
        this._panel.focusOnRight();
        break;
      case "Space":
        this._buttons[currentFocusedIndex].toggleFocus();
        this._buttons[1].toggleFocus();
        const action = this._panel.currentFocusedButton;

        if (action !== "hint") {
          this._pet.interact(action);
        } else {
          this.showAlert();
        }

        break;
    }
  };

  private staticDraw() {
    this._ctx.clearRect(0, 0, this._w, this._h);

    this._ctx.drawImage(this._bg, 0, 0, this._w, this._h);
    this._buttons.forEach((btn) => btn.draw(this._ctx));

    this._panel.draw();
    this._pet.draw();
  }

  public showAlert() {
    alert(
      "Следите за статусом питомца и ухаживайте за ним!\nДля этого переключайтесь между кнопками на стрелочки, а нажимайте их пробелом.\nЧто нужно ёжику, он сам покажет."
    );
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const caseImage = document.getElementById("case") as HTMLImageElement;
const petImage = document.getElementById("pet") as HTMLImageElement;

const panel = new Panel(ctx, 160, 256, 280, 150, 8);
const pet = new Pet(ctx, petImage, 321, 326, 100, 100, 165, 261, 435, 401);

const context = new Context(ctx, panel, pet, caseImage);
context.showAlert();
context.init();
