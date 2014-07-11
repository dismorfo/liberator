#!/bin/bash

umask 002

APP_URL="http://localhost:8000/liberator"

sourceUrl="http://dev-dl-pa.home.nyu.edu/books"

discoveryLiberator="http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/core0/select?wt=json&json.wrf=callback={callback}&&fq=hash:iy26sh&fq=ss_collection_identifier:94b17163-75c2-42c4-b258-754e9fc9e0ea&fl=ss_embedded,title,type,ss_collection_identifier,ss_identifer,ss_representative_image,teaser,sm_field_author,sm_field_title"

CSS=`cssmin ../css/style.css`

SEARCH_JS=`uglifyjs ../js/search.js -o ../js/search.min.js`

FRONT_JS=`uglifyjs ../js/front.js -o ../js/front.min.js`

BOOK_JS=`uglifyjs ../js/crossframe.js ../js/book.js -o ../js/book.min.js`

FRONT_DATA="{ appName: 'The Liberator', title : 'Browse titles', appUrl: '$APP_URL', css: '$CSS', discoveryLiberator: '$discoveryLiberator' }"

BOOK_DATA="{ appName: 'The Liberator', title : 'Book', appUrl: '$APP_URL', sourceUrl: '$sourceUrl', css: '$CSS', discovery: '$DISCOVERY_URL' }"

ABOUT_DATA="{ appName: 'The Liberator', title : 'About', appUrl: '$APP_URL', css: '$CSS' }"

SEARCH_DATA="{ appName: 'The Liberator', title : 'Search', appUrl: '$APP_URL', css: '$CSS', discovery: '$discoveryLiberator' }"

echo $FRONT_DATA | mustache - front.mustache > ../index.html

echo $ABOUT_DATA | mustache - about.mustache > ../about/index.html

echo $BOOK_DATA | mustache - book.mustache > ../book/index.html

echo $SEARCH_DATA | mustache - search.mustache > ../search/index.html