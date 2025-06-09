document.addEventListener('DOMContentLoaded', function() {
 
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });


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


const audienceToggle = document.getElementById('audienceToggle');
const startupContent = document.getElementById('startupContent');
const investorContent = document.getElementById('investorContent');

if (audienceToggle && startupContent && investorContent) {
  audienceToggle.addEventListener('change', function () {
    startupContent.classList.toggle('hidden');
    investorContent.classList.toggle('hidden');
  });
}



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

  const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  if (localStorage.getItem('theme') === 'dark' || 
      (localStorage.getItem('theme') === null && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    this.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
}

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

  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const sampleQuestions = document.querySelectorAll('.sample-question');

  // Chatbot context - defines the AI's knowledge
  const chatbotContext = `
    You are LegIT, an AI legal assistant for African startups. Your purpose is to help founders navigate legal challenges. Here's what you know:

    - Founders: LegIT was founded by Derrick Mbote and a team of law students, developers, and creatives.
    - Problem: African tech ventures often collapse due to legal missteps, like Derrick's friend whose app was cloned with no legal recourse.
    - Mission: Make tech law accessible and part of the build process for African entrepreneurs.
    - Services:
      * InstaContract: AI-generated legal documents (NDAs, Terms of Use, IP agreements)
      * Lex Dash: Compliance monitoring for African jurisdictions
      * Investor Ready: Legal prep for fundraising
    - Vision: Protect Africa's rising tech ecosystem by democratizing legal knowledge.
    - Contact: Email hello@legit.africa or visit our website.
    - Tone: Professional but approachable, with African tech enthusiasm.

    Rules:
    - Always answer in the context of African startup law
    - If unsure, suggest contacting the LegIT team
    - Keep responses under 3 sentences unless detailed explanation is needed
  `;

  // Local fallback responses
  const localResponses = {
    "who founded": "LegIT was founded by Derrick Mbote and a team of law students, developers, and creatives who saw the need for accessible legal tools in Africa's tech ecosystem.",
    "what problem": "We solve the legal challenges that cause African startups to fail - from contract issues to compliance problems and investor readiness.",
    "what service": "We offer: 1) InstaContract for document generation, 2) Lex Dash for compliance, and 3) Investor Ready tools for fundraising.",
    "how contact": "Reach us at hello@legit.africa or through our contact form. We're based in Nairobi but serve all of Africa.",
    "what vision": "Our vision is a thriving African tech ecosystem where legal protection is accessible to every founder, not just well-funded startups."
  };

  // Initialize Puter.js
  let puterReady = false;
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
        console.warn('Puter.js failed to load - using fallback responses');
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = content;
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

  // Remove typing indicator
  function hideTyping(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.remove();
    }
  }

  // Get local response if API fails
  function getLocalResponse(question) {
    const lowerQ = question.toLowerCase();
    for (const [key, answer] of Object.entries(localResponses)) {
      if (lowerQ.includes(key)) return answer;
    }
    return "I can answer questions about LegIT's founding, services, and mission. Try asking about our team or products.";
  }

  // Send message to AI or use fallback
  async function sendToAI(message) {
    if (!message.trim()) {
      addMessage("Please type a question about LegIT or African startup law.");
      return;
    }

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
        if (response && response.content) {
          addMessage(response.content);
          return;
        }
      } catch (error) {
        console.warn("Puter.js error:", error);
      }
    }

    // Fallback to local responses
    hideTyping(typingElement);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate typing delay
    addMessage(getLocalResponse(message));
  }

  // Event listeners
function handleSend() {
  if (userInput.disabled) return;
  userInput.disabled = true;
  sendToAI(userInput.value).then(() => {
    userInput.disabled = false;
  });
}

sendMessageBtn?.addEventListener('click', handleSend);
userInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});


  // Sample questions
  sampleQuestions.forEach(button => {
    button.addEventListener('click', () => {
      sendToAI(button.textContent);
    });
  });

  // Initialize
  initPuter().then(() => {
    setTimeout(() => {
      addMessage("Hello! I'm LegIT, your AI legal assistant. Ask me about our services, team, or African startup law.");
    }, 1500);
  });
});
