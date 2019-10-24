var home = true;
var dict = {};
var dictFilled = false;
var category_id = null;
var value = 600;
var min_date = null;
var max_date = null;

const MAX_OFFSET = 18400
for (let offset = 0; offset <= MAX_OFFSET; offset += 100) {
    $.getJSON( `http://jservice.io/api/categories?count=100&offset=${offset}`, function( data ) {
        $.each( data, function( _key, val ) {
            dict[val.title] = val.id;
        });
    });
}
dictFilled = true;
