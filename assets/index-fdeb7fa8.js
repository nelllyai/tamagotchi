var v = Object.defineProperty;
var I = (c, s, t) =>
  s in c
    ? v(c, s, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (c[s] = t);
var e = (c, s, t) => (I(c, typeof s != "symbol" ? s + "" : s, t), t);
(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const h of n.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function o(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = t(i);
    fetch(i.href, n);
  }
})();
document.querySelector("#app").innerHTML = `
  <canvas width="600" height="700" id="canvas"></canvas>
  <img src="images/case.svg" id="case">
  <img src="images/pet.svg" id="pet">

  <img src="icons/clean.svg" id="clean" class="icon">
  <img src="icons/play.svg" id="play" class="icon">
  <img src="icons/feed.svg" id="feed" class="icon">
  <img src="icons/bathe.svg" id="bathe" class="icon">
  <img src="icons/cure.svg" id="cure" class="icon">
  <img src="icons/chat.svg" id="chat" class="icon">
  <img src="icons/sleep.svg" id="sleep" class="icon">
  <img src="icons/hint.svg" id="hint" class="icon">

  <img src="statuses/clean.svg" id="status-clean" class="icon">
  <img src="statuses/play.svg" id="status-play" class="icon">
  <img src="statuses/feed.svg" id="status-feed" class="icon">
  <img src="statuses/bathe.svg" id="status-bathe" class="icon">
  <img src="statuses/cure.svg" id="status-cure" class="icon">
  <img src="statuses/chat.svg" id="status-chat" class="icon">
  <img src="statuses/sleep.svg" id="status-sleep" class="icon">

  <img src="icons/dead.svg" id="dead" class="icon">
`;
class w {
  constructor(s, t, o, i) {
    e(this, "_x");
    e(this, "_y");
    e(this, "_isFocused");
    e(this, "_mainColor");
    e(this, "_focusColor");
    (this._x = s),
      (this._y = t),
      (this._isFocused = !1),
      (this._mainColor = o),
      (this._focusColor = i);
  }
  toggleFocus() {
    this._isFocused = !this._isFocused;
  }
  get isFocused() {
    return this._isFocused;
  }
}
class a extends w {
  constructor(t, o, i, n, h, r) {
    super(t, o, i, n);
    e(this, "_icon");
    e(this, "_w");
    e(this, "_h");
    e(this, "_radii");
    e(this, "_action");
    (this._w = 50),
      (this._h = 50),
      (this._radii = 8),
      (this._icon = h),
      (this._action = r);
  }
  draw(t) {
    t.beginPath(),
      (t.fillStyle = this._mainColor),
      t.roundRect(this._x, this._y, this._w, this._h, this._radii),
      t.fill(),
      t.drawImage(this._icon, this._x, this._y, 50, 50),
      this._isFocused &&
        (t.beginPath(),
        (t.strokeStyle = this._focusColor),
        t.roundRect(this._x, this._y, this._w, this._h, this._radii),
        (t.lineWidth = 3),
        t.stroke());
  }
  get action() {
    return this._action;
  }
}
class g extends w {
  constructor(t, o, i, n, h) {
    super(t, o, i, n);
    e(this, "_radius");
    this._radius = h;
  }
  draw(t) {
    t.beginPath(),
      (t.fillStyle = this._mainColor),
      t.arc(this._x, this._y, this._radius, 0, Math.PI * 2),
      t.fill(),
      this._isFocused &&
        (t.beginPath(),
        (t.strokeStyle = this._focusColor),
        t.arc(this._x, this._y, this._radius + 6, 0, Math.PI * 2),
        (t.lineWidth = 4),
        t.stroke());
  }
}
class D {
  constructor(s, t, o, i, n, h) {
    e(this, "_ctx");
    e(this, "_x");
    e(this, "_y");
    e(this, "_w");
    e(this, "_h");
    e(this, "_radii");
    e(this, "_buttons");
    (this._ctx = s),
      (this._x = t),
      (this._y = o),
      (this._w = i),
      (this._h = n),
      (this._radii = h);
    const r = document.getElementById("play"),
      l = document.getElementById("feed"),
      d = document.getElementById("bathe"),
      u = document.getElementById("clean"),
      p = document.getElementById("sleep"),
      F = document.getElementById("chat"),
      x = document.getElementById("cure"),
      b = document.getElementById("hint");
    (this._buttons = [
      new a(160, 191, "#D9D9D9", "#333", r, "play"),
      new a(237, 191, "#D9D9D9", "#333", l, "feed"),
      new a(313, 191, "#D9D9D9", "#333", d, "bathe"),
      new a(390, 191, "#D9D9D9", "#333", u, "clean"),
      new a(160, 421, "#D9D9D9", "#333", p, "sleep"),
      new a(237, 421, "#D9D9D9", "#333", F, "chat"),
      new a(313, 421, "#D9D9D9", "#333", x, "cure"),
      new a(390, 421, "#D9D9D9", "#333", b, "hint"),
    ]),
      this._buttons[0].toggleFocus();
  }
  draw() {
    this._ctx.beginPath(),
      (this._ctx.fillStyle = "#F0F0F0"),
      this._ctx.roundRect(150, 176, 300, 300, 16),
      this._ctx.fill(),
      this._buttons.forEach((s) => s.draw(this._ctx)),
      this._ctx.beginPath(),
      (this._ctx.fillStyle = "#D9D9D9"),
      this._ctx.roundRect(this._x, this._y, this._w, this._h, this._radii),
      this._ctx.fill();
  }
  focusOnLeft() {
    var t;
    const s = this.getCurrentFocusedIndex();
    this._buttons[s].toggleFocus(),
      (t = this._buttons.at(s - 1)) == null || t.toggleFocus();
  }
  focusOnRight() {
    var t;
    const s = this.getCurrentFocusedIndex();
    this._buttons[s].toggleFocus(),
      (t = this._buttons.at((s + 1) % this._buttons.length)) == null ||
        t.toggleFocus();
  }
  get currentFocusedButton() {
    var s;
    return (
      ((s = this._buttons.find((t) => t.isFocused)) == null
        ? void 0
        : s.action) ?? ""
    );
  }
  getCurrentFocusedIndex() {
    return this._buttons.findIndex((s) => s.isFocused);
  }
}
function _(c, s) {
  return Math.floor(Math.random() * (s - c + 1) + c);
}
class B {
  constructor(s, t, o, i, n, h, r, l, d, u) {
    e(this, "_isAlive");
    e(this, "_ctx");
    e(this, "_image");
    e(this, "_x");
    e(this, "_y");
    e(this, "_w");
    e(this, "_h");
    e(this, "_minX");
    e(this, "_minY");
    e(this, "_maxX");
    e(this, "_maxY");
    e(this, "_needs");
    e(this, "_toShowBalloon");
    (this._isAlive = !0),
      (this._ctx = s),
      (this._image = t),
      (this._minX = r),
      (this._minY = l),
      (this._maxX = d),
      (this._maxY = u),
      (this._x = o),
      (this._y = i),
      (this._w = n),
      (this._h = h),
      (this._needs = {
        feed: 50,
        bathe: 50,
        clean: 50,
        chat: 50,
        play: 50,
        cure: 50,
        sleep: 50,
      }),
      (this._toShowBalloon = !1),
      this.checkPosition();
  }
  get isAlive() {
    return this._isAlive;
  }
  live() {
    if (!_(0, 3)) {
      const t = Object.keys(this._needs)[_(0, 6)];
      this._needs[t] -= _(10, 20);
    }
  }
  checkForBalloon() {
    this._toShowBalloon = !1;
    for (let s in this._needs)
      this._needs[s] < 20 && (this._toShowBalloon = !0);
  }
  checkForDead() {
    for (let s in this._needs)
      this._needs[s] <= 0 && ((this._isAlive = !1), (this._toShowBalloon = !0));
  }
  draw() {
    this._isAlive
      ? this._ctx.drawImage(this._image, this._x, this._y, this._w, this._h)
      : (this._ctx.save(),
        this._ctx.scale(1, -1),
        this._ctx.drawImage(
          this._image,
          this._x,
          this._h * -1 - this._y,
          this._w,
          this._h
        ),
        this._ctx.restore());
  }
  drawBalloon() {
    if (this._toShowBalloon || !this._isAlive)
      if (
        (this._ctx.beginPath(),
        (this._ctx.fillStyle = "#FFFFFF"),
        this._ctx.roundRect(237, 35, 125, 125, 40),
        this._ctx.fill(),
        this._ctx.beginPath(),
        this._ctx.moveTo(290, 160),
        this._ctx.bezierCurveTo(290, 176, 310, 176, 310, 160),
        this._ctx.fill(),
        this._isAlive)
      ) {
        let s = "",
          t = 100;
        for (let i in this._needs)
          this._needs[i] < t && ((t = this._needs[i]), (s = i));
        const o = document.getElementById("status-" + s);
        this._ctx.drawImage(o, 275, 72, 50, 50);
      } else {
        const s = document.getElementById("dead");
        this._ctx.drawImage(s, 275, 72, 50, 50);
      }
  }
  move(s, t) {
    (this._x += s), (this._y += t), this.checkPosition();
  }
  interact(s) {
    const t = _(10, 30);
    (this._needs[s] += t), this._needs[s] > 100 && (this._needs[s] = 100);
  }
  checkPosition() {
    this._x + this._w > this._maxX && (this._x = this._maxX - this._w),
      this._x < this._minX && (this._x = this._minX),
      this._y + this._h > this._maxY && (this._y = this._maxY - this._h),
      this._y < this._minY && (this._y = this._minY);
  }
}
class P {
  constructor(s, t, o, i) {
    e(this, "_ctx");
    e(this, "_w");
    e(this, "_h");
    e(this, "_panel");
    e(this, "_pet");
    e(this, "_buttons");
    e(this, "_bg");
    e(this, "_timePoint");
    e(this, "update", () => {
      this.staticDraw();
      const s = Date.now();
      if (s - this._timePoint >= 1e3) {
        const o = _(-100, 100),
          i = _(-50, 50);
        this._pet.move(o, i),
          this._pet.live(),
          this._pet.checkForDead(),
          this._pet.isAlive || this.staticDraw(),
          (this._timePoint = s);
      }
      document.addEventListener("keydown", this.keyDown),
        this._pet.checkForBalloon(),
        this._pet.drawBalloon();
      const t = requestAnimationFrame(this.update);
      this._pet.isAlive || cancelAnimationFrame(t);
    });
    e(this, "keyDown", (s) => {
      s.preventDefault();
      const t = this._buttons.findIndex((o) => o.isFocused);
      switch (s.code) {
        case "ArrowLeft":
          this._buttons[t].toggleFocus(),
            this._buttons[0].toggleFocus(),
            this._panel.focusOnLeft();
          break;
        case "ArrowRight":
          this._buttons[t].toggleFocus(),
            this._buttons[2].toggleFocus(),
            this._panel.focusOnRight();
          break;
        case "Space":
          this._buttons[t].toggleFocus(), this._buttons[1].toggleFocus();
          const o = this._panel.currentFocusedButton;
          o !== "hint" ? this._pet.interact(o) : this.showAlert();
          break;
      }
    });
    (this._ctx = s),
      (this._w = m.width),
      (this._h = m.height),
      (this._panel = t),
      (this._pet = o),
      (this._buttons = [
        new g(185, 585, "#FFE500", "#FF7A00", 35),
        new g(300, 633, "#FFE500", "#FF7A00", 35),
        new g(415, 585, "#FFE500", "#FF7A00", 35),
      ]),
      this._buttons[0].toggleFocus(),
      (this._bg = i),
      (this._timePoint = Date.now());
  }
  init() {
    this.update();
  }
  staticDraw() {
    this._ctx.clearRect(0, 0, this._w, this._h),
      this._ctx.drawImage(this._bg, 0, 0, this._w, this._h),
      this._buttons.forEach((s) => s.draw(this._ctx)),
      this._panel.draw(),
      this._pet.draw();
  }
  showAlert() {
    alert(`Следите за статусом питомца и ухаживайте за ним!
Для этого переключайтесь между кнопками на стрелочки, а нажимайте их пробелом.
Что нужно ёжику, он сам покажет.`);
  }
}
const m = document.getElementById("canvas"),
  f = m.getContext("2d"),
  A = document.getElementById("case"),
  E = document.getElementById("pet"),
  C = new D(f, 160, 256, 280, 150, 8),
  S = new B(f, E, 321, 326, 100, 100, 165, 261, 435, 401),
  y = new P(f, C, S, A);
y.showAlert();
y.init();
