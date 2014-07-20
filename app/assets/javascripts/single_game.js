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

var question = Object.keys(string);
var score = 0;

$(document).ready(function() {

    if ($("#container").length == 0) {
        return false; // will only run the game code if not on game page
    }

    // display word_list
    for (var q=0; q<question.length; q++){
        var $each_word = question[q];
        display_text = "<h2>"+ $each_word +"</h2>"
        $('#word_list').append(display_text);
    };

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

    // setting play and pause
    $("#btnplay").click(function() {


        if ($(this).text() == "Play") {
            startPlay();
            playGame = setInterval(startPlay,100000000);
            $(this).text("Pause");

            //insert peng
            var $pengImg = '/emoticons/wink.png';
            $img = $("<img/>");
            $img.addClass('peng_game');
            $img.attr("src", "/assets/"+ $pengImg);
            $img.appendTo('#container');

            //insert fireball
            var $fireballImg = '/emoticons/fireball.png';
            $img = $("<img/>");
            $img.addClass('fireball_game');
            $img.attr("src", "/assets/"+ $fireballImg);
            $img.appendTo('#container');

            //insert water_stick
            var $water_stick = $('<div/>');
            $water_stick.addClass('water_stick');
            var $water1 = $('<div/>');
            $water1.addClass('water1');
            $water1.appendTo($water_stick);
            $('#container').append($water_stick);


        } else if ($(this).text() == "Pause") {
            stop = true;
            if ($("#container").find(".current").length == 0) {
              $(this).text("Play");
            } else {
              $(this).text("wait a moment");
            }
            //clearInterval();
        }
        return false;
    });

    var con_height = $("#container").height();
    var con_pos = $("#container").position();
    var min_top = con_pos.top;

    // 56 = animated box top & bottom padding + font size
    var max_top = min_top + con_height - 56;

    function startPlay() {
        $('#userInput').focus();
        child = $("#container div:first-child");
        child.addClass("current");
        currentEl = $(".current");

        for (i=0; i<children.length; i++) {
            var delaytime = i * 10000;
            setTimeout(function() {
                randomIndex = randomFromTo(0, question.length - 1);
                //randomTop = randomFromTo(min_top, max_top);
                child.animate({"top": min_top+"px"}, 'slow');
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

    $(document).keydown(function(key){
        if(key.keyCode == 13) {
        var currentElPress = $(".current");
        var matchSpan = currentElPress.find(".match");
        var unmatchSpan = currentElPress.find(".unmatch");
        var unmatchText = unmatchSpan.text();
        var userInput = $('#userInput').val();

        if ($(".current").find('.unmatch').text() == userInput){
            currentElPress.stop().effect("explode", 500);
            currentElPress.animate({
            left: box_left+"px"
            }, 'fast');

            currentElPress.removeClass("current");
            currentElPress = currentElPress.next();
            currentElPress.addClass("current");
            currentEl = currentElPress;

            score += 50;
            $("#score").text(score).effect("highlight", {
                color: '#000000'
            }, 1000);
            //remove previous answer for next one
            $('#userInput').val("");

        } else if ($(".current").find('.unmatch').text() !== userInput){
            //var $fireballImg = '/emoticons/fireball.png';
            var $fireballImg = $('#container').find('.fireball_game');
            $fireballImg.animate({
                left: -30+"px"
            }, 'fast');
            $('#userInput').val("");
            console.log("fucking javascript");
        }

      };// end keyCode
    }); // end keydown

}); // end of document ready