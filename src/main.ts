import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas width="600" height="700" id="canvas"></canvas>
  <img src="/case.svg" id="case">
  <img src="/pet.svg" id="pet">

  <img src="/icons/clean.svg" id="clean" class="icon">
  <img src="/icons/play.svg" id="play" class="icon">
  <img src="/icons/feed.svg" id="feed" class="icon">
  <img src="/icons/bathe.svg" id="bathe" class="icon">
  <img src="/icons/cure.svg" id="cure" class="icon">
  <img src="/icons/chat.svg" id="chat" class="icon">
  <img src="/icons/sleep.svg" id="sleep" class="icon">
  <img src="/icons/hint.svg" id="hint" class="icon">

  <img src="/statuses/clean.svg" id="status-clean" class="icon">
  <img src="/statuses/play.svg" id="status-play" class="icon">
  <img src="/statuses/feed.svg" id="status-feed" class="icon">
  <img src="/statuses/bathe.svg" id="status-bathe" class="icon">
  <img src="/statuses/cure.svg" id="status-cure" class="icon">
  <img src="/statuses/chat.svg" id="status-chat" class="icon">
  <img src="/statuses/sleep.svg" id="status-sleep" class="icon">

  <img src="/icons/dead.svg" id="dead" class="icon">
`;
