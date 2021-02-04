const chatWindow = document.querySelector('.window');
const sendMessageForm = document.querySelector('.send-message');
const updateNameForm = document.querySelector('.update-name');
const rooms = document.querySelector('.buttons');
const displayName = document.querySelector('.display-name > span');
const updateNameButton = document.querySelector('.display-name > i');
const updateNameField = document.forms.updateName.name;

const chatroom = new Chatroom('general');
const chatUI = new ChatUI();
const user = new User();

displayName.textContent = localStorage.getItem('chitChatUsername');
chatroom.retrieveMessages(chatUI.render.bind(chatUI));


// Sending messages
let text = '';
const nil = /^[\n\r\s]{1,}$/;

const replaceNewlineCharacter = function(str) {
    // str = str.replace(/(\r\n|\n|\r)/gm, "<br>");
    // return str

    let text = '';
    for (let char of str.split('')) {
        if (char === '\n' || char === '\r') {
            text += '<br>';
        } else {
            text += char;
        }
    }
    return text
};

sendMessageForm.addEventListener('submit', event => {
    event.preventDefault();

    let text = sendMessageForm.message.value;

    if (nil.test(text)) {
        // Don't send blank message
    } else {
        text = replaceNewlineCharacter(text);
        chatroom.addMessage(text.trim(), user.name, user.id);
    }
    sendMessageForm.reset();
});

// "Shift + Enter" --> New line, "Enter" --> Submit
sendMessageForm.addEventListener('keypress', event => {
    let text = sendMessageForm.message.value;

    if (event.keyCode === 13 && event.shiftKey) {
    // Do default action which is go to newline
    } else if (event.keyCode === 13) {
        // Submit
        if (nil.test(text)) {
            // Don't send blank message
        } else {
            text = replaceNewlineCharacter(text);
            chatroom.addMessage(text.trim(), user.name, user.id);
        }       
        sendMessageForm.reset();
    }
});

sendMessageForm.addEventListener('keyup', event => {
    event.target.style.height = '30px';
    event.target.style.height = `${event.target.scrollHeight + 2}px`;

    scrollTo({
        top: document.querySelector('body').scrollHeight,
        left: 0,
    });
});


// Updating name
let clicks = 0;

// Toggling input field
updateNameButton.addEventListener('click', event => {
    if (clicks%2 === 0) {
        updateNameField.style.right = '0px';
        clicks += 1;
    } else {
        updateNameField.style.right = '-195px';
        clicks += 1;
    }
});

// Updating the actual name
updateNameForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = updateNameForm.name.value.trim();

    user.changeName(name);
    displayName.textContent = name;
    updateNameField.style.right = '-195px';
    clicks += 1;
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


