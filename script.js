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
document.addEventListener('DOMContentLoaded', function() {
puter.ai()
  // Chatbot Implementation
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const sampleQuestions = document.querySelectorAll('.sample-question');

  // Chatbot context - this defines the AI's knowledge
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

  // Add a message to the chat
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
    typingElement.remove();
  }

  // Send message to Puter.js AI
  async function sendToAI(message) {
    const typingElement = showTyping();
    
    try {
      const response = await puter.ai.chat({
        context: chatbotContext,
        message: message,
        model: 'gpt-3.5-turbo'
      });
      
      hideTyping(typingElement);
      addMessage(response.content);
    } catch (error) {
      hideTyping(typingElement);
      addMessage("Sorry, I'm having trouble connecting. Please try again later.");
      console.error("Chatbot error:", error);
    }
  }

  // Handle user message
  function handleUserMessage() {
    const message = userInput.value.trim();
    if (!message) {
      addMessage("Please type a question so I can help you.", false);
      return;
    }
    
    addMessage(message, true);
    userInput.value = '';
    sendToAI(message);
  }

  // Event listeners
  sendMessageBtn.addEventListener('click', handleUserMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
  });

  // Sample questions
  sampleQuestions.forEach(button => {
    button.addEventListener('click', () => {
      userInput.value = button.textContent;
      handleUserMessage();
    });
  });

  // Initial greeting
  addMessage("Hello! I'm LegIT, your AI legal assistant. How can I help you with African startup law today?", false);
});
async function sendToAI(message) {
  const typingElement = showTyping();
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
  // ... rest of function
}

// Add Puter.js script to your HTML head
const puterScript = document.createElement('script');
puterScript.src = 'https://js.puter.com/v2/';
document.head.appendChild(puterScript);
puterScript.onload = () => {You are LegIT, an AI legal assistant for African startups. Your purpose is to help founders navigate legal challenges. Here's what you know:

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
 
};

