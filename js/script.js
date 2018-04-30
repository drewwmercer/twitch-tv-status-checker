$(document).ready(function () {
    const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","FailArmy","RedBull","elevensportsprime","ArcadeCloud"];
    let path = "https://wind-bow.glitch.me/twitch-api/";
    
    let checkStatus = function () {
        channels.forEach(function (channel) {
            $.getJSON(path + "streams/" + channel, function (json) {
                $.getJSON(path + "channels/" + channel, function (json2) {
                    let live, lIcon;
                    if (json.stream == null) {
                        live = 'offline';
                        lIcon = 'times';
                    } else {
                        live = 'online';
                        lIcon = 'check';
                    }
                    let html = '<a href="' + json2.url + '" target="blank" class="' + live + ' animated bounceIn">';
                    html += '<div><img class="img-fluid" src="' + json2.logo + '"></div><div id="' + live + '">'
                    html += '<h3>' + channel + '</h3><div><i class="far fa-' + lIcon + '-circle"></i> ' + live.toUpperCase() + '</div>';
                    if (live == 'online')
                        html += '<div>' + json.stream.channel.status + '</div>';
                    html += '</div></a>';
                    html = $('#statusPane').html() + html;
                    $('#statusPane').html(html);
                });
            });
        });
    };
    checkStatus();
});