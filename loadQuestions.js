function createTable() {
    // create structure to hold clues
    let $table = $("<div>", {class: "container", id:"results"});
    let url = "http://jservice.io/api/clues?";
    
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
        url += `min_date=${min_date}&`;
        url += `max_date=${max_date}&`;
    }

    $( "#results" ).remove();
    $( document.body ).append($table);

    let $loading = $("<p>").text("loading clues...");
    $table.append($loading);

    empty_result = true;

    $.getJSON(url, function(data) {
        $loading.remove();
        $.each( data, function( _key, val)  {
            // filter HTML elements such as italics
            let question_text = val.question.replace(/<[^>]*>?/gm, '');
            // if question has no text, skip it
            if (question_text == "") {
                return false;
            }
            empty_result = false;
            let answer_text = val.answer.replace(/<[^>]*>?/gm, '');
            // create box
            let $row = $("<div>", {class:"clue", id:val.id});
            // box initially displays question text
            let $text_display = $("<p>").text(question_text);
            $text_display.css("text-align", "center");
            let $switch_display = $("<h6>").text("(show answer)");
            $switch_display.css("text-align", "center");
            let info_text = val.category.title.toTitleCase();
            // gives clue value if clue value exists
            if (val.value != null) {
                info_text += " for " + val.value;
            }
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
                    $switch_display.text("(show answer)");
                } else {
                    $text_display.text($row.data("answer"));
                    $switch_display.text("(show question)");
                }
            });
            $table.append($row);
            $table.append("<br>");
        });

    }).then(function() {

        // $loading.remove();

        if (empty_result) {
            $table.append($("<h3>", {text:"No results. Try adjusting search criteria"}));
        }
    });
}

function getCategory() {
    let query = $( "#category_field" ).val();
    query = query.toLowerCase();
    // wait for setup to fill dict with categories
    if (query in categories) {
        return categories[query];
    }
    return "999999";
}


