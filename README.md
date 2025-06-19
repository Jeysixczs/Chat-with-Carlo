# 🤖 Chat with Carlo

**Chat with Carlo** is a sleek, responsive AI chatbot interface powered by **Google Gemini API**. This project allows users to interact with a conversational assistant using natural language and a modern UI inspired by today's leading AI platforms.

---

## 🚀 Features

- ⚡ Real-time interaction with **Google Gemini 1.5 Flash** model  
- 🌓 **Light/Dark mode** toggle with auto-detection of system theme  
- 🎨 Stylish, responsive UI with animated typing indicator  
- ⏰ Timestamps for messages  
- 💬 Multi-line text input with `Shift + Enter` support  
- 📄 Markdown-style formatting: bold, italic, links  
- 🎉 Friendly welcome screen with tips and a pulse glow animation  
- 🧠 Handles special queries like "Who created you?"

---

## 🛠️ Technologies Used

- **HTML5**, **CSS3**, and **Vanilla JavaScript**
- [Google Gemini AI API](https://ai.google.dev/)
- [Font Awesome 6.4](https://fontawesome.com/)
- Google Fonts (`Inter`, `Poppins`)

---

## 📂 Project Structure

```
├── index.html        # Main HTML structure
├── styles.css        # Custom styles (not included here)
├── script.js         # Chatbot functionality and logic
└── README.md         # Project documentation
```

---

## 🔧 Setup & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-with-carlo.git
cd chat-with-carlo
```

### 2. Open `index.html` in a browser

You can simply double-click the file or serve it with a local development server (e.g., using VSCode Live Server).

### 3. Customize Your Gemini API Key

Replace the API key in `script.js`:

```js
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");
```

> 💡 To get an API key, visit [Google AI Studio](https://ai.google.dev/).

---



## 🧑‍💻 Author

Built with ❤️ by **Carlo (JeysiDev)**  
📅 © 2025 — All rights reserved

---

## 📃 License

This project is open-source under the [MIT License](LICENSE).