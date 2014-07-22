var randomFromTo = function (from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

var string = {
    hungry: "i'm hungry",
    happy: "i'm happy",
    sad: "i'm sad",
    angry: "i'm angry",
    depressed: "i'm depressed",
    sick : "i'm sick",
    drinking: "i'm drinking",
    calling: "i'm calling",
    gift: "this is gift",
    shy: "i'm shy"
    };

var question = Object.keys(string);
var score = 0;
var wrongAnswerCount = 0;

var children = $("#ani_container").children();
var child = $("#ani_container div:first-child");

var currentEl;
var currentElPress;

var win_width = $(window).width();
var text_move_px = 100;

var playGame;
var stop;

//////////--------document ready start ---------///////////////

$(document).ready(function() {

    if ($("#container").length == 0) {
        return false; // will only run the game code if not on game page
    }

//////////--------image setting ---------///////////////

    var insertImages = function(){

        // insert water_basket
        var $basket = $('<div class="water_basket"/>');
        var $basketImg = $('<img/>');
        $basketImg.attr('src', 'http://i.imgur.com/BBUHONS.png');
        $basketImg.appendTo($basket);
        $('#ani_container').prepend($basket);

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
        $('#ani_container').prepend($water_stick);



        //insert lives
        var $pengLives = $('<div class="pengLives"/>');
        var $liveImg1 = $('<img id="liveImg1"/>')
        $liveImg1.attr('src', '/assets/emoticons/peng.png');
        var $liveImg2 = $('<img id="liveImg2"/>')
        $liveImg2.attr('src', '/assets/emoticons/peng.png');
        var $liveImg3 = $('<img id="liveImg3"/>')
        $liveImg3.attr('src', '/assets/emoticons/peng.png');

        $pengLives.append($liveImg1);
        $pengLives.append($liveImg2);
        $pengLives.append($liveImg3);
        $pengLives.prependTo("#toolbar");
        ($('#btnplay')).after($pengLives);
    };

    //set images which will appear when user click the btnplay
    var setPlayImages = function(){
        //insert peng
        var $pengImg = '/emoticons/wink.png';
        var $img1 = $("<img class='peng_game'/>");
        $img1.attr("src", "/assets/"+ $pengImg);
        $img1.prependTo('#ani_container');
        $img1.hide();

        //insert fireball
        var $fireballImg = '/emoticons/fireball.png';
        var $img2 = $("<img/>");
        $img2.addClass('fireball_game fireball-animation');
        $img2.attr("src", "/assets/"+ $fireballImg);
        $img2.prependTo('#ani_container');
        $img2.hide();
    };

    //this will happen when user click the btnplay
    var loadPlayImage = function(){
        //appear peng and fireball
        $('peng_game').fadeIn('slow');
        $('fireball_game').fadeIn('slow');

        //water_stick and make water look like empty
        $('.water_stick').css({"margin-top": 0});
        $('.water1').css({"background-color": "#C9E7EF"});
        $('.water2').css({"background-color": "#C9E7EF"});
        $('.water3').css({"background-color": "#C9E7EF"});
        $('.water4').css({"background-color": "#C9E7EF"});
        $('.water5').css({"background-color": "#C9E7EF"});
    };

 ////////------answer setting--------////////////////

    var answers = $('<div class="answers animation-target "/>');
    // showing answer
    var answerShow = function(){
        var yourAnswer = $('<h2 id="answer_title">Answers<h2/>')
        answers.append(yourAnswer);
        for (var q=0; q<question.length; q++) {
            var parah_answer = $('<h3 id=answer>' +question[q]+ '<br/> <span id="str_answer">' +string[question[q]]+ '</span></h3>');
            answers.append(parah_answer);
            $('#ani_container').append(answers);
        };
    };
//////////--------- word_list -----------///////////////

    // display word_list
    var displayWordlist = function(){
        for (var q=0; q<question.length; q++){
            var $each_word = question[q];
            display_text = "<h2>"+ $each_word +"</h2>"
            $('#word_list').append(display_text);
        };
    };
//////////------- buttons setting -------///////////////

    var btnSetting = function(){
        $("#btnplay").text("Play New Game");

        if ($(this).text() == "Play New Game") {
            startPlay();
            playGame = setInterval(startPlay, 100000000);
            $(this).text("Pause");

        } else if ($(this).text() == "Pause") {
            stop = true;
            $('.animatedbox').stop();
            $(this).text("Resume");

            // resume.addClass('resume');
        } else if ($(this).text() == "Resume") {
            $(this).text("Pause");
            $('.animatedbox').stop() == false;
        }
        return false;
    }; //end of btnSetting

///////////-------creat animaite box html---------//////////

    var createAnimatedbox = function(){
        // making html elements
        var $animatedbox = $('<div class="animatedbox" id="first"/>');
        var $match = $('<span class="match"/>');
        var $unmatch = $('<span class="unmatch"/>');
        $($animatedbox).append($match);
        $($animatedbox).append($unmatch);
        $('#ani_container').append($animatedbox);

        var $animatedbox = $('<div class="animatedbox"/>');
        var $match = $('<span class="match"/>');
        var $unmatch = $('<span class="unmatch"/>');
        $($animatedbox).append($match);
        $($animatedbox).append($unmatch);
        $('#ani_container').append($animatedbox);

        var $animatedbox = $('<div class="animatedbox"/>');
        var $match = $('<span class="match"/>');
        var $unmatch = $('<span class="unmatch"/>');
        $($animatedbox).append($match);
        $($animatedbox).append($unmatch);
        $('#ani_container').append($animatedbox);



        // for (var m=0; m < question.length; m++){
        //     var $animatedbox = $('<div class="animatedbox"/>');
        // };//end of for loop to create animatedbox

        var $animatedbox = $('<div class="animatedbox" id="last"/>');
        var $match = $('<span class="match"/>');
        var $unmatch = $('<span class="unmatch"/>');
        $($animatedbox).append($match);
        $($animatedbox).append($unmatch);
        $('#ani_container').append($animatedbox);
    };


    // falling words setting
    var moveAnimatedbox = function(){
     ////////------------- set variables for animatedbox
        var children = $("#ani_container").children();
        var child = $("#ani_container div:first-child");

        var currentEl;
        var currentElPress;

        var win_width = $(window).width();
        var text_move_px = 100;
        var box_left = (win_width / 5) - (text_move_px / 2);

        $(".animatedbox").css("left", box_left+"px");

        var con_height = $("#ani_container").height();
        var con_pos = $("#ani_container").position();
        var min_top = con_pos.top;
        // 56 = animated box top & bottom padding + font size
        var max_top = min_top + con_height - 56;
        var box_left = (win_width / 5) - (text_move_px / 2);

        var lastAnimatedbox = $('#ani_container').last();
        lastAnimatedbox.removeClass('current');
     ////////------------ looping words for failing
        var loopAnimatedBox = function (){



            // calling variable to loop .current(moving)
            child = $("#ani_container div:first-child");
            child.addClass("current");
            currentEl = $(".current");


            for (i=0; i<children.length; i++) {
                var delaytime = i * 5000;
                setTimeout(function() {
                    randomIndex = randomFromTo(0, question.length - 1);
                    child.animate({"top": min_top+"px"}, 'slow');
                    child.find(".match").text();
                    child.find(".unmatch").text(question[randomIndex]);
                    child.show();
                    child.animate({
                       left: "+="+text_move_px
                    }, 5000, function() {
                        currentEl.removeClass("current");
                        currentEl.fadeOut('fast');
                        currentEl.animate({
                            left: box_left+"px"
                        }, 'fast');
                        if (currentEl.attr("id") == "last") {
                            child.addClass("current");
                            currentEl = $(".current");

                               $("#btnplay").text("Play");

                        } else {
                            currentEl.next().addClass("current");
                            currentEl = currentEl.next();
                        }
                    });
                    child = child.next();
                }, delaytime);

            } // end for loop for word blocks
        };
        // };

    };


////////-------actual game logic (matchAnswer/play/end of Game) -------///////////

    // matching answer and userinput
    var matchAnswer = function(event){

        $(".animatedbox").css("left", box_left+"px");

        var con_height = $("#ani_container").height();
        var con_pos = $("#ani_container").position();
        var min_top = con_pos.top;
        // 56 = animated box top & bottom padding + font size
        var max_top = min_top + con_height - 56;
        var box_left = (win_width / 5) - (text_move_px / 2);


        var currentElPress = $(".current");
        var matchSpan = currentElPress.find(".match");
        var unmatchSpan = currentElPress.find(".unmatch");
        var unmatchText = unmatchSpan.text();
        var userInput = $('#userInput').val();

        //

            if ($(".current").find('.unmatch').text() == userInput){

                currentElPress.stop().effect("explode", 500);
                currentElPress.animate({
                left: box_left+"px"
                }, 'fast');

                currentElPress.removeClass("current");
                currentElPress = currentElPress.next();
                currentElPress.addClass("current");
                currentEl = currentElPress;

                //add score
                score += 50;
                $("#score").text(score).effect("highlight", {
                    color: '#000000'
                }, 1000);
                //getting water
                var $score = $("#score").text();
                console.log($score);
                // always write it from the biggest number
                if ($score > 249){
                    $('.water5').css({"background-color": "#0000B2"});
                    $('.water_stick').css({"margin-top": 0});
                    endPlay();
                } else if ($score > 199){
                    $('.water4').css({"background-color": "#0000FF"});
                } else if ($score > 149){
                    $('.water3').css({"background-color": "#005CE6"});
                } else if ($score > 99){
                    $('.water2').css({"background-color": "#33ADFF"});
                } else if ($score > 49){
                    $('.water1').css({"background-color": "#5CADFF"});
                    $('.water_basket').animate({"size": "200%"}, 'slow');
                } else {
                    console.log("You can't get any water hahahah");
                }

                //remove previous answer for next one
                $('#userInput').val("");

            } else if ($(".current").find('.unmatch').text() !== userInput){
                //fireball animation

                $('.fireball_game').animate({
                    'left':  '-=140px'
                }, 'fast');
                $('#userInput').val("");

                //remove lives when useriput is wrong
                var inputLetterCount = userInput.length;
                wrongAnswerCount += 1;
                if (wrongAnswerCount == 3 ){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg1').fadeOut();

                    endPlay();

                } else if (wrongAnswerCount == 2){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg2').fadeOut();
                } else if (wrongAnswerCount == 1){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg3').fadeOut();
                }
                console.log(wrongAnswerCount);
            }

    }; // end matchAnswer

    // set end of game
    var endPlay = function(){
        var $msgEnd = $('<div class="msgEnd"/>');
        var $msgGameOver = $('<h2 id="game_over">Game Over!</h2>');
        var $msgYouWin = $('<h2 id="you_win">You Win!</h2>');
        $msgEnd.append($msgGameOver);
        $msgEnd.append($msgYouWin);

        var $replay = $('<button id="btnreplay">Replay</button>');
        var $userScore = $("#score").text(score);
        var $yourScore = $('<div id="yourScore"><h2>Your Score: </h2></div>');
        $yourScore.append($userScore);

        answers.prepend($msgEnd);
        answers.prepend($replay);
        answers.prepend($yourScore);

        $('#ani_container').empty();
        answerShow();
        btnSetting();

    }; // end endplay

    var startPlay = function() {
        $('#userInput').focus();
        createAnimatedbox();
        moveAnimatedbox();
        insertImages();
        setPlayImages();
        $('.peng_game').fadeIn('slow');
        $('.fireball_game').fadeIn('slow');
        loadPlayImage();
        // matchAnswer();

    }; // end startPlay



/////////------button and click for calling functions--------///////////

    $('#btnsubmit').on('click', matchAnswer);
    $('#userInput').on('keydown', function(key){
        if (key.which == 13){
            matchAnswer();
        }
    });

    $("#btnplay").on('click', btnSetting);
    $('#ani_container').on('click', "#btnreplay", function(){
        $('.answers').hide();
        wrongAnswerCount = 0;
        score = $score;
        //$score = $("#score").text();
        startPlay();
    });

}); // end of document ready