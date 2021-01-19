class ChatUI {
    constructor() {
        this.window = document.querySelector('.window');
    }

    render(data) {
        const now = new Date();
        const before = data.created_at.toDate(); // Firebase function to convert firebase date to javascript date object
        const time = dateFns.distanceInWords(now, before, {addSuffix: true});
        let html = null;

        if (data.id === user.id) {
            html = `
                <li class="message you">
                    <div class="name">${user.name}</div>
                    <div class="text">${data.text}</div>
                    <div class="time">${time}</div>
                </li>
            `;
        } else {
            html = `
                <li class="message">
                    <div class="name">${data.name}</div>
                    <div class="text">${data.text}</div>
                    <div class="time">${time}</div>
                </li>
            `;
        }

        this.window.innerHTML += html;

        // Whenever a new message is added, we need to scroll to the very bottom of the chat window, if we added the query outside of the setTimeout then scroll height is calculated of the window before the addition of new message because page rendering occurs after return of eventListner. Hence we put it insid esetTimeout so that when chatroom.addMessage is return we are going to set yet another macrotask of setTimeout so when 100ms is completed then scrollHeight will be calculated which will include height of the added message.
        setTimeout(() => {

            // // For quick scroll
            // chatWindow.scrollTop = chatWindow.scrollHeight;

            this.window.scrollTo({
                top: this.window.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    }

    clear() {
        this.window.innerHTML = '';
    }
}