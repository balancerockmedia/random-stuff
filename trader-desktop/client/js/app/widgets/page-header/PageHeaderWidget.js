/**
 * app/widgets/page-header/PageHeaderWidget
 *
 * @author Daniel Johnson
 */
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/page-header/PageHeaderTemplate.html'
    ],
    function(Repository, Backbone, BaseView, PageHeaderTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'header',

            template: {
                name: 'PageHeaderTemplate',
                source: PageHeaderTemplate
            },

            events: {
                'click .js-logoutButton': 'logout'
            },

            logout: function() {
                Repository.setloggedInUser(null);
                Backbone.history.navigate('home', true);
                return false;
            }
        });
    }
);