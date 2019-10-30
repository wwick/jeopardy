// global variables
var categories = {};
var min_date = null;
var max_date = null;
const MIN_VALID_DATE = '11/26/1984';

// there are between 18400 and 18500 categories
const MAX_OFFSET = 18400
// iterate through 100 categories at a time
for (let offset = 0; offset <= MAX_OFFSET; offset += 100) {
    $.getJSON( `http://jservice.io/api/categories?count=100&offset=${offset}`, function( data ) {
        $.each( data, function( _key, val ) {
            // add categories to dictionary
            categories[val.title] = val.id;
        });
    });
}

function attachListeners() {

  let $search_button = $("<button>", {type:"button", id:"search_button", text:"Search"});
  $search_button.click(createTable);
  $( "#critera" ).append($search_button);

  // date range selector
  $(function() {
      $('input[name="daterange"]').daterangepicker({
          opens: 'right',
          startDate: MIN_VALID_DATE,
          minDate: MIN_VALID_DATE,
      }, function(start, end) {
          // sets min and max dates
          min_date = start.format("YYYY-MM-DD");
          max_date = end.format("YYYY-MM-DD");
      });
  });

  // value changes when you move slider
  $value_slider = $( "#value_slider" );
  $value_display = $( "#value_display" );
  $value_display.html($value_slider.val());
  $value_slider.on('input', function() {
      $value_display.html(this.value);
  });
}

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  
    // Certain minor words should be left lowercase unless 
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
        function(txt) {
          return txt.toLowerCase();
        });
  
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
        uppers[i].toUpperCase());
  
    return str;
}
