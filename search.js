function searchCategory(query) {
    if (dictFilled && query in dict) {
        found = true;
        category_id = dict[query];
        createTable();
    }
}

function getCategory() {
    return $.getJSON( `http://jservice.io/api/category?id=${category_id}`, function(data) {
       api_result = data.clues;
    });
}
