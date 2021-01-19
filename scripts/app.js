const chatWindow = document.querySelector('.window');
const sendMessageForm = document.querySelector('.send-message');
const updateNameForm = document.querySelector('.update-name');
const rooms = document.querySelector('.buttons');

const chatroom = new Chatroom('general');
const chatUI = new ChatUI();
const user = new User();

chatroom.retrieveMessages(chatUI.render.bind(chatUI));

// Sending messages
sendMessageForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = sendMessageForm.message.value.trim();

    chatroom.addMessage(text, user.name, user.id);

    // Whenever a new message is added, we need to scroll to the very bottom of the chat window, if we added the query outside of the setTimeout then scroll height is calculated of the window before the addition of new message because page rendering occurs after return of eventListner. Hence we put it insid esetTimeout so that when chatroom.addMessage is return we are going to set yet another macrotask of setTimeout so when 100ms is completed then scrollHeight will be calculated which will include height of the added message.
    setTimeout(() => {

        // // For quick scroll
        // chatWindow.scrollTop = chatWindow.scrollHeight;

        chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }, 100);

    sendMessageForm.reset();
});

// Updating name
updateNameForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = updateNameForm.name.value.trim();

    user.changeName(name);
    updateNameForm.reset();
});

// Changing room
rooms.addEventListener('click', event => {
    event.stopPropagation();
    const array = Array.from(rooms.children);

    if (event.target.className === 'button') {
        const roomname = event.target.getAttribute('id');
        if (roomname === chatroom.name) {

        } else {
            array.forEach(element => element.style.borderBottomWidth = '6px');
            event.target.style.borderBottomWidth = '4px';

            // Clearing window, changing room and setting up new real-time listner.
            chatUI.clear();
            chatroom.changeRoom(roomname);
            chatroom.retrieveMessages(chatUI.render.bind(chatUI));
        }
        
    }
});


