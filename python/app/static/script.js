var map; // 지도를 저장할 전역 변수
var markers = []; // 지도에 추가된 마커들을 저장할 배열
var pins = []; // 사용자 추가 핀들을 저장할 배열
var geocoder; // 주소를 좌표로 변환하기 위한 Geocoder 객체
var infoWindow; // 마커에 대한 정보를 표시할 InfoWindow 객체
var timer; // InfoWindow를 자동으로 닫기 위한 타이머 변수

// 아이콘 타입에 따른 경로 설정
var iconPaths = {
    'special': '/static/images/1.png',
    'default': '/static/images/2.png',
    'type1': '/static/images/3.png',
    'type2': '/static/images/4.png'
};

// 페이지가 로드된 후 지도 초기화 함수 호출
document.addEventListener('DOMContentLoaded', function() {
    initMap(); // 지도 초기화
});

// 지도 초기화 함수
function initMap() {
    var mapOptions = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도의 중심 좌표 (서울)
        level: 12 // 지도 확대 레벨
    };

    map = new kakao.maps.Map(document.getElementById('map'), mapOptions); // 지도 객체 생성
    geocoder = new kakao.maps.services.Geocoder(); // Geocoder 객체 생성
    infoWindow = new kakao.maps.InfoWindow(); // InfoWindow 객체 생성

    // 서버에서 추천 맛집 데이터를 가져와서 마커 추가
    fetch('/recommendations')
        .then(response => response.json()) // JSON 형태로 응답 데이터 변환
        .then(data => {
            data.forEach((restaurant, index) => {
                var iconType = (index === 0) ? 'special' : 'default'; // 첫 번째 맛집은 특별 아이콘 사용
                addMarker(restaurant.lat, restaurant.lng, restaurant.name, restaurant.address, restaurant.url, iconType);
            });
        });

    // 지도 클릭 시 핀 추가
    kakao.maps.event.addListener(map, 'click', function(event) {
        addPin(event.latLng);
    });

    // 서버에서 핀 데이터를 가져와서 마커 추가
    fetch('/pins')
        .then(response => response.json())
        .then(data => {
            pins = data; // 핀 데이터 저장
            pins.forEach(pin => {
                addMarker(pin.lat, pin.lng, pin.title, pin.address, pin.url, pin.iconType || 'default');
            });
        });
}

// 지도에 마커를 추가하는 함수
function addMarker(lat, lng, title, address, url, iconType) {
    var position = new kakao.maps.LatLng(lat, lng); // 마커 위치 설정

    var imageSrc = iconPaths[iconType] || iconPaths['default']; // 아이콘 경로 결정
    var imageSize = new kakao.maps.Size(24, 35); // 아이콘 크기 설정
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정

    var marker = new kakao.maps.Marker({
        position: position, // 마커 위치
        image: markerImage, // 마커 이미지
        title: title, // 마커 제목
        iconType: iconType // 아이콘 타입 (필터링 용도)
    });

    // InfoWindow의 HTML 콘텐츠 설정
    var infoWindowContent = `
        <div style="padding:5px; font-size:12px;">
            <strong>${title}</strong><br>
            ${address}<br>
            <a href="${url}" target="_blank">자세히 보기</a>
        </div>
    `;

    // 마커에 마우스를 올렸을 때 InfoWindow를 표시
    kakao.maps.event.addListener(marker, 'mouseover', function() {
        clearTimeout(timer); // 기존 타이머 클리어
        infoWindow.setContent(infoWindowContent); // InfoWindow에 내용 설정
        infoWindow.open(map, marker); // InfoWindow 열기
    });

    // 마커에서 마우스가 나갔을 때 InfoWindow를 닫기 위한 타이머 설정
    kakao.maps.event.addListener(marker, 'mouseout', function() {
        timer = setTimeout(function() {
            infoWindow.close(); // InfoWindow 닫기
        }, 1000); // 1초 후 닫기
    });

    // InfoWindow가 열려 있을 때 마우스가 InfoWindow로 이동하면 타이머 클리어
    kakao.maps.event.addListener(infoWindow, 'mouseover', function() {
        clearTimeout(timer); // 타이머 클리어
    });

    // InfoWindow에서 마우스가 나갔을 때 타이머 설정
    kakao.maps.event.addListener(infoWindow, 'mouseout', function() {
        timer = setTimeout(function() {
            infoWindow.close(); // InfoWindow 닫기
        }, 1000); // 1초 후 닫기
    });

    marker.setMap(map); // 지도의 마커 추가
    markers.push(marker); // 마커 배열에 추가
}

// 지도에 핀을 추가하는 함수
function addPin(location) {
    var lat = location.getLat(); // 핀의 위도
    var lng = location.getLng(); // 핀의 경도

    // 사용자에게 핀에 대한 정보 입력 받기
    var name = prompt("맛집 이름을 입력하세요:");
    var address = prompt("맛집 주소를 입력하세요:");
    var url = prompt("맛집 링크를 입력하세요:");
    var iconType = prompt("마커 타입을 입력하세요 (default, special, type1, type2):");

    if (!name || !address || !url) return; // 필수 정보가 없으면 함수 종료

    addMarker(lat, lng, name, address, url, iconType || 'default'); // 마커 추가

    // 서버에 핀 추가 요청
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
            throw new Error('Network response was not ok'); // 네트워크 응답 오류 처리
        }
        return response.json(); // 응답 데이터를 JSON으로 변환
    }).then(data => {
        console.log('Pin added:', data); // 핀 추가 응답 데이터 확인
        pins.push(data); // 핀 배열에 추가
    }).catch(error => {
        console.error('Error adding pin:', error); // 오류 처리
    });
}

// 주소로 마커를 검색하여 추가하는 함수
function searchAddress() {
    var address = document.getElementById('address').value; // 입력된 주소
    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 검색 결과의 좌표
            var name = prompt("맛집 이름을 입력하세요:");
            var url = prompt("맛집 링크를 입력하세요:");
            var iconType = prompt("마커 타입을 입력하세요 (default, special, type1, type2):");

            if (!name || !url) return; // 필수 정보가 없으면 함수 종료

            addMarker(coords.getLat(), coords.getLng(), name, address, url, iconType || 'default'); // 마커 추가

            // 서버에 핀 추가 요청
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
                    throw new Error('Network response was not ok'); // 네트워크 응답 오류 처리
                }
                return response.json(); // 응답 데이터를 JSON으로 변환
            }).then(data => {
                console.log('Pin added:', data); // 핀 추가 응답 데이터 확인
                pins.push(data); // 핀 배열에 추가
            }).catch(error => {
                console.error('Error adding pin:', error); // 오류 처리
            });
        } else {
            alert('주소 검색에 실패했습니다.'); // 주소 검색 실패 알림
        }
    });
}

// 특정 마커 위치로 이동하는 함수
function moveToMarker(lat, lng) {
    var moveLatLon = new kakao.maps.LatLng(lat, lng); // 이동할 좌표 생성
    map.setCenter(moveLatLon); // 지도 중심을 이동할 좌표로 설정
}
