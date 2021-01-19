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


