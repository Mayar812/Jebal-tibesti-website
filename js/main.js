(function () {
  "use strict";

  const loader = document.querySelector(".loader");
  const navbar = document.querySelector(".main-navbar");
  const backToTop = document.querySelector(".back-to-top");
  const yearNodes = document.querySelectorAll(".current-year");
  const contactForm = null;

  window.addEventListener("load", () => {
    if (loader) loader.classList.add("is-hidden");
  });

  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const handleScroll = () => {
    const scrolled = window.scrollY > 20;
    if (navbar) navbar.classList.toggle("scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 520);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";
    let started = false;

    const animate = () => {
      if (started) return;
      started = true;
      const duration = 1300;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });
      observer.observe(counter);
    } else {
      animate();
    }
  });

  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 720,
      easing: "ease-out-cubic",
      offset: 80
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector("button[type='submit']");
      const message = contactForm.querySelector(".form-message");

      if (submitButton) submitButton.disabled = true;
      if (message) {
        message.className = "form-message alert alert-success mt-3";
        message.textContent = "تم تجهيز بيانات الرسالة. اربط EmailJS في js/main.js لإرسالها مباشرة.";
      }

      window.setTimeout(() => {
        if (submitButton) submitButton.disabled = false;
      }, 1200);

      /*
        EmailJS integration:
        1. Add EmailJS SDK before js/main.js.
        2. emailjs.init("YOUR_PUBLIC_KEY");
        3. Replace this block with:
           emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", contactForm);
      */
    });
  }
})();
