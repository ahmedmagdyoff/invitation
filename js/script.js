// ─── LOADER ───
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        startConfetti();
        setTimeout(stopConfetti, 5000);
    }, 2500);
});

// ─── PETALS ───
(function () {
    const wrap = document.getElementById("petals");
    for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.className = "petal";
        p.style.left = Math.random() * 100 + "%";
        p.style.width = 4 + Math.random() * 6 + "px";
        p.style.height = 7 + Math.random() * 8 + "px";
        p.style.animationDuration = 8 + Math.random() * 12 + "s";
        p.style.animationDelay = Math.random() * 12 + "s";
        p.style.opacity = 0;
        wrap.appendChild(p);
    }
})();

// ─── FLOATING HEARTS ───
(function () {
    const wrap = document.getElementById("floatHearts");
    const emojis = ["♥", "❤", "💕", "💖"];
    for (let i = 0; i < 10; i++) {
        const h = document.createElement("div");
        h.className = "fh";
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = Math.random() * 100 + "%";
        h.style.fontSize = 0.6 + Math.random() * 0.8 + "rem";
        h.style.animationDuration = 12 + Math.random() * 16 + "s";
        h.style.animationDelay = Math.random() * 15 + "s";
        wrap.appendChild(h);
    }
})();

// ─── CONFETTI ───
let confettiRunning = false;
let confettiAF;
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = [
        "#c9a84c",
        "#e8d08a",
        "#f4c5c5",
        "#ffffff",
        "#c97070",
        "#e8a0a0",
    ];
    for (let i = 0; i < 160; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: 2 + Math.random() * 5,
            d: Math.random() * 160,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: 0.07 + Math.random() * 0.05,
            tiltAngle: 0,
            shape: Math.random() > 0.5 ? "rect" : "circle",
        });
    }
    confettiRunning = true;
    let angle = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angle += 0.01;
        particles.forEach((p, i) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(angle + p.d) + 1 + p.r / 2) * 0.9;
            p.x += Math.sin(angle) * 0.5;
            p.tilt = Math.sin(p.tiltAngle) * 12;
            ctx.beginPath();
            ctx.fillStyle = p.color;
            if (p.shape === "circle") {
                ctx.arc(p.x + p.tilt + p.r / 2, p.y, p.r, 0, Math.PI * 2);
            } else {
                ctx.rect(p.x + p.tilt, p.y, p.r * 2, p.r * 1.4);
            }
            ctx.closePath();
            ctx.fill();
            if (p.y > canvas.height) {
                p.x = Math.random() * canvas.width;
                p.y = -10;
            }
        });
        if (confettiRunning) confettiAF = requestAnimationFrame(draw);
    }
    draw();
}
function stopConfetti() {
    confettiRunning = false;
    cancelAnimationFrame(confettiAF);
    const canvas = document.getElementById("confetti-canvas");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

// ─── COUNTDOWN ───
//time
function updateCountdown() {
    const target = new Date("2026-06-13T20:00:00");
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
        document.getElementById("cDays").textContent = "000";
        document.getElementById("cHours").textContent = "00";
        document.getElementById("cMins").textContent = "00";
        document.getElementById("cSecs").textContent = "00";
        return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const set = (id, val, pad) => {
        const el = document.getElementById(id);
        const newVal = String(val).padStart(pad, "0");
        if (el.textContent !== newVal) {
            el.classList.add("flip");
            el.textContent = newVal;
            setTimeout(() => el.classList.remove("flip"), 250);
        }
    };
    set("cDays", d, 2);
    set("cHours", h, 2);
    set("cMins", m, 2);
    set("cSecs", s, 2);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.12 },
);
document
    .querySelectorAll(".reveal")
    .forEach((el) => observer.observe(el));

// ─── NAVBAR SCROLL ───
window.addEventListener("scroll", () => {
    document
        .getElementById("navbar")
        .classList.toggle("scrolled", window.scrollY > 40);
    document
        .getElementById("backTop")
        .classList.toggle("show", window.scrollY > 400);
});

// ─── THEME TOGGLE ───
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtn.textContent = isDark ? "☀" : "☾";
});

// ─── MUSIC ───
let musicOn = false;
const music = document.getElementById("bgMusic");
document.getElementById("musicBtn").addEventListener("click", () => {
    musicOn = !musicOn;
    if (musicOn) {
        music.play().catch(() => { });
        document.getElementById("musicBtn").textContent = "♫";
    } else {
        music.pause();
        document.getElementById("musicBtn").textContent = "♪";
    }
});

// ─── MOBILE MENU ───
document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.toggle("open");
});
function closeMobile() {
    document.getElementById("mobileMenu").classList.remove("open");
}

// ─── LIGHTBOX ───
function openLightbox(el) {
    const src = el.querySelector("img").src;
    document.getElementById("lightboxImg").src = src;
    document.getElementById("lightbox").classList.add("open");
    document.body.style.overflow = "hidden";
}
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.body.style.overflow = "";
}
document
    .getElementById("lightbox")
    .addEventListener("click", function (e) {
        if (e.target === this) closeLightbox();
    });

// ─── RSVP ───
function submitRSVP() {
    const name = document.getElementById("rsvpName").value.trim();
    const phone = document.getElementById("rsvpPhone").value.trim();
    const attend = document.getElementById("rsvpAttend").value;
    if (!name || !attend) {
        alert("Please fill in your name and attendance.");
        return;
    }
    document.querySelector(".rsvp-form form") && null;
    document
        .querySelectorAll(".form-group")
        .forEach((g) => (g.style.display = "none"));
    document.querySelector(".submit-btn").style.display = "none";
    document.getElementById("rsvpSuccess").style.display = "block";
}

// ─── RESIZE CONFETTI ───
window.addEventListener("resize", () => {
    const c = document.getElementById("confetti-canvas");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});