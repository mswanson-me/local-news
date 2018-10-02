let zipCode;

function renderNews(data){
    let columnOne = '';
    let columnTwo = '';
    let columnThree = '';

    for (let j = 0; j < data.articles.length; j++){
        if (j == 0 || j % 3 == 0){
            console.log('column one');
            columnOne = columnOne + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        } else if (j == 1 || j % 3 == 1){
            console.log('column Two');
            columnTwo = columnTwo + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        } else {
            console.log('column Three');
            columnThree = columnThree + `<a href="${data.articles[j].url}" target='blank'><article><h2>${data.articles[j].title}</h2><p>${data.articles[j].description}</p><img src="${data.articles[j].urlToImage}"></article></a>`;
        };
    };
    
    $('#columnOne').html(columnOne);
    $('#columnTwo').html(columnTwo);
    $('#columnThree').html(columnThree);
}

function getNews(zip, callback){
    const settings = {
        url: 'https://newsapi.org/v2/everything',
        dataType: 'json',
        type: 'GET',
        data: {
            q: zip,
            sortBy: 'publishedAt',
            language: 'en',
            apiKey: NEWS_API,
        },
        success: callback,
    };

    $.ajax(settings);
}

function getZip(data){
    for (let i = 0; i < data.results.length; i++){
        if (data.results[i].types[0] == 'administrative_area_level_1'){
            zipCode = data.results[i].formatted_address;
        };
    };

    getNews(zipCode, renderNews);
}

function geoCode(latlng, callback){
    const settings = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        dataType: 'json',
        type: 'GET',
        data: {
            latlng: latlng,
            key: GEO_API,
        },
        success: callback,
    };

    $.ajax(settings);
}

function geoLocate(){
    navigator.geolocation.getCurrentPosition(function(position) {
        latlng = `${position.coords.latitude},${position.coords.longitude}`;
        geoCode(latlng, getZip);
    });
}

$(geoLocate());