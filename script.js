// Import the Google Generative AI library (ensure you include it via a <script> tag or ES6 module)
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";



// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI("AIzaSyDmlUbeUAKmU3r--6GDzndrra3LVlpKuHE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Add event listeners
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message === "") return;

    appendMessage('user', message);
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Generate a response using the Google Generative AI model
        const result = await model.generateContent(message);
        const responseText = await result.response.text();

        // Append the bot's response to the chat box
        appendMessage('bot', responseText);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, something went wrong. Please try again.');
    } finally {
        // Hide typing indicator
        hideTypingIndicator();
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    // Format the message
    const formattedMessage = formatMessage(message);

    // Set the inner HTML of the message element
    messageElement.innerHTML = formattedMessage;

    // Append the message to the chat box
    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

function formatMessage(message) {
    // Remove all * characters
    message = message.replace(/\*/g, '');

    // Replace double newlines with <br> for better spacing
    message = message.replace(/\n\n/g, '<br>');

    // Replace single newlines with spaces
    message = message.replace(/\n/g, '');

    // Replace **text** with <strong>text</strong> for bold
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace *text* with <em>text</em> for italics
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace URLs with clickable links
    message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    return message;
}
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
}