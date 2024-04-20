const db = require("../data/dbConfig");
const Chat = require("../models/chat");

async function saveMessage(text, author_id, order_id) {
  return db("chat").insert({text, author_id, order_id}, ["text", "message_id", "order_id"]);
}

async function findAllByOrderId(id) {
  return db("chat")
    .join("users", "author_id", "=", "users.id")
    .select("id", "order_id", "text", "author_id", "created_at", "updated_at", "users.username")
    .where("order_id", id)
    .orderBy("created_at");
}

module.exports = {
  findAllByOrderId,
  saveMessage,
  chatingModel:Chat
};
