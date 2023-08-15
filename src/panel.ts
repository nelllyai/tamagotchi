import { IconButton } from "./buttons";

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

    const playIcon = document.getElementById("play") as HTMLImageElement;
    const feedIcon = document.getElementById("feed") as HTMLImageElement;
    const batheIcon = document.getElementById("bathe") as HTMLImageElement;
    const cleanIcon = document.getElementById("clean") as HTMLImageElement;
    const sleepIcon = document.getElementById("sleep") as HTMLImageElement;
    const chatIcon = document.getElementById("chat") as HTMLImageElement;
    const cureIcon = document.getElementById("cure") as HTMLImageElement;
    const hintIcon = document.getElementById("hint") as HTMLImageElement;

    this._buttons = [
      new IconButton(160, 191, "#D9D9D9", "#333", playIcon, "play"),
      new IconButton(237, 191, "#D9D9D9", "#333", feedIcon, "feed"),
      new IconButton(313, 191, "#D9D9D9", "#333", batheIcon, "bathe"),
      new IconButton(390, 191, "#D9D9D9", "#333", cleanIcon, "clean"),
      new IconButton(160, 421, "#D9D9D9", "#333", sleepIcon, "sleep"),
      new IconButton(237, 421, "#D9D9D9", "#333", chatIcon, "chat"),
      new IconButton(313, 421, "#D9D9D9", "#333", cureIcon, "cure"),
      new IconButton(390, 421, "#D9D9D9", "#333", hintIcon, "hint"),
    ];

    this._buttons[0].toggleFocus();
  }

  public draw() {
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

  public focusOnLeft() {
    const currentFocusedIndex = this.getCurrentFocusedIndex();
    this._buttons[currentFocusedIndex].toggleFocus();
    this._buttons.at(currentFocusedIndex - 1)?.toggleFocus();
  }

  public focusOnRight() {
    const currentFocusedIndex = this.getCurrentFocusedIndex();
    this._buttons[currentFocusedIndex].toggleFocus();
    this._buttons
      .at((currentFocusedIndex + 1) % this._buttons.length)
      ?.toggleFocus();
  }

  get currentFocusedButton() {
    return this._buttons.find((btn) => btn.isFocused)?.action ?? "";
  }

  private getCurrentFocusedIndex() {
    return this._buttons.findIndex((btn) => btn.isFocused);
  }
}
