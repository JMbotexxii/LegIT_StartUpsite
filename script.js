document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Audience Toggle
  const audienceToggle = document.getElementById('audienceToggle');
  const startupContent = document.getElementById('startupContent');
  const investorContent = document.getElementById('investorContent');
  
  audienceToggle.addEventListener('change', function() {
    startupContent.classList.toggle('hidden');
    investorContent.classList.toggle('hidden');
  });

  // Carousel Navigation
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  prevBtn.addEventListener('click', () => {
    carouselTrack.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });
  
  nextBtn.addEventListener('click', () => {
    carouselTrack.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });

  // FAQ Accordion
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      
      // Close other accordion items
      accordionBtns.forEach(otherBtn => {
        if (otherBtn !== this) {
          otherBtn.classList.remove('active');
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });
    });
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Form is valid
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme
  if (localStorage.getItem('theme') === 'dark' || 
      (localStorage.getItem('theme') === null && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Toggle theme
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // Visitor Counter
  const visitCount = document.getElementById('visitCount');
  
  if (visitCount) {
    let count = localStorage.getItem('visitCount');
    
    if (count === null) {
      count = 1;
    } else {
      count = parseInt(count) + 1;
    }
    
    localStorage.setItem('visitCount', count);
    visitCount.textContent = count;
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});