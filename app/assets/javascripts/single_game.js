function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

var string = {
    hungry: "i'm hungry",
    happy: "i'm happy",
    sad: "i'm sad",
    angry: "i'm angry",
    depressed: "i'm depressed"
    };

var score = 0;

$(document).ready(function() {

    var children = $("#container").children();
    var child = $("#container div:first-child");

    var currentEl;
    var currentElPress;

    var win_width = $(window).width();
    var text_move_px = 100;
    var box_left = (win_width / 5) - (text_move_px / 2);

    var playGame;
    var stop;

    $(".animatedbox").css("left", box_left+"px");

    $("#btnplay").click(function() {

        if ($(this).text() == "Play") {
            startPlay();
            playGame = setInterval(startPlay, 50000);
            $(this).text("Pause");
        } else if ($(this).text() == "Pause") {
            stop = true;
            if ($("#container").find(".current").length == 0) {
              $(this).text("Play");
            } else {
              $(this).text("wait a moment");
            }
            clearInterval(playGame);
        }
        return false;
    });

    var con_height = $("#container").height();
    var con_pos = $("#container").position();
    var min_top = con_pos.top;

    // 56 = animated box top & bottom padding + font size
    var max_top = min_top + con_height - 56;

    function startPlay() {

        child = $("#container div:first-child");
        child.addClass("current");
        currentEl = $(".current");

        for (i=0; i<children.length; i++) {
            var delaytime = i * 10000;
            setTimeout(function() {
                randomIndex = randomFromTo(0, question.length - 1);
                randomTop = randomFromTo(min_top, max_top);
                child.animate({"top": randomTop+"px"}, 'slow');
                child.find(".match").text();
                child.find(".unmatch").text(question[randomIndex]);
                child.show();
                child.animate({
                   left: "+="+text_move_px
                }, 10000, function() {
                    currentEl.removeClass("current");
                    currentEl.fadeOut('fast');
                    currentEl.animate({
                        left: box_left+"px"
                    }, 'fast');
                    if (currentEl.attr("id") == "last") {
                        child.addClass("current");
                        currentEl = $(".current");
                        if (stop) {
                           $("#btnplay").text("Play");
                        }
                    } else {
                        currentEl.next().addClass("current");
                        currentEl = currentEl.next();
                    }
                });
                child = child.next();
            }, delaytime);
        }
    }


$('#btnsubmit').click(function() {
        currentElPress = $(".current");
        var matchSpan = currentElPress.find(".match");
        var unmatchSpan = currentElPress.find(".unmatch");
        var unmatchText = unmatchSpan.text();
        var userInput = $('#userInput').val();

        if ($(".current").find('.unmatch').text() == userInput){
            currentElPress.stop().effect("explode", 500);
            currentElPress.animate({
            left: box_left+"px"
        }, 'fast');
            console.log("yes");
            currentElPress.removeClass("current");
            currentElPress = currentElPress.next();
            currentElPress.addClass("current");
            currentEl = currentElPress;
            score += 50;
            $("#score").text(score).effect("highlight", {
                color: '#000000'
            }, 1000);
        } else{
            console.log(userInput);
            console.log("fucking javascript");
        }
    });

}); // end of document ready