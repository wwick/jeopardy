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
            let $row = $("<div>", {class:"row", id:val.id});
            let $answer = $("<h1>", {class:"answer", text:answer_text});
            let $question = $("<p>", {class:"question", text:question_text});
            $row.append($answer);
            $row.append($question);
            $table.append($row);
        });
        $( "#result_table" ).remove();
        $( document.body ).append($table);
    });

}

