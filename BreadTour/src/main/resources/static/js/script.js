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
            { name: '파운드', price: 3000, photo: '/img/poundcake.png', description: '진한 버터향이 느껴지는 파운드케이크' }
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

    const productCategoryButtons = document.querySelectorAll('.product-category button');
    const productsContainer = document.querySelector('.products');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalQuantityInput = document.getElementById('total-quantity');
    const totalAmountInput = document.getElementById('total-amount');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const closeModalButton = document.querySelector('.close');
    const confirmCheckoutButton = document.getElementById('confirm-checkout');
    const cancelCheckoutButton = document.getElementById('cancel-checkout');
    const productDetailModal = document.getElementById('product-detail-modal');
    const productDetailContainer = document.getElementById('product-detail');
    const closeDetailModalButton = document.querySelector('.close-detail');
    const addToCartButton = document.getElementById('add-to-cart');
    const cancelDetailButton = document.getElementById('cancel-detail');
    const addressModal = document.getElementById('address-modal');
    const closeAddressModalButton = document.querySelector('.close-address');
    const submitAddressButton = document.getElementById('submit-address');
    const cancelAddressButton = document.getElementById('cancel-address');

    let cart = [];
    let selectedProduct = null;

    function displayProducts(category) {
        productsContainer.innerHTML = '';
        products[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.photo}" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price}원</p>
                <button class="detail-button" data-category="${category}" data-name="${product.name}">상세정보</button>
                <button class="add-button" data-name="${product.name}" data-price="${product.price}">담기</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let totalQuantity = 0;
        let totalAmount = 0;

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <p>${item.name} - ${item.quantity}개 - ${item.price * item.quantity}원</p>
                <button class="quantity-button" data-name="${item.name}" data-action="decrease">-</button>
                <input type="number" class="item-quantity-input" value="${item.quantity}" min="1" readonly>
                <button class="quantity-button" data-name="${item.name}" data-action="increase">+</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            totalQuantity += item.quantity;
            totalAmount += item.price * item.quantity;
        });

        totalQuantityInput.value = totalQuantity;
        totalAmountInput.value = totalAmount + '원';
    }

    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('detail-button')) {
            const category = e.target.getAttribute('data-category');
            const productName = e.target.getAttribute('data-name');
            selectedProduct = products[category].find(product => product.name === productName);
            productDetailContainer.innerHTML = `
                <img src="${selectedProduct.photo}" alt="${selectedProduct.name}">
                <p>${selectedProduct.name}</p>
                <p>${selectedProduct.price}원</p>
                <p>${selectedProduct.description}</p>
            `;
            productDetailModal.style.display = 'block';
        } else if (e.target.classList.contains('add-button')) {
            const productName = e.target.getAttribute('data-name');
            const productPrice = parseInt(e.target.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            
            updateCart();
        }
    });

    addToCartButton.addEventListener('click', () => {
        if (selectedProduct) {
            const existingItem = cart.find(item => item.name === selectedProduct.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: selectedProduct.name, price: selectedProduct.price, quantity: 1 });
            }
            updateCart();
            productDetailModal.style.display = 'none';
        }
    });

    cancelDetailButton.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
    });

    productCategoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.product-category .active').classList.remove('active');
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-button')) {
            const productName = e.target.getAttribute('data-name');
            const action = e.target.getAttribute('data-action');
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                if (action === 'increase') {
                    existingItem.quantity += 1;
                } else if (action === 'decrease' && existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                }
                updateCart();
            }
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        checkoutItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const checkoutItemDiv = document.createElement('div');
            checkoutItemDiv.innerHTML = `
                <p>${item.name} - ${item.quantity}개 - ${item.price * item.quantity}원</p>
            `;
            checkoutItemsContainer.appendChild(checkoutItemDiv);
        });
        checkoutModal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    cancelCheckoutButton.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    confirmCheckoutButton.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
        addressModal.style.display = 'block';
    });

    // 배송지 입력 폼 취소 버튼 이벤트 핸들러
    cancelAddressButton.addEventListener('click', () => {
        addressModal.style.display = 'none';
    });

    // 배송지 입력 폼 제출 버튼 이벤트 핸들러
    submitAddressButton.addEventListener('click', () => {
        const buyerName = document.getElementById('buyer-name').value;
        const postcode = document.getElementById('sample4_postcode').value;
        const roadAddress = document.getElementById('sample4_roadAddress').value;
        const detailAddress = document.getElementById('sample4_detailAddress').value;
        const buyerTel = document.getElementById('buyer-tel').value;

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
            .then(data => {
                console.log(data);
                addressModal.style.display = 'none';

                // 결제 요청 데이터에 배송지 정보 추가
                const orderData = {
                    pg: 'nice', // PG사
                    pay_method: 'card', // 결제수단
                    merchant_uid: `merchant_${new Date().getTime()}`,
                    name: '주문명: 결제 테스트',
                    amount: parseInt(totalAmountInput.value.replace('원', '')), // 결제금액
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
                        .then(data => {
                            alert('결제가 완료되었습니다.');
                            
                            // 주문 내역을 로컬 스토리지에 저장
                            localStorage.setItem('orderSummary', JSON.stringify(cart));
                            cart = [];
                            updateCart();
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

    // 배송지 입력 모달 닫기 버튼 이벤트 핸들러
    closeAddressModalButton.addEventListener('click', () => {
        addressModal.style.display = 'none';
    });

    // 페이지 로드 시 기본으로 구운과자(카테고리 1)를 표시
    displayProducts(1);
});