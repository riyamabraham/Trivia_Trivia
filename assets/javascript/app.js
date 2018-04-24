$.fn.trivia = function () {
    var trivia = this;
    trivia.userPick = null;
    trivia.answers = {
        correct: 0,
        incorrect: 0
    };
    trivia.images = null;
    trivia.count = 30;
    trivia.current = 0;
    trivia.questions = [{
        question: "Who was the legendary Benedictine monk who invented champagne? ",
        choices: ["Dom Perignon.", "Bo", "Noyal", "Jack"],
        images: ["assets/images/q1.jpg"],
        correct: 0
    }, {
        question: "Name the largest freshwater lake in the world?",
        choices: ["Lake Michigan", "Lake Superior", "Sambar Lake", "Nile"],
        images: ["assets/images/q2.gif"],
        correct: 1

    }, {
        question: "Where would you find the Sea of Tranquility?",
        choices: ["Earth", "Forest", "Desert", "Moon"],
        images: ["assets/images/q3.gif"],
        correct: 3

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        images: ["assets/images/q4.gif"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        images: ["assets/images/q5.gif"],
        correct: 0

    }, {
        question: "Who invented the rabies vaccination?",
        choices: ["Humans", "Socrates", "Einstein", "Louis Pasteur"],
        images: ["assets/images/q6.gif"],
        correct: 3

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        images: ["assets/images/q7.gif"],
        correct: 2

    }, {
        question: "What is another word for lexicon?",
        choices: ["Whimsical", "Miserable", "Dictionary", "Joyful"],
        images: ["assets/images/q8.png"],
        correct: 3
    }];
    trivia.ask = function () {
        if (trivia.questions[trivia.current]) {
            $("#timer").html("Time remaining: " + "00:" + trivia.count + " secs");
            $("#question_div").html(trivia.questions[trivia.current].question);
            var choicesArr = trivia.questions[trivia.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.html(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(trivia.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    trivia.questions.length - (trivia.answers.correct + trivia.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    trivia.timer = function () {
        trivia.count--;
        if (trivia.count <= 0) {
            setTimeout(function () {
                trivia.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + trivia.count + " secs");
        }
    };
    trivia.nextQ = function () {
        trivia.current++;
        clearInterval(window.triviaCounter);
        trivia.count = 30;
        $('#timer').html("");
        setTimeout(function () {
            trivia.cleanUp();
            trivia.ask();
        }, 1000)
    };
    trivia.cleanUp = function () {
        $('div[id]').each(function (item) {
            $(this).html('');
        });
    };
    trivia.answer = function (correct) {
        var string = correct ? 'correct' : 'incorrect';
        trivia.answers[string]++;
        $('.' + string).html(string + ' answers: ' + trivia.answers[string]);
    };
    return trivia;
};
var Trivia;

$("#start_button").click(function () {
    $(this).hide();
    console.log(this);//now we hide the start button
    $('.result').remove();//we remove result part and also the html
    $('div').html('');
    Trivia = new $(window).trivia();//creating a new jqury object
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function (e) {
    var userPick = $(this).data("id"),
        trivia = Trivia || $(window).trivia(),
        index = trivia.questions[trivia.current].correct,
        correct = trivia.questions[trivia.current].choices[index];
    if (userPick !== index) {
        
            $('#choices_div').text("Wrong Answer! The correct answer was: " + correct).css("color","red");
            var gif = $("<img>");
            gif.attr("src", trivia.questions[trivia.current].images);
            console.log(gif);
            $('#image').append(gif);
            trivia.answer(false);
        
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct).css("color","green");
        var gif = $("<img>");
        gif.attr("src", trivia.questions[trivia.current].images);
        console.log(gif);
        $('#image').append(gif);
        trivia.answer(true);
    }
    trivia.nextQ();
});