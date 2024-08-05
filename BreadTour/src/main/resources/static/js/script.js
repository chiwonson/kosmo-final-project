
document.addEventListener('DOMContentLoaded', () => {
    const IMP = window.IMP;
    if (IMP) {
        IMP.init('imp51403203'); // 아임포트 사용자 식별 코드로 초기화
    } else {
        console.error('IMP is not defined. Make sure the Iamport script is loaded.');
    }

    const products = {
        1: [
            { name: '마들렌', price: 100, photo: '/img/madeleine.png', description: '부드럽고 촉촉한 마들렌' },
            { name: '휘낭시에', price: 2700, photo: '/img/financier.png', description: '고소한 버터향의 휘낭시에' },
            { name: '까눌레', price: 3000, photo: '/img/cannele.png', description: '겉은 바삭하고 속은 촉촉한 까눌레' },
            { name: '스콘', price: 2500, photo: '/img/scone.png', description: '부드러운 식감의 스콘' },
            { name: '파운드', price: 3000, photo: '/img/pound_cake.png', description: '진한 버터향이 느껴지는 파운드케이크' }
        ],
        2: [
            { name: '바게뜨', price: 3000, photo: '/img/baguette.png', description: '바삭한 껍질과 쫄깃한 속살의 바게트' },
            { name: '깜빠뉴', price: 3500, photo: '/img/campagne.png', description: '천연 발효종으로 만든 건강한 깜빠뉴' }
        ],
        3: [
            { name: '우유식빵', price: 4000, photo: '/img/milk_bread.png', description: '부드럽고 고소한 우유식빵' },
            { name: '곡물식빵', price: 4500, photo: '/img/grain_bread.png', description: '각종 곡물이 들어간 건강한 곡물식빵' },
            { name: '옥수수식빵', price: 4000, photo: '/img/corn_bread.png', description: '달콤한 옥수수향이 나는 옥수수식빵' }
        ],
        4: [
            { name: '생크림케이크', price: 15000, photo: '/img/cream_cake.png', description: '부드럽고 달콤한 생크림케이크' },
            { name: '초콜렛케이크', price: 18000, photo: '/img/chocolate_cake.png', description: '진한 초콜릿 맛의 초콜렛케이크' },
            { name: '치즈케이크', price: 20000, photo: '/img/cheese_cake.png', description: '부드럽고 촉촉한 치즈케이크' },
            { name: '고구마케이크', price: 17000, photo: '/img/sweetpotato_cake.png', description: '달콤한 고구마가 듬뿍 들어간 케이크' },
            { name: '티라미수', price: 22000, photo: '/img/tiramisu.png', description: '커피와 치즈의 조화가 일품인 티라미수' }
        ]
    };

    const openCartButton = document.getElementById('open-cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartSection = document.getElementById('cart-section');
    const productsContainer = document.querySelector('.products');
    const listCard = document.querySelector('.listCard');
    const total = document.querySelector('.total');
    const quantity = document.querySelector('.quantity');
    const productCategoryButtons = document.querySelectorAll('.product-category button');
    const cancelAddressButton = document.getElementById('cancel-address');
    const addressModal = document.getElementById('address-modal');
    const submitAddressButton = document.getElementById('submit-address');
    const totalAmountInput = document.getElementById('total-amount');
    const clearCartButton = document.querySelector('.clearCart');
    let cart = [];

    // card 창 열기
    openCartButton.addEventListener('click', () => {
        cartSection.classList.add('active');
    });

    // card 창 닫기
    closeCartButton.addEventListener('click', () => {
        cartSection.classList.remove('active');
        document.getElementById('address-modal').style.display = 'block'; // 주소 입력 모달 표시
    });

    clearCartButton.addEventListener('click', () => {
        cart = []; // 장바구니 비우기
        updateCart(); // 장바구니 업데이트
    });

    function displayProducts(category) {
        productsContainer.innerHTML = '';
        products[category].forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.photo}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}원</p>
                <button class="detail-button" data-category="${category}" data-name="${product.name}">상세정보</button>
                <button class="add-button" data-key="${index}" data-category="${category}" data-name="${product.name}" data-price="${product.price}">담기</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function updateCart() {
        listCard.innerHTML = '';
        let totalPrice = 0;
        let totalCount = 0;
    
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalCount += item.quantity;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div><img src="${item.photo}" alt="${item.name}" width="50"></div>
                <div>${item.name}</div>
                <div>${item.price}원</div>
                <div>
                    <button class="change-quantity" data-name="${item.name}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="change-quantity" data-name="${item.name}" data-action="increase">+</button>
                </div>
            `;
            listCard.appendChild(listItem);
        });
    
        total.innerText = `${totalPrice}원`;
        quantity.innerText = totalCount;
        totalAmountInput.value = totalPrice;  // 추가: totalAmountInput의 값 설정
    }

    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            const key = e.target.getAttribute('data-key');
            const category = e.target.getAttribute('data-category');
            const product = products[category][key];
    
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
    
            updateCart();
        } else if (e.target.classList.contains('detail-button')) {
            const category = e.target.getAttribute('data-category');
            const productName = e.target.getAttribute('data-name');
            const product = products[category].find(p => p.name === productName);
    
            document.getElementById('product-detail').innerHTML = `
                <img src="${product.photo}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}원</p>
                <p>${product.description}</p>
                <button class="add-to-cart-button" data-key="${products[category].indexOf(product)}" data-category="${category}">담기</button>
                <button class="cancel-detail-button">취소</button>
            `;
            document.getElementById('product-detail-modal').style.display = 'block';
        }
    });
    
    

    document.getElementById('product-detail-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-button')) {
            const key = e.target.getAttribute('data-key');
            const category = e.target.getAttribute('data-category');
            const product = products[category][key];
    
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
    
            updateCart();
            document.getElementById('product-detail-modal').style.display = 'none';
        } else if (e.target.classList.contains('cancel-detail-button')) {
            document.getElementById('product-detail-modal').style.display = 'none';
        }
    });
    
    

    productCategoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.product-category .active').classList.remove('active');
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });

    listCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('change-quantity')) {
            const productName = e.target.getAttribute('data-name');
            const action = e.target.getAttribute('data-action');
            const item = cart.find(item => item.name === productName);

            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease' && item.quantity > 1) {
                item.quantity -= 1;
            }

            updateCart();
        }
    });

    submitAddressButton.addEventListener('click', () => {
        const buyerName = document.getElementById('buyer-name').value.trim();
        const postcode = document.getElementById('sample4_postcode').value.trim();
        const roadAddress = document.getElementById('sample4_roadAddress').value.trim();
        const detailAddress = document.getElementById('sample4_detailAddress').value.trim();
        const buyerTel = document.getElementById('buyer-tel').value.trim();
    
        if (buyerName && postcode && roadAddress && detailAddress && buyerTel) {
            const buyerAddress = roadAddress + ' ' + detailAddress;
    
            fetch('http://localhost:8083/api/delivery/save', { // 서버 URL이 올바른지 확인하십시오
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ buyerName, buyerAddress, buyerTel })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('배송지 정보를 저장하는 중 오류가 발생했습니다.');
                }
                return response.text();
            })
            .then(() => { // data 변수 사용을 제거했습니다.
                addressModal.style.display = 'none';
    
                // 결제 요청 데이터에 배송지 정보 추가
                const orderData = {
                    pg: 'nice', // PG사
                    pay_method: 'card', // 결제수단
                    merchant_uid: `merchant_${new Date().getTime()}`,
                    name: '주문명: 결제 테스트',
                    amount: parseInt(total.innerText.replace('원', '')), // 결제금액
                    buyer_email: 'buyer@example.com',
                    buyer_name: buyerName,
                    buyer_tel: buyerTel,
                    buyer_addr: buyerAddress,
                    buyer_postcode: postcode,
                    // m_redirect_url: 'http://localhost:8080/결제완료'
                };
    
                // 결제 요청 로직 (아임포트)
                IMP.request_pay(orderData, function (rsp) {
                    if (rsp.success) {
                        // 결제 성공 시 로직
                        alert('결제 성공');
                        fetch('http://localhost:8083/api/payments/complete', { // 서버 URL이 올바른지 확인하십시오
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ impUid: rsp.imp_uid, buyerName, buyerAddress, buyerTel })
                        })
                        .then(response => response.json())
                        .then(() => { // data 변수 사용을 제거했습니다.
                            // 결제 완료 후 로직 추가
                            alert('결제가 완료되었습니다.');
                            cart = [];
                            updateCart();
    
                            // 주문 성공 페이지로 이동
                            const orderSummary = cart.map(item => `${item.name} - ${item.quantity}개 - ${item.price * item.quantity}원`).join('<br>');
                            localStorage.setItem('orderSummary', orderSummary);
                            window.location.href = '/order-success.html';
                        });
                    } else {
                        // 결제 실패 시 로직
                        alert('결제 실패: ' + rsp.error_msg);
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
        } else {
            alert('모든 필드를 입력해 주세요.');
        }
    });
    

    cancelAddressButton.addEventListener('click', () => {
        addressModal.style.display = 'none';
    });

    document.querySelector('.close-detail').addEventListener('click', () => {
        document.getElementById('product-detail-modal').style.display = 'none';
    });

    document.querySelector('.close-address').addEventListener('click', () => {
        document.getElementById('address-modal').style.display = 'none';
    });

    displayProducts(1); // 초기 화면에 표시할 제품 카테고리
});