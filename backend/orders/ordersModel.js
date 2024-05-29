const db = require("../data/dbConfig");
const Order = require("../models/offer");
const { commonOrdersFields } = require("./ordersHelper");

async function findById(id) {
  const order = await db("orders").where({ id }).first();

  return order
}

async function findOrderByOfferId(id) {
  const order = await db("orders").where({ offer_id:id }).andWhere(function () {
    this.where("orders.status", "created");
  });

  return order
}

async function saveOrder(newOrder, transaction) {
    const [savedOrderId] = await db("orders")
    .insert(newOrder.toRow())
    .returning("id");

return findById(savedOrderId?.id);
 
}

async function fetchAllOffers() {
  return db("orders").orderBy("updated_at", "desc");
}

function findMyOrders(id) {
  return db("orders")
    .leftJoin({ u1: "users" }, "orders.maker_id", "=", "u1.id")
    .leftJoin({ u2: "users" }, "orders.taker_id", "=", "u2.id")
    .where(function () {
      this.where("orders.taker_id", id).orWhere("orders.maker_id", id);
    });
}

function findOrderIdUserId(userId) {
  return db("orders")
    .leftJoin({ u1: "users" }, "orders.maker_id", "=", "u1.id")
    .leftJoin({ u2: "users" }, "orders.taker_id", "=", "u2.id")
    .where(function () {
      this.where("orders.status", "created");
    })
    .andWhere(function () {
      this.where("orders.taker_id", userId).orWhere("orders.maker_id", userId);
    });
}

function findCompletedOrders(userId) {
  return db("orders")
    .where(function () {
      this.where("orders.status", "completed");
    })
    .where(function () {
      this.where("orders.taker_id", userId);
    });
}

async function updateOrderById(order) {
  const [updatedOrder] = await db("orders")
      .where({id: order.id})
      .update(order.toRow(), ['buy_dash', 'city', 'country', 'payment_method', 'currency_type', 'currency_symbol',
        'dynamic_pricing', 'margin', 'margin_above', 'market_exchange', 'limit_min', 'limit_max',
        'headline', 'trade_terms', 'open_hours', 'close_hours', 'trusted_only', 'maker_id', 'pause']);

  return findById(updatedOrder.id);
}

module.exports = {
  findById,
  saveOrder,
  findMyOrders,
  findOrderIdUserId,
  updateOrderById,
  fetchAllOffers,
  findCompletedOrders,
  findOrderByOfferId
};
