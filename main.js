'use strict';

// searchTerm is declared globally
let searchTerm = '';

// renderNews reads each article that News API returns,
// makes three columns and fills them with articles evenly,
// and renders the article content to the page
function renderNews(data){
    let columnOne = '';
    let columnTwo = '';
    let columnThree = '';

    for (let j = 0; j < data.articles.length; j++){
        const pubDate = data.articles[j].publishedAt.split('T')[0];

        if (j == 0 || j % 3 == 0){
            columnOne = columnOne + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><h3>${data.articles[j].source.name} - ${pubDate}</h3><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        } else if (j == 1 || j % 3 == 1){
            columnTwo = columnTwo + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><h3>${data.articles[j].source.name} - ${pubDate}</h3><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        } else {
            columnThree = columnThree + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><h3>${data.articles[j].source.name} - ${pubDate}</h3><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        };
    };
    
    if (data.articles.length == 0){
        $('#search-results').html(`No results for "${searchTerm}". Check your spelling and try again!`);        
    } else {
        $('#search-results').html(`Showing top ${data.articles.length} results for search term "${searchTerm}".`);
    };

    $('#columnOne').html(columnOne);
    $('#columnTwo').html(columnTwo);
    $('#columnThree').html(columnThree);
}

// getNews passes the search term to the News API and retrieves results
function getNews(query, callback){
    const settings = {
        url: 'https://newsapi.org/v2/everything',
        dataType: 'json',
        type: 'GET',
        data: {
            q: query,
            sortBy: 'relevancy',
            language: 'en',
            apiKey: NEWS_API,
        },
        success: callback,
    };

    $.ajax(settings);
}

// initListener sets the event listener to handle search form submissions
function initListener(){
    $('.search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.search-field');
        searchTerm = queryTarget.val();
        queryTarget.val('');
        getNews(searchTerm, renderNews);
    });
}

$(initListener);
