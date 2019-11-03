# Jeopardy!

Retrieves clues from [jService](http://jservice.io) and displays them in an easy-to-read format.

## Link

<http://ec2-52-14-191-6.us-east-2.compute.amazonaws.com/~wwick/git/jeopardy/index.html>

## Usage

By default, no filters will be applied. Any input changes to the filters will result in that filter being checked unless the user unchecks it. For the date filter, the user can adjust the min and max year sliders in addition to clicking on the date range box to see a drop down date range selector. Searching with "random" will not apply any filters.

## Performance Note

Upon loading, the site immediately iterates through the categories on Jservice, mapping category name to id, so that when a user searches by a category name, the associated category id can be obtained in O(1) time. This initial step can make the first search slow, but based on advice from Capitol One engineers during office hours, it is preferable to hard-coding the category cache.

## Libraries

[JQuery][https://jquery.com]
[Date Range Picker](https://www.daterangepicker.com)
[Skeleton](http://getskeleton.com)