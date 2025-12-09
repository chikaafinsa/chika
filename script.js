// ========== SMOOTH SCROLL ==========
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ========== NAVBAR SHRINK SAAT SCROLL ==========
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// ========== ANIMASI FADE-IN SAAT MASUK LAYAR ==========
const faders = document.querySelectorAll(
  ".section-title, .bio-card, .project-card, .hero-left, .hero-right"
);

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

let score = 0;
let currentTopic = "";
let currentQuestion = {};
let answer = document.getElementById("answer");
let questionElement = document.getElementById("question");
let resultMessage = document.getElementById("result-message");
let scoreElement = document.getElementById("score");

const questions = {
  matriks: [
    {
      question:
        "Hitung hasil dari matriks A x B: [[1, 2], [3, 4]] x [[5, 6], [7, 8]]",
      correctAnswer: [[19, 22],[43, 50],], // Contoh hasil perkalian matriks
    },
  ],

  barisan: [
    {
      question: "Berapa suku ke-5 dari barisan aritmatika 2, 5, 8, 11, ...?",
      correctAnswer: 14, // Rumus suku ke-n barisan aritmatika: a_n = a_1 + (n - 1) * d
    },
  ],
  bunga: [
    {
      question:
        "Berapa jumlah akhir dari investasi 1000 dengan bunga majemuk 5% per tahun selama 3 tahun?",
      correctAnswer: 1157.625, // Formula bunga majemuk: A = P(1 + r/n)^(nt)
    },
  ],
  anuitas: [
    {
      question:
        "Hitunglah pembayaran anuitas dengan bunga 4% per tahun, selama 10 tahun, dan nilai kini 10000.",
      correctAnswer: 1232.84, // Formula anuitas: PMT = P * r / (1 - (1 + r)^-n)
    },
  ],
};

function startGame(topic) {
  currentTopic = topic;
  currentQuestion = questions[topic][0];
  displayQuestion();
}

function displayQuestion() {
  questionElement.innerText = currentQuestion.question;
  resultMessage.innerText = "";
}

function checkAnswer() {
  let userAnswer = answer.value.trim();
  let correct = currentQuestion.correctAnswer;

  // Jika jawabannya berupa matriks (array)
  if (Array.isArray(correct)) {
    try {
      let parsed = JSON.parse(userAnswer);

      if (JSON.stringify(parsed) === JSON.stringify(correct)) {
        score++;
        resultMessage.innerText = "Jawaban Benar!";
        resultMessage.style.color = "green";
      } else {
        resultMessage.innerText = "Jawaban Salah!";
        resultMessage.style.color = "red";
      }
    } catch (e) {
      resultMessage.innerText = "Format jawaban tidak valid!";
      resultMessage.style.color = "red";
    }
  }

  // Jika jawabannya angka biasa
  else if (parseFloat(userAnswer) === correct) {
    score++;
    resultMessage.innerText = "Jawaban Benar!";
    resultMessage.style.color = "green";
  } else {
    resultMessage.innerText = "Jawaban Salah!";
    resultMessage.style.color = "red";
  }

  scoreElement.innerText = score;
  answer.value = "";
}
