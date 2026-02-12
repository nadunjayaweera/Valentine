// Game State
let gameState = {
  currentLevel: 1,
  redFlagCount: 0,
  choices: {
    gift: null,
    restaurant: null,
    topic: null,
  },
};

// DOM Elements
const levels = document.querySelectorAll(".level");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const optionButtons = document.querySelectorAll(".option-btn");
const errorModal = document.getElementById("errorModal");
const modalOverlay = document.getElementById("modalOverlay");
const closeErrorBtn = document.getElementById("closeErrorBtn");
const congratsModal = document.getElementById("congratsModal");
const playAgainBtn = document.getElementById("playAgainBtn");
const errorFeedback = document.getElementById("errorFeedback");
const finalRedFlags = document.getElementById("finalRedFlags");
const redFlagCounter = document.querySelector(".red-flag-counter");

// Initialize Game
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  updateNavButtons();
});

// Setup Event Listeners
function setupEventListeners() {
  // Option buttons
  optionButtons.forEach((button) => {
    button.addEventListener("click", handleOptionClick);
  });

  // Navigation buttons
  prevBtn.addEventListener("click", previousLevel);
  nextBtn.addEventListener("click", handleNextClick);

  // Modal close
  closeErrorBtn.addEventListener("click", closeError);
  modalOverlay.addEventListener("click", closeError);

  // Play again button
  playAgainBtn.addEventListener("click", resetGame);
}

// Handle Option Button Click
function handleOptionClick(event) {
  event.preventDefault();

  // Increment red flag counter
  incrementRedFlag();

  // Get feedback message
  const button = event.currentTarget;
  const feedback = button.dataset.feedback || "That was a terrible choice!";

  // Show error message with feedback
  showError(feedback);

  // Store choice
  const dataAttribute = Object.keys(button.dataset).find(
    (key) => key !== "feedback",
  );
  const choice = button.dataset[dataAttribute];

  gameState.choices[dataAttribute] = choice;

  // Visual feedback
  animateButton(button);

  // Enable next button since a choice was made
  updateNavButtons();
}

// Increment Red Flag Counter
function incrementRedFlag() {
  gameState.redFlagCount++;
  redFlagCounter.textContent = gameState.redFlagCount;

  // Pulse animation using class
  const flagContainer = redFlagCounter.parentElement;
  flagContainer.style.animation = "";

  // Trigger reflow to restart animation
  void flagContainer.offsetWidth;

  flagContainer.style.animation = "pulse 0.6s ease-out";
}

// Show Error Modal
function showError(feedback) {
  if (feedback) {
    errorFeedback.textContent = feedback;
  }
  errorModal.classList.add("active");
  modalOverlay.classList.add("active");
}

// Close Error Modal
function closeError() {
  errorModal.classList.remove("active");
  modalOverlay.classList.remove("active");
}

// Handle Next Button Click
function handleNextClick() {
  if (gameState.currentLevel < 3) {
    nextLevel();
  } else {
    // Show congratulations modal
    showCongrats();
  }
}

// Show Congratulations Modal
const funnyMessages = [
  {
    title: "Mission Failed Successfully",
    message: "You're Going to Die Alone 💀",
  },
  {
    title: "Game Over!",
    message: "Relationship Status: TERMINATED 💔",
  },
  {
    title: "Achievement Unlocked",
    message: "Forever Alone: Expert Edition 🏆",
  },
  {
    title: "Congratulations!",
    message: "You've Successfully Blocked Every Exit 🚪",
  },
  {
    title: "The End",
    message: "Love Life: Extinct 🦴",
  },
  {
    title: "Plot Twist!",
    message: "You're Your Own Love Story 💔",
  },
  {
    title: "Cupid's Revenge",
    message:
      "If 'disappointment' was an Olympic sport, you'd be standing on a podium made of unread DMs.",
  },
  {
    title: "Success!",
    message:
      "You get to spend the night with your favorite person: The crushing realization of your own company.",
  },
  {
    title: "Victory!",
    message:
      "At least your houseplants haven't left you yet. (Check again, they look a bit dry.) 🌱",
  },
  {
    title: "You Won!",
    message:
      "You'll die alone, but at least nobody will argue with you about what to have for dinner on the way out. 🍽️",
  },
  {
    title: "Proud Achievement",
    message:
      "Your bed is empty, but your bank account is full. Finally, a hierarchy of needs that makes sense. 💰",
  },
  {
    title: "Flawless Victory",
    message:
      "You've successfully avoided a breakup in three months. Mostly because you couldn't even start a conversation today. 🤐",
  },
];

function showCongrats() {
  const randomMsg =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  const titleEl = document.querySelector(".congrats-title");
  const messageEl = document.querySelector(".congrats-message");

  // Add animation class for fade-in effect
  titleEl.classList.remove("msg-fade-in");
  messageEl.classList.remove("msg-fade-in");

  // Trigger reflow to restart animation
  void titleEl.offsetWidth;
  void messageEl.offsetWidth;

  titleEl.textContent = randomMsg.title;
  messageEl.textContent = randomMsg.message;

  titleEl.classList.add("msg-fade-in");
  messageEl.classList.add("msg-fade-in");

  finalRedFlags.textContent = gameState.redFlagCount;
  congratsModal.classList.add("active");
  modalOverlay.classList.add("active");
}

// Reset Game
function resetGame() {
  gameState = {
    currentLevel: 1,
    redFlagCount: 0,
    choices: {
      gift: null,
      restaurant: null,
      topic: null,
    },
  };

  // Reset UI
  redFlagCounter.textContent = "0";
  congratsModal.classList.remove("active");
  modalOverlay.classList.remove("active");
  errorModal.classList.remove("active");
  errorFeedback.textContent = "";

  // Reset level display
  levels.forEach((level) => level.classList.remove("active"));
  levels[0].classList.add("active");

  // Reset buttons
  updateNavButtons();

  // Scroll to top
  document.querySelector(".content-wrapper").scrollTop = 0;
}

// Animate Button on Click
function animateButton(button) {
  // Remove previous ripple if exists (only the ripple, not button content)
  const oldRipple = button.querySelector("span[data-ripple]");
  if (oldRipple) oldRipple.remove();

  // Add ripple effect
  const ripple = document.createElement("span");
  ripple.setAttribute("data-ripple", "true");
  ripple.style.position = "absolute";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.background = "rgba(255, 68, 88, 0.6)";
  ripple.style.borderRadius = "50%";
  ripple.style.left = "50%";
  ripple.style.top = "50%";
  ripple.style.transform = "translate(-50%, -50%)";
  ripple.style.animation = "ripple 0.6s ease-out forwards";
  ripple.style.pointerEvents = "none";

  button.style.position = "relative";
  button.style.overflow = "visible";
  button.appendChild(ripple);

  // Remove ripple after animation completes
  ripple.addEventListener("animationend", () => ripple.remove(), {
    once: true,
  });
}

// Add ripple animation to stylesheet dynamically
const style = document.createElement("style");
style.innerHTML = `
    @keyframes ripple {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        to {
            width: 150px;
            height: 150px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navigate to Next Level
function nextLevel() {
  if (gameState.currentLevel < 3) {
    // Exit animation for current level
    const currentLevelEl = levels[gameState.currentLevel - 1];
    currentLevelEl.classList.add("exit-left");
    currentLevelEl.classList.remove("active");

    // Move to next level
    gameState.currentLevel++;

    // Delay for smooth transition
    setTimeout(() => {
      const nextLevelEl = levels[gameState.currentLevel - 1];
      currentLevelEl.classList.remove("exit-left");
      nextLevelEl.classList.add("enter-right");
      nextLevelEl.classList.add("active");

      // Scroll to top for better UX
      document.querySelector(".content-wrapper").scrollTop = 0;

      // Update buttons
      updateNavButtons();

      // Reset animation classes
      setTimeout(() => {
        nextLevelEl.classList.remove("enter-right");
      }, 300);
    }, 300);
  }
}

// Navigate to Previous Level
function previousLevel() {
  if (gameState.currentLevel > 1) {
    // Exit animation for current level
    const currentLevelEl = levels[gameState.currentLevel - 1];
    currentLevelEl.classList.add("exit-left");
    currentLevelEl.classList.remove("active");

    // Move to previous level
    gameState.currentLevel--;

    // Delay for smooth transition
    setTimeout(() => {
      const prevLevelEl = levels[gameState.currentLevel - 1];
      currentLevelEl.classList.remove("exit-left");
      prevLevelEl.classList.add("enter-right");
      prevLevelEl.classList.add("active");

      // Scroll to top
      document.querySelector(".content-wrapper").scrollTop = 0;

      // Update buttons
      updateNavButtons();

      // Reset animation classes
      setTimeout(() => {
        prevLevelEl.classList.remove("enter-right");
      }, 300);
    }, 300);
  }
}

// Update Navigation Button States
function updateNavButtons() {
  // Back button
  if (gameState.currentLevel === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Check if current level has been answered
  const currentLevelKey = getLevelKey(gameState.currentLevel);
  const isAnswered = gameState.choices[currentLevelKey] !== null;

  // Next button - disable if no answer selected
  if (gameState.currentLevel === 3) {
    nextBtn.textContent = "Complete ✓";
  } else {
    nextBtn.textContent = "Next →";
  }

  nextBtn.disabled = !isAnswered;
}

// Get the choice key for current level
function getLevelKey(level) {
  const levelKeys = ["gift", "restaurant", "topic"];
  return levelKeys[level - 1];
}

// Add some fun Easter eggs and interactions
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextLevel();
  } else if (event.key === "ArrowLeft") {
    previousLevel();
  }
});

// Add hover sound effect simulation (visual only)
optionButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-4px)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)";
  });
});

// Fun feature: Show progress in console
console.log(
  "%cWelcome to Cupid's Chaos! 💕",
  "color: #ff4458; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cEvery choice leads to the same place: It's Complicated 😅",
  "color: #ffa3ab; font-size: 14px;",
);
console.log(
  "%cWill you collect all the red flags?",
  "color: #ff6b7a; font-size: 14px;",
);

// Track and display game stats
function getGameStats() {
  return {
    currentLevel: gameState.currentLevel,
    redFlags: gameState.redFlagCount,
    choices: gameState.choices,
    message: "💔 Relationship Status: It's Complicated",
  };
}

// Make stats available in console
window.getGameStats = getGameStats;
console.log(
  "%cTip: Type getGameStats() in the console to see your current game state!",
  "color: #6c6c7c; font-size: 12px;",
);
