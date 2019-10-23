function createTable() {
    let $table = $("<table>", {id:"result_table"});
    let $table_head = $("<thead>");

    let $table_head_row = $("<tr>");
    $table_head_row.append("<th>", {text:"question"});
    $table_head_row.append("<th>", {text:"answer"});

    $table_head.append($table_head_row);
    $table.append($table_head);

    getCategory().then(function() {
        let $table_body = $("<tbody>");
        $.each( api_result, function( _key, val)  {
            let $row = $("<tr>");
            $row.append($("<td>", {text:val.question}));
            $row.append($("<td>", {text:val.answer}));
            $row.appendTo( $table_body );
        });
        $table_body.appendTo($table);
        $( "#result_table" ).remove();
        $( document.body ).append($table);
    });

}

