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

    //insert water_stick
    var $water_stick = $('<div/>');
    $water_stick.addClass('water_stick');
    var $water1 = $('<div class="water1"></div>');
    var $water2 = $('<div class="water2"></div>');
    var $water3 = $('<div class="water3"></div>');
    var $water4 = $('<div class="water4"></div>');
    var $water5 = $('<div class="water5"></div>');
    $water1.appendTo($water_stick);
    $water2.appendTo($water_stick);
    $water3.appendTo($water_stick);
    $water4.appendTo($water_stick);
    $water5.appendTo($water_stick);
    $('#container').append($water_stick);

    // insert water_basket
    var $basket = $('<div/>');
    var $basketImg = $('<img/>');
    $basketImg.attr('src', 'http://i.imgur.com/BBUHONS.png');
    $basketImg.appendTo($basket);
    $basket.addClass('water_basket');
    $basket.appendTo($('#container'));


    //insert peng
    var $pengImg = '/emoticons/wink.png';
    $img1 = $("<img/>");
    $img1.addClass('peng_game');
    $img1.attr("src", "/assets/"+ $pengImg);
    $img1.prependTo('#container');

    //insert fireball
    var $fireballImg = '/emoticons/fireball.png';
    $img2 = $("<img/>");
    $img2.addClass('fireball_game');
    $img2.attr("src", "/assets/"+ $fireballImg);
    $img2.prependTo('#container');

    $('.fireball_game').hide();
    $('.peng_game').hide();
    //$('.water_stick').hide();

    // display word_list
    for (var q=0; q<question.length; q++){
        var $each_word = question[q];
        display_text = "<h2>"+ $each_word +"</h2>"
        $('#word_list').append(display_text);
    };

    // defined word blocks and other stuff
    var children = $("#ani_container").children();
    var child = $("#ani_container div:first-child");

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
            playGame = setInterval(startPlay, 100000000);
            $(this).text("Pause");

            $('.fireball_game').show();
            $('.peng_game').show();
            //water_stick and make water empty
            $('.water_stick').css({"margin-top": 0});
            $('.water1').css({"background-color": "#C9E7EF"});
            $('.water2').css({"background-color": "#C9E7EF"});
            $('.water3').css({"background-color": "#C9E7EF"});
            $('.water4').css({"background-color": "#C9E7EF"});
            $('.water5').css({"background-color": "#C9E7EF"});

        } else if ($(this).text() == "Pause") {
            stop = true;
            $('.current').stop();
            $(this).text("Resume");

            // resume.addClass('resume');

        } else if ($(this).text() == "Resume") {
            $(this).text("Pause");
            $('.current').on();

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
        child = $("#ani_container div:first-child");
        child.addClass("current");
        currentEl = $(".current");

        for (i=0; i<children.length; i++) {
            var delaytime = i * 10000;
            setTimeout(function() {
                randomIndex = randomFromTo(0, question.length - 1);
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

        } // end for loop for word blocks
    }; // end startPlay

    var matchAnswer = function(event){

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
                $('.fireball_game').animate({
                    'left':  '-=140px'
                }, 'fast');
                $('#userInput').val("");
                console.log("fucking javascript");
            }

    }; // end matchAnswer


    $('#btnsubmit').on('click', matchAnswer);
    $('#userInput').on('keydown', function(key){
        if (key.which == 13){
            matchAnswer();
        }
    });

}); // end of document ready