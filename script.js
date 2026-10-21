document.addEventListener("DOMContentLoaded", () => {
  // 1. Relationship Counter
  const firstMet = new Date("2025-11-05T00:00:00");
  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function updateCounter() {
    let diff = Math.max(0, Date.now() - firstMet.getTime());
    const day = 86400000, hour = 3600000, minute = 60000;
    const days = Math.floor(diff / day); diff %= day;
    const hours = Math.floor(diff / hour); diff %= hour;
    const minutes = Math.floor(diff / minute);
    const seconds = Math.floor((Date.now() - firstMet.getTime()) / 1000) % 60;
    els.days.textContent = String(days).padStart(3, "0");
    els.hours.textContent = String(hours).padStart(2, "0");
    els.minutes.textContent = String(minutes).padStart(2, "0");
    els.seconds.textContent = String(seconds).padStart(2, "0");
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  // 2. Advanced 3D Tilt Effect on Photos and Cards
  const canTilt = matchMedia("(hover:hover) and (pointer:fine)").matches &&
    !matchMedia("(prefers-reduced-motion:reduce)").matches;

  if (canTilt) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        
        card.style.transform = `perspective(1000px) rotateX(${-y * 16}deg) rotateY(${x * 16}deg) translateZ(12px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      });
    });
  }

  // 3. 3D Lightbox Modal on Photo Click
  const modal = document.createElement("div");
  modal.className = "lightbox-modal";
  modal.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <img src="" alt="Zoomed Photo">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const modalCaption = modal.querySelector(".lightbox-caption");
  const closeBtn = modal.querySelector(".lightbox-close");

  document.querySelectorAll(".photo-card").forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const caption = card.querySelector("figcaption");
      
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.innerHTML = caption ? caption.innerHTML : "";
        modal.classList.add("active");

        createHearts(15);
      }
    });
  });

  const closeModal = () => modal.classList.remove("active");
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // 4. Floating Hearts & Surprise Button Logic
  function createHearts(count = 28) {
    const field = document.querySelector(".sparkle-field");
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = ["♡", "✦", "♥", "✿", "🌸"][Math.floor(Math.random() * 5)];
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = (3 + Math.random() * 4) + "s";
      s.style.animationDelay = Math.random() * 0.8 + "s";
      s.style.fontSize = (14 + Math.random() * 20) + "px";
      field.appendChild(s);
      setTimeout(() => s.remove(), 8000);
    }
  }

  document.getElementById("surpriseBtn").addEventListener("click", () => {
    const message = document.getElementById("surpriseMessage");
    message.hidden = !message.hidden;
    if (!message.hidden) {
      createHearts(35);
    }
  });
});