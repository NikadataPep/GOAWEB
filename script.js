/// ანიმაციის გამოჩენის ადგილი
const canvas = document.getElementById("matrix");

/// (like fillText, fillRect, etc.) ანიმაციის "დასახატად"
const ctx = canvas.getContext("2d");

//// ====== კანვას ზომა გავუტოლოთ ეკრანისას ======
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ====== Characters used in the Matrix effect ======
const chars = "01";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize); //// სვეტების რაოდენობა
const drops = []; // Array to track Y positions for each column

// ====== Initialize Y position of each drop (column) randomly above screen ======
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -200; // Start some drops above the screen
}

// ====== Variable to store the animation interval reference ======
let matrixInterval;

// ====== Main function to draw the Matrix rain ======
function draw() {
  // Create a transparent black background to leave fading trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Check current theme and set appropriate green color for text
  const isDark = document.body.classList.contains("dark");
  ctx.fillStyle = isDark ? "#0F0" : "#006400"; // Bright green for dark, darker green for light
  ctx.font = fontSize + "px 'Fira Code', monospace";

  // Loop through each column and draw a random binary character
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)]; // Randomly pick 0 or 1
    ctx.fillText(text, i * fontSize, drops[i] * fontSize); // Draw the character

    // If a drop reaches the bottom, reset it randomly to the top
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Move the drop down by one line
    drops[i]++;
  }
}

// ====== Resize canvas when the browser window changes size ======
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ====== Theme toggle button logic ======
const themeBtn = document.getElementById("themeIcon"); // Button to switch theme
let isDark = localStorage.getItem("theme") === "dark"; // Get saved theme preference

// Apply current theme to body and update canvas/matrix
function applyTheme() {
  document.body.classList.toggle("dark", isDark); // Add/remove dark class
  themeBtn.src = isDark ? "images/moon.png" : "images/sun.png"; // Change icon
  localStorage.setItem("theme", isDark ? "dark" : "light"); // Save preference

  // If dark mode: start matrix animation
  if (isDark) {
    if (!matrixInterval) matrixInterval = setInterval(draw, 33); // Start drawing at ~30 FPS
  } else {
    clearInterval(matrixInterval); // Stop animation
    matrixInterval = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the matrix canvas
  }
}

// When the theme button is clicked, toggle dark/light and apply changes
themeBtn.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme();
});

// ====== Typewriter animation for introduction text ======
function typeWriter() {
  const box = document.getElementById("typeWriterDiv"); // Text container
  const messages = [
    "ეს საიტი შექმნილია გოას მოსწავლის მიერ, საიტში ჩავაქსოვე ის ყველაფერი რაც აკადემიაში შევისწავლე.",
    "This website was created by a GOA student. This website showcases everything I have learnt here.",
  ];
  let currentMsg = 0; // Current message index
  let position = 0; // Character index in current message
  let isDeleting = false; // Whether we're deleting text
  const speed = 40; // Typing speed (ms per letter)

  // Inner typing function
  function type() {
    const text = messages[currentMsg]; // Get current message

    if (isDeleting) {
      // Delete one character
      box.innerHTML = text.substring(0, position - 1);
      position--;

      // If finished deleting, switch message
      if (position === 0) {
        isDeleting = false;
        currentMsg = (currentMsg + 1) % messages.length;
        setTimeout(type, 1000); // Pause before typing next message
      } else {
        setTimeout(type, speed);
      }
    } else {
      // Add one character
      box.innerHTML = text.substring(0, position + 1);
      position++;

      // When message is fully typed, pause then delete
      if (position === text.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, speed);
      }
    }
  }

  type(); // Start typing
}

// ====== Create popularity bars for schools ======
function showBars() {
  const container = document.getElementById("popularityBars"); // Bar container
  const schools = [
    { name: "GOA", students: 5000, color: "rgba(32, 194, 14, 0.7)" },
    { name: "Mziuri", students: 4300, color: "rgba(74, 144, 226, 0.7)" },
    { name: "Novatori", students: 3000, color: "rgba(226, 184, 74, 0.7)" },
    { name: "ITStep", students: 2400, color: "rgba(226, 74, 74, 0.7)" },
  ];

  // Create and append a bar for each school
  for (let i = 0; i < schools.length; i++) {
    const barDiv = document.createElement("div");
    barDiv.className = "popularity-bar"; // Container for each school

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = schools[i].students / 15 + "px"; // Height proportional to students
    bar.style.backgroundColor = schools[i].color;

    const infoDiv = document.createElement("div");
    infoDiv.className = "value-label-div";

    const name = document.createElement("div");
    name.className = "bar-label";
    name.textContent = schools[i].name;

    const students = document.createElement("div");
    students.className = "bar-value";
    students.textContent = schools[i].students.toLocaleString(); // Format number nicely

    infoDiv.append(name, students);
    barDiv.append(bar, infoDiv);
    container.appendChild(barDiv);
  }
}

// ====== Highlight active navigation link based on scroll position ======
function manualScrollActive() {
  const sections = document.querySelectorAll("section"); // All sections of the page
  const navItems = document.querySelectorAll(".nav-links li"); // All nav list items

  // On scroll, find which section is in view
  window.addEventListener("scroll", () => {
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionHeight = sections[i].offsetHeight;
      const scrollPos = window.scrollY + 120; // Offset to trigger earlier

      // If user is currently in this section
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove "active" from all nav items
        for (let j = 0; j < navItems.length; j++) {
          navItems[j].classList.remove("active");
        }

        // Add "active" to the current nav item
        navItems[i].classList.add("active");
        break;
      }
    }
  });
}

// ====== On page load, apply all dynamic features ======
window.addEventListener("DOMContentLoaded", () => {
  applyTheme(); // Load saved theme and start/stop matrix
  typeWriter(); // Start typewriter animation
  showBars(); // Render popularity bars
  manualScrollActive(); // Enable scroll-based nav highlighting
  document.querySelector(".nav-links li")?.classList.add("active"); // Activate first nav link
});
