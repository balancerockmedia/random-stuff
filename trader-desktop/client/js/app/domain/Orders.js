/**
 * app/domain/Orders
 *
 * @author Daniel Johnson
 */

define(
    [
        'backbone'
    ],
    function(Backbone) {
        'use strict';

        var getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        return Backbone.Collection.extend({
            model: Backbone.Model.extend(),

            createRandomOrder: function(instruments, loggedInUser) {
                var index = getRandomInt(1, instruments.length - 1);

                var instrument = instruments.at(index);

                var side = (index % 2 === 0) ? 'Buy' : 'Sell';
                var quantity = getRandomInt(1000, 10000);
                var limitPrice = getRandomInt(10, 500);

                return this.create({
                    'side': side,
                    'symbol': instrument.get('symbol'),
                    'quantity': quantity,
                    'limitPrice': limitPrice,
                    'traderId': loggedInUser.id
                });
            }
        });
    }
);