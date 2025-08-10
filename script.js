document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeWelcome");
  const overlay = document.getElementById("welcomeOverlay");

  closeBtn.addEventListener("click", () => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    setTimeout(() => overlay.remove(), 500); // remove after fade out
  });
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
    angel.src = "sea-angel.png"; // Ensure this image exists in your folder
    angel.classList.add("sea-angel");

    const size = Math.random() * 20 + 20; // Size: 20px to 40px
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10; // Duration: 10s to 20s
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

    // 📝 Apply typewriter effect
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

  const birthday = new Date(currentYear, 2, 8); // March is month 2 (0-indexed)
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

// Start immediately and then update every second
updateCountdown();
setInterval(updateCountdown, 1000);

const plushie = document.getElementById('plushieThumb');
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
    window.scrollTo(0, startScroll + delta * 2); // Adjust scroll speed
  }
});

// Sync plushie with page scroll
window.addEventListener('scroll', () => {
  const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const maxPlushieMove = window.innerHeight - plushie.offsetHeight;
  plushie.style.top = `${scrollRatio * maxPlushieMove}px`;
});

const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const coin = document.getElementById('coin');
const message = document.getElementById('hiddenMessage');

let isDrawing = false;

// Fill canvas with gray overlay
function setupCanvas() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setupCanvas();

// Events
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  checkReveal();
});
canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
  coin.style.display = 'none';
});
canvas.addEventListener('mouseenter', () => {
  coin.style.display = 'block';
});
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Move coin to follow cursor inside canvas
  coin.style.left = `${e.clientX}px`;
  coin.style.top = `${e.clientY}px`;

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

  if (percent > 50) {
    message.style.opacity = 1;
  }
}

const music = document.getElementById('bgMusic');
const cover = document.getElementById('albumCover');
const icon = document.getElementById('musicState');
const widget = document.getElementById('musicWidget');

// Allow autoplay if user interacts
window.addEventListener("click", () => {
  if (music.paused) {
    music.play();
  }
}, { once: true });

// Toggle music on widget click
widget.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    widget.classList.remove('music-paused');
    icon.textContent = '||';
  } else {
    music.pause();
    widget.classList.add('music-paused');
    icon.textContent = '▶';
  }
});

const aquarium = document.getElementById('aquarium');

  // Example fish data
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

    // Random image
    const fishImageName = fishList[Math.floor(Math.random() * fishList.length)];

    const img = document.createElement('img');
    img.src = fishImageName;

    // Label
    const label = document.createElement('div');
    label.className = 'fish-label';
    label.innerText = fishImageName.replace('.png', '');

    // Append
    fish.appendChild(label);
    fish.appendChild(img);
    aquarium.appendChild(fish);

    // Start position
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

      if (direction === 1 && x > aquarium.offsetWidth + 120 ||
          direction === -1 && x < -120) {
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

  // Spawn every 2 seconds
  setInterval(spawnFish, 500);

  document.getElementById("start-camera").addEventListener("click", async () => {
    const video = document.getElementById("camera");
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        alert("Camera access denied or unavailable.");
        console.error(err);
    }
});

    const bouquetContainer = document.getElementById("bouquetContainer");
    let flowers = [];

    function addFlower(src) {
        if (flowers.length >= 9) {
            return;
        }

        // Add random properties for size & rotation
        flowers.push({
            src,
            size: Math.random() * 40 + 60, // between 60px and 100px
            rotation: Math.random() * 40 - 20 // between -20° and +20°
        });

        renderBouquet();
    }

    function clearBouquet() {
        flowers = [];
        renderBouquet();
    }

    function renderBouquet() {
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

        // Keep bouquet paper on top
        const paper = bouquetContainer.querySelector('.bouquet-paper');
        bouquetContainer.appendChild(paper);
    }