class ChatUI {
    constructor() {
        this.window = chatWindow;
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
    }

    clear() {
        this.window.innerHTML = '';
    }
}