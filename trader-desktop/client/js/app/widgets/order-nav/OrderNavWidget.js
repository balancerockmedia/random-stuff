/**
 * app/widgets/order-nav/OrderNavWidget
 *
 * @author Daniel Johnson
 */
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/order-nav/OrderNavTemplate.html'
    ],
    function(Repository, Backbone, BaseView, OrderNavTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'nav',
            className: 'order-nav',

            elements: [
                'tradeButton',
                'deleteAllButton',
                'refreshAllButton',
                'orderForm',
                'numTrades',
                'tableButton',
                'chartButton'
            ],

            template: {
                name: 'OrderNavTemplate',
                source: OrderNavTemplate
            },

            events: {
                'click .js-tradeButton': 'trade',
                'click .js-deleteAllButton': 'deleteAll',
                'click .js-refreshAllButton': 'refreshAllButton',
                'click .js-tableButton': 'showTable',
                'click .js-chartButton': 'showChart'
            },

            postRender: function() {
                var numTradesEl = $(this.numTradesElement);

                $(this.orderFormElement).dialog({
                    autoOpen: false,
                    modal: true,
                    buttons: {
                        Create: function() {
                            var numOrders = numTradesEl.val();

                            for (var i = 0; i < parseInt(numOrders, 10); i++) {
                                Repository.createRandomOrder();
                            }

                            $(this).dialog('close');
                        },
                        Cancel: function() {
                            $(this).dialog('close');
                        }
                    }
                });

                return this;
            },

            trade: function(e) {
                e.preventDefault();

                $(this.orderFormElement).dialog('open');
            },

            deleteAll: function(e) {
                e.preventDefault();

                $.ajax({
                    url: '/rest/orders',
                    type: 'DELETE'
                });
            },

            refreshAllButton: function(e) {
                e.preventDefault();

                Repository.fetchOrders();
            },

            showTable: function(e) {
                e.preventDefault();
            },

            showChart: function(e) {
                e.preventDefault();
            }
        });
    }
);