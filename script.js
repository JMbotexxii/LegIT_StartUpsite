document.addEventListener('DOMContentLoaded', function() {
  // =====================
  // 1. DARK MODE TOGGLE (FIXED)
  // =====================
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    // Initialize theme from localStorage or preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
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
  }

  // =====================
  // 2. AUDIENCE TOGGLE (FIXED)
  // =====================
  const audienceToggle = document.getElementById('audienceToggle');
  if (audienceToggle) {
    // Initialize visibility
    document.getElementById('startupContent').classList.remove('hidden');
    document.getElementById('investorContent').classList.add('hidden');
    
    audienceToggle.addEventListener('change', function() {
      document.getElementById('startupContent').classList.toggle('hidden');
      document.getElementById('investorContent').classList.toggle('hidden');
    });
  }

  // =====================
  // 3. FAQ ACCORDION (FIXED)
  // =====================
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  if (accordionBtns.length > 0) {
    accordionBtns.forEach((btn, index) => {
      // Initialize - first item open by default
      if (index === 0) {
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
  }

  // =====================
  // 4. CHATBOT (FIXED DOUBLE MESSAGES)
  // =====================
  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const sampleQuestions = document.querySelectorAll('.sample-question');
  
  if (chatMessages && userInput && sendMessageBtn) {
    let isProcessing = false;
    
    // Chatbot context
    const chatbotContext = `
      You are LegIT, an AI legal assistant for African startups. Key facts:
      - Founded by Derrick Mbote
      - Services: InstaContract, Lex Dash, Investor Ready
      - Focus: African startup legal needs
      - Contact: hello@legit.africa
      Rules:
      - Respond concisely (1-3 sentences)
      - Focus on African legal context
      - If unsure, direct to contact email
    `;

    // Local fallback responses
    const localResponses = {
      "who founded": "LegIT was founded by Derrick Mbote and a team passionate about African startup legal needs.",
      "what problem": "We solve legal challenges facing African startups, from contracts to compliance.",
      "what service": "We offer InstaContract (documents), Lex Dash (compliance), and Investor Ready tools.",
      "how contact": "Email us at hello@legit.africa - we typically respond within 24 hours.",
      "what vision": "We envision making legal protection accessible to every African founder."
    };

    // Add message to chat
    function addMessage(content, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      messageDiv.textContent = content;
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

    // Process user message
    async function processMessage(message) {
      if (isProcessing) return;
      isProcessing = true;
      
      const typingElement = showTyping();
      addMessage(message, true);
      userInput.value = '';

      try {
        // Try Puter.js API first
        if (window.puter && window.puter.ai) {
          const response = await puter.ai.chat({
            context: chatbotContext,
            message: message,
            timeout: 5000
          });
          
          if (response?.content) {
            typingElement.remove();
            addMessage(response.content);
            isProcessing = false;
            return;
          }
        }
        
        // Fallback to local responses
        typingElement.remove();
        const lowerMessage = message.toLowerCase();
        let response = "I can answer about LegIT's services, team, or mission. Try asking 'What services do you offer?'";
        
        for (const [key, answer] of Object.entries(localResponses)) {
          if (lowerMessage.includes(key)) {
            response = answer;
            break;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate typing
        addMessage(response);
      } catch (error) {
        console.error("Chatbot error:", error);
        typingElement.remove();
        addMessage("Our AI is currently unavailable. Please email hello@legit.africa");
      }
      
      isProcessing = false;
    }

    // Event listeners
    sendMessageBtn.addEventListener('click', () => {
      processMessage(userInput.value.trim());
    });

    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        processMessage(userInput.value.trim());
      }
    });

    // Sample questions
    sampleQuestions.forEach(button => {
      button.addEventListener('click', () => {
        processMessage(button.textContent.trim());
      });
    });

    // Initial greeting
    setTimeout(() => {
      addMessage("Hello! I'm LegIT's AI assistant. Ask me about our services for African startups.");
    }, 1000);
  }

  // =====================
  // 5. BACK TO TOP BUTTON
  // =====================
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Load Puter.js (place this right before </body>)
const puterScript = document.createElement('script');
puterScript.src = 'https://js.puter.com/v2/';
document.body.appendChild(puterScript);
