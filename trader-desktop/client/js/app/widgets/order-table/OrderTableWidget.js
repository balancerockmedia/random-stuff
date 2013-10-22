/**
 * app/widgets/order-table/OrderTableWidget
 *
 * @author Daniel Johnson
 */
define(
    [
        'backbone',
        'keel/BaseView',
        'app/domain/Repository',
        'app/widgets/order-table/OrderWidget',
        'text!app/widgets/order-table/OrderTableTemplate.html'
    ],
    function(Backbone, BaseView, Repository, OrderWidget, OrderTableTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'table',
            className: 'order-table',

            template: {
                name: 'OrderTableTemplate',
                source: OrderTableTemplate
            },

            initialize: function() {
                this.listenTo(this.collection, 'change reset', this.render);
            },

            postRender: function() {
                var that = this;

                this.collection.each(function(order) {
                    var orderId = 'order-' + order.get('id');

                    that.addChildren([
                        {
                            id: orderId,
                            viewClass: OrderWidget,
                            parentElement: that.$el,
                            options: {
                                model: order
                            }
                        }
                    ]);
                });

                return this;
            }
        });
    }
);