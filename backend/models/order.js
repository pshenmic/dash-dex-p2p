class Order {
    constructor(isComplete, status, isMakerBuying, makerId, takerId, offerId, priceDASH, dashAmount, fiatAmount, createdAt, updatedAt) {
        this.isComplete = isComplete;
        this.status = status;
        this.isMakerBuying = isMakerBuying;
        this.makerId = makerId;
        this.takerId = takerId;
        this.offerId = offerId;
        this.priceDASH = priceDASH;
        this.dashAmount = dashAmount;
        this.fiatAmount = fiatAmount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toRow() {
        return {
            is_complete: this.isComplete ?? null,
            status: this.status ?? null,
            is_maker_buying: this.isMakerBuying ?? null,
            maker_id: this.makerId ?? null,
            taker_id: this.takerId ?? null,
            offer_id: this.offerId ?? null,
            price_dash: this.priceDASH ?? null,
            dash_amount: this.dashAmount ?? null,
            fiat_amount: this.fiatAmount ?? null,
            created_at: this.createdAt ?? null,
            updated_at: this.updatedAt ?? null,
        };
    }

    static fromRow({ is_complete, status, is_maker_buying, maker_id, taker_id, offer_id, price_dash, dash_amount, fiat_amount, created_at, updated_at }) {
        return new Order(
            is_complete, status, is_maker_buying, maker_id, taker_id, offer_id, price_dash, dash_amount, fiat_amount, created_at, updated_at
        );
    }

    static fromJSON({ isComplete, status, isMakerBuying, makerId, takerId, offerId, priceDASH, dashAmount, fiatAmount, createdAt, updatedAt }) {
        return new Order(isComplete, status, isMakerBuying, makerId, takerId, offerId, priceDASH, dashAmount, fiatAmount, createdAt, updatedAt);
    }
}

module.exports = Order;
