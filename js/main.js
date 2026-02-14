const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionScreen = document.getElementById("question-screen");
const successScreen = document.getElementById("success-screen");

// === AUDIO ===
const winAudio = new Audio("audio/audio.mp3");
winAudio.volume = 0.85;

// Clamp
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Viewport real
function getViewport() {
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
  return { vw, vh };
}

// Área segura visible
function getSafeArea() {
  const { vw, vh } = getViewport();
  const padding = 24;
  const topLimit = vh * 0.2;
  const bottomLimit = vh * 0.85;

  return {
    minX: padding,
    maxX: vw - padding,
    minY: topLimit,
    maxY: bottomLimit,
  };
}

function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const area = getSafeArea();

  let x = Math.random() * (area.maxX - area.minX - rect.width) + area.minX;
  let y = Math.random() * (area.maxY - area.minY - rect.height) + area.minY;

  x = clamp(x, area.minX, area.maxX - rect.width);
  y = clamp(y, area.minY, area.maxY - rect.height);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.transform = "none";
  noBtn.style.zIndex = "9999";
}

// Se mueve al intentar tocarlo
["click", "touchstart", "mouseenter"].forEach((evt) => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    moveNoButton();
  });
});

// Click en "Sí"
yesBtn.addEventListener("click", () => {
  questionScreen.classList.add("hidden");
  questionScreen.classList.remove("active");

  successScreen.classList.remove("hidden");
  successScreen.classList.add("active");

  // Música épica 😂
  winAudio.currentTime = 0;
  winAudio.play().catch(() => {});

  // Explosión visual
  heartExplosion();
  sparkleBurst();
});

// Watchdog
setInterval(() => {
  const rect = noBtn.getBoundingClientRect();
  const { vw, vh } = getViewport();

  const out =
    rect.left < 0 || rect.top < 0 || rect.right > vw || rect.bottom > vh;

  if (out) {
    noBtn.style.position = "fixed";
    noBtn.style.left = "50%";
    noBtn.style.top = "70%";
    noBtn.style.transform = "translate(-50%, -50%)";
    noBtn.style.right = "auto";
    noBtn.style.bottom = "auto";
  }
}, 700);

// === Corazones flotando ===
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💗" : "💖";

  const size = Math.random() * 12 + 14;
  heart.style.fontSize = size + "px";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 4 + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 450);

// === Explosión de corazones ===
function heartExplosion() {
  const { vw, vh } = getViewport();

  for (let i = 0; i < 28; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    const size = Math.random() * 14 + 18;
    heart.style.fontSize = size + "px";
    heart.style.left = vw / 2 + "px";
    heart.style.top = vh / 2 + "px";
    heart.style.animationDuration = Math.random() * 1.5 + 2.5 + "s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

// === Sparkles de fondo ===
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.textContent = "✨";

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.animationDuration = Math.random() * 2 + 2 + "s";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 3000);
}

setInterval(createSparkle, 600);

// === Explosión de sparkles al ganar ===
function sparkleBurst() {
  const { vw, vh } = getViewport();

  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = "✨";
    s.style.left = vw / 2 + "px";
    s.style.top = vh / 2 + "px";
    s.style.animationDuration = Math.random() * 1.5 + 2 + "s";

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}
