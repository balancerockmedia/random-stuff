$('.email-login').on('submit', function(e) {
    e.preventDefault();

    var params = {
        user: {
            email: $('.email-login input[name="email"]').val(),
            password: $('.email-login input[name="password"]').val()
        }
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/devise/sign_in',
        data: JSON.stringify(params),
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        $('.signedin').text(JSON.stringify(response));
        $('.user-info').show();
    }, function(response) {
        $('.signedin').text(response.responseText);
    });
});

$('.logout').on('click', function(e) {
    e.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:3000/devise/sign_out',
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        $('.signedin').text('');
        $('.user-info').hide();
    }, function(response) {
        console.log(response.responseText);
    });
});


// pretend timestamp is a random number
var state = Math.floor(Date.now() / 1000);

$('.github-login').on('click', function(e) {
    e.preventDefault();
    
    var url = 'https://github.com/login/oauth/authorize?response_type=token' +
    '&redirect_uri=' + encodeURIComponent('http://localhost:3000/devise/auth/github/callback') +
    '&client_id=2340e3844622adb0fd66&state='+state;

    window.open(url, 'Authorize', 'height=600, width=450');
});

// initially set signedin
$('.js-signedin').text(localStorage.getItem('ol-signedin') || 'false');

$(window).on('storage', function(event) {
    if (event.originalEvent.key === 'ol-signedin') {
        $('.signedin').text(event.originalEvent.newValue);

        $('.user-info').show();
    }
});
