document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeWelcome");
  const overlay = document.getElementById("welcomeOverlay");

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => overlay.remove(), 500);
    });
  }
});

function checkPassword() {
  const correctPassword = "Zara";
  const input = document.getElementById("passwordInput").value;
  const errorMsg = document.getElementById("errorMsg");

  if (input === correctPassword) {
    window.location.href = "main.html";
  } else {
    errorMsg.textContent = "you may not be the cutest girl in the world im afraid";
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const size = Math.random() * 20 + 10;
  const left = Math.random() * 100;
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 2;
  const opacity = Math.random() * 0.5 + 0.3;

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${left}%`;
  heart.style.top = '120%';
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.opacity = opacity;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

setInterval(() => {
  createHeart();
}, 300);

if (window.location.pathname.includes("main.html")) {
  function createSeaAngel() {
    const angel = document.createElement("img");
    angel.src = "sea-angel.png";
    angel.classList.add("sea-angel");

    const size = Math.random() * 20 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    angel.style.left = `${left}%`;
    angel.style.width = `${size}px`;
    angel.style.animationDuration = `${duration}s`;
    angel.style.animationDelay = `${delay}s`;

    document.body.appendChild(angel);

    setTimeout(() => angel.remove(), (duration + delay) * 1000);
  }

  setInterval(createSeaAngel, 800);
}

function openLetter() {
  const letter = document.getElementById("letter");
  const mainContent = document.getElementById("mainContent");

  letter.style.opacity = 0;
  letter.style.pointerEvents = "none";

  setTimeout(() => {
    letter.style.display = "none";
    mainContent.style.display = "block";

    [...mainContent.children].forEach(el => typeWriterEffect(el, 30));
  }, 600);
}

function typeWriterEffect(element, speed = 50) {
  const text = element.innerHTML;
  element.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function updateCountdown() {
  const now = new Date();
  const currentYear = now.getMonth() > 2 || (now.getMonth() === 2 && now.getDate() > 8)
    ? now.getFullYear() + 1
    : now.getFullYear();

  const birthday = new Date(currentYear, 2, 8);
  const diff = birthday - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s 🎉`;
  const countdownElement = document.getElementById("countdown");

  if (countdownElement) {
    countdownElement.textContent = countdown;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const plushie = document.getElementById('plushieThumb');
if (plushie) {
  let isDragging = false;
  let startY, startScroll;

  plushie.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startScroll = window.scrollY;
    plushie.style.cursor = 'grabbing';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    plushie.style.cursor = 'grab';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const delta = e.clientY - startY;
      window.scrollTo(0, startScroll + delta * 2);
    }
  });

  window.addEventListener('scroll', () => {
    const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const maxPlushieMove = window.innerHeight - plushie.offsetHeight;
    plushie.style.top = `${scrollRatio * maxPlushieMove}px`;
  });
}

const canvas = document.getElementById('scratchCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const coin = document.getElementById('coin');
  const message = document.getElementById('hiddenMessage');

  let isDrawing = false;

  function setupCanvas() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setupCanvas();

  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    checkReveal();
  });
  canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    if (coin) coin.style.display = 'none';
  });
  canvas.addEventListener('mouseenter', () => {
    if (coin) coin.style.display = 'block';
  });
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (coin) {
      coin.style.left = `${e.clientX}px`;
      coin.style.top = `${e.clientY}px`;
    }

    if (isDrawing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2, false);
      ctx.fill();
    }
  });

  function checkReveal() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) transparentPixels++;
    }

    const percent = transparentPixels / (canvas.width * canvas.height) * 100;

    if (percent > 50 && message) {
      message.style.opacity = 1;
    }
  }
}

const music = document.getElementById('bgMusic');
const cover = document.getElementById('albumCover');
const icon = document.getElementById('musicState');
const widget = document.getElementById('musicWidget');

if (music && widget) {
  window.addEventListener("click", () => {
    if (music.paused) {
      music.play();
    }
  }, { once: true });

  widget.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      widget.classList.remove('music-paused');
      if (icon) icon.textContent = '||';
    } else {
      music.pause();
      widget.classList.add('music-paused');
      if (icon) icon.textContent = '▶';
    }
  });
}

const aquarium = document.getElementById('aquarium');
if (aquarium) {
  const fishList = [
    'Sea Nettle Jellyfish.png',
    'Sea Bunny.png',
    'Manta Ray.png',
    'Cannonball Jellyfish.png',
    'Nurse Shark.png',
    'Siamese Fighting Fish.png',
    'Dumbo Octopus.png',
    'Hadal Snailfish.png',
  ];

  function spawnFish() {
    const fish = document.createElement('div');
    fish.className = 'fish';

    const fishImageName = fishList[Math.floor(Math.random() * fishList.length)];

    const img = document.createElement('img');
    img.src = fishImageName;

    const label = document.createElement('div');
    label.className = 'fish-label';
    label.innerText = fishImageName.replace('.png', '');

    fish.appendChild(label);
    fish.appendChild(img);
    aquarium.appendChild(fish);

    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? -120 : aquarium.offsetWidth + 20;
    const y = Math.random() * (aquarium.offsetHeight - 100);

    fish.style.top = `${y}px`;
    fish.style.left = `${startX}px`;

    const speed = 1 + Math.random() * 2;
    const direction = fromLeft ? 1 : -1;

    function move() {
      const x = parseFloat(fish.style.left) + direction * speed;
      fish.style.left = `${x}px`;

      if ((direction === 1 && x > aquarium.offsetWidth + 120) ||
          (direction === -1 && x < -120)) {
        fish.remove();
      } else {
        requestAnimationFrame(move);
      }
    }

    fish.addEventListener('click', () => {
      label.style.display = label.style.display === 'block' ? 'none' : 'block';
    });

    move();
  }

  setInterval(spawnFish, 2000);
}

const startCamBtn = document.getElementById("start-camera");
if (startCamBtn) {
  startCamBtn.addEventListener("click", async () => {
    const video = document.getElementById("video");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      if (video) {
        video.srcObject = stream;
        await video.play();
      }

      startCamBtn.style.display = "none";

    } catch (err) {
      alert("Camera access denied or unavailable.");
      console.error("Camera error:", err);
    }
  });
}

const bouquetContainer = document.getElementById("bouquetContainer");
let flowers = [];

function addFlower(src) {
  if (flowers.length >= 9) {
    return;
  }

  flowers.push({
    src,
    size: Math.random() * 40 + 60,
    rotation: Math.random() * 40 - 20
  });

  renderBouquet();
}

function clearBouquet() {
  flowers = [];
  renderBouquet();
}

function renderBouquet() {
  if (!bouquetContainer) return;
  bouquetContainer.innerHTML = '<img src="bouquetPaper.png" class="bouquet-paper" alt="Bouquet Paper">';

  const startX = 100;
  const spacing = 25;
  const y = 150;

  flowers.forEach((flower, index) => {
    const img = document.createElement('img');
    img.src = flower.src;
    img.classList.add('flower');

    img.style.width = `${flower.size}px`;
    img.style.height = `${flower.size}px`;
    img.style.left = `${startX + index * spacing}px`;
    img.style.top = `${y}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${flower.rotation}deg)`;

    bouquetContainer.appendChild(img);
  });

  const paper = bouquetContainer.querySelector('.bouquet-paper');
  if (paper) bouquetContainer.appendChild(paper);
}

// ==========================================
// NEW ADDITIONS: Drawing Canvas & Wishlist
// ==========================================

const tCanvas = document.getElementById('togetherCanvas');
let currentStrokeSize = 4;

if (tCanvas) {
  const tCtx = tCanvas.getContext('2d');
  let drawing = false;

  tCtx.lineCap = 'round';
  tCtx.lineJoin = 'round';

  function getCanvasCoords(e) {
    const rect = tCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDrawing(e) {
    drawing = true;
    const { x, y } = getCanvasCoords(e);
    tCtx.beginPath();
    tCtx.moveTo(x, y);
  }

  function draw(e) {
    if (!drawing) return;
    if (e.touches) e.preventDefault();
    const { x, y } = getCanvasCoords(e);
    const color = document.getElementById('brushColor').value;

    tCtx.strokeStyle = color;
    tCtx.lineWidth = currentStrokeSize;
    tCtx.lineTo(x, y);
    tCtx.stroke();
  }

  function stopDrawing() {
    drawing = false;
    tCtx.beginPath();
  }

  tCanvas.addEventListener('mousedown', startDrawing);
  tCanvas.addEventListener('mousemove', draw);
  tCanvas.addEventListener('mouseup', stopDrawing);
  tCanvas.addEventListener('mouseleave', stopDrawing);

  tCanvas.addEventListener('touchstart', startDrawing, { passive: false });
  tCanvas.addEventListener('touchmove', draw, { passive: false });
  tCanvas.addEventListener('touchend', stopDrawing);
}

function setBrushSize(size) {
  currentStrokeSize = size;
}

function clearTogetherCanvas() {
  const tCanvas = document.getElementById('togetherCanvas');
  if (tCanvas) {
    const tCtx = tCanvas.getContext('2d');
    tCtx.clearRect(0, 0, tCanvas.width, tCanvas.height);
  }
}

function downloadCanvas() {
  const tCanvas = document.getElementById('togetherCanvas');
  if (tCanvas) {
    const link = document.createElement('a');
    link.download = 'our-doodle.png';
    link.href = tCanvas.toDataURL();
    link.click();
  }
}

function addWishItem() {
  const input = document.getElementById('newWishInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const ul = document.getElementById('wishlistItems');
  if (ul) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox"> ${text}`;
    ul.appendChild(li);
  }

  input.value = '';
}
