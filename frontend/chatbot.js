// =====================================
// AI TERMINAL CHATBOT
// Futuristic floating terminal
// =====================================

const chatData = {
    start: {
        msg: "System Online. I am the AI Assistant. How can I help you?",
        options: [
            { text: "What do you teach?", next: "teaching" },
            { text: "Pricing & Rates", next: "pricing" },
            { text: "Book a Call", next: "booking" }
        ]
    },
    teaching: {
        msg: "I specialize in two main tracks:\n1. Artificial Intelligence (LLMs, Agents, RAG)\n2. Robotics & Automation (ROS, Computer Vision)",
        options: [
            { text: "Tell me about AI", next: "ai_details" },
            { text: "Tell me about Robotics", next: "robotics_details" },
            { text: "Back to Start", next: "start" }
        ]
    },
    pricing: {
        msg: "My sessions are personalized. I offer a free initial consultation to assess your level and goals. After that, we can discuss a rate that works for you.",
        options: [
            { text: "Book Free Call", next: "booking" },
            { text: "Back to Start", next: "start" }
        ]
    },
    booking: {
        msg: "You can book a free 30-minute discovery call directly via Calendly.",
        options: [
            { text: "Open Calendly", action: "open_link", url: "https://calendly.com/mariraj-thiyanayugi/30min" },
            { text: "Back to Start", next: "start" }
        ]
    },
    ai_details: {
        msg: "In AI, we cover: Large Language Models, Prompt Engineering, Building Agents with CrewAI/LangChain, and RAG systems.",
        options: [
            { text: "Sounds good!", next: "start" }
        ]
    },
    robotics_details: {
        msg: "In Robotics, we focus on ROS (Robot Operating System), SLAM, Path Planning, and Sensor Fusion using Python/C++.",
        options: [
            { text: "Sounds good!", next: "start" }
        ]
    }
};

class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.render();
        this.attachEvents();
    }

    render() {
        // Create Chat Interface
        const chatHTML = `
            <div id="ai-chat-widget">
                <button id="chat-toggle" aria-label="Open AI Assistant">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span class="status-dot"></span>
                </button>

                <div id="chat-window">
                    <div class="chat-header">
                        <div class="terminal-title">
                            <span class="blink">></span> AI_ASSISTANT_V1.0
                        </div>
                        <button id="chat-close">×</button>
                    </div>
                    <div id="chat-messages" class="terminal-body"></div>
                    <div id="chat-choices"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEvents() {
        this.widget = document.getElementById('ai-chat-widget');
        this.window = document.getElementById('chat-window');
        this.messages = document.getElementById('chat-messages');
        this.choices = document.getElementById('chat-choices');

        document.getElementById('chat-toggle').addEventListener('click', () => this.toggle());
        document.getElementById('chat-close').addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.widget.classList.toggle('open', this.isOpen);
        if (this.isOpen && this.messages.children.length === 0) {
            this.showNode('start');
        }
    }

    addMessage(text, sender = 'bot') {
        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        // Typewriter effect for bot
        if (sender === 'bot') {
            div.textContent = '> ';
            this.messages.appendChild(div);
            this.typeText(div, text);
        } else {
            div.textContent = `> USER: ${text}`;
            this.messages.appendChild(div);
            this.scrollToBottom();
        }
    }

    typeText(element, text, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => this.typeText(element, text, index + 1), 20);
        } else {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    showNode(nodeKey) {
        const node = chatData[nodeKey];
        this.addMessage(node.msg, 'bot');
        this.choices.innerHTML = '';

        // Wait for typing to finish roughly before showing options
        setTimeout(() => {
            node.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = `[ ${opt.text} ]`;
                btn.onclick = () => this.handleChoice(opt);
                this.choices.appendChild(btn);
            });
        }, node.msg.length * 20 + 300);
    }

    handleChoice(opt) {
        this.addMessage(opt.text, 'user');
        this.choices.innerHTML = ''; // Clear choices

        if (opt.action === 'open_link') {
            window.open(opt.url, '_blank');
            this.addMessage("Opening link...", 'bot');
            setTimeout(() => this.showNode('start'), 1000);
        } else if (opt.next) {
            setTimeout(() => this.showNode(opt.next), 500);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AIChatbot();
});
