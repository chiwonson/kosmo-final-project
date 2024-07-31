const products = {
    1: [
        { name: '마들렌', price: 2500, photo: '/img/madeline.jpg' },
        { name: '휘낭시에', price: 2700, photo: '/img/financier.jpg' },
        { name: '까눌레', price: 3000, photo: '/img/canele.jpg' },
        { name: '스콘', price: 2500, photo: '/img/scone.jpg' },
        { name: '파운드', price: 3000, photo: '/img/poundcake.jpg' }
    ],
    2: [
        { name: '바게뜨', price: 3000, photo: '/img/baguette.jpg' },
        { name: '깜빠뉴', price: 3500, photo: '/img/campagne.jpg' }
    ],
    3: [
        { name: '우유식빵', price: 4000, photo: '/img/milk_bread.jpg' },
        { name: '곡물식빵', price: 4500, photo: '/img/grain_bread.jpg' },
        { name: '옥수수식빵', price: 4000, photo: '/img/corn_bread.jpg' }
    ],
    4: [
        { name: '생크림케이크', price: 15000, photo: '/img/cream_cake.jpg' },
        { name: '초콜렛케이크', price: 18000, photo: '/img/chocolate_cake.jpg' },
        { name: '치즈케이크', price: 20000, photo: '/img/cheese_cake.jpg' },
        { name: '고구마케이크', price: 17000, photo: '/img/sweetpotato_cake.jpg' },
        { name: '티라미수', price: 22000, photo: '/img/tiramisu.jpg' }
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
let cart = [];

function displayProducts(category) {
    productsContainer.innerHTML = '';
    products[category].forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name}">
            <p>${product.name}</p>
            <p>${product.price}원</p>
            <button data-name="${product.name}" data-price="${product.price}">담기</button>
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
        cartItemDiv.innerHTML = `
            <p>${item.name} - ${item.quantity}개 - ${item.price * item.quantity}원</p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        totalQuantity += item.quantity;
        totalAmount += item.price * item.quantity;
    });

    totalQuantityInput.value = totalQuantity;
    totalAmountInput.value = totalAmount + '원';
}

productsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
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
    const IMP = window.IMP;
    IMP.init('imp51403203'); // 예: 'imp00000000'

    const orderData = {
        pg: 'nice', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: '주문명: 결제 테스트',
        amount: parseInt(totalAmountInput.value.replace('원', '')), // 결제금액
        buyer_email: 'buyer@example.com',
        buyer_name: '구매자 이름',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        //m_redirect_url: 'http://localhost:8080/결제완료'
    };

    IMP.request_pay(orderData, function (rsp) {
        if (rsp.success) {
            // 결제 성공 시 로직
            alert('결제 성공');
            // 백엔드로 결제 완료 요청
            fetch('/api/payments/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ impUid: rsp.imp_uid })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 결제 완료 후 로직 추가
                alert('결제가 완료되었습니다.');
                checkoutModal.style.display = 'none';
                cart = [];
                updateCart();
            });
        } else {
            // 결제 실패 시 로직
            alert('결제 실패: ' + rsp.error_msg);
        }
    });
});

// 페이지 로드 시 기본으로 구운과자(카테고리 1)를 표시
displayProducts(1);