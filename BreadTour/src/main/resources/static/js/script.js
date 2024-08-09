document.addEventListener('DOMContentLoaded', () => {
    const IMP = window.IMP;
    if (IMP) {
        IMP.init('imp51403203'); // 아임포트 사용자 식별 코드로 초기화
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
    const productDetailModal = document.getElementById('product-detail-modal'); // 추가
    const closeDetailButton = document.querySelector('.close-detail'); // 추가
    const openWishlistButton = document.getElementById('open-wishlist'); // 찜 목록 열기 버튼
    const wishlistSection = document.getElementById('wishlist-section'); // 찜 목록 섹션
    const wishlistContainer = document.querySelector('.wishlistblock'); // .wishlist ul 대신 .wishlist로 수정
    const swiperWrapper = document.getElementById('swiper-wrapper');
    
    // 장바구니 초기화: 로컬 스토리지에서 불러오기
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const products = {
        1: [
            { name: '마들렌', price: 100, photo: '/img/madeleine.png', description: '부드럽고 촉촉한 마들렌', nutrition: '칼로리: 200kcal, 탄수화물: 20g, 단백질: 2g, 지방: 10g, 당류: 5g, 나트륨: 100mg, 콜레스테롤: 50mg' },
            { name: '휘낭시에', price: 2700, photo: '/img/financier.png', description: '고소한 버터향의 휘낭시에', nutrition: '칼로리: 250kcal, 탄수화물: 25g, 단백질: 3g, 지방: 12g, 당류: 8g, 나트륨: 120mg, 콜레스테롤: 60mg' },
            { name: '까눌레', price: 3000, photo: '/img/cannele.png', description: '겉은 바삭하고 속은 촉촉한 까눌레', nutrition: '칼로리: 220kcal, 탄수화물: 22g, 단백질: 3g, 지방: 11g, 당류: 7g, 나트륨: 110mg, 콜레스테롤: 55mg' },
            { name: '스콘', price: 2500, photo: '/img/scone.png', description: '부드러운 식감의 스콘', nutrition: '칼로리: 240kcal, 탄수화물: 24g, 단백질: 4g, 지방: 10g, 당류: 6g, 나트륨: 130mg, 콜레스테롤: 70mg' },
            { name: '파운드', price: 3000, photo: '/img/pound_cake.png', description: '진한 버터향이 느껴지는 파운드케이크', nutrition: '칼로리: 270kcal, 탄수화물: 28g, 단백질: 4g, 지방: 12g, 당류: 9g, 나트륨: 140mg, 콜레스테롤: 80mg' }
        ],
        2: [
            { name: '바게뜨', price: 3000, photo: '/img/baguette.png', description: '바삭한 껍질과 쫄깃한 속살의 바게트', nutrition: '칼로리: 180kcal, 탄수화물: 30g, 단백질: 6g, 지방: 2g, 당류: 1g, 나트륨: 400mg, 콜레스테롤: 0mg' },
            { name: '깜빠뉴', price: 3500, photo: '/img/campagne.png', description: '천연 발효종으로 만든 건강한 깜빠뉴', nutrition: '칼로리: 190kcal, 탄수화물: 32g, 단백질: 7g, 지방: 3g, 당류: 2g, 나트륨: 350mg, 콜레스테롤: 0mg' }
        ],
        3: [
            { name: '우유식빵', price: 4000, photo: '/img/milk_bread.png', description: '부드럽고 고소한 우유식빵', nutrition: '칼로리: 210kcal, 탄수화물: 35g, 단백질: 8g, 지방: 4g, 당류: 5g, 나트륨: 300mg, 콜레스테롤: 15mg' },
            { name: '곡물식빵', price: 4500, photo: '/img/grain_bread.png', description: '각종 곡물이 들어간 건강한 곡물식빵', nutrition: '칼로리: 220kcal, 탄수화물: 36g, 단백질: 9g, 지방: 5g, 당류: 4g, 나트륨: 320mg, 콜레스테롤: 10mg' },
            { name: '옥수수식빵', price: 4000, photo: '/img/corn_bread.png', description: '달콤한 옥수수향이 나는 옥수수식빵', nutrition: '칼로리: 230kcal, 탄수화물: 38g, 단백질: 7g, 지방: 6g, 당류: 6g, 나트륨: 310mg, 콜레스테롤: 12mg' }
        ],
        4: [
            { name: '생크림케이크', price: 15000, photo: '/img/cream_cake.png', description: '부드럽고 달콤한 생크림케이크', nutrition: '칼로리: 350kcal, 탄수화물: 40g, 단백질: 5g, 지방: 18g, 당류: 30g, 나트륨: 200mg, 콜레스테롤: 80mg' },
            { name: '초콜렛케이크', price: 18000, photo: '/img/chocolate_cake.png', description: '진한 초콜릿 맛의 초콜렛케이크', nutrition: '칼로리: 400kcal, 탄수화물: 45g, 단백질: 6g, 지방: 20g, 당류: 35g, 나트륨: 220mg, 콜레스테롤: 90mg' },
            { name: '치즈케이크', price: 20000, photo: '/img/cheese_cake.png', description: '부드럽고 촉촉한 치즈케이크', nutrition: '칼로리: 450kcal, 탄수화물: 38g, 단백질: 7g, 지방: 25g, 당류: 28g, 나트륨: 250mg, 콜레스테롤: 100mg' },
            { name: '고구마케이크', price: 17000, photo: '/img/sweetpotato_cake.png', description: '달콤한 고구마가 듬뿍 들어간 케이크', nutrition: '칼로리: 370kcal, 탄수화물: 42g, 단백질: 5g, 지방: 15g, 당류: 33g, 나트륨: 210mg, 콜레스테롤: 85mg' },
            { name: '티라미수', price: 22000, photo: '/img/tiramisu.png', description: '커피와 치즈의 조화가 일품인 티라미수', nutrition: '칼로리: 420kcal, 탄수화물: 39g, 단백질: 8g, 지방: 22g, 당류: 30g, 나트륨: 230mg, 콜레스테롤: 95mg' }
        ]
    };


    let wishlist = [];

    // card 창 열기
    if (openCartButton) {
        openCartButton.addEventListener('click', () => {
            cartSection.classList.toggle('active');
        });
    }

    // card 창 닫기
    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cartSection.classList.remove('active');
            addressModal.style.display = 'block';
        });
    }

    // 장바구니 비우기 및 업데이트
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            cart = [];
            updateCart();
        });
    }

    // 찜목록 열기
    if (openWishlistButton) {
        openWishlistButton.addEventListener('click', () => {
            wishlistSection.classList.toggle('active');
        });
    }

    // 슬라이드 추가 함수
    function addSlides(products) {
        if (!swiperWrapper) {
            console.error('swiper-wrapper 요소를 찾을 수 없습니다.');
            return;
        }

        for (const category in products) {
            products[category].forEach(product => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <div class="contents-slide-group container-md">
                        <div class="cardset cardset-overlap">
                            <figure class="cardset-figure">
                                <img class="cardset-img" src="${product.photo}" alt="${product.name}">
                            </figure>
                            <div class="cardset-body body-light body-bottom">
                                <h5 class="cardset-tit">${product.name}</h5>
                                <p class="cardset-desc">${product.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });
        }
    }

    addSlides(products);

    // Swiper 초기화 코드
    new Swiper('.contents-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });


    function updateWishlist() {
        if (!wishlistContainer) {
            console.error('Wishlist container not found');
            return;
        }
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
        if (wishlistQuantity) {
            wishlistQuantity.innerText = wishlist.length;
        }
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

    // 여기서 초기화 함수 호출
    displayProducts(1); // 초기 화면에 표시할 제품 카테고리

    updateCart();

    function updateCart() {

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const listCard = document.querySelector('.listCard');
        const total = document.querySelector('.total');
        const quantity = document.querySelector('.quantity');

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
                <button class="delete-button" data-name="${item.name}">x</button> <!-- 삭제 버튼 추가 -->
            `;
            listCard.appendChild(listItem);
        });

        total.innerText = `${totalPrice}원`;
        quantity.innerText = totalCount;
        totalAmountInput.value = totalPrice;  // 추가: totalAmountInput의 값 설정
    }

    // 페이지 로드 시 장바구니 업데이트 호출
    document.addEventListener('DOMContentLoaded', () => {
        updateCart();
    });


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
    
                // 장바구니 상태를 로컬 스토리지에 저장
                localStorage.setItem('cart', JSON.stringify(cart));

                // 장바구니 업데이트
                updateCart();

                // /shopping 페이지로 이동
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
                    if (productDetailModal) {
                        productDetailModal.style.display = 'flex';
                    }
                }
            }
        });
    }

    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => {
            if (productDetailModal) {
                productDetailModal.style.display = 'none';
            }
        });
    }

    if (productCategoryButtons) {
        productCategoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const activeButton = document.querySelector('.product-category .active');
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                displayProducts(category);
            });
        });
    }

    if (listCard) {
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
            } else if (e.target.classList.contains('delete-button')) {
                const productName = e.target.getAttribute('data-name');
                cart = cart.filter(item => item.name !== productName);
                updateCart();
            }
        });
    }

    if (submitAddressButton) {
        submitAddressButton.addEventListener('click', () => {
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
                    if (!response.ok) {
                        throw new Error('배송지 정보를 저장하는 중 오류가 발생했습니다.');
                    }
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
        });
    }

    if (cancelAddressButton) {
        cancelAddressButton.addEventListener('click', () => {
            if (addressModal) {
                addressModal.style.display = 'none';
            }
        });
    }

    const closeAddressButton = document.querySelector('.close-address');
    if (closeAddressButton) {
        closeAddressButton.addEventListener('click', () => {
            if (addressModal) {
                addressModal.style.display = 'none';
            }
        });
    }
});