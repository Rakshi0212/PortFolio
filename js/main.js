/**
 * RAKSHITHA PORTFOLIO - CORE SCRIPTS
 * Interactive features, terminal simulator, project modals, animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initTerminal();
  initSkillsFilter();
  initClipboard();
  initResumeModal();
  initMobileMenu();
  initStatsCounter();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const words = [
    "AI & Data Science Student",
    "Machine Learning Enthusiast",
    "Full-Stack Flask Developer",
    "Relational Database Designer",
    "CGPA 9.1 Academic Top Performer"
  ];
  
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. INTERACTIVE TERMINAL SIMULATOR
   ========================================================================== */
function initTerminal() {
  const termButtons = document.querySelectorAll('.term-btn');
  const codeOutput = document.getElementById('terminal-output');
  const cmdDisplay = document.getElementById('terminal-cmd');

  if (!codeOutput || !cmdDisplay) return;

  const dataset = {
    'bio': {
      cmd: 'rakshitha.get_profile()',
      content: `{
  <span class="json-key">"name"</span>: <span class="json-string">"Rakshitha"</span>,
  <span class="json-key">"location"</span>: <span class="json-string">"Udupi, Karnataka, India"</span>,
  <span class="json-key">"education"</span>: <span class="json-string">"B.E. in Artificial Intelligence & Data Science"</span>,
  <span class="json-key">"institution"</span>: <span class="json-string">"SMVITM, Bantakal"</span>,
  <span class="json-key">"current_cgpa"</span>: <span class="json-num">9.1</span>,
  <span class="json-key">"status"</span>: <span class="json-string">"Actively seeking Internships"</span>
}`
    },
    'skills': {
      cmd: 'rakshitha.get_core_stack()',
      content: `{
  <span class="json-key">"programming"</span>: [<span class="json-string">"Python"</span>, <span class="json-string">"SQL (MySQL)"</span>],
  <span class="json-key">"data_science_ml"</span>: [<span class="json-string">"NumPy"</span>, <span class="json-string">"Pandas"</span>, <span class="json-string">"Matplotlib"</span>, <span class="json-string">"Machine Learning (basics)"</span>, <span class="json-string">"EDA"</span>, <span class="json-string">"Power BI & Tableau (basics)"</span>],
  <span class="json-key">"database_adv"</span>: [<span class="json-string">"Triggers"</span>, <span class="json-string">"Stored Procedures"</span>, <span class="json-string">"Schema Optimization"</span>],
  <span class="json-key">"tools_deployment"</span>: [<span class="json-string">"Git"</span>, <span class="json-string">"GitHub"</span>, <span class="json-string">"Render Cloud"</span>, <span class="json-string">"Microsoft Excel"</span>]
}`
    },
    'experience': {
      cmd: 'rakshitha.get_work_experience()',
      content: `{
  <span class="json-key">"role"</span>: <span class="json-string">"Full Stack Development Virtual Intern"</span>,
  <span class="json-key">"organization"</span>: <span class="json-string">"Code Alpha"</span>,
  <span class="json-key">"duration"</span>: <span class="json-string">"20 Jul 2026 – 20 Aug 2026"</span>,
  <span class="json-key">"honors"</span>: [<span class="json-string">"Certificate of Completion"</span>, <span class="json-string">"Letter of Recommendation"</span>],
  <span class="json-key">"domain"</span>: <span class="json-string">"Full Stack Development & Emerging Technologies"</span>
}`
    },
    'projects': {
      cmd: 'rakshitha.get_active_deployments()',
      content: `[
  {
    <span class="json-key">"project"</span>: <span class="json-string">"CareerPulse AI"</span>,
    <span class="json-key">"type"</span>: <span class="json-string">"Tech Career Skill Gap & Salary Valuation Platform"</span>,
    <span class="json-key">"deployment"</span>: <span class="json-string">"Live on Render"</span>,
    <span class="json-key">"metric_output"</span>: <span class="json-string">"Salary Valuation in ₹ LPA + Skill Gap Roadmaps"</span>,
    <span class="json-key">"live_url"</span>: <span class="json-string">"https://careerpulse-ai-qmvh.onrender.com"</span>
  },
  {
    <span class="json-key">"project"</span>: <span class="json-string">"Vehicle Rental Management System"</span>,
    <span class="json-key">"type"</span>: <span class="json-string">"Enterprise Fleet & Booking Platform"</span>,
    <span class="json-key">"features"</span>: [<span class="json-string">"Triggers"</span>, <span class="json-string">"Stored Procedures"</span>, <span class="json-string">"Flask Backend"</span>, <span class="json-string">"MySQL"</span>],
    <span class="json-key">"live_url"</span>: <span class="json-string">"https://vehicle-rental-system-j894.onrender.com/"</span>
  }
]`,
    },
    'contact': {
      cmd: 'rakshitha.get_channels()',
      content: `{
  <span class="json-key">"academic_email"</span>: <span class="json-string">"rakshitha.24ad034@sode-edu.in"</span>,
  <span class="json-key">"personal_email"</span>: <span class="json-string">"rakshithak275@gmail.com"</span>,
  <span class="json-key">"phone"</span>: <span class="json-string">"+91 6362314817"</span>,
  <span class="json-key">"linkedin"</span>: <span class="json-string">"https://www.linkedin.com/in/rakshitha-kulal-30b36635a"</span>,
  <span class="json-key">"github"</span>: <span class="json-string">"https://github.com/Rakshi0212"</span>,
  <span class="json-key">"location"</span>: <span class="json-string">"Shirva, Udupi, Karnataka – 574116"</span>
}`
    }
  };

  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      termButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-cmd');
      if (dataset[key]) {
        cmdDisplay.textContent = dataset[key].cmd;
        codeOutput.innerHTML = dataset[key].content;
      }
    });
  });
}

/* ==========================================================================
   4. SKILLS FILTER TABS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function initClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-msg');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(err => {
        showToast(`Copied: ${textToCopy}`);
      });
    });
  });

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   6. RESUME MODAL HANDLER
   ========================================================================== */
function initResumeModal() {
  const openBtns = document.querySelectorAll('.open-resume-modal');
  const closeBtns = document.querySelectorAll('.close-modal-trigger');
  const modal = document.getElementById('resume-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   7. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

/* ==========================================================================
   8. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  function runCounter() {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const isDecimal = stat.getAttribute('data-decimal') === 'true';
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const step = target / 40;

      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = (isDecimal ? current.toFixed(1) : Math.ceil(current)) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      };

      updateCount();
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounter();
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }
}

/* ==========================================================================
   9. CONTACT FORM INTERACTION
   ========================================================================== */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  const mailtoUrl = `mailto:rakshitha.24ad034@sode-edu.in?cc=rakshithak275@gmail.com&subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender Email: " + email + "\n\nMessage:\n" + message)}`;
  
  window.open(mailtoUrl, '_blank');
  
  const statusEl = document.getElementById('form-status');
  if (statusEl) {
    statusEl.innerHTML = `<span style="color: #34d399; font-size: 0.9rem; font-weight: 600;">Opening mail client to reach Rakshitha directly!</span>`;
  }
};
