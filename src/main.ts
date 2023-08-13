import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas width="1200" height="1400" id="canvas"></canvas>
  <img src="./src/assets/case.svg" id="case">
  <img src="./src/assets/pet.svg" id="pet">

  <img src="./src/assets/icons/clean.svg" id="clean" class="icon">
  <img src="./src/assets/icons/play.svg" id="play" class="icon">
  <img src="./src/assets/icons/feed.svg" id="feed" class="icon">
  <img src="./src/assets/icons/bathe.svg" id="bathe" class="icon">
  <img src="./src/assets/icons/cure.svg" id="cure" class="icon">
`;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
