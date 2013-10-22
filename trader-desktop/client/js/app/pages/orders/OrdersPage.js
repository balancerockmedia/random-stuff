/**
 * app/pages/order-table/OrderTablePage
 *
 * @author Daniel Johnson
 */
define(
    [
        'app/domain/Repository',
        'keel/BaseView',
        'app/widgets/page-header/PageHeaderWidget',
        'app/widgets/order-nav/OrderNavWidget',
        'app/widgets/order-table/OrderTableWidget',
        'text!app/pages/orders/OrdersPageTemplate.html'
    ],
    function(Repository, BaseView, PageHeaderWidget, OrderNavWidget, OrderTableWidget, OrdersPageTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'orders-page',

            template: {
                name: 'OrdersPageTemplate',
                source: OrdersPageTemplate
            },

            postRender: function() {
                this.addChildren([
                    {
                        id: 'PageHeaderWidget',
                        viewClass: PageHeaderWidget,
                        parentElement: this.$el,
                        options: {
                            model: Repository.getloggedInUser()
                        }
                    },
                    {
                        id: 'OrderNavWidget',
                        viewClass: OrderNavWidget,
                        parentElement: this.$el,
                        options: {}
                    },
                    {
                        id: 'OrderTableWidget',
                        viewClass: OrderTableWidget,
                        parentElement: this.$el,
                        options: {
                            collection: Repository.getOrders()
                        }
                    }
                ]);
            }
        });
    }
);