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
        url += `value=${value}&`;
    }
    if ($( "#date_box" ).is(':checked')) {
        url += `min_date=${min_date}&`;
        url += `max_date=${max_date}&`;
    }

    $.getJSON(url, function(data) {
        $.each( data, function( _key, val)  {
            // filter HTML elements such as italics
            let question_text = val.question.replace(/<[^>]*>?/gm, '');
            // if question has no text, skip it
            if (question_text == "") {
                return false;
            }
            let answer_text = val.answer.replace(/<[^>]*>?/gm, '');
            // create box
            let $row = $("<div>", {class:"clue", id:val.id});
            // box initially displays question text
            let $text_display = $("<p>").text(question_text);
            let info_text = val.category.title.toTitleCase();
            // gives clue value if clue value exists
            if (val.value != null) {
                info_text += " for " + val.value;
            }
            // category and usually value serves as box title
            let $question_info = $("<h3>").text(info_text);
            // store both question and answer
            $row.data("question", question_text);
            $row.data("answer", answer_text);
            $row.append($question_info)
            $row.append($text_display);
            // when box is clicked, swap between question and answer
            $row.on('click', function() {
                $text_display.text() == $row.data("answer") 
                  ? $text_display.text($row.data("question")) 
                  : $text_display.text($row.data("answer"));
            });
            $table.append($row);
            $table.append("<br>");
        });

    });

    $( "#results" ).remove();
    $( document.body ).append($table);

}

function getCategory() {
    let query = $( "#category_field" ).val();
    query = query.toLowerCase();
    // wait for setup to fill dict with categories
    if (dictFilled && query in dict) {
        return dict[query];
    }
    return "";
}

