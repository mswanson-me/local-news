let latlng = '46.19351100000001,-123.77970750000001';

function geolocate(){
    navigator.geolocation.getCurrentPosition(function(position) {
        latlng = `${position.coords.latitude},${position.coords.longitude}`;
        console.log(latlng);
    });
}

function coordsToCity(latlng, callback){
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

function cityNews(){

}

function renderNews(data){
    let content;

    for (let i = 0; i < data.results.length; i++){
        content = content + `<li>${data.results[i].types[0]}</li>`;
    }

    $('#news').html(content);
}

function initPage(){
    geolocate();
    coordsToCity(latlng, renderNews);
}

$(initPage());