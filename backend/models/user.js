class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    toRow() {
        return {
            username: this.username ?? null,
            password: this.password ?? null,
        }
    }

    static fromRow({ username, password,
    }) {
        return new User(
            username, password,
        );
    }

    static fromJSON({ username, password
    }) {
        return new User(username, password);
    }

}

module.exports = User