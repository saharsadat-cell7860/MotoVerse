document.addEventListener("DOMContentLoaded", () => {

  /* ================================
       2. SMOOTH SCROLL
    ================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ================================
       3. MOTORCYCLE FILTER
    ================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const bikeCards = document.querySelectorAll(".bike-card");

  if (filterButtons.length && bikeCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class
        filterButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        bikeCards.forEach((card) => {
          const category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.style.display = "block";

            setTimeout(() => {
              card.classList.add("show-card");
            }, 50);
          } else {
            card.classList.remove("show-card");

            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  }

  /* ================================
       4. SCROLL REVEAL ANIMATION
    ================================= */

  const revealElements = document.querySelectorAll(
    ".bike-card, .category-card, .why-card, .performance-card, .value-card, .stat-card, .contact-info, .contact-form-card",
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");

      revealObserver.observe(element);
    });
  }

  /* ================================
       5. BOOK TEST RIDE MODAL
    ================================= */

  const testRideButtons = document.querySelectorAll(
    'a[href="contact.html"], .test-ride-btn',
  );

  /*
       We don't change normal contact navigation.
       Modal will only work for elements having:
       data-bs-toggle="modal"
    */

  const testRideModal = document.querySelector("#testRideModal");

  if (testRideModal) {
    const motorcycleSelect = testRideModal.querySelector("#modalMotorcycle");

    const modalButtons = document.querySelectorAll(
      '[data-bs-target="#testRideModal"]',
    );

    modalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const bikeName = button.getAttribute("data-bike");

        if (bikeName && motorcycleSelect) {
          motorcycleSelect.value = bikeName;
        }
      });
    });
  }

  /* ================================
       6. TEST RIDE FORM
    ================================= */

  const testRideForm = document.querySelector("#testRideForm");

  if (testRideForm) {
    testRideForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        this.classList.add("was-validated");

        return;
      }

      const successMessage = document.querySelector("#testRideSuccess");

      if (successMessage) {
        successMessage.classList.remove("d-none");
      }

      this.reset();

      this.classList.remove("was-validated");
    });
  }

  /* ================================
       7. CONTACT FORM VALIDATION
    ================================= */

  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        e.stopPropagation();

        this.classList.add("was-validated");

        return;
      }

      const submitButton = this.querySelector(".contact-submit");

      const originalText = submitButton ? submitButton.innerHTML : "";

      if (submitButton) {
        submitButton.disabled = true;

        submitButton.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Sending...
                `;
      }

      setTimeout(() => {
        const successMessage = document.querySelector("#contactSuccess");

        if (successMessage) {
          successMessage.classList.remove("d-none");
        }

        contactForm.reset();

        contactForm.classList.remove("was-validated");

        if (submitButton) {
          submitButton.disabled = false;

          submitButton.innerHTML = originalText;
        }
      }, 1200);
    });
  }

  /* ================================
       8. AUTO CURRENT YEAR
    ================================= */

  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* ================================
       9. CLOSE MOBILE NAVBAR
    ================================= */

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* ================================
       10. IMAGE LAZY LOADING
    ================================= */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (!image.hasAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }
  });

  /* ================================
       11. ACTIVE NAVBAR LINK
    ================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    link.classList.remove("active");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
