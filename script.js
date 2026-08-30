document.addEventListener("DOMContentLoaded", () => {
  // The update-announcement popup on index.html (separate from the get-well popup below)
  const closeBtn = document.getElementById("closeWelcome");
  const welcomeOverlay = document.getElementById("welcomeOverlay");

  if (closeBtn && welcomeOverlay) {
    closeBtn.addEventListener("click", () => {
      welcomeOverlay.style.opacity = "0";
      welcomeOverlay.style.pointerEvents = "none";
      setTimeout(() => welcomeOverlay.remove(), 500); // remove after fade out
    });
  }

  // Everything else waits behind the name gate — see initNameGate() below.
  initNameGate();
});

/* ======================================================
   NAME ENTRY GATE
   Shown once per browser. The name is saved to localStorage
   and used to label chat messages, doodle gallery entries,
   sea angel actions, and blind bag unboxings.
   ====================================================== */

let currentUserName = null;

function initNameGate() {
  const saved = localStorage.getItem("siteUserName");
  const overlay = document.getElementById("nameOverlay");

  if (saved) {
    currentUserName = saved;
    if (overlay) overlay.style.display = "none";
    onNameReady();
  } else if (overlay) {
    overlay.style.display = "flex";
    const input = document.getElementById("nameInput");
    if (input) {
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          saveUserName();
        }
      });
    }
  } else {
    // No name overlay on this page — just proceed.
    onNameReady();
  }
}

function saveUserName() {
  const input = document.getElementById("nameInput");
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;

  localStorage.setItem("siteUserName", value);
  currentUserName = value;

  const overlay = document.getElementById("nameOverlay");
  if (overlay) overlay.style.display = "none";

  onNameReady();
}

// Runs once we know who's visiting — kicks off every feature that was
// previously fired unconditionally on DOMContentLoaded.
function onNameReady() {
  showGetWellOverlay();
  initWishlist();
  initDoodleCanvas();
  initDoodleGallery();
  initChat();
  initSeaAngel();
  initBlindBag();
}

function isFirebaseReady() {
  return typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0;
}

/* ======================================================
   GET WELL SOON POPUP
   Shows automatically once a name has been entered. Can also be
   reopened any time via the "get well" nav link.
   ====================================================== */

function showGetWellOverlay() {
  const overlay = document.getElementById("getWellOverlay");
  if (!overlay) return;
  overlay.style.display = "flex";
  // Trigger the fade/scale-in transition (needs a tick so the display change registers first)
  requestAnimationFrame(() => {
    overlay.classList.add("visible");
  });
}

function closeGetWellOverlay() {
  const overlay = document.getElementById("getWellOverlay");
  if (!overlay) return;
  overlay.classList.remove("visible");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400); // matches the CSS transition duration
}

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

if (plushie) {
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
}

const music = document.getElementById('bgMusic');
const cover = document.getElementById('albumCover');
const icon = document.getElementById('musicState');
const widget = document.getElementById('musicWidget');

if (music && widget) {
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
      if (icon) icon.textContent = '||';
    } else {
      music.pause();
      widget.classList.add('music-paused');
      if (icon) icon.textContent = '▶';
    }
  });
}

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
  if (aquarium) {
    setInterval(spawnFish, 500);
  }
const startCameraBtn = document.getElementById("start-camera");
if (startCameraBtn) {
  startCameraBtn.addEventListener("click", async () => {
    // This was previously grabbing the wrapper <div id="camera">, not the actual
    // <video id="video"> element inside it — divs don't have .play()/.srcObject,
    // so the camera silently failed. Fixed to grab the video element directly.
    const video = document.getElementById("video");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access isn't available. This usually means the page isn't loaded over HTTPS, or your browser doesn't support camera access. Make sure you're viewing the site via https:// (not http://).");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      // Assign stream to video
      video.srcObject = stream;
      await video.play();

      // Hide the start button after enabling
      startCameraBtn.style.display = "none";

    } catch (err) {
      console.error("Camera error:", err);
      if (err.name === "NotAllowedError") {
        alert("Camera access was denied. Check your browser's site settings and allow camera access for this page, then try again.");
      } else if (err.name === "NotFoundError") {
        alert("No camera was found on this device.");
      } else {
        alert("Camera access denied or unavailable.");
      }
    }
  });
}

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

/* ======================================================
   RECOVERY WISHLIST
   ====================================================== */

// Default starter ideas — feel free to edit this list
let wishlistItems = [
  { text: "watch movie together", checked: false },
  { text: "adopt me 100% ofc", checked: false },
  { text: "buy foods during yic", checked: false },
  { text: "do more drawingss", checked: false },
  { text: "paint my bass pick hehe", checked: false }
];

function initWishlist() {
  const list = document.getElementById("wishlistItems");
  const input = document.getElementById("wishlistInput");
  if (!list) return; // section not on this page

  renderWishlist();

  // Allow pressing Enter in the input box to add an item
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addWishlistItem();
      }
    });
  }
}

function renderWishlist() {
  const list = document.getElementById("wishlistItems");
  if (!list) return;

  list.innerHTML = "";

  wishlistItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "wishlist-item" + (item.checked ? " checked" : "");

    const checkboxId = `wishlist-check-${index}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = item.checked;
    checkbox.addEventListener("change", () => toggleWishlistItem(index));

    const label = document.createElement("label");
    label.setAttribute("for", checkboxId);
    label.textContent = item.text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "wishlist-remove-btn";
    removeBtn.textContent = "✕";
    removeBtn.title = "remove item";
    removeBtn.addEventListener("click", () => removeWishlistItem(index));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function addWishlistItem() {
  const input = document.getElementById("wishlistInput");
  if (!input) return;

  const value = input.value.trim();
  if (value === "") return;

  wishlistItems.push({ text: value, checked: false });
  input.value = "";
  renderWishlist();
  input.focus();
}

function toggleWishlistItem(index) {
  if (!wishlistItems[index]) return;
  wishlistItems[index].checked = !wishlistItems[index].checked;
  renderWishlist();
}

function removeWishlistItem(index) {
  wishlistItems.splice(index, 1);
  renderWishlist();
}

/* ======================================================
   LIVE + PERSISTENT DOODLE CANVAS (synced via Firebase)
   ====================================================== */

let doodleCtx = null;
let doodleCanvasEl = null;
let doodleDrawing = false;
let doodleLastX = 0; // normalized 0-1, so it lines up across different screen sizes
let doodleLastY = 0;
let doodleBrushSize = 4;   // matches the slider's default value in main.html
let doodleTool = "pen";    // 'pen' or 'eraser'

// Firebase refs — only get set up if firebaseConfig has been filled in (see main.html)
let doodleFirebaseReady = false;
let doodleStrokesRef = null;
let doodleClearedRef = null;

function tryInitDoodleFirebase() {
  try {
    if (isFirebaseReady()) {
      doodleStrokesRef = firebase.database().ref("doodle/strokes");
      doodleClearedRef = firebase.database().ref("doodle/clearedAt");
      doodleFirebaseReady = true;
    } else {
      console.warn("Firebase isn't configured yet — doodle canvas will only work locally (not live/saved). See main.html for setup.");
    }
  } catch (err) {
    console.warn("Firebase init failed — doodle canvas will only work locally:", err);
    doodleFirebaseReady = false;
  }
}

function setDoodleTool(tool) {
  doodleTool = tool;
  const penBtn = document.getElementById("doodlePenBtn");
  const eraserBtn = document.getElementById("doodleEraserBtn");
  if (penBtn) penBtn.classList.toggle("active-tool", tool === "pen");
  if (eraserBtn) eraserBtn.classList.toggle("active-tool", tool === "eraser");
}

function initDoodleCanvas() {
  doodleCanvasEl = document.getElementById("doodleCanvas");
  if (!doodleCanvasEl) return; // section not on this page

  doodleCtx = doodleCanvasEl.getContext("2d");
  doodleCtx.lineCap = "round";
  doodleCtx.lineJoin = "round";

  tryInitDoodleFirebase();

  // Match the canvas's internal resolution to how large it's actually shown,
  // so drawing lines up correctly with the cursor/finger on all screen sizes.
  function resizeDoodleCanvas() {
    const rect = doodleCanvasEl.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    doodleCanvasEl.width = rect.width * ratio;
    doodleCanvasEl.height = rect.height * ratio;
    doodleCtx.setTransform(1, 0, 0, 1, 0, 0);
    doodleCtx.scale(ratio, ratio);
    doodleCtx.lineCap = "round";
    doodleCtx.lineJoin = "round";

    // Coordinates are stored normalized (0-1), so just replay everything at the new size
    redrawAllDoodleStrokes();
  }

  resizeDoodleCanvas();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeDoodleCanvas, 150);
  });

  // Returns a position as a 0-1 fraction of the canvas's displayed size,
  // so strokes line up correctly no matter what size screen they're drawn/viewed on.
  function getPointerPos(evt) {
    const rect = doodleCanvasEl.getBoundingClientRect();
    let clientX, clientY;
    if (evt.touches && evt.touches.length > 0) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    return {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height
    };
  }

  function startDrawing(evt) {
    evt.preventDefault();
    doodleDrawing = true;
    const pos = getPointerPos(evt);
    doodleLastX = pos.x;
    doodleLastY = pos.y;
  }

  function drawMove(evt) {
    if (!doodleDrawing) return;
    evt.preventDefault(); // stop the page from scrolling while drawing on touch devices

    const pos = getPointerPos(evt);
    const colorInput = document.getElementById("doodleColor");
    const color = colorInput ? colorInput.value : "#ff69b4";

    const segment = {
      x1: doodleLastX, y1: doodleLastY,
      x2: pos.x, y2: pos.y,
      color: color,
      size: doodleBrushSize,
      tool: doodleTool
    };

    drawDoodleSegment(segment); // instant local feedback, no waiting on the network

    if (doodleFirebaseReady) {
      doodleStrokesRef.push(segment); // syncs to everyone else viewing the page right now
    }

    doodleLastX = pos.x;
    doodleLastY = pos.y;
  }

  function stopDrawing() {
    doodleDrawing = false;
  }

  // Mouse support
  doodleCanvasEl.addEventListener("mousedown", startDrawing);
  doodleCanvasEl.addEventListener("mousemove", drawMove);
  doodleCanvasEl.addEventListener("mouseup", stopDrawing);
  doodleCanvasEl.addEventListener("mouseleave", stopDrawing);

  // Touch support (mobile / tablets) — passive:false lets us preventDefault to block scrolling
  doodleCanvasEl.addEventListener("touchstart", startDrawing, { passive: false });
  doodleCanvasEl.addEventListener("touchmove", drawMove, { passive: false });
  doodleCanvasEl.addEventListener("touchend", stopDrawing, { passive: false });
  doodleCanvasEl.addEventListener("touchcancel", stopDrawing, { passive: false });

  if (doodleFirebaseReady) {
    // Fires once for every stroke already saved (this is what makes the drawing persist
    // across visits/devices), then again in real time for every new stroke anyone adds.
    doodleStrokesRef.on("child_added", (snapshot) => {
      drawDoodleSegment(snapshot.val());
    });

    // Whenever anyone hits "clear", this value changes and every open tab wipes its canvas.
    // We skip the very first firing since that's just the current state on page load, not a
    // fresh clear action — the canvas is already blank at that point.
    let skipFirstClearEvent = true;
    doodleClearedRef.on("value", () => {
      if (skipFirstClearEvent) {
        skipFirstClearEvent = false;
        return;
      }
      hardClearDoodleCanvas();
    });
  }
}

// Draws one line segment given normalized (0-1) coordinates, scaled to the canvas's current display size
function drawDoodleSegment(segment) {
  if (!doodleCtx || !doodleCanvasEl) return;
  const rect = doodleCanvasEl.getBoundingClientRect();

  // Older saved strokes won't have a "tool" field — treat those as pen strokes
  doodleCtx.globalCompositeOperation = segment.tool === "eraser" ? "destination-out" : "source-over";
  doodleCtx.strokeStyle = segment.color;
  doodleCtx.lineWidth = segment.size;
  doodleCtx.beginPath();
  doodleCtx.moveTo(segment.x1 * rect.width, segment.y1 * rect.height);
  doodleCtx.lineTo(segment.x2 * rect.width, segment.y2 * rect.height);
  doodleCtx.stroke();
  doodleCtx.globalCompositeOperation = "source-over"; // reset so nothing else is affected
}

// Wipes the local canvas bitmap only (doesn't touch the database)
function hardClearDoodleCanvas() {
  if (!doodleCtx || !doodleCanvasEl) return;
  const rect = doodleCanvasEl.getBoundingClientRect();
  doodleCtx.clearRect(0, 0, rect.width, rect.height);
  doodleCtx.fillStyle = "#ffffff";
  doodleCtx.fillRect(0, 0, rect.width, rect.height);
}

// Re-fetches every saved stroke and redraws them (used after a resize, since coordinates
// are normalized and need to be re-scaled to the new canvas size)
function redrawAllDoodleStrokes() {
  hardClearDoodleCanvas();
  if (!doodleFirebaseReady) return;

  doodleStrokesRef.once("value").then((snapshot) => {
    snapshot.forEach((child) => {
      drawDoodleSegment(child.val());
      return false; // keep iterating
    });
  }).catch((err) => console.warn("Couldn't reload saved doodle strokes:", err));
}

function updateBrushSize(value) {
  doodleBrushSize = parseInt(value, 10) || 4;
  const label = document.getElementById("brushSizeValue");
  if (label) label.textContent = `${doodleBrushSize}px`;
}

function clearDoodle() {
  if (!doodleCanvasEl || !doodleCtx) return;

  if (doodleFirebaseReady) {
    if (!confirm("Clear the doodle for both of you? This can't be undone.")) return;
    // Removing the strokes + updating clearedAt tells every open tab (including this one) to wipe its canvas
    doodleStrokesRef.remove();
    doodleClearedRef.set(Date.now());
  } else {
    hardClearDoodleCanvas();
  }
}

function saveDoodle() {
  if (!doodleCanvasEl) return;

  const link = document.createElement("a");
  link.download = "our-doodle.png";
  link.href = doodleCanvasEl.toDataURL("image/png");
  link.click();
}

/* ======================================================
   DOODLE GALLERY
   Snapshots of the canvas saved into the website itself
   (as opposed to "download" above, which saves to your device).
   ====================================================== */

function addDoodleToGallery() {
  if (!doodleCanvasEl) return;

  if (!isFirebaseReady()) {
    alert("Gallery saving needs Firebase set up — see the comment near the bottom of main.html.");
    return;
  }

  const dataURL = doodleCanvasEl.toDataURL("image/png");
  firebase.database().ref("doodleGallery").push({
    image: dataURL,
    name: currentUserName || "someone",
    time: Date.now()
  });
}

function initDoodleGallery() {
  const list = document.getElementById("doodleGalleryList");
  if (!list) return; // section not on this page
  if (!isFirebaseReady()) return;

  firebase.database().ref("doodleGallery").limitToLast(40).on("child_added", (snapshot) => {
    const entry = snapshot.val();
    if (!entry || !entry.image) return;

    const card = document.createElement("div");
    card.className = "gallery-doodle-card";

    const img = document.createElement("img");
    img.src = entry.image;
    img.alt = `doodle by ${entry.name || "someone"}`;

    const caption = document.createElement("p");
    caption.textContent = `by ${entry.name || "someone"}`;

    card.appendChild(img);
    card.appendChild(caption);
    list.prepend(card);
  });
}

/* ======================================================
   LIVE CHAT
   ====================================================== */

let chatMessagesRef = null;

function initChat() {
  const list = document.getElementById("chatMessages");
  if (!list) return; // widget not on this page
  if (!isFirebaseReady()) {
    const row = document.createElement("div");
    row.className = "chat-message";
    row.textContent = "chat needs Firebase set up to work — see main.html.";
    list.appendChild(row);
    return;
  }

  chatMessagesRef = firebase.database().ref("chat/messages");

  chatMessagesRef.limitToLast(50).on("child_added", (snapshot) => {
    appendChatMessage(snapshot.val());
  });

  const input = document.getElementById("chatInput");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }
}

function appendChatMessage(msg) {
  const list = document.getElementById("chatMessages");
  if (!list || !msg) return;

  const row = document.createElement("div");
  row.className = "chat-message" + (msg.name === currentUserName ? " chat-message-own" : "");

  const nameEl = document.createElement("span");
  nameEl.className = "chat-message-name";
  nameEl.textContent = msg.name || "someone";

  const textEl = document.createElement("span");
  textEl.textContent = msg.text || "";

  row.appendChild(nameEl);
  row.appendChild(textEl);
  list.appendChild(row);
  list.scrollTop = list.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  if (!input || !chatMessagesRef) return;

  const text = input.value.trim();
  if (!text) return;

  chatMessagesRef.push({
    name: currentUserName || "someone",
    text: text,
    time: Date.now()
  });

  input.value = "";
  input.focus();
}

function toggleChat() {
  const body = document.getElementById("chatBody");
  const icon = document.getElementById("chatToggleIcon");
  if (!body) return;

  const collapsed = body.classList.toggle("chat-collapsed");
  if (icon) icon.textContent = collapsed ? "▼" : "▲";
}

/* ======================================================
   SEA ANGEL TAMAGOTCHI
   Shared pet state — both of you pet/feed the same sea angel.
   Stats can never reach zero, so it can never "die".
   ====================================================== */

let seaAngelStatsRef = null;
let seaAngelLogRef = null;

function initSeaAngel() {
  const statsEl = document.getElementById("seaAngelStats");
  if (!statsEl) return; // section not on this page
  if (!isFirebaseReady()) return;

  seaAngelStatsRef = firebase.database().ref("seaAngelPet/stats");
  seaAngelLogRef = firebase.database().ref("seaAngelPet/log");

  seaAngelStatsRef.once("value").then((snap) => {
    if (!snap.exists()) {
      seaAngelStatsRef.set({ happiness: 70, fullness: 70 });
    }
  });

  seaAngelStatsRef.on("value", (snap) => {
    renderSeaAngelStats(snap.val() || { happiness: 70, fullness: 70 });
  });

  seaAngelLogRef.limitToLast(5).on("child_added", (snap) => {
    addSeaAngelLogEntry(snap.val());
  });

  // Very gentle decay over time so there's a reason to come back and check in —
  // floored well above zero so the sea angel is always at least okay.
  setInterval(() => {
    if (!seaAngelStatsRef) return;
    seaAngelStatsRef.transaction((stats) => {
      if (!stats) return stats;
      stats.happiness = Math.max(25, stats.happiness - 1);
      stats.fullness = Math.max(25, stats.fullness - 1);
      return stats;
    });
  }, 60000);
}

function renderSeaAngelStats(stats) {
  const happinessBar = document.getElementById("seaAngelHappinessBar");
  const fullnessBar = document.getElementById("seaAngelFullnessBar");
  const moodImg = document.getElementById("seaAngelMoodImg");

  if (happinessBar) happinessBar.style.width = `${stats.happiness}%`;
  if (fullnessBar) fullnessBar.style.width = `${stats.fullness}%`;

  if (moodImg) {
    const avg = (stats.happiness + stats.fullness) / 2;
    moodImg.classList.remove("happy", "neutral", "sad");
    moodImg.classList.add(avg > 60 ? "happy" : avg > 35 ? "neutral" : "sad");
  }
}

function petSeaAngel() {
  if (!seaAngelStatsRef) return;
  seaAngelStatsRef.transaction((stats) => {
    if (!stats) stats = { happiness: 70, fullness: 70 };
    stats.happiness = Math.min(100, stats.happiness + 12);
    return stats;
  });
  if (seaAngelLogRef) {
    seaAngelLogRef.push({ name: currentUserName || "someone", action: "petted", time: Date.now() });
  }
}

function feedSeaAngel() {
  if (!seaAngelStatsRef) return;
  seaAngelStatsRef.transaction((stats) => {
    if (!stats) stats = { happiness: 70, fullness: 70 };
    stats.fullness = Math.min(100, stats.fullness + 15);
    return stats;
  });
  if (seaAngelLogRef) {
    seaAngelLogRef.push({ name: currentUserName || "someone", action: "fed", time: Date.now() });
  }
}

function addSeaAngelLogEntry(entry) {
  const feed = document.getElementById("seaAngelFeed");
  if (!feed || !entry) return;

  const line = document.createElement("div");
  line.className = "sea-angel-feed-item";
  const verb = entry.action === "petted" ? "petted 🖐️" : "fed 🍤";
  line.textContent = `${entry.name || "someone"} ${verb} the sea angel!`;
  feed.prepend(line);

  while (feed.children.length > 5) feed.removeChild(feed.lastChild);
}

/* ======================================================
   BLIND BAG UNBOXING (Smiski + Sylvanian Families)
   The character lists below are placeholders — swap in the
   real edition names (and add images if you want) any time.
   ====================================================== */

const BLIND_BAG_LINES = {
  smiski: {
    label: "Smiski",
    characters: [
      { name: "Reading", rarity: "common" },
      { name: "Sleeping", rarity: "common" },
      { name: "Stretching", rarity: "common" },
      { name: "Watering Plant", rarity: "common" },
      { name: "Doing Yoga", rarity: "rare" },
      { name: "Playing Guitar", rarity: "rare" },
      { name: "Glow Secret Star-Gazer", rarity: "secret" }
    ]
  },
  sylvanian: {
    label: "Sylvanian Families",
    characters: [
      { name: "Chocolate Rabbit Baby", rarity: "common" },
      { name: "Cream Rabbit Baby", rarity: "common" },
      { name: "Walnut Squirrel Baby", rarity: "common" },
      { name: "Persian Cat Baby", rarity: "common" },
      { name: "Chiffon Cat Baby", rarity: "rare" },
      { name: "Husky Dog Baby", rarity: "rare" },
      { name: "Golden Hamster Secret Edition", rarity: "secret" }
    ]
  }
};

let blindBagCollectionRef = null;
let blindBagLogRef = null;

function initBlindBag() {
  const anyGrid = document.getElementById("blindBagGrid-smiski");
  if (!anyGrid) return; // section not on this page
  if (!isFirebaseReady()) return;

  blindBagCollectionRef = firebase.database().ref("blindBag/collection");
  blindBagLogRef = firebase.database().ref("blindBag/log");

  renderBlindBagGrids({});

  blindBagCollectionRef.on("value", (snap) => {
    renderBlindBagGrids(snap.val() || {});
  });

  blindBagLogRef.limitToLast(6).on("child_added", (snap) => {
    addBlindBagLogEntry(snap.val());
  });
}

function blindBagKeyFor(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_");
}

function pickRandomBlindBagCharacter(lineKey) {
  const pool = BLIND_BAG_LINES[lineKey].characters;
  const roll = Math.random();
  const rarity = roll < 0.1 ? "secret" : roll < 0.4 ? "rare" : "common";
  const candidates = pool.filter((c) => c.rarity === rarity);
  const finalPool = candidates.length ? candidates : pool;
  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

function renderBlindBagGrids(collectionData) {
  Object.keys(BLIND_BAG_LINES).forEach((lineKey) => {
    const grid = document.getElementById(`blindBagGrid-${lineKey}`);
    if (!grid) return;

    grid.innerHTML = "";
    const lineOwned = collectionData[lineKey] || {};

    BLIND_BAG_LINES[lineKey].characters.forEach((char) => {
      const key = blindBagKeyFor(char.name);
      const unlocked = lineOwned[key];

      const card = document.createElement("div");
      card.className = "blindbag-card" + (unlocked ? ` unlocked rarity-${char.rarity}` : " locked");

      if (unlocked) {
        const icon = char.rarity === "secret" ? "✨" : char.rarity === "rare" ? "💎" : "🎀";
        card.innerHTML =
          `<div class="blindbag-icon">${icon}</div>` +
          `<div class="blindbag-name">${char.name}</div>` +
          `<div class="blindbag-unlocker">found by ${unlocked.name || "someone"}</div>`;
      } else {
        card.innerHTML = `<div class="blindbag-icon">❓</div><div class="blindbag-name">???</div>`;
      }

      grid.appendChild(card);
    });
  });
}

function unboxBlindBag(lineKey) {
  if (!isFirebaseReady()) {
    alert("Blind bag unboxing needs Firebase set up — see the comment near the bottom of main.html.");
    return;
  }

  const chosen = pickRandomBlindBagCharacter(lineKey);
  const key = blindBagKeyFor(chosen.name);

  if (blindBagLogRef) {
    blindBagLogRef.push({
      name: currentUserName || "someone",
      line: BLIND_BAG_LINES[lineKey].label,
      character: chosen.name,
      rarity: chosen.rarity,
      time: Date.now()
    });
  }

  if (blindBagCollectionRef) {
    // First person to pull a given character keeps the "found by" credit —
    // later pulls of the same character still get logged above, just don't
    // overwrite who found it first.
    blindBagCollectionRef.child(lineKey).child(key).transaction((existing) => {
      if (existing) return existing;
      return { name: currentUserName || "someone", rarity: chosen.rarity, time: Date.now() };
    });
  }

  showBlindBagReveal(chosen);
}

function showBlindBagReveal(chosen) {
  const reveal = document.getElementById("blindBagReveal");
  if (!reveal) return;

  reveal.textContent = `you got: ${chosen.name} (${chosen.rarity})!`;
  reveal.classList.remove("blindbag-reveal-pop");
  void reveal.offsetWidth; // restart the pop animation
  reveal.classList.add("blindbag-reveal-pop");
}

function addBlindBagLogEntry(entry) {
  const feed = document.getElementById("blindBagFeed");
  if (!feed || !entry) return;

  const line = document.createElement("div");
  line.className = "blindbag-feed-item";
  line.textContent = `${entry.name || "someone"} unboxed ${entry.character} from ${entry.line}! (${entry.rarity})`;
  feed.prepend(line);

  while (feed.children.length > 6) feed.removeChild(feed.lastChild);
}
