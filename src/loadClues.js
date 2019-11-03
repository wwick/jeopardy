function loadClues(useRandom) {
    // create structure to hold clues
    let $results = $(" #results" );
    let url = "";

    if (useRandom) {
        url = "http://jservice.io/api/random?count=100";
    } else {
        url = "http://jservice.io/api/clues?";
    
        // only apply filters if boxes are checked
        if ($( "#category_box" ).is(':checked')) {
            category_id = getCategory();
            url += `category=${category_id}&`;
        }
        if ($( "#value_box" ).is(':checked')) {
            let value = $( "#value_slider" ).val();
            url += `value=${value}&`;
        }
        if ($( "#date_box" ).is(':checked')) {
            min_date_text = $('input[name="daterange"]').val().substring(0,10);
            max_date_text = $('input[name="daterange"]').val().substring(13);
            min_date = parseDate(min_date_text);
            max_date = parseDate(max_date_text);
            url += `min_date=${min_date}&`;
            url += `max_date=${max_date}&`;
        }
    }

    $results.empty();
    $( document.body ).append($results);

    let $loading = $("<p>").text("loading clues...");
    $results.append($loading);

    empty_result = true;

    $.getJSON(url, function(data) {
        $loading.remove();
        $.each( data, function( _key, val)  {
            // filter HTML elements such as italics
            let question_text = val.question.replace(/<[^>]*>?/gm, '');
            // if question has no text, skip it
            if (question_text == "" || val.value == null) {
                return;
            }
            empty_result = false;
            let answer_text = "What is " + val.answer.replace(/<[^>]*>?/gm, '') + "?";
            // create box
            let $row = $("<div>", {class:"clue", id:val.id});
            // box initially displays question text
            let $text_display = $("<p>").text(question_text);
            $text_display.css("text-align", "center");
            let $switch_display = $("<h6>").text("(flip)");
            $switch_display.css("text-align", "center");
            let info_text = val.category.title.toTitleCase();
            // appends clue value
            info_text += " for " + val.value;
            // category and usually value serves as box title
            let $question_info = $("<h4>").text(info_text);
            $question_info.css("text-align", "center");
            // store both question and answer
            $row.data("question", question_text);
            $row.data("answer", answer_text);
            $row.append($question_info)
            $row.append($text_display);
            $row.append($switch_display);
            // when box is clicked, swap between question and answer
            $row.on('click', function() {
                if ($text_display.text() == $row.data("answer")) {
                    $text_display.text($row.data("question"));
                    $switch_display.text("(flip)");
                } else {
                    $text_display.text($row.data("answer"));
                    $switch_display.text("(show clue)");
                }
            });
            $results.append($row);
            $results.append("<br>");
        });

    }).then(function() {

        // $loading.remove();

        if (empty_result) {
            $results.append($("<h3>", {text:"No results. Try adjusting search criteria"}));
        }
    });
}

function getCategory() {
    let query = $( "#category_field" ).val();
    if (query === "") {
        return "";
    } else {
        query = query.toLowerCase();
        // wait for setup to fill dict with categories
        if (query in categories) {
            return categories[query];
        }
        return "999999";
    }
}

function parseDate(date) {
    let day = date.substring(0,2);
    let month = date.substring(3,5)
    let year = date.substring(6);
    return day + "-" + month + "-" + year;
}


