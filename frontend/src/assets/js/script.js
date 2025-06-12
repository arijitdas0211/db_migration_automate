// Database Migration Console JavaScript - UI Effects Only

// DOM elements
// DOM elements (declared but not populated initially)
const elements = {};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  // Now safely assign DOM elements
  elements.form = document.getElementById("connectionForm");
  elements.serverEnvironment = document.getElementById("serverEnvironment");
  elements.database = document.getElementById("database");
  elements.username = document.getElementById("username");
  elements.password = document.getElementById("password");
  elements.loadingOverlay = document.getElementById("loadingOverlay");
  elements.passwordToggleIcon = document.getElementById("passwordToggleIcon");

  initializeApp();
  setupEventListeners();
  addMaterialEffects();
  animateCards();
});

// Initialize application
function initializeApp() {
  console.log("Database Migration Console initialized");
  setupTooltips();
  setupFormValidation();
}

// Setup event listeners for UI interactions
function setupEventListeners() {
  // Form inputs for focus effects
  const formInputs = [
    elements.serverEnvironment,
    elements.database,
    elements.username,
    elements.password,
  ];

  formInputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus);
    input.addEventListener("blur", handleInputBlur);
    input.addEventListener("input", handleInputChange);
  });

  // Button hover effects
  setupButtonEffects();

  // Card hover effects
  setupCardEffects();

  // Window resize handler
  window.addEventListener("resize", debounce(handleResize, 250));

  // Smooth scrolling for internal links
  setupSmoothScrolling();
}

// Handle input focus with material design effects
function handleInputFocus(e) {
  const wrapper =
    e.target.closest(".input-wrapper") || e.target.closest(".select-wrapper");
  if (wrapper) {
    wrapper.classList.add("focused");
    addFocusRipple(wrapper);
  }

  // Add floating label effect
  const label = e.target.previousElementSibling;
  if (label && label.classList.contains("form-label")) {
    label.classList.add("label-floating");
  }
}

// Handle input blur
function handleInputBlur(e) {
  const wrapper =
    e.target.closest(".input-wrapper") || e.target.closest(".select-wrapper");
  if (wrapper) {
    wrapper.classList.remove("focused");
  }

  // Remove floating label if empty
  const label = e.target.previousElementSibling;
  if (label && label.classList.contains("form-label") && !e.target.value) {
    label.classList.remove("label-floating");
  }
}

// Handle input change for validation styling
function handleInputChange(e) {
  const input = e.target;
  const wrapper =
    input.closest(".input-wrapper") || input.closest(".select-wrapper");

  // Add filled state
  if (input.value) {
    wrapper?.classList.add("filled");
  } else {
    wrapper?.classList.remove("filled");
  }

  // Real-time validation styling
  if (input.checkValidity()) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else if (input.value) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

// Add focus ripple effect
function addFocusRipple(wrapper) {
  const existing = wrapper.querySelector(".focus-ripple");
  if (existing) existing.remove();

  const ripple = document.createElement("div");
  ripple.className = "focus-ripple";
  wrapper.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Toggle password visibility with animation
function togglePassword() {
  const passwordField = elements.password;
  const toggleIcon = elements.passwordToggleIcon;

  // Add click animation
  toggleIcon.style.transform = "scale(0.8)";

  setTimeout(() => {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }

    toggleIcon.style.transform = "scale(1)";
  }, 150);
}

// Connect button click handler (UI effects only)
function connectToDatabase() {
  const connectBtn = document.querySelector(".btn-connect");

  // Add loading state
  connectBtn.disabled = true;
  connectBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Connecting...';

  // Show loading overlay
  showLoadingOverlay(true);

  // Simulate connection process (remove this in React implementation)
  setTimeout(() => {
    showLoadingOverlay(false);
    connectBtn.disabled = false;
    connectBtn.innerHTML =
      '<i class="fas fa-plug me-2"></i>Connect to Database';

    // Show success notification
    showNotification("UI Demo - Replace with actual connection logic", "info");
  }, 2000);
}

// Setup button effects
function setupButtonEffects() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    btn.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)";
    });

    btn.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1)";
    });
  });
}

// Setup card hover effects
function setupCardEffects() {
  const cards = document.querySelectorAll(".material-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "var(--shadow-3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "var(--shadow-1)";
    });
  });
}

// Setup form validation for UI feedback
function setupFormValidation() {
  const form = elements.form;
  const inputs = form.querySelectorAll("input, select");

  inputs.forEach((input) => {
    input.addEventListener("invalid", function (e) {
      e.preventDefault();
      this.classList.add("is-invalid");
      addShakeAnimation(this);
    });
  });
}

// Add shake animation for invalid inputs
function addShakeAnimation(element) {
  element.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    element.style.animation = "";
  }, 500);
}

// Show/hide loading overlay
function showLoadingOverlay(show) {
  const overlay = elements.loadingOverlay;
  if (show) {
    overlay.style.display = "flex";
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.opacity = "1";
    }, 10);
  } else {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);
  }
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification alert alert-${type} alert-dismissible fade show`;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        box-shadow: var(--shadow-3);
    `;

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(notification);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 150);
    }
  }, 5000);
}

// Animate cards on load
function animateCards() {
  const cards = document.querySelectorAll(".material-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Setup tooltips
function setupTooltips() {
  // Initialize Bootstrap tooltips if needed
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  if (window.bootstrap) {
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Handle window resize
function handleResize() {
  // Adjust layout for different screen sizes
  const mainContainer = document.querySelector(".main-container");
  const cards = document.querySelectorAll(".material-card");

  if (window.innerWidth < 768) {
    mainContainer.classList.add("mobile-layout");
    cards.forEach((card) => {
      card.style.margin = "0.5rem 0";
    });
  } else {
    mainContainer.classList.remove("mobile-layout");
    cards.forEach((card) => {
      card.style.margin = "";
    });
  }
}

// Add material design effects
function addMaterialEffects() {
  // Add ripple effect CSS
  const style = document.createElement("style");
  style.textContent = `
        .focus-ripple {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%);
            animation: focusRipple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes focusRipple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .label-floating {
            transform: translateY(-8px) scale(0.875);
            color: var(--primary-blue);
        }
        
        .filled .select-icon,
        .filled .input-icon {
            color: var(--primary-blue);
        }
        
        .is-valid {
            border-color: var(--success-green);
        }
        
        .is-invalid {
            border-color: var(--danger-red);
        }
        
        .mobile-layout .card {
            margin: 0.5rem 0 !important;
        }
        
        .notification {
            animation: slideInRight 0.3s ease-out;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

  document.head.appendChild(style);
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for potential use in React
window.DatabaseMigrationUI = {
  togglePassword,
  connectToDatabase,
  showNotification,
  showLoadingOverlay,
};
