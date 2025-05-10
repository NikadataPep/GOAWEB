// ===== Theme Toggle =====
const themeBtn = document.getElementById("themeIcon"); // Theme button (sun/moon icon)
let isDark = localStorage.getItem("theme") === "dark"; // Load saved theme from localStorage

// Toggle between light and dark themes
function toggleTheme() {
  isDark = !isDark; // Invert current theme
  document.body.classList.toggle("dark", isDark); // Add or remove 'dark' class
  themeBtn.src = isDark ? "images/moon.png" : "images/sun.png"; // Change icon
  localStorage.setItem("theme", isDark ? "dark" : "light"); // Save new theme
}

themeBtn.addEventListener("click", toggleTheme); // Toggle theme on icon click

// ===== Typewriter Effect =====
function typeWriter() {
  const box = document.getElementById("typeWriterDiv"); // Text display element
  const messages = [
    "ეს საიტი შექმნილია გოას მოსწავლის მიერ, საიტში ჩავაქსოვე ის ყველაფერი რაც აკადემიაში შევისწავლე.",
    "This website was created by a GOA student. This website showcases everything I have learnt here.",
  ];
  let currentMsg = 0; // Index of the current message
  let position = 0; // Current letter position
  let isDeleting = false; // Whether we are deleting or typing
  let speed = 40; // Typing speed (ms)

  // Typing and deleting function
  function type() {
    const text = messages[currentMsg];

    if (isDeleting) {
      box.innerHTML = text.substring(0, position - 1);
      position--;

      if (position === 0) {
        isDeleting = false;
        currentMsg = (currentMsg + 1) % messages.length;
        setTimeout(type, 1000); // Pause before next message
      } else {
        setTimeout(type, speed);
      }
    } else {
      box.innerHTML = text.substring(0, position + 1);
      position++;

      if (position === text.length) {
        isDeleting = true;
        setTimeout(type, 1000); // Pause before deleting
      } else {
        setTimeout(type, speed);
      }
    }
  }

  type(); // Start typing
}

// ===== Popularity Bars =====
function showBars() {
  const container = document.getElementById("popularityBars"); // Container for bars
  const schools = [
    { name: "GOA", students: 5000, color: "rgba(32, 194, 14, 0.7)" },
    { name: "Mziuri", students: 4300, color: "rgba(74, 144, 226, 0.7)" },
    { name: "Novatori", students: 3000, color: "rgba(226, 184, 74, 0.7)" },
    { name: "ITStep", students: 2400, color: "rgba(226, 74, 74, 0.7)" },
  ];

  for (let i = 0; i < schools.length; i++) {
    // Create outer bar container
    const barDiv = document.createElement("div");
    barDiv.className = "popularity-bar";

    // Create actual bar
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = schools[i].students / 15 + "px";
    bar.style.backgroundColor = schools[i].color;

    // Create info below bar
    const infoDiv = document.createElement("div");
    infoDiv.className = "value-label-div";

    const name = document.createElement("div");
    name.className = "bar-label";
    name.textContent = schools[i].name;

    const students = document.createElement("div");
    students.className = "bar-value";
    students.textContent = schools[i].students.toLocaleString();

    // Add info and bar to the main div
    infoDiv.append(name, students);
    barDiv.append(bar, infoDiv);
    container.appendChild(barDiv);
  }
}

// ===== Manual Scroll Navigation Highlight =====
function manualScrollActive() {
  var sections = document.querySelectorAll("section"); // All page sections
  var navItems = document.querySelectorAll(".nav-links li"); // Navigation list items

  // Highlight current nav item based on scroll
  window.addEventListener("scroll", function () {
    for (var i = 0; i < sections.length; i++) {
      var sectionTop = sections[i].offsetTop;
      var sectionHeight = sections[i].offsetHeight;
      var scrollPos = window.scrollY + 120; // Add offset for fixed header

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        for (var j = 0; j < navItems.length; j++) {
          navItems[j].classList.remove("active"); // Remove existing active class
        }
        navItems[i].classList.add("active"); // Highlight current nav item
        break;
      }
    }
  });
}

// ===== Page Initialization =====
window.addEventListener("DOMContentLoaded", () => {
  // Set initial theme
  document.body.classList.toggle("dark", isDark);
  themeBtn.src = isDark ? "images/moon.png" : "images/sun.png";

  // Run all features
  typeWriter();
  showBars();
  manualScrollActive();

  // Set first nav link as active on load
  document.querySelector(".nav-links li").classList.add("active");
});
