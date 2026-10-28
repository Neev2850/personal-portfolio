// ==========================================================
// Neev Rupareliya - Portfolio Script
// ==========================================================

// 1. Projects Data
const projects = [
  {
    title: 'Python Programs Collection',
    description: 'A collection of core Python programs covering factorial calculation, Fibonacci sequence, and structure-to-dictionary conversion.',
    tech: ['Python', 'Problem Solving'],
    github: 'https://github.com/Neev2850/personal-portfolio',
    live: ''
  },
  {
    title: 'Messy Python Code Improvement',
    description: 'Refactored messy Python scripts with AI assistance, focusing on code readability, modular structure, and optimal logic.',
    tech: ['Python', 'AI'],
    github: 'https://github.com/Neev2850/personal-portfolio',
    live: ''
  },
  {
    title: 'Bug Fixing Using Cursor AI',
    description: 'Debugged and corrected logic flaws and runtime issues using Cursor AI as an intelligent assistant during development.',
    tech: ['Python', 'Cursor AI', 'Debugging'],
    github: 'https://github.com/Neev2850/personal-portfolio',
    live: ''
  },
  {
    title: 'Interactive Quiz Application',
    description: 'Interactive quiz application built with HTML, CSS, and JavaScript featuring dynamic questions and score tracking.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Neev2850/personal-portfolio',
    live: ''
  },
  {
    title: 'Book Reading List Application',
    description: 'Web application designed for tracking book reading progress, wishlist management, and reading goals.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Neev2850/personal-portfolio',
    live: ''
  }
];

// Expose globally for testing/inspection
window.projects = projects;

// Render Projects into #project-list
function renderProjects(items) {
  const projectList = document.getElementById('project-list');
  if (!projectList) return;

  projectList.innerHTML = '';

  if (!items || items.length === 0) {
    const noProjects = document.createElement('p');
    noProjects.className = 'no-projects';
    noProjects.textContent = 'No projects found';
    projectList.appendChild(noProjects);
    return;
  }

  items.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Title
    const titleEl = document.createElement('h3');
    titleEl.textContent = project.title;
    card.appendChild(titleEl);

    // Description
    const descEl = document.createElement('p');
    descEl.textContent = project.description;
    card.appendChild(descEl);

    // Tech Tags
    if (Array.isArray(project.tech) && project.tech.length > 0) {
      const techContainer = document.createElement('div');
      techContainer.className = 'project-tech';
      project.tech.forEach(techItem => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = techItem;
        techContainer.appendChild(tag);
      });
      card.appendChild(techContainer);
    }

    // Links Container
    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-links';

    // GitHub Link
    if (project.github && project.github.trim() !== '') {
      const githubLink = document.createElement('a');
      githubLink.href = project.github;
      githubLink.textContent = 'GitHub';
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      githubLink.className = 'btn btn-github';
      githubLink.setAttribute('role', 'button');
      linksContainer.appendChild(githubLink);
    }

    // Live Link (shown ONLY if live is not empty)
    if (project.live && project.live.trim() !== '') {
      const liveLink = document.createElement('a');
      liveLink.href = project.live;
      liveLink.textContent = 'Live';
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.className = 'btn btn-live';
      liveLink.setAttribute('role', 'button');
      linksContainer.appendChild(liveLink);
    }

    card.appendChild(linksContainer);
    projectList.appendChild(card);
  });
}

// 2. Live Search Filtering
function initSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      renderProjects(projects);
      return;
    }

    const filtered = projects.filter(project => {
      const titleMatch = (project.title || '').toLowerCase().includes(query);
      const descMatch = (project.description || '').toLowerCase().includes(query);
      const techMatch = Array.isArray(project.tech) && project.tech.some(t => t.toLowerCase().includes(query));
      return titleMatch || descMatch || techMatch;
    });

    renderProjects(filtered);
  });
}

// 3. Dark Mode & Hamburger Menu
function initNavigationAndTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      if (themeToggle) themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      if (themeToggle) themeToggle.textContent = '🌓';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Initial theme check
  if (savedTheme === 'dark') {
    applyTheme(true);
  } else if (savedTheme === 'light') {
    applyTheme(false);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark');
      const newTheme = isCurrentlyDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(!isCurrentlyDark);
    });
  }

  // Hamburger Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking nav link on mobile
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// 4. Local Assistant Knowledge Base (Fallback & Instant Engine)
function getLocalAssistantReply(message) {
  const query = message.toLowerCase().trim();

  if (/^(hi|hello|hey|hola|greetings)/i.test(query)) {
    return "Hello! 👋 I'm Neev Rupareliya's AI Assistant. How can I assist you with exploring his portfolio today?";
  }
  if (query.includes('who') || query.includes('about') || query.includes('name')) {
    return "Neev Rupareliya is a 2nd-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur. He is an aspiring software developer passionate about building clean, accessible, and practical web applications.";
  }
  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language')) {
    return "Neev is proficient in Python, HTML5, CSS3, JavaScript (ES6+), C++, C, Git, GitHub, Cursor AI, and responsive web design.";
  }
  if (query.includes('project') || query.includes('work') || query.includes('built')) {
    return "Neev's highlighted projects include: 1) Python Programs Collection, 2) Messy Python Code Improvement using AI, 3) Bug Fixing with Cursor AI, 4) Interactive Quiz Application, and 5) Book Reading List Application.";
  }
  if (query.includes('college') || query.includes('university') || query.includes('study') || query.includes('education') || query.includes('cgpa') || query.includes('degree')) {
    return "Neev is studying B.Tech in Computer Science and Engineering at JECRC University, Jaipur. He is in his 2nd year (Class of 2029) and currently maintains an impressive CGPA of 8.0.";
  }
  if (query.includes('contact') || query.includes('email') || query.includes('mail') || query.includes('reach') || query.includes('hire')) {
    return "You can get in touch with Neev directly via email at neevrupareliya@gmail.com, or check out his GitHub at https://github.com/Neev2850/personal-portfolio.";
  }
  if (query.includes('github') || query.includes('repo')) {
    return "You can find Neev's GitHub profile and source code at: https://github.com/Neev2850/personal-portfolio";
  }

  return "Neev Rupareliya is a B.Tech CSE student at JECRC University, Jaipur with skills in Python, JavaScript, and web development. Feel free to ask about his education, skills, projects, or contact details!";
}

// 5. Chatbot Setup
function initChatbot() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const quickBtns = document.querySelectorAll('.quick-btn');

  if (!chatMessages || !chatInput || !chatSend) return;

  // Add initial greeting if empty
  if (chatMessages.children.length === 0) {
    const greeting = document.createElement('div');
    greeting.className = 'chat-message bot';
    greeting.textContent = "👋 Hi there! I'm Neev's AI portfolio assistant. Ask me anything about his skills, education, projects, or contact details!";
    chatMessages.appendChild(greeting);
  }

  let isSending = false;

  async function handleSend(customMessage) {
    if (isSending) return;

    const message = (customMessage || chatInput.value).trim();
    if (!message) return;

    // Clear input
    chatInput.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = message;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-message bot typing-indicator';
    typingMsg.textContent = 'Assistant is typing...';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    isSending = true;
    chatSend.disabled = true;

    try {
      let replyText = '';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: message })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.reply === 'string') {
            replyText = data.reply;
          }
        }
      } catch (networkErr) {
        // Fallback to local assistant engine if backend is not deployed
      }

      // If backend didn't reply, use the reliable local engine
      if (!replyText) {
        replyText = getLocalAssistantReply(message);
      }

      typingMsg.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.textContent = replyText;
      chatMessages.appendChild(botMsg);
    } catch (err) {
      typingMsg.remove();
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.textContent = getLocalAssistantReply(message);
      chatMessages.appendChild(botMsg);
    } finally {
      isSending = false;
      chatSend.disabled = false;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.focus();
    }
  }

  chatSend.addEventListener('click', () => handleSend());

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      if (prompt) {
        handleSend(prompt);
      }
    });
  });
}

// 6. Year in Footer
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// Initialize when DOM is ready
function init() {
  renderProjects(projects);
  initSearch();
  initNavigationAndTheme();
  initChatbot();
  initYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
