(function() {
    'use strict';

    // semi-global vars
    var TOKEN = null,
        CHANNEL_ID,
        CHANNEL_NAME,
        socket = null;

    // events
    $('form.setup').on('submit', function(e) {
        e.preventDefault();

        TOKEN = $('input[name="token"]').val();

        listChannels();

        $('input[name="token"]').val('');
    });

    $('table.channels').on('click', 'a.select-channel', function(e) {
        e.preventDefault();

        CHANNEL_ID = $(e.target).attr('data-channelId');
        CHANNEL_NAME = $(e.target).attr('data-channelName');

        $('.channel-name').text(CHANNEL_NAME);
        $('.channel-content').show();
        $('.activity, .channel-users').empty();

        getChannelInfo();
        getHistory().then(function() {
            connectToChatServer();
        });
    });

    $('form.send-message').on('submit', function(e) {
        e.preventDefault();

        // use timestamp as id for now, need better way
        var timestamp = new Date().getTime();

        var msg = {
            id: timestamp,
            type: 'message',
            channel: CHANNEL_ID,
            text: $('textarea[name="message"]').val()
        };

        socket.send(JSON.stringify(msg));

        $('textarea[name="message"]').val('');

        // add to channel in UI
        $('.activity').prepend('<p class="well">'+JSON.stringify(msg)+'</p>');
    });

    // methods
    function listChannels() {
        var params = {
            token: TOKEN
        };

        $.ajax({
            url: 'https://slack.com/api/channels.list',
            data: params,
            method: 'get'
        }).done(function(response) {
            response.channels.forEach(function(channel) {
                $('.channels tbody').append('<tr><td>'+channel.name+'</td><td align="right"><a class="btn btn-default btn-xs select-channel" data-channelId="'+channel.id+'" data-channelName="'+channel.name+'" href="#">enter</a></td></tr>');

                $('select[name="channel"]').append('<option value="'+channel.id+'">'+channel.name+'</option>');
            });
        });
    }

    function getChannelInfo() {
        var params = {
            token: TOKEN,
            channel: CHANNEL_ID
        };

        return $.ajax({
            url: 'https://slack.com/api/channels.info',
            data: params,
            method: 'get'
        }).then(function(response) {
            response.channel.members.forEach(function(member) {
                getUserInfo(member, buildUserIcon);
            });
        });
    }

    function buildUserIcon(user) {
        console.log(user);
        $('.channel-users').append('<li class="'+user.presence.presence+'">'+user.user.real_name+'</li>');
    }

    function getUserInfo(userId, cb) {
        var params = {
            token: TOKEN,
            user: userId
        };

        var info = $.ajax({
            url: 'https://slack.com/api/users.info',
            data: params,
            method: 'get'
        });

        var presence = $.ajax({
            url: 'https://slack.com/api/users.getPresence',
            data: params,
            method: 'get'
        });

        $.when(info, presence).then(function(info, presence) {
            cb({
                user: info[0].user,
                presence: presence[0]
            });
        });
    }

    function getHistory() {
        var params = {
            token: TOKEN,
            channel: CHANNEL_ID,
            count: 5
        };

        return $.ajax({
            url: 'https://slack.com/api/channels.history',
            data: params,
            method: 'get'
        }).then(function(response) {
            response.messages.forEach(function(message) {
                $('.activity').prepend('<p class="well">'+JSON.stringify(message)+'</p>');
            });
        });
    }

    function connectToChatServer() {
        $.getJSON('https://slack.com/api/rtm.start?token='+TOKEN)
            .done(function(response) {
                if (socket !== null) {
                    socket.close();
                    socket = null;
                }

                socket = new WebSocket(response.url);

                socket.onopen = function() {
                    console.log('open socket');
                };

                socket.onclose = function() {
                    console.log('close socket');
                };

                socket.onmessage = function(event) {
                    var dataObj = JSON.parse(event.data);

                    if (typeof dataObj.channel === 'undefined') {
                        return;
                    }

                    if (dataObj.channel !== CHANNEL_ID) {
                        return;
                    }

                    $('.activity').prepend('<p class="well">'+event.data+'</p>');
                };
            });
    }

}());