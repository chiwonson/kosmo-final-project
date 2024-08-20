var map;
var markers = [];
var pins = [];
var geocoder;
var infoWindow; // 전역 변수로 infoWindow 선언
var timer; // infoWindow를 닫기 위한 타이머 변수

// 아이콘 경로 설정
var iconPaths = {
    'new': '/static/images/new.png',
    'default': '/static/images/basic.png'
};

// 페이지 로드 후 초기화 함수 호출
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

// 지도 초기화 함수
function initMap() {
    var mapOptions = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 12
    };

    map = new kakao.maps.Map(document.getElementById('map'), mapOptions);
    geocoder = new kakao.maps.services.Geocoder();
    infoWindow = new kakao.maps.InfoWindow(); // infoWindow 인스턴스 생성

    fetch('/recommendations')
        .then(response => response.json())
        .then(data => {
            data.forEach((restaurant, index) => {
                var iconType = (index === 0) ? 'special' : 'default';
                addMarker(restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.url, iconType);
            });
        });

    kakao.maps.event.addListener(map, 'click', function(event) {
        addPin(event.latLng);
    });

    fetch('/pins')
        .then(response => response.json())
        .then(data => {
            pins = data;
            pins.forEach(pin => {
                addMarker(pin.lat, pin.lng, pin.title, pin.address, pin.url, pin.iconType || 'default');
            });
        });
}

// 지도에 마커를 추가하는 함수
function addMarker(lat, lng, title, address, url, iconType) {
    var position = new kakao.maps.LatLng(lat, lng);

    var imageSrc = iconPaths[iconType] || iconPaths['default'];
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
        title: title,
        iconType: iconType
    });

    var infoWindowContent = `
        <div style="padding:5px; font-size:12px;">
            <strong>${title}</strong><br>
            ${address}<br>
            <a href="${url}" target="_blank">자세히 보기</a>
        </div>
    `;

    // 마커에 대한 이벤트 리스너 추가
    kakao.maps.event.addListener(marker, 'mouseover', function() {
        clearTimeout(timer); // 타이머 클리어
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function() {
        // 마우스가 `infoWindow`로 이동한 경우를 고려하여 타이머 설정
        timer = setTimeout(function() {
            infoWindow.close();
        }, 1000); // 1000ms (1초) 후에 닫기
    });

    // `infoWindow`가 열려 있는 동안 마우스가 `infoWindow`로 이동한 경우를 처리
    kakao.maps.event.addListener(infoWindow, 'mouseover', function() {
        clearTimeout(timer); // 타이머 클리어
    });

    kakao.maps.event.addListener(infoWindow, 'mouseout', function() {
        timer = setTimeout(function() {
            infoWindow.close();
        }, 1000); // 1000ms (1초) 후에 닫기
    });

    marker.setMap(map);
    markers.push(marker);
}

// 지도에 핀을 추가하는 함수
function addPin(location) {
    var lat = location.getLat();
    var lng = location.getLng();

    var name = prompt("맛집 이름을 입력하세요:");
    var address = prompt("맛집 주소를 입력하세요:");
    var url = prompt("맛집 링크를 입력하세요:");
    var iconType = prompt("마커 타입을 입력하세요 (default, special, type1, type2):");

    if (!name || !address || !url) return;

    addMarker(lat, lng, name, address, url, iconType || 'default');

    fetch('/add_pin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lat: lat,
            lng: lng,
            title: name,
            address: address,
            url: url,
            iconType: iconType || 'default'
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Pin added:', data); // 응답 데이터 확인
        pins.push(data);
    }).catch(error => {
        console.error('Error adding pin:', error);
    });
}

// 주소로 마커를 검색하여 추가하는 함수
function searchAddress() {
    var address = document.getElementById('address').value;
    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var name = prompt("맛집 이름을 입력하세요:");
            var url = prompt("맛집 링크를 입력하세요:");
            var iconType = prompt("마커 타입을 입력하세요 (default, special, type1, type2):");

            if (!name || !url) return;

            addMarker(coords.getLat(), coords.getLng(), name, address, url, iconType || 'default');

            fetch('/add_pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: coords.getLat(),
                    lng: coords.getLng(),
                    title: name,
                    address: address,
                    url: url,
                    iconType: iconType || 'default'
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                console.log('Pin added:', data);
                pins.push(data);
            }).catch(error => {
                console.error('Error adding pin:', error);
            });
        } else {
            alert('주소 검색에 실패했습니다.');
        }
    });
}

