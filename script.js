// Import the Google Generative AI library
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI("AIzaSyDmlUbeUAKmU3r--6GDzndrra3LVlpKuHE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// DOM Elements
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const chatBox = document.getElementById('chat-box');

// Add event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle theme
function toggleTheme() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Initialize theme on load
initTheme();


async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage('user', message);
    userInput.value = '';
    showTypingIndicator();
    scrollToBottom();

    try {

        if (/who\s+(created|made|developed|built|build|create|develop)\s+(you|this)/i.test(message)) {
            setTimeout(() => {
                appendMessage('bot', 'Created by Carlo, Powered by Google Gemini Api!');
                scrollToBottom();
                hideTypingIndicator();
            }, 1500); // Simulate typing delay
        } else {
            const result = await model.generateContent(message);
            const responseText = await result.response.text();
            appendMessage('bot', responseText);
            scrollToBottom();
            hideTypingIndicator();
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, something went wrong. Please try again.');
        scrollToBottom();
        hideTypingIndicator();
    }
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = formatMessage(message);
    chatBox.appendChild(messageElement);
    scrollToBottom();
}

function formatMessage(message) {
    // Add current time to message
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeHtml = `<span class="message-time">${timeString}</span>`;
    
    // Format message content with Markdown-like syntax
    let formatted = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
        .replace(/\n\n/g, '<br><br>') // Paragraphs
        .replace(/\n/g, '<br>') // Line breaks
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="message-link">$1</a>'); // Links
    
    return `<div class="message-content">${formatted}${timeHtml}</div>`;
}

function showTypingIndicator() {
    document.getElementById('typing-indicator').classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    document.getElementById('typing-indicator').classList.remove('active');
}