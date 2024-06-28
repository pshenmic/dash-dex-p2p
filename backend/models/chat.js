class Chat {
    constructor(text, author_id, order_id) {
        this.text = text;
        this.author_id = author_id;
        this.order_id = order_id;
    }

    toRow() {
        return {
            text: this.text ?? null,
            author_id: this.author_id ?? null,
            order_id: this.order_id ?? null,
        }
    }

    static fromRow({ text, author_id, order_id,
    }) {
        return new Chat(
            text, author_id, order_id,
        );
    }

    static fromJSON({ text, author_id, order_id}) {
        return new Chat(text, author_id, order_id);
    }

}

module.exports = Chat