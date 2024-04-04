class Offer {
    constructor(buyBCH, city, country, paymentMethod, currencyType, currencySymbol, dynamicPricing, margin, marginAbove,
                marketExchange, limitMin, limitMax, headline, tradeTerms, openHours, closeHours, verifiedOnly,
                makerId, pause) {
        this.buyBCH = buyBCH;
        this.city = city;
        this.country = country;
        this.paymentMethod = paymentMethod;
        this.currencyType = currencyType;
        this.currencySymbol = currencySymbol;
        this.dynamicPricing = dynamicPricing;
        this.margin = margin;
        this.marginAbove = marginAbove;
        this.marketExchange = marketExchange;
        this.limitMin = limitMin;
        this.limitMax = limitMax;
        this.headline = headline;
        this.tradeTerms = tradeTerms;
        this.openHours = openHours;
        this.closeHours = closeHours;
        this.verifiedOnly = verifiedOnly;
        this.makerId = makerId;
        this.pause = pause;
    }

    toRow() {
        return {
            buy_bch: this.buyBCH ?? null,
            city: this.city ?? null,
            country: this.country ?? null,
            payment_method: this.paymentMethod ?? null,
            currency_type: this.currencyType ?? null,
            currency_symbol: this.currencySymbol ?? null,
            dynamic_pricing: this.dynamicPricing ?? null,
            margin: this.margin ?? null,
            margin_above: this.marginAbove ?? null,
            market_exchange: this.marketExchange ?? null,
            limit_min: this.limitMin ?? null,
            limit_max: this.limitMax ?? null,
            headline: this.headline ?? null,
            trade_terms: this.tradeTerms ?? null,
            open_hours: this.openHours ?? null,
            close_hours: this.closeHours ?? null,
            verified_only: this.verifiedOnly ?? null,
            maker_id: this.makerId, pause: this.pause
        }
    }

    static fromRow({
                       buy_bch, city, country, payment_method, currency_type, currency_symbol, dynamic_pricing,
                       margin, margin_above, market_exchange, limit_min, limit_max, headline, trade_terms,
                       open_hours, close_hours, verified_only, maker_id, pause
                   }) {
        return new Offer(buy_bch, city, country, payment_method, currency_type, currency_symbol, dynamic_pricing,
            margin, margin_above, market_exchange, limit_min, limit_max, headline, trade_terms,
            open_hours, close_hours, verified_only, maker_id, pause
        );
    }

    static fromJSON({ buyBCH, city, country, paymentMethod, currencyType, currencySymbol, dynamicPricing, margin,
                        marginAbove, marketExchange, limitMin, limitMax, headline, tradeTerms,
                        openHours, closeHours, verifiedOnly, makerId, pause
                    }) {
        return new Offer(buyBCH, city, country, paymentMethod, currencyType, currencySymbol, dynamicPricing, margin,
            marginAbove, marketExchange, limitMin, limitMax, headline, tradeTerms,
            openHours, closeHours, verifiedOnly, makerId, pause);
    }

}

module.exports = Offer
