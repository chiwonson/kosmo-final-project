document.addEventListener('DOMContentLoaded', () => {
    const IMP = window.IMP;
    if (IMP) {
        IMP.init('imp51403203');
    } else {
        console.error('IMP is not defined. Make sure the Iamport script is loaded.');
    }

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
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeDetailButton = document.querySelector('.close-detail');
    const openWishlistButton = document.getElementById('open-wishlist');
    const wishlistSection = document.getElementById('wishlist-section');
    const wishlistContainer = document.querySelector('.wishlistblock');
    const swiperWrapper = document.getElementById('swiper-wrapper');
    
    // 장바구니 및 위시리스트 초기화
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const products = {
        1: [
            { name: '마들렌', price: 100, photo: '/img/madeleine.png', description: '부드럽고 촉촉한 마들렌', nutrition: '칼로리: 200kcal, 탄수화물: 20g, 단백질: 2g, 지방: 10g, 당류: 5g, 나트륨: 100mg, 콜레스테롤: 50mg' },
            { name: '휘낭시에', price: 2700, photo: '/img/financier.png', description: '고소한 버터향의 휘낭시에', nutrition: '칼로리: 250kcal, 탄수화물: 25g, 단백질: 3g, 지방: 12g, 당류: 8g, 나트륨: 120mg, 콜레스테롤: 60mg' },
            { name: '까눌레', price: 3000, photo: '/img/cannele.png', description: '겉은 바삭하고 속은 촉촉한 까눌레', nutrition: '칼로리: 220kcal, 탄수화물: 22g, 단백질: 3g, 지방: 11g, 당류: 7g, 나트륨: 110mg, 콜레스테롤: 55mg' },
            { name: '스콘', price: 2500, photo: '/img/scone.png', description: '부드러운 식감의 스콘', nutrition: '칼로리: 240kcal, 탄수화물: 24g, 단백질: 4g, 지방: 10g, 당류: 6g, 나트륨: 130mg, 콜레스테롤: 70mg' },
            { name: '파운드', price: 3000, photo: '/img/pound_cake.png', description: '진한 버터향이 느껴지는 파운드케이크', nutrition: '칼로리: 270kcal, 탄수화물: 28g, 단백질: 4g, 지방: 12g, 당류: 9g, 나트륨: 140mg, 콜레스테롤: 80mg' }
        ],
        // ... (다른 카테고리의 제품들)
    };

    // 이벤트 리스너들
    openCartButton?.addEventListener('click', () => cartSection.classList.toggle('active'));
    closeCartButton?.addEventListener('click', () => {
        cartSection.classList.remove('active');
        addressModal.style.display = 'block';
    });
    clearCartButton?.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    });
    openWishlistButton?.addEventListener('click', () => wishlistSection.classList.toggle('active'));
    closeDetailButton?.addEventListener('click', () => {
        if (productDetailModal) productDetailModal.style.display = 'none';
    });
    cancelAddressButton?.addEventListener('click', () => addressModal.style.display = 'none');
    submitAddressButton?.addEventListener('click', submitAddress);

    // 함수들
    function updateWishlist() {
        wishlistContainer.innerHTML = '';
        wishlist.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div><img src="${item.photo}" alt="${item.name}" width="50"></div>
                <div>${item.name}</div>
                <div>${item.price}원</div>
                <div class="wishlist-buttons">
                    <button class="add-to-cart-button" data-key="${wishlist.indexOf(item)}" data-category="${item.category}" data-name="${item.name}">담기</button>
                    <button class="delete-button" data-name="${item.name}">x</button>
                </div>
            `;
            wishlistContainer.appendChild(listItem);
        });

        const wishlistQuantity = document.querySelector('.wishlist-quantity');
        if (wishlistQuantity) wishlistQuantity.innerText = wishlist.length;

        // 로컬 스토리지에 상태 저장
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // 장바구니 업데이트 함수
    function updateCart() {
        const listCard = document.querySelector('.listCard');
        const total = document.querySelector('.total');
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
                <div class="quantity-control">
                    <button class="change-quantity" data-name="${item.name}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="change-quantity" data-name="${item.name}" data-action="increase">+</button>
                </div>
                <button class="delete-button" data-name="${item.name}">x</button>
            `;
            listCard.appendChild(listItem);
        });

        total.innerText = `${totalPrice}원`;
        quantity.innerText = totalCount;  // 총 수량 표시 추가
        localStorage.setItem('cart', JSON.stringify(cart)); // 상태 저장
    }

    function displayProducts(category) {
        productsContainer.innerHTML = '';
        products[category].forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div class="img-container">
                    <img src="${product.photo}" alt="${product.name}" data-category="${category}" data-name="${product.name}">
                    <div class="overlay" data-category="${category}" data-name="${product.name}"></div>
                </div>
                <div class="product-details">
                    <p>${product.name}</p>
                    <p class="description">${product.description}</p>
                    <p class="price">${product.price}원</p>
                </div>
                <div class="product-buttons">
                    <button class="add-button" data-key="${index}" data-category="${category}" data-name="${product.name}" data-price="${product.price}">+</button>
                    <button class="like-button" data-key="${index}" data-category="${category}" data-name="${product.name}">♡</button>
                </div>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function submitAddress() {
        const buyerName = document.getElementById('buyer-name').value.trim();
        const postcode = document.getElementById('sample4_postcode').value.trim();
        const roadAddress = document.getElementById('sample4_roadAddress').value.trim();
        const detailAddress = document.getElementById('sample4_detailAddress').value.trim();
        const buyerTel = document.getElementById('buyer-tel').value.trim();

        if (buyerName && postcode && roadAddress && detailAddress && buyerTel) {
            const buyerAddress = roadAddress + ' ' + detailAddress;

            fetch('http://localhost:8083/api/delivery/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ buyerName, buyerAddress, buyerTel })
            })
            .then(response => {
                if (!response.ok) throw new Error('배송지 정보를 저장하는 중 오류가 발생했습니다.');
                return response.text();
            })
            .then(() => {
                addressModal.style.display = 'none';

                const orderData = {
                    pg: 'nice',
                    pay_method: 'card',
                    merchant_uid: `merchant_${new Date().getTime()}`,
                    name: '주문명: 결제 테스트',
                    amount: parseInt(total.innerText.replace('원', '')),
                    buyer_email: 'buyer@example.com',
                    buyer_name: buyerName,
                    buyer_tel: buyerTel,
                    buyer_addr: buyerAddress,
                    buyer_postcode: postcode,
                };

                IMP.request_pay(orderData, function (rsp) {
                    if (rsp.success) {
                        alert('결제 성공');
                        fetch('http://localhost:8083/api/payments/complete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ impUid: rsp.imp_uid, buyerName, buyerAddress, buyerTel })
                        })
                        .then(response => response.json())
                        .then(() => {
                            alert('결제가 완료되었습니다.');

                            const orderSummary = cart.map(item => ({
                                name: item.name,
                                quantity: item.quantity,
                                price: item.price * item.quantity
                            }));
                            localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
                            localStorage.setItem('buyerName', buyerName);

                            cart = [];
                            updateCart();

                            window.location.href = '/order-success.html';
                        });
                    } else {
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
    }

    // 찜목록 및 장바구니 관련 이벤트 처리
    if (listCard) {
        listCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('change-quantity')) {
                const productName = e.target.getAttribute('data-name');
                const action = e.target.getAttribute('data-action');
                const item = cart.find(item => item.name === productName);

                if (item) {
                    if (action === 'increase') {
                        item.quantity += 1;
                    } else if (action === 'decrease' && item.quantity > 1) {
                        item.quantity -= 1;
                    }
                    updateCart();
                }
            } else if (e.target.classList.contains('delete-button')) {
                const productName = e.target.getAttribute('data-name');
                cart = cart.filter(item => item.name !== productName);
                updateCart();
            }
        });
    }

    if (wishlistContainer) {
        wishlistContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                const productName = e.target.getAttribute('data-name');
                wishlist = wishlist.filter(item => item.name !== productName);
                updateWishlist();
            } else if (e.target.classList.contains('add-to-cart-button')) {
                const key = e.target.getAttribute('data-key');
                const product = wishlist[key];

                const existingItem = cart.find(item => item.name === product.name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }

                updateCart();
                wishlist = wishlist.filter(item => item.name !== product.name);
                updateWishlist();
            }
        });
    }

    if (productsContainer) {
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

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                window.location.href = '/shopping';
            } else if (e.target.classList.contains('like-button')) {
                const key = e.target.getAttribute('data-key');
                const category = e.target.getAttribute('data-category');
                const product = products[category][key];

                const existingItem = wishlist.find(item => item.name === product.name);
                if (existingItem) {
                    wishlist = wishlist.filter(item => item.name !== product.name);
                } else {
                    wishlist.push(product);
                }

                e.target.classList.toggle('liked');
                updateWishlist();
            } else if (e.target.tagName === 'IMG' || e.target.classList.contains('overlay')) {
                const category = e.target.getAttribute('data-category');
                const productName = e.target.getAttribute('data-name');
                const product = products[category].find(p => p.name === productName);

                const productDetail = document.getElementById('product-detail');
                if (productDetail) {
                    productDetail.innerHTML = `
                        <div class="image-container">
                            <img src="${product.photo}" alt="${product.name}">
                        </div>
                        <p>${product.name}</p>
                        <p>${product.nutrition}</p>
                    `;
                    productDetailModal.style.display = 'flex';
                }
            }
        });
    }

    if (productCategoryButtons) {
        productCategoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const activeButton = document.querySelector('.product-category .active');
                if (activeButton) activeButton.classList.remove('active');
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                displayProducts(category);
            });
        });
    }

    // 초기 실행
    displayProducts(1);
    updateCart();
    updateWishlist();
});
