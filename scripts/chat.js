// Creating chatroom class
class Chatroom {
    constructor(roomname) {
        this.name = roomname;
        this.messages = db.collection('messages');
        this.unsubscribe = null;
    }

    async addMessage(text, name, id) {
        const now = new Date();
        const message = {
            id: id,
            name: name,
            text: text,
            room: this.name,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        const response = await this.messages.add(message);

        return this;
    }

    retrieveMessages(callback) {
        // Following is an eventlistner which is hooked to our database. So when the retrieveMessages method is called, this eventlistner will be sent to Web API, so whenever even after retrieveMessages is returned from the callstack this eventlistner will trigger if any change occurs in our database. Firebase itself provides all the methods and functions like where, orderBy and onSnapshot.
        this.unsubscribe = this.messages
            .where('room', '==', this.name) // Filter the messages
            .orderBy('created_at') // Sort the messages
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    const data = change.doc.data();
                    if (change.type === 'added') {
                        callback(data);
                    }
                });
            });
    }

    changeRoom(roomname) {
        // Whenever a room is updated, first we want to unsubscribe from the previous real-time listner. Since real-time listners are just like eventlistners, whenever they are executed they are sent to Web API. So if there is some kind of event they get triggred. Though we are not going to assign new real-time listner now, it is the job of retrieveMessages() method. We are going to call it after room is changed.
        // We are unsubscribing from previous RT listner because if we don't and change the room, though different room is not going to share messages from previous room, but if we again change to previous room then this room is conna have 2 RT listners listning to DB. So if we post message to that room, that message is gonna appear twice xD
        this.unsubscribe();
        this.name = roomname;
        chatUI.changeWindowBackground(roomname);
    }
}

// Creating user class
class User {
    constructor() {
        if (localStorage.getItem('chitChatID') !== null) {
            this.id = localStorage.getItem('chitChatID');
            this.name = localStorage.getItem('chitChatUsername');
        } else {
            this.id = uuidv4();
            this.name = 'New user';
            localStorage.setItem('chitChatID', this.id);
            localStorage.setItem('chitChatUsername', this.name);
        }
    }

    changeName(newName) {
        this.name = newName;
        localStorage.setItem('chitChatUsername', this.name);
    }
}