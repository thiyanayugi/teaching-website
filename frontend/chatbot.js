// AI Chatbot Widget
class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.apiUrl = '/api/chat';
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chatbot-button" id="chatbot-toggle">
                    <svg viewBox="0 0 24 24" id="chat-icon" style="fill: white;">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2M7.5 13C6.12 13 5 14.12 5 15.5C5 16.88 6.12 18 7.5 18C8.88 18 10 16.88 10 15.5C10 14.12 8.88 13 7.5 13M16.5 13C15.12 13 14 14.12 14 15.5C14 16.88 15.12 18 16.5 18C17.88 18 19 16.88 19 15.5C19 14.12 17.88 13 16.5 13Z" fill="white"/>
                    </svg>
                    <svg viewBox="0 0 24 24" id="close-icon" style="display: none;">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#ef4444"/>
                    </svg>
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">
                                <img src="avatar.png" alt="AI Assistant" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; transform: scale(1.5);">
                            </div>
                            <div class="chatbot-title">
                                <h3>AI Assistant</h3>
                                <p>Ask me anything about the courses!</p>
                            </div>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">×</button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages"></div>
                    
                    <div class="chatbot-input-area">
                        <div class="chatbot-suggestions" id="chatbot-suggestions">
                            <div class="suggestion-chip" data-question="What courses do you offer?">What courses?</div>
                            <div class="suggestion-chip" data-question="What is your teaching approach?">Teaching approach?</div>
                            <div class="suggestion-chip" data-question="How can I get started?">Get started?</div>
                        </div>
                        <div class="chatbot-input-wrapper">
                            <input 
                                type="text" 
                                class="chatbot-input" 
                                id="chatbot-input" 
                                placeholder="Ask a question..."
                                autocomplete="off"
                            />
                            <button class="chatbot-send" id="chatbot-send">
                                <svg viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.closeBtn = document.getElementById('chatbot-close');
        this.sendBtn = document.getElementById('chatbot-send');
        this.input = document.getElementById('chatbot-input');
        this.chatbotWindow = document.getElementById('chatbot-window'); // Assign to property
        this.chatIcon = document.getElementById('chat-icon');
        this.closeIcon = document.getElementById('close-icon');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        this.chatbotContainer = document.querySelector('.chatbot-container');
        this.chatbotHeader = document.querySelector('.chatbot-header');
        
        // Drag Logic Variables
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        let dragStartTime;

        const dragStart = (e) => {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            // Allow dragging from button or header
            if (this.toggleBtn.contains(e.target) || this.chatbotHeader.contains(e.target)) {
                isDragging = true;
                dragStartTime = new Date().getTime();
            }
        };

        const dragEnd = (e) => {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, this.chatbotContainer);
            }
        };

        const setTranslate = (xPos, yPos, el) => {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        };

        // Attach Drag Listeners
        this.chatbotContainer.addEventListener("mousedown", dragStart);
        this.chatbotContainer.addEventListener("touchstart", dragStart, { passive: false });
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd);
        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag, { passive: false });

        this.toggleBtn.addEventListener('click', (e) => {
            // Only toggle if it was a click (short duration), not a drag
            const dragDuration = new Date().getTime() - dragStartTime;
            if (dragDuration < 200) {
                this.toggleChatbot();
            }
        });
        
        // Close button click
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering document click
            this.toggleChatbot();
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            // If we are currently dragging, don't close
            if (isDragging) return;

            const isClickInside = this.chatbotContainer.contains(e.target);
            
            if (this.isOpen && !isClickInside) {
                this.toggleChatbot();
            }
        });

        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage(); // Assuming handleUserInput was a typo and sendMessage is intended
            }
        });

        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.getAttribute('data-question');
                this.input.value = question; // Use this.input
                this.sendMessage();
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            // Calculate widget position relative to viewport
            const rect = this.chatbotContainer.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Determine optimal position for chat window
            const isOnRightSide = rect.left > viewportWidth / 2;
            const isOnBottomHalf = rect.top > viewportHeight / 2;
            
            // Apply positioning classes
            this.chatbotWindow.classList.remove('position-left', 'position-right', 'position-top', 'position-bottom');
            
            if (isOnRightSide) {
                this.chatbotWindow.classList.add('position-left');
            } else {
                this.chatbotWindow.classList.add('position-right');
            }
            
            if (isOnBottomHalf) {
                this.chatbotWindow.classList.add('position-top');
            } else {
                this.chatbotWindow.classList.add('position-bottom');
            }
            
            this.chatbotWindow.classList.add('active');
            this.toggleBtn.classList.add('active');
            this.chatIcon.style.display = 'none';
            this.closeIcon.style.display = 'block';
            this.chatbotWindow.style.opacity = '1';
            this.chatbotWindow.style.visibility = 'visible';
            
            // Fade in content with delay
            this.chatbotWindow.querySelectorAll('*').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 300);
            });
            document.getElementById('chatbot-input').focus();

        } else {
            this.chatbotWindow.classList.remove('active');
            this.toggleBtn.classList.remove('active');
            this.chatIcon.style.display = 'block';
            this.closeIcon.style.display = 'none';
            this.chatbotWindow.style.opacity = '0';
            this.chatbotWindow.style.visibility = 'hidden';
        }
    }

    closeChatbot() {
        if (this.isOpen) {
            this.toggleChatbot();
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = {
            type: 'bot',
            text: "Hi! 👋 I'm your AI assistant. I can answer questions about Thiyanayugi's AI and Automation courses. What would you like to know?",
            time: new Date()
        };
        this.addMessage(welcomeMsg);
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const avatarHTML = message.type === 'bot' 
            ? '<img src="avatar.png" alt="AI" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; transform: scale(1.5);">'
            : '👤';
        const messageHTML = `
            <div class="message ${message.type}">
                <div class="message-avatar">${avatarHTML}</div>
                <div class="message-content">
                    ${message.text}
                    <div class="message-time">${this.formatTime(message.time)}</div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="message bot typing-message">
                <div class="message-avatar">✨</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage({
            type: 'user',
            text: message,
            time: new Date()
        });

        input.value = '';
        sendBtn.disabled = true;

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            this.hideTypingIndicator();

            if (data.success) {
                this.addMessage({
                    type: 'bot',
                    text: data.response,
                    time: new Date()
                });
            } else {
                throw new Error(data.message || 'Failed to get response');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage({
                type: 'bot',
                text: "I'm sorry, I'm having trouble connecting right now. Please try again or use the contact form below.",
                time: new Date()
            });
            console.error('Chatbot error:', error);
        } finally {
            sendBtn.disabled = false;
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AIChatbot();
    });
} else {
    new AIChatbot();
}
