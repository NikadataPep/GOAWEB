// Scroll to sections smoothly
function scroll(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

const themeIcon = document.getElementById("themeIcon");
let clickCnt = 0;

// Theme toggle without saving to localStorage
themeIcon.addEventListener("click", () => {
  clickCnt++;

  // Start fade animation
  themeIcon.classList.add("fade");

  // Wait before toggling theme and image
  setTimeout(() => {
    const isDark = clickCnt % 2 === 1;

    document.body.className = isDark ? "dark" : "";
    themeIcon.src = isDark ? "images/moon.png" : "images/sun.png";
  }, 150);

  // End fade animation
  setTimeout(() => {
    themeIcon.classList.remove("fade");
  }, 300);
});
