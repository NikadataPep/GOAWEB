/// ანიმაციის გამოჩენის ადგილი
const canvas = document.getElementById("matrix");

/// (like fillText, fillRect, etc.) ანიმაციის "დასახატად"
const ctx = canvas.getContext("2d");

//// ====== კანვას ზომა გავუტოლოთ ეკრანისას ======
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/// მატრიცის ანიმაციისთვის საჭირო ცვლადები:
const chars = "01";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize); //// სვეტების რაოდენობა
const drops = []; //// მასივი ინახავ იმ Y კოორდინატს საიტანაც იწყება rain drop ანიმაცია

//// თითოეულ drop-ს დაუგენერირებს Y პოზიციას საიდანაც ჩამოვარდება
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * 200; //// ვარდნა იწყება ეკრანის ზევიდან
}

//| ანიმაციის ინტერვალის ცვლადი
let matrixInterval;

//! მთავარი, მატრიცის ხატვის ფუნქცია
function draw() {
  //<> ctx-ის დახმარებით კანვას გადაეფარება შავი გამჭირვალე მართკუთხედი
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  //// რის შედეგადაც მიიღება კვალის დატოვების ანიმაცია
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0"; //// 1-ის და 0-ის ფერი
  ctx.font = fontSize + "px 'Fira Code', monospace";

  // Loop through each column and draw a random binary character
  for (let i = 0; i < drops.length; i++) {
    //// რანდომულად აირჩევს 1-ს ან 0-ს
    const text = chars[Math.floor(Math.random() * chars.length)];
    //// შეავსებს (დახატავს) მატრიცის ანიმაცია
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    //// როგორც კი drop-ი მოხვდება საიტის ბოლოში რესეტდება და ისევ თავში ადის
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      //// 0.975 ვამოწმებ რადგან კიდევ უფრო რანდომული იყოს
      drops[i] = 0;
    }

    //// ერთი რიგით (ნაბიჯით) ქვევით ჩადის
    drops[i]++;
  }
}

//// ბრაუზერის "ფანჯარა"-სთან ერთად შეცვლის კანვას ზომას
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//| თემის გადართვა
const themeBtn = document.getElementById("themeIcon"); /// ღილაკი
/// ლოკალურად შეინახავს რომელ თემაზეც გაჩერდა საიტი
let isDark = localStorage.getItem("theme") === "dark";

//// body-ისთვის თემის მინიჭება და მატრიცის განახლება
function applyTheme() {
  document.body.classList.toggle("dark", isDark); //* dark-ის მინიჭება/მოშორება
  themeBtn.src = isDark ? "images/moon.png" : "images/sun.png";
  //<> დაკლიკების მიხედვით ინახავს საიტის თემას
  localStorage.setItem("theme", isDark ? "dark" : "light");

  //// ბნელი რეჟიმისთვის მატრიცა იქნება აქტიური
  if (isDark) {
    if (!matrixInterval) matrixInterval = setInterval(draw, 35);
  } else {
    clearInterval(matrixInterval); /// ანიმაციის გაჩერება
    matrixInterval = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //// მატრიცის "drop"-ების მოსაშორებლად
  }
}

//// icon-ზე დაკლიკებისას გაეშვება applyTheme ფუნქცია
themeBtn.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme();
});

//// ბეჭდვის/წაშლის ანიმაცია
function typeWriter() {
  const box = document.getElementById("typeWriterDiv"); /// ტექსტის ყუთი (კონტეინერი)
  const messages = [
    "ეს საიტი შექმნილია გოას მოსწავლის მიერ, საიტში ჩავაქსოვე ის ყველაფერი რაც აკადემიაში შევისწავლე.",
    "This website was created by a GOA student. This website showcases everything I have learnt here.",
  ];
  let currentMsg = 0; //// ახლანდელი ინდექსი
  let position = 0; //// Character-ის პოზიცია ტექსტში
  let isDeleting = false; /// იშლება თუ არა ტექსტი
  const speed = 40; //// ბეჭდვის სისწრაფე

  //// ბეჭდვის ფუნქცია (რეკურსიის გამოყენებით)
  function type() {
    /// წვდება ტექსტს ქართულს ან ინგლისურს ინდექსის მიხედვით
    const text = messages[currentMsg];

    if (isDeleting) {
      //// შლის თითო-თითო ქარაქთერს
      box.innerHTML = text.substring(0, position - 1);
      position--;

      //// ბოლომდე წაშლისას გადაცვლის ტექსტს
      if (position === 0) {
        isDeleting = false;
        currentMsg = (currentMsg + 1) % messages.length;
        setTimeout(type, 1000); //// შეყოვნდება 1 წამი ახლის აკრეფამდე
      } else {
        setTimeout(type, speed);
      }
    } else {
      //// კრეფს თითო ასოს/სიმბოლოს
      box.innerHTML = text.substring(0, position + 1);
      position++;

      //// როცა ტექსის წერას მორჩება დაიწყებს წაშლას
      if (position === text.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        setTimeout(type, speed);
      }
    }
  }

  type();
}

//<> ====== პოპულარულობის სვეტები ======
function showBars() {
  const container = document.getElementById("popularityBars"); //// კონტეინერი
  const academies = [
    { name: "GOA", students: 5000, color: "rgba(32, 194, 14, 0.7)" },
    { name: "Mziuri", students: 4300, color: "rgba(74, 144, 226, 0.7)" },
    { name: "Novatori", students: 3000, color: "rgba(226, 184, 74, 0.7)" },
    { name: "ITStep", students: 2400, color: "rgba(226, 74, 74, 0.7)" },
  ];

  //// თითოეული აკადემიისთვის შექმნის სვეტს რაოდენობების პროპორციულად
  for (let i = 0; i < academies.length; i++) {
    const barDiv = document.createElement("div");
    barDiv.className = "popularity-bar";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = academies[i].students / 15 + "px";
    bar.style.backgroundColor = academies[i].color;

    const infoDiv = document.createElement("div");
    infoDiv.className = "value-label-div";

    const name = document.createElement("div");
    name.className = "bar-label";
    name.textContent = academies[i].name;

    const students = document.createElement("div");
    students.className = "bar-value";
    students.textContent = academies[i].students.toLocaleString(); // Format number nicely

    infoDiv.append(name, students);
    barDiv.append(bar, infoDiv);
    container.appendChild(barDiv);
  }
}

//// სქროლვის ანიმაცია
function manualScrollActive() {
  const sections = document.querySelectorAll("section"); /// ყველა სექცია
  // /// ნავიგაციის ყველა list ელემენტი
  const navItems = document.querySelectorAll(".nav-links li");

  //// scrolling-ის დროს შევამოწმოთ რომელ სექციაზე დგას
  window.addEventListener("scroll", () => {
    for (let i = 0; i < sections.length; i++) {
      ///* დაშორება საიტის თავიდან სექცია დასაწყისამდე
      const sectionTop = sections[i].offsetTop;
      //<> სექციის სიმაღლე
      const sectionHeight = sections[i].offsetHeight;
      //! ჩამოსქროლილ პოზიციას + 120px
      const scrollPos = window.scrollY + 120;

      /// თუ მომხმარებელი ამ სექციაშია
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        /// active-ს მოაშორებს ყველა სხვას
        for (let j = 0; j < navItems.length; j++) {
          navItems[j].classList.remove("active");
        }

        //// active დაუმატებს მხოლოდ ეხლანდელ სექციას
        navItems[i].classList.add("active");
        break;
      }
    }
  });
}

function initMentorSlider() {
  const mentors = [
    { name: "ნიკა კვარაცხელია", image: "mentors/kvara.png" },
    { name: "ლუკა ცხვარაძე", image: "mentors/luka.png" },
    { name: "გაბრიელ მოლოდინი", image: "mentors/gobron.png" },
    { name: "დათა დიასამიძე", image: "mentors/diasa.png" },
    { name: "დათა თეზელაშვილი", image: "mentors/tezela.png" },
    { name: "ლაშა ლომიძე", image: "mentors/lasha.png" },
    { name: "დავით ჯანეზაშვილი", image: "mentors/janeza.png" },
  ];
  const track = document.getElementById("mentorTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  track.innerHTML = "";

  mentors.forEach((mentor) => {
    const card = document.createElement("div");
    card.className = "mentor-card";

    card.innerHTML = `
      <img src="${mentor.image}" alt="${mentor.name}" />
      <h3>${mentor.name}</h3>
    `;

    track.appendChild(card);
  });

  const cards = document.querySelectorAll(".mentor-card");
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
  });
}

//// გვერდის ჩატვირთვისას ფუნქციების ინიციალიზაცია
window.addEventListener("DOMContentLoaded", () => {
  initMentorSlider();

  applyTheme();
  typeWriter();
  showBars();
  manualScrollActive();
  document.querySelector(".nav-links li")?.classList.add("active");
});
