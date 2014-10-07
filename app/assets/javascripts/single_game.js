
var questions;

var string;
var question;

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
var timeup = false;

var currentGameAnswer;

//////////--------document ready start ---------///////////////

$(document).ready(function() {

    var $currentGameId = $('#game_id').text();

    if ($("#container").length == 0) {
        return false; // will only run the game code if not on game page
         };

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
        ($('#lives')).after($pengLives);
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

    var answers = $('<div class="answers"/>');
    // animation-target
    // showing answer
    var answerShow = function(){
        var yourAnswer = $('<h2 id="answerTitle">Answers</h2>');
        var answerSlide = $('<div class="answerSlide">');
        var answerSheet = $('<div class="answerSheet">');
        answerSlide.append(yourAnswer);
        answers.append(answerSlide);
        for (var q=0; q<question.length; q++) {
            var parah_answer = $('<h3 id=answer>' +string[question[q]]+ '<br/> <span id="str_answer">' +question[q]+ '</span></h3>');
            answerSheet.append(parah_answer);
            answerSheet.prependTo(answers);
            $('.content').append(answers);
        };

        $('.answerSlide').on('click', function(){
            $('.answerSheet').slideToggle('slow');
        });

    };
//////////--------- word_list -----------///////////////

    // display word_list
    var words = $('<div class="words"/>');

    var displayWordlist = function(){
        var wordListTitle = $('<h2 id="wordListTitle">Words List</h2>');
        var wordSlide = $('<div class="wordSlide"/>');
        var wordSheet = $('<div class="wordSheet"/>');
        wordSlide.append(wordListTitle);
        words.append(wordSlide);
        for (var q=0; q<question.length; q++){
            var eachWord = question[q];
            displayText = $("<h2 id='question'>"+ eachWord +"</h2>")
            wordSheet.append(displayText);
            wordSheet.prependTo(words);
            $('.content').append(words);
        };

        $('.wordSlide').on('click', function(){
            $('.wordSheet').slideToggle('slow');
        });

    };
//////////------- buttons setting -------///////////////
    //Pause function is not working well
    // var btnSetting = function(){


    // }; //end of btnSetting

///////////-------creat animaite box html---------//////////

    var createAnimatedbox = function(){
        // making html 9 elements - 9 times of word falling
        for(var b=0; b<10; b++){
            var $animatedbox = $('<div class="animatedbox"/>');
            var $match = $('<span class="match"/>');
            var $unmatch = $('<span class="unmatch"/>');
            $($animatedbox).append($match);
            $($animatedbox).append($unmatch);
            $('#ani_container').append($animatedbox);
            };

        // making the last element
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

     ////////------------ looping words for failing
        var loopAnimatedBox = function (){
          // calling variable to loop .current(moving)
            child = $("#ani_container div:first-child");
            child.addClass("current");
            currentEl = $(".current");


            for (var l=0; l<children.length; l++) {
                var delaytime = l * 6000;

                setTimeout(function() {
                    //getting random index;
                    var nums = [0,1,2,3,4,5,6,7,8,9];

                    var shuffleArray = function (array) {
                            for (var d = array.length - 1; d > 0; d--) {
                                var f = Math.floor(Math.random() * d); // no +1 here!
                                var temp = array[d];
                                array[d] = array[f];
                                array[f] = temp;
                            }
                            return array;
                        };

                    var randomArray = shuffleArray(nums);

                    for(w=0; w< randomArray.length; w++){
                            var randomIndex = randomArray[w];
                        };

                    // var randomIndex = indexArray(0, question.length -1);

                    child.find(".unmatch").text(question[randomIndex]);
                    child.animate({"top": min_top+"px"}, 'slow');
                    child.find(".match").text();

                    child.show();

                    child.animate({
                       left: "+="+text_move_px
                    }, 6000, function() {

                        if ($('#userInput').val() === null){
                            timeup = true;
                            matchAnswer();
                        } else {
                            timeup = false;
                            matchAnswer();
                        }

                        if (currentEl.attr("id") == "last") {

                            endPlay();

                            $('.msgEnd').show();
                            $('#game_over').fadeIn('slow');
                            $('#game_window').css({"background":"opacity:0.5"});

                        }

                    });
                    child = child.next();
                }, delaytime);

            }; // end for loop for word blocks

         };// end of loopAnimatebox
       loopAnimatedBox();
    };//end of moveAnimatedBox


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

        if (timeup === true) {
            var userInput = 'User missed the question'
        } else {
            var userInput = $('#userInput').val().toLowerCase();;
        }

        var gameQuestion = $(".current").find('.unmatch').text();
        // console.log('question,', gameQuestion, "answer:", currentGameAnswer, "userinput:", userInput, timeup);

        currentGameAnswer = string[gameQuestion];

            if ( currentGameAnswer == userInput ){

                currentElPress.stop().effect("explode", 500);
                currentElPress.animate({
                    left: box_left+"px"
                }, 'fast');

                currentElPress.removeClass("current");
                currentElPress = currentElPress.next();
                currentElPress.addClass("current");
                currentEl = currentElPress;

            // add score when answer is correct
                score += 50;
                $("#score").text(score).effect("highlight", {
                    color: '#000000'
                }, 1000);
                //getting water
                var $score = $("#score").text();

                // always write it from the biggest number
                if ($score > 249){ // When score is over 250( 5 times correct answer )
                    $('.water5').css({"background-color": "#0000B2"});
                    // water stick is full and end of the game
                    endPlay();

                    $('.msgEnd').show();
                    $('#you_win').show();

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
                    // console.log("You can't get any water hahahah");
                }

                //remove previous answer for next matching
                $('#userInput').val("");

            } else { // When missed the question or wrote wrong answer
                currentElPress.stop().fadeOut('fast');

                currentElPress.removeClass("current");
                currentElPress = currentElPress.next();
                currentElPress.addClass("current");
                currentEl = currentElPress;

                currentElPress.animate({
                left: box_left+"px"
                }, 'fast');

            //fireball animation
                // fireball is coming more close
                var $gameWindonwWidth = $('#game_window').width();
                if ($gameWindonwWidth < 350){
                    $('.fireball_game').animate({
                        'left':  '-=50px'
                    }, 'fast');
                }else{
                    $('.fireball_game').animate({
                        'left':  '-=100px'
                    }, 'fast');
                }

                $('#userInput').val("");

            //remove lives when useriput is wrong
                var inputLetterCount = userInput.length;
                wrongAnswerCount += 1;
                if (wrongAnswerCount == 3 ){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg1').fadeOut();

                    endPlay();
                    $('.msgEnd').show();
                    $('#game_over').fadeIn('slow');
                    $('#game_window').css({"background":"opacity:0.5"});

                } else if (wrongAnswerCount == 2){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg2').fadeOut();
                } else if (wrongAnswerCount == 1){
                    $('.peng_game').attr('src','/assets/emoticons/surprise.png');
                    $('.peng_game').effect('bounce', {times:3}, 500);
                    $('#liveImg3').fadeOut();
                }
                // console.log(wrongAnswerCount);
            }

    }; // end matchAnswer

    var startPlay = function() {

        $.ajax({
            url: '/games/' + $currentGameId + '/start/',
            method: 'post',
            dataType: 'json',
            data: {
                id: $currentGameId
            },
            success: function(response) {
                // REMOVE LOADING BAR
                questions = response;
                // console.log(response);
                string = questions;
                question = Object.keys(string);
                // console.log(Object.keys(string));

                $('#toolbar').css({"margin-top": 18+"%"});
                $(".peng-target").hide();
                $("#msgStart").hide();
                $('#userAnswer').show();
                $('#userInput').focus();

                lives = $('<span id="lives">Lives: </span>');
                $('#boxscore').after(lives);

                createAnimatedbox();
                moveAnimatedbox();
                insertImages();
                setPlayImages();
                displayWordlist();
                loadPlayImage();

                $('.pengRoadRun').fadeOut('slow');
                $('.peng_game').fadeIn('slow');
                $('.fireball_game').fadeIn('slow');


            }
        });

    }; // end startPlay

        // set end of game
    var endPlay = function(){

        var $msgEnd = $('<div class="msgEnd"/>');
        var $msgGameOver = $('<h1 id="game_over">Game Over!</h1>');
        var $msgYouWin = $('<h1 id="you_win">You Win!</h1>');
        $msgEnd.append($msgGameOver);
        $msgEnd.append($msgYouWin);

        $msgYouWin.hide();
        $msgGameOver.hide();

        //user score
        var $userScore = $("#score").text();
        var $yourScore = $('<div id="yourScore"/>');
        var $yourScorePrint = $('<h2 id="yourScorePrint">Score: </h2>');
        $yourScorePrint.append($userScore);
        $yourScore.append($yourScorePrint);
        $msgEnd.append($yourScore);

        $actualScore = parseInt($userScore);

        // Display comment depends on score
        if ($userScore > 249){
            var $endImg = $('<img src = "/assets/emoticons/hallelujah.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">Wizard Master!</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        } else if ($userScore > 199) {
            var $endImg = $('<img src = "/assets/emoticons/punch.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">Excellent!</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        } else if ($userScore > 149) {
            var $endImg = $('<img src = "/assets/emoticons/good.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">Good Job!!</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        } else if ($userScore > 99) {
            var $endImg = $('<img src = "/assets/emoticons/wink.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">Well... Try More!</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        } else if ($userScore > 49) {
            var $endImg = $('<img src = "/assets/emoticons/stress.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">Are Kidding Me!?</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        } else if ($userScore == 0) {
            var $endImg = $('<img src = "/assets/emoticons/die.png" id="endImg"/>');
            var $comment = $('<h2 id="comment">You Are Burnt Crispy!!</h2>');
            $comment.appendTo($msgEnd);
            $comment.before($endImg);
        };


        // replay and learn more button
        var $replay = $('<div id="replay"></div>');
        var $replayPrint = $('<h2 id="replayPrint">New Game</h2>');
        $replay.append($replayPrint);
        var $learnMore = $('<div id="learnMore"/>');
        var $learnMorePrint = $('<h2 id="learnMorePrint">Learn More</h2>');


        $('#toolbar').css({"margin-top": 0+"px"});

        $learnMore.append($learnMorePrint);
        $msgEnd.append($replay);
        $msgEnd.append($learnMore);

        // hide quetions list and display answer with question
        $('.words').hide();
        $('#ani_container').empty();
        $('#ani_container').append($msgEnd);
        $('.msgEnd').show();

        answerShow();

        $('#userAnswer').fadeOut();


        $("#boxscore").hide();
        $('#btnplay').hide();
        $('.pengLives').hide();

        $("#replay").on('click',function(){
            window.location ="/games";
        });

        $("#learnMore").on('click',function(){
            window.location ="/chats";
        });

        $.ajax({
            url: '/games/' + $currentGameId + "/end",
            method: 'post',
            dataType: 'json',
            data: {
                id: $currentGameId,
                points: $("#score").text(),
            },
            success: function(response) {
                // end of game, db should be updated
            }
        });


    }; // end endplay

    var pengAnimation = function () {
        var $pengRoadRun = $('<div class="pengRoadRun"/>');
        var $pengRoadRunImg = $('<img class="peng-target"/>');
        $pengRoadRunImg.attr('src', '/assets/emoticons/driving.png');
        var $loadMsg = $('<h2>LOADING..</h2>')
        $pengRoadRun.append($loadMsg).append($pengRoadRunImg);
        $('#container').prepend($pengRoadRun);
    };

    var msgStart = function(){
        var $msgStart = $('<div id="msgStart"/>');
        var $areYouReady = $('<h2 id="msgStartTitle">Rescue Peng!</h2>');
        var $rescuePengImg = $('<img id="rescuePengImg"/>');
        $rescuePengImg.attr('src', "/assets/emoticons/stress.png");
        $msgStart.append($areYouReady);
        $msgStart.append($rescuePengImg);
        $msgStart.append($("#btnplay"));
        $("#container").append($msgStart);
         $('#userAnswer').hide();
    }


/////////------button and click for calling functions--------///////////
    $('#btnsubmit').on('click', matchAnswer);
    $('#userInput').on('keydown', function(key){
        if (key.which == 13){
            matchAnswer();
        }
    });

    //btnAnimation();

    $("#btnplay").on('click', function(){
        pengAnimation();
        startPlay();
    });

    msgStart();

}); // end of document ready