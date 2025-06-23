// Smooth scroll for navigation links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Fade-in animation on scroll
  function revealOnScroll() {
    document.querySelectorAll('.fade-in, .card, .mini-card, .proj-card, .contact-card, .contact-form').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Contact form handler (demo only)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('formMsg').textContent = "Thank you for your message!";
      form.reset();
    });
  }

  // Dark mode/light mode toggle
  const darkBtn = document.getElementById('darkModeToggle');
  // Set initial mode
  if (!document.body.classList.contains('darkmode') && !document.body.classList.contains('lightmode')) {
    document.body.classList.add('lightmode');
  }
  if (darkBtn) {
    darkBtn.addEventListener('click', function () {
      if (document.body.classList.contains('darkmode')) {
        document.body.classList.remove('darkmode');
        document.body.classList.add('lightmode');
        darkBtn.textContent = '🌙';
      } else {
        document.body.classList.remove('lightmode');
        document.body.classList.add('darkmode');
        darkBtn.textContent = '☀️';
      }
    });
  }

  // Audience Questions Form handler
  const audienceForm = document.getElementById('audienceQuestionForm');
  if (audienceForm) {
    audienceForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = audienceForm.audienceName.value;
      const email = audienceForm.audienceEmail.value;
      const question = audienceForm.audienceQuestion.value;
      const msgDiv = document.getElementById('audienceMsg');
      msgDiv.textContent = "Submitting...";
      try {
        const res = await fetch('/api/audience-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, question })
        });
        if (res.ok) {
          msgDiv.textContent = "Thank you for your question!";
          audienceForm.reset();
        } else {
          msgDiv.textContent = "There was an error. Please try again.";
        }
      } catch {
        msgDiv.textContent = "There was an error. Please try again.";
      }
    });
  }
});
