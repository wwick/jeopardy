function setCategory() {
    let query = $( "#category_field" ).val();
    query = query.toLowerCase();
    if (dictFilled && query in dict) {
        found = true;
        category_id = dict[query];
        return true;
    }
    return false;
}

