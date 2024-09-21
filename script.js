let userName = '';

document.getElementById("setNameButton").addEventListener("click", function() {
    userName = document.getElementById("nameInput").value;
    if (userName) {
        document.getElementById("chatArea").innerHTML += `<div><strong>${userName}:</strong> Hoş geldiniz!</div>`;
        document.getElementById("nameInput").value = '';
    }
});

document.getElementById("sendButton").addEventListener("click", function() {
    const messageInput = document.getElementById("messageInput");
    const messageContent = messageInput.value;

    if (messageContent && userName) {
        displayMessage(messageContent);
        messageInput.value = '';
        document.getElementById("waitMessage").style.display = 'block';
        setTimeout(() => {
            document.getElementById("waitMessage").style.display = 'none';
        }, 5000); // 5 saniye bekleme
    }
});

function displayMessage(message) {
    const chatArea = document.getElementById("chatArea");
    chatArea.innerHTML += `<div><strong>${userName}:</strong> ${message}</div>`;
    chatArea.scrollTop = chatArea.scrollHeight; // En son mesaja kaydır
}

// Forum gönderimleri
document.getElementById("postButton").addEventListener("click", function() {
    const forumInput = document.getElementById("forumInput");
    const postContent = forumInput.value;
    
    if (postContent) {
        const forumPosts = document.getElementById("forumPosts");
        const postDiv = document.createElement("div");
        postDiv.classList.add("forum-post");
        postDiv.textContent = postContent; // Gönderi içeriği
        forumPosts.appendChild(postDiv);
        forumInput.value = ''; // Giriş alanını temizle
    }
});
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    socket.on('message', (message) => {
        // Tüm bağlı kullanıcılara mesaj gönder
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
