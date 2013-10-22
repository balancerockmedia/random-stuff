/**
 * app/widgets/order-table/OrderWidget
 *
 * @author Daniel Johnson
 */
define(
    [
        'backbone',
        'keel/BaseView',
        'app/domain/Repository',
        'text!app/widgets/order-table/OrderTemplate.html'
    ],
    function(Backbone, BaseView, Repository, OrderTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'tr',

            template: {
                name: 'OrderTemplate',
                source: OrderTemplate
            }
        });
    }
);