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
                    <svg viewBox="0 0 24 24" id="chat-icon">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                        <circle cx="8" cy="10" r="1.5"/>
                        <circle cx="12" cy="10" r="1.5"/>
                        <circle cx="16" cy="10" r="1.5"/>
                    </svg>
                    <svg viewBox="0 0 24 24" id="close-icon" style="display: none;">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <span class="chatbot-badge">AI</span>
                </button>
                
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">✨</div>
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
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        toggleBtn.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const question = chip.getAttribute('data-question');
                input.value = question;
                this.sendMessage();
            });
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-toggle');
        const chatIcon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');

        if (this.isOpen) {
            window.classList.add('active');
            button.classList.add('active');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.remove('active');
            button.classList.remove('active');
            chatIcon.style.display = 'block';
            closeIcon.style.display = 'none';
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
        const messageHTML = `
            <div class="message ${message.type}">
                <div class="message-avatar">${message.type === 'bot' ? '✨' : '👤'}</div>
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
