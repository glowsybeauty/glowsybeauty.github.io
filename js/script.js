document.addEventListener("DOMContentLoaded", function () {
  const gridItems = document.querySelectorAll(".grid-item");
  const galleryGrid = document.querySelector(".gallery-grid");
  const galleryContainer = document.querySelector(".gallery-container");

  // Love burst effect on page load
  function createLoveBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const numberOfHearts = 15;

    for (let i = 0; i < numberOfHearts; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "love-burst";
        heart.innerHTML = "❤️";

        const angle = (Math.PI * 2 * i) / numberOfHearts;
        const distance = 50 + Math.random() * 100;
        const startX = centerX + Math.cos(angle) * distance;
        const startY = centerY + Math.sin(angle) * distance;

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";
        heart.style.fontSize = 20 + Math.random() * 20 + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 2000);
      }, i * 100);
    }
  }

  // Trigger love burst on page load
  setTimeout(createLoveBurst, 500);

  // Staggered reveal animation on load (first 6 items only)
  gridItems.forEach((item, index) => {
    if (index < 6) {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 100);
    }
  });

  // Handle scroll shadow indicator
  function checkScrollBottom() {
    const scrollTop = galleryGrid.scrollTop;
    const scrollHeight = galleryGrid.scrollHeight;
    const clientHeight = galleryGrid.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      galleryContainer.classList.add("scrolled-bottom");
    } else {
      galleryContainer.classList.remove("scrolled-bottom");
    }
  }

  // Handle scroll to show/hide items
  galleryGrid.addEventListener("scroll", () => {
    gridItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const containerRect = galleryGrid.getBoundingClientRect();

      const itemTop = rect.top - containerRect.top;
      const itemBottom = rect.bottom - containerRect.top;

      // Item is visible in viewport
      if (itemBottom > 0 && itemTop < containerRect.height) {
        item.classList.add("visible");
        item.classList.remove("hidden");
      }
      // Item scrolled above viewport
      else if (itemBottom <= 0) {
        item.classList.add("hidden");
        item.classList.remove("visible");
      }
      // Item below viewport (not yet scrolled to)
      else {
        item.classList.remove("visible");
        item.classList.remove("hidden");
      }
    });

    checkScrollBottom();
  });

  // Random shine effect on random items
  function randomShine() {
    const visibleItems = document.querySelectorAll(".grid-item.visible");
    if (visibleItems.length === 0) return;

    const randomItem =
      visibleItems[Math.floor(Math.random() * visibleItems.length)];
    const shine = randomItem.querySelector(".card-shine");

    shine.style.left = "-100%";
    setTimeout(() => {
      shine.style.transition = "left 0.8s ease";
      shine.style.left = "100%";
    }, 50);

    setTimeout(() => {
      shine.style.transition = "none";
      shine.style.left = "-100%";
    }, 900);
  }

  // Trigger random shines periodically
  setInterval(randomShine, 2000);

  // Create magical sparkles
  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 3000);
  }

  // Generate sparkles periodically
  setInterval(createSparkle, 800);

  // Initial sparkles
  for (let i = 0; i < 10; i++) {
    setTimeout(createSparkle, i * 300);
  }

  // Particle trail effect
  let lastX = 0;
  let lastY = 0;

  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 10) {
      createParticle(e.clientX, e.clientY);
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 0.5) * 100;
    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  // Cursor tracking for hover buttons
  gridItems.forEach((item) => {
    const button = item.querySelector(".hover-button");

    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left + 10; // Reduced offset to the right
      const y = e.clientY - rect.top - 20; // Reduced offset above cursor

      button.style.left = x + "px";
      button.style.top = y + "px";
    });
  });
});
