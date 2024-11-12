document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('message').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    });

    document.addEventListener('click', function() {
        document.getElementById('context-menu').style.display = 'none';
    });

    document.getElementById('message-board').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showContextMenu(e);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('private-message')) {
                e.preventDefault();
                const recipient = activeElement.closest('.private-chat').dataset.recipient;
                sendPrivateMessage(recipient);
            } else if (activeElement.classList.contains('group-message')) {
                e.preventDefault();
                const groupName = activeElement.closest('.group-chat').dataset.groupName;
                sendGroupMessage(groupName);
            }
        }
    });
});

const username = 'UsuarioRegistrado';

function addMessage() {
    const message = document.getElementById('message').value;

    if (username && message) {
        const messageBoard = document.getElementById('message-board');
        const now = new Date();
        const time = now.toLocaleTimeString();
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
            <div class="user-info">
                <strong>${username}</strong>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <small>${time}</small>
            </div>
        `;
        messageBoard.appendChild(newMessage);
        document.getElementById('message').value = '';
        messageBoard.scrollTop = messageBoard.scrollHeight;
    } else {
        alert('Por favor, completa todos los campos antes de enviar el mensaje.');
    }
}

function showContextMenu(e) {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.display = 'block';

    const replyOption = document.getElementById('reply-private');
    replyOption.onclick = function() {
        const recipient = prompt('Ingresa el nombre del usuario para el chat privado:');
        if (recipient) {
            openPrivateChat(recipient);
        }
        contextMenu.style.display = 'none';
    };
}

function openPrivateChat(recipient) {
    const privateChatsContainer = document.getElementById('private-chats-container');
    const chatExists = Array.from(privateChatsContainer.children).some(chat => chat.dataset.recipient === recipient);

    if (!chatExists) {
        const privateChat = document.createElement('div');
        privateChat.classList.add('private-chat');
        privateChat.dataset.recipient = recipient;
        privateChat.innerHTML = `
            <h3>Chat privado con ${recipient}</h3>
            <div class="private-message-board"></div>
            <div class="private-message-form">
                <textarea class="private-message" placeholder="Escribe tu mensaje privado..."></textarea>
                <button onclick="sendPrivateMessage('${recipient}')">Enviar</button>
            </div>
        `;
        privateChatsContainer.appendChild(privateChat);
    }
}

function sendPrivateMessage(recipient) {
    const privateChat = document.querySelector(`.private-chat[data-recipient='${recipient}']`);
    const messageBoard = privateChat.querySelector('.private-message-board');
    const messageInput = privateChat.querySelector('.private-message');
    const message = messageInput.value;

    if (username && message) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const newMessage = document.createElement('div');
        newMessage.classList.add('private-message');
        newMessage.innerHTML = `
            <div class="user-info">
                <strong>${username}</strong>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <small>${time}</small>
            </div>
        `;
        messageBoard.appendChild(newMessage);
        messageInput.value = '';
        messageBoard.scrollTop = messageBoard.scrollHeight;
    } else {
        alert('Por favor, completa todos los campos antes de enviar el mensaje.');
    }
}

function openGroupChat(groupName) {
    const groupChatsContainer = document.getElementById('group-chats-container');
    const chatExists = Array.from(groupChatsContainer.children).some(chat => chat.dataset.groupName === groupName);

    if (!chatExists) {
        const groupChat = document.createElement('div');
        groupChat.classList.add('group-chat');
        groupChat.dataset.groupName = groupName;
        groupChat.innerHTML = `
            <h3>Chat de grupo: ${groupName}</h3>
            <div class="group-message-board"></div>
            <div class="group-message-form">
                <textarea class="group-message" placeholder="Escribe tu mensaje en el grupo..."></textarea>
                <button onclick="sendGroupMessage('${groupName}')">Enviar</button>
            </div>
        `;
        groupChatsContainer.appendChild(groupChat);
    }
}

function sendGroupMessage(groupName) {
    const groupChat = document.querySelector(`.group-chat[data-group-name='${groupName}']`);
    const messageBoard = groupChat.querySelector('.group-message-board');
    const messageInput = groupChat.querySelector('.group-message');
    const message = messageInput.value;

    if (username && message) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const newMessage = document.createElement('div');
        newMessage.classList.add('group-message');
        newMessage.innerHTML = `
            <div class="user-info">
                <strong>${username}</strong>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <small>${time}</small>
            </div>
        `;
        messageBoard.appendChild(newMessage);
        messageInput.value = '';
        messageBoard.scrollTop = messageBoard.scrollHeight;
    } else {
        alert('Por favor, completa todos los campos antes de enviar el mensaje.');
    }
}
