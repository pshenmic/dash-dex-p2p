class Order {
    constructor(bchAmount, fiatAmount, isMakerBuying, makerId, offerId,
        priceBCH, takerId, cancelled, complete, id) {
        this.bchAmount = bchAmount;
        this.fiatAmount = fiatAmount;
        this.isMakerBuying = isMakerBuying;
        this.makerId = makerId;
        this.offerId = offerId;
        this.priceBCH = priceBCH;
        this.takerId = takerId;
        this.cancelled = cancelled;
        this.complete = complete;
        this.id = id;

    }

    toRow() {
        return {
            bch_amount: this.bchAmount ?? null,
            fiat_amount: this.fiatAmount ?? null,
            is_maker_buying: this.isMakerBuying ?? null,
            maker_id: this.makerId ?? null,
            offer_id: this.offerId ?? null,
            price_bch: this.priceBCH ?? null,
            taker_id: this.dynamicPricing ?? null,
            cancelled: this.cancelled ?? null,
            complete: this.complete ?? null,
            id: this.id ?? null,
        }
    }

    static fromRow({ bch_amount, fiat_amount, is_maker_buying, maker_id, offer_id,
        price_bch, taker_id, cancelled, complete, id
    }) {
        return new Order(
            bch_amount, fiat_amount, is_maker_buying, maker_id, offer_id,
            price_bch, taker_id, cancelled, complete, id
        );
    }

    static fromJSON({ bchAmount, fiatAmount, isMakerBuying, makerId, offerId,
        priceBCH, takerId, cancelled, complete, id
    }) {
        return new Order(bchAmount, fiatAmount, isMakerBuying, makerId, offerId,
            priceBCH, takerId, cancelled, complete, id);
    }

}

module.exports = Order
