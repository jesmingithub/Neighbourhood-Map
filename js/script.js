// Alert message for page load failure
var AlertMsg = function() {
    alert('Error Loading Page.Check Your Network Connection');
};

//Navigation Bar
jQuery(function($) {
    $('.button').click(function() {
        $('.sidemenu').toggleClass('expand')
    });
});
//Knockout, Filtering action
var viewModel = function() {
    var self = this;
    self.hotels = ko.observableArray(hotels);
    this.callMarker = function() {
        showMarkerInfo(this.marker, markerInfo);

    }; //populating markerInfo on the correct marker
    self.filterquery = ko.observable('');
    self.filter = ko.computed(function() {
        return mysearchList = ko.utils.arrayFilter(self.hotels(), function(i) {
            if (i.title.toLowerCase().indexOf(self.filterquery().toLowerCase()) >= 0) {
                if (i.marker) {

                    i.marker.setVisible(true);
                }
                return true;
            } else {
                i.marker.setVisible(false);
            }
        });
    });
};

var marker;
var markerInfo;
var markers = [];
//List of Hotels
var hotels = [{
        title: "Le Meridian",
        loc: {
            lat: 9.933796,
            lng: 76.316456
        }
    },
    {
        title: "Crowne Plaza",
        loc: {
            lat: 9.933980,
            lng: 76.319002
        }
    },
    {
        title: "Vivanta - by Taj",
        loc: {
            lat: 9.968718,
            lng: 76.257868
        }
    },
    {
        title: "The Gateway Hotel",
        loc: {
            lat: 9.976480,
            lng: 76.277191
        }
    },
    {
        title: "Old Harbour Hotel",
        loc: {
            lat: 9.967197,
            lng: 76.242453
        }
    },
    {
        title: "Kochi Mariott Hotel",
        loc: {
            lat: 10.029236,
            lng: 76.307862
        }
    },
    {
        title: "Radisson Blu",
        loc: {
            lat: 9.967104,
            lng: 76.307357
        }
    },
    {
        title: "The Trident Hotel",
        loc: {
            lat: 9.959292,
            lng: 76.269158
        }
    },
    {
        title: "Holiday Inn",
        loc: {
            lat: 9.990110,
            lng: 76.315949
        }
    }
];

//Loading Google Map
var map;

function initMap() {
    var latLng = {
        lat: 9.958896,
        lng: 76.295712
    }; // lat and lng of center view of map.
    map = new google.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 10,
        //styling Google Map
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#165c64"
            }, {
                "saturation": 34
            }, {
                "lightness": -69
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#b7caaa"
            }, {
                "saturation": -14
            }, {
                "lightness": -18
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
                "hue": "#cbdac1"
            }, {
                "saturation": -6
            }, {
                "lightness": -9
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#8d9b83"
            }, {
                "saturation": -89
            }, {
                "lightness": -12
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#d4dad0"
            }, {
                "saturation": -88
            }, {
                "lightness": 54
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#bdc5b6"
            }, {
                "saturation": -89
            }, {
                "lightness": -3
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#bdc5b6"
            }, {
                "saturation": -89
            }, {
                "lightness": -26
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#c17118"
            }, {
                "saturation": 61
            }, {
                "lightness": -45
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "all",
            "stylers": [{
                "hue": "#8ba975"
            }, {
                "saturation": -46
            }, {
                "lightness": -28
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#a43218"
            }, {
                "saturation": 74
            }, {
                "lightness": -51
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": 0
            }, {
                "lightness": 100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": 0
            }, {
                "lightness": 100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": 0
            }, {
                "lightness": 100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
                "hue": "#ffffff"
            }, {
                "saturation": 0
            }, {
                "lightness": 100
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
                "hue": "#3a3935"
            }, {
                "saturation": 5
            }, {
                "lightness": -57
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#cba923"
            }, {
                "saturation": 50
            }, {
                "lightness": -46
            }, {
                "visibility": "on"
            }]
        }]
    });

    markerInfo = new google.maps.InfoWindow(); //Information Window is called.

    var mapBounds = new google.maps.LatLngBounds();
    var hotelLength = hotels.length;

    var icon = 'image/hotel_5stars.png';
    var changeIcon = 'image/hotel_green.png';

    for (var i = 0; i < hotelLength; i++) {

        marker = new google.maps.Marker({
            map: map,
            position: hotels[i].loc,
            title: hotels[i].title,
            icon: icon,
            animation: google.maps.Animation.DROP
        });

        markers.push(marker); //updating marker array

        //To open an information window giving extra information to each marker.
        marker.addListener('click', function() {
            showMarkerInfo(this, markerInfo);
            Bouncer(this); //Enabling marker bouncer
        });

        //Changing marker when cursor hovers over the default marker
        marker.addListener('mouseover', function() {
            this.setIcon(changeIcon);
        });
        //changing marker back to the default one
        marker.addListener('mouseout', function() {
            this.setIcon(icon);
        });
        mapBounds.extend(markers[i].position);
        hotels[i].marker = marker;
    }
    map.fitBounds(mapBounds);
}

//Displaying marker information on clicking marker
function showMarkerInfo(marker, markerInfo) {
    var lat = marker.position.lat();
    var lng = marker.position.lng();
    var loc = lat + ',' + lng;
    //foursquare api
    var url = 'https://api.foursquare.com/v2/venues/search?v=20170112&ll=' + lat + ',' + lng + '&intent=checkin&client_id=CSUKNDDOEALR22YXZXTNDH2MR4IAZTEDF0U0KYXHBRII215X&client_secret=3RDG2MW0J0P4NP23RXTMPV0QEUZ0UUXV2PVZGUDWK3S53KWA';
    //sending Ajax request
    $.ajax({
        url: url,
        dataType: "jsonp",
    }).done(function(info) { //Accessing info using Four Square
        var address = info.response.venues[0].location.address + ',' + info.response.venues[0].location.city;
        console.log(address);
        var checkIn = info.response.venues[0].stats.checkinsCount;
        console.log(checkIn);
        var siteUrl = info.response.venues[0].url;
        console.log(siteUrl);

        // Checking if the markerInfo is not already opened
        if (markerInfo.marker != marker) {
            markerInfo.setContent('<div id="iw-container"><div class="iw-title">' + marker.title +
                '</div><br><div class="marker-content"><div> <b>Address:</b>' + address +
                '</div><br>' + '<div> <b>Website:</b>' + siteUrl +
                '</div><br><div> <b>CheckIns :</b>' + checkIn +
                '<br></div></div></div>');
            markerInfo.open(map, marker); //opening information window on clicking the marker
            markerInfo.addListener('closeclick', function() {
                markerInfo.marker = null; //clear marker property on closing markerInfo
            });
        };
    }).fail(function() {
        alert("Error retrieving data! Check your network connection.");
    });
};

function Bouncer(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(google.maps.Animation.null); //Once Time is out the marker stops bouncing
    }, 2000); //Bounce Timer
};
//

//Knockout, Filtering action
var viewModel = function() {
    var self = this;
    self.hotels = ko.observableArray(hotels);
    this.callMarker = function() {
        showMarkerInfo(this.marker, markerInfo);

    }; //populating markerInfo on the correct marker
    self.filterquery = ko.observable('');
    self.filter = ko.computed(function() {
        return mysearchList = ko.utils.arrayFilter(self.hotels(), function(i) {
            if (i.title.toLowerCase().indexOf(self.filterquery().toLowerCase()) >= 0) {
                if (i.marker) {

                    i.marker.setVisible(true);
                }
                return true;
            } else {
                i.marker.setVisible(false);
            }
        });
    });
};

ko.applyBindings(new viewModel());
