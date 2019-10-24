function createTable() {
    setCategory();
    let $table = $("<div>", {id:"result_table"});
    let url = "http://jservice.io/api/clues?";
    if ($( "#category_box" ).is(':checked')) {
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
            let question_text = val.question.replace(/<[^>]*>?/gm, '');
            let answer_text = val.answer.replace(/<[^>]*>?/gm, '');
            let $row = $("<div>", {class:"clue", id:val.id});
            let $text_display = $("<p>").text(question_text);
            let info_text = val.category.title + " " + val.value;
            let $question_info = $("<h3>").text(info_text);
            $row.data("question", question_text);
            $row.data("answer", answer_text);
            $row.append($question_info)
            $row.append($text_display);
            $row.click(function() {
                $text_display.text() == $row.data("answer") 
                  ? $text_display.text($row.data("question")) 
                  : $text_display.text($row.data("answer"));
              });
            $table.append($row);
            $table.append("<br>");
        });

    });

    $( "#result_table" ).remove();
    $( document.body ).append($table);

}

