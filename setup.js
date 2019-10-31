// cache for category id's
var categories = {};

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

  function setupDateRange() {
    // date range selector
    $('input[name="daterange"]').daterangepicker({
      startDate: `01/01/${$min_year_slider.val()}`,
      endDate: `12/31/${$max_year_slider.val()}`,
      minDate: `01/01/${$min_year_slider.val()}`,
      maxDate: `12/31/${$max_year_slider.val()}`,
    }, function(start, end) {
      // sets min and max dates
      min_date = start.format("YYYY-MM-DD");
      max_date = end.format("YYYY-MM-DD");
    });
  }

  // value changes when you move slider
  $value_slider = $( "#value_slider" );
  $value_display = $( "#value_display" );
  $value_display.html($value_slider.val());
  $value_slider.on('input', function() {
      $value_display.html(this.value);
  });

  $min_year_slider = $( "#min_year_slider ");
  $min_year_display = $( "#min_year_display ");
  $max_year_slider = $( "#max_year_slider ");
  $max_year_display = $( "#max_year_display ");
  $min_year_display.html($min_year_slider.val());
  $max_year_display.html($max_year_slider.val());

  // update min year display when max year slider moves
  $min_year_slider.on('input', function() {
    // ensure that min year isn't greater than max year
    if (this.value > $max_year_slider.val()) {
      $min_year_slider.val($max_year_slider.val());
    } else {
      $min_year_display.html(this.value);
    }
    // update date range picker
    setupDateRange();
  });

  // update max year display when max year slider moves
  $max_year_slider.on('input', function() {
    // ensure that max year isn't less than min year
    if (this.value < $min_year_slider.val()) {
      $max_year_slider.val($min_year_slider.val());
    } else {
      $max_year_display.html(this.value);
    }
    // update date range picker
    setupDateRange();
  });

  setupDateRange();

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
