document.addEventListener('DOMContentLoaded', function() {
  // =====================
  // 1. MOBILE NAVIGATION
  // =====================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // =====================
  // 2. SMOOTH SCROLLING
  // =====================
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

  // =====================
  // 3. AUDIENCE TOGGLE (FIXED)
  // =====================
  const audienceToggle = document.getElementById('audienceToggle');
  const startupContent = document.getElementById('startupContent');
  const investorContent = document.getElementById('investorContent');
  
  // Initialize visibility
  startupContent.classList.remove('hidden');
  investorContent.classList.add('hidden');
  
  audienceToggle.addEventListener('change', function() {
    startupContent.classList.toggle('hidden');
    investorContent.classList.toggle('hidden');
  });

  // =====================
  // 4. CAROUSEL
  // =====================
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  if (carouselTrack && prevBtn && nextBtn) {
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
  }

  // =====================
  // 5. FAQ ACCORDION (FIXED)
  // =====================
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
    // Initialize - close all except first
    if (btn !== accordionBtns[0]) {
      btn.nextElementSibling.style.maxHeight = null;
    } else {
      btn.classList.add('active');
      btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
    }
    
    btn.addEventListener('click', function() {
      // Toggle current item
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

  // =====================
  // 6. CONTACT FORM
  // =====================
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

  // =====================
  // 7. THEME TOGGLE (FIXED)
  // =====================
  const themeToggle = document.getElementById('themeToggle');
  
  // Set initial theme from localStorage or preference
  function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      document.body.classList.remove('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  
  // Initialize theme
  setInitialTheme();
  
  // Toggle theme
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      this.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      this.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // =====================
  // 8. VISITOR COUNTER
  // =====================
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

  // =====================
  // 9. BACK TO TOP BUTTON
  // =====================
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
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
  }

  // =====================
  // 10. CHATBOT (FIXED DOUBLE MESSAGES)
  // =====================
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const sampleQuestions = document.querySelectorAll('.sample-question');

  // Chatbot context
  const chatbotContext = `
    You are LegIT, an AI legal assistant for African startups. Your purpose is to help founders navigate legal challenges. Here's what you know:

    - Founders: LegIT was founded by Derrick Mbote and a team of law students, developers, and creatives.
    - Problem: African tech ventures often collapse due to legal missteps.
    - Mission: Make tech law accessible for African entrepreneurs.
    - Services: InstaContract, Lex Dash, and Investor Ready tools.
    - Vision: Democratize legal knowledge across Africa's tech ecosystem.
    - Contact: hello@legit.africa

    Rules:
    - Respond concisely (1-3 sentences)
    - Focus on African legal context
    - If unsure, direct to contact email
  `;

  // Local fallback responses
  const localResponses = {
    "who founded": "LegIT was founded by Derrick Mbote and a team passionate about making legal tools accessible to African startups.",
    "what problem": "We solve legal challenges that cause African tech ventures to fail, from contract issues to compliance problems.",
    "what service": "We offer: 1) InstaContract for documents, 2) Lex Dash for compliance, and 3) Investor Ready tools.",
    "how contact": "Email us at hello@legit.africa - we typically respond within 24 hours.",
    "what vision": "We envision an African tech ecosystem where legal protection is accessible to every founder."
  };

  // Initialize Puter.js
  let puterReady = false;
  let isProcessing = false; // To prevent double submissions

  function initPuter() {
    return new Promise((resolve) => {
      if (window.puter) {
        puterReady = true;
        return resolve();
      }

      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.onload = () => {
        puterReady = true;
        console.log('Puter.js loaded');
        resolve();
      };
      script.onerror = () => {
        console.warn('Puter.js failed to load - using fallback');
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = content; // Use textContent to prevent HTML injection
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  // Get local response if API fails
  function getLocalResponse(question) {
    const lowerQ = question.toLowerCase();
    for (const [key, answer] of Object.entries(localResponses)) {
      if (lowerQ.includes(key)) return answer;
    }
    return "I can answer about LegIT's services, team, or mission. Try asking 'What services do you offer?' or email hello@legit.africa for specific legal advice.";
  }

  // Process user message
  async function processMessage(message) {
    if (!message.trim()) {
      addMessage("Please ask a question about LegIT or African startup law.");
      return;
    }

    isProcessing = true;
    const typingElement = showTyping();
    addMessage(message, true);
    userInput.value = '';

    // Try Puter.js API first
    if (puterReady) {
      try {
        const response = await puter.ai.chat({
          context: chatbotContext,
          message: message,
          model: 'gpt-3.5-turbo',
          timeout: 8000
        });
        
        hideTyping(typingElement);
        if (response?.content) {
          addMessage(response.content);
          isProcessing = false;
          return;
        }
      } catch (error) {
        console.warn("Puter.js error:", error);
      }
    }

    // Fallback to local responses
    hideTyping(typingElement);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate typing delay
    addMessage(getLocalResponse(message));
    isProcessing = false;
  }

  // Event listeners
  sendMessageBtn.addEventListener('click', () => {
    if (!isProcessing) processMessage(userInput.value);
  });

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      processMessage(userInput.value);
    }
  });

  // Sample questions
  sampleQuestions.forEach(button => {
    button.addEventListener('click', () => {
      if (!isProcessing) processMessage(button.textContent);
    });
  });

  // Initialize
  initPuter().then(() => {
    setTimeout(() => {
      addMessage("Hello! I'm LegIT's AI assistant. Ask me about our services for African startups.");
    }, 1000);
  });

  // Helper function
  function hideTyping(typingElement) {
    if (typingElement?.parentNode) {
      typingElement.remove();
    }
  }
});
