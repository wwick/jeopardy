var home = true;
var category_id = null;
var api_result = [];
var dict = {};
var dictFilled = false;

const MAX_OFFSET = 18400
for (let offset = 0; offset <= MAX_OFFSET; offset += 100) {
    $.getJSON( `http://jservice.io/api/categories?count=100&offset=${offset}`, function( data ) {
        $.each( data, function( _key, val ) {
            dict[val.title] = val.id;
        });
    });
}
dictFilled = true;
