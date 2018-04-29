$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp",
        success: function (data1) {
            if (data1.stream === null) {
                $("#fccStatus").html("freeCodeCamp is currently OFFLINE");
            } else {
                $("#fccStatus").html("freeCodeCamp is currently LIVE");
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
        headers: {
            'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
        },
        success: function (data2) {
            for (var i = 0; i < data2.follows.length; i++) {
                console.log(data2.follows[0]);
                var displayName = data2.follows[i].channel.display_name;
                var logo = data2.follows[i].channel.logo;
                var status = data2.follows[i].channel.status;
                if (logo == null) {
                    logo = "./img/not-found-transparent.png";
                }
                $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md'>" +
                    "<a href='https://www.twitch.tv/" + displayName + "'><img src='" + logo + "'></a>" +
                    "</div>" + "<div class='col-md boldMe'>" + displayName + "</div>" + "<div class='col-md'>" + status + "</div></div>");
            }
        }
    });

    var deletedFollowers = ['brunofin', 'comster404'];
    for (var i = 0; i < deletedFollowers.length; i++) {
        $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
            headers: {
                'Client-ID': 'lpcfra5atdz9k7jtdldz5729cfh4zua'
            },
            error: function (data3) {
                var logo = "./img/not-found-transparent.png";
                var displayName = data3.statusText;
                var status = data3.status;
                $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md'>" +
                    "<a  href='https://www.twitch.tv/" + displayName + +"'><img src='" + logo + "'></a>" +
                    "</div>" + "<div class='col-md boldMe'>" + displayName + "</div>" + "<div class='col-md'>" + status + "</div></div>");
            }
        });
    }
});