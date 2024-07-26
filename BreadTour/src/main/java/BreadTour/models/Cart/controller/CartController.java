package BreadTour.models.Cart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BreadTour.models.Cart.dto.CartItem;
import BreadTour.models.Cart.dto.CartItemInsertResponse;
import BreadTour.models.Cart.service.CartService;
import BreadTour.models.Product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/cart")
@Slf4j
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final ProductService productService;

    /*
     * 배송 그룹별 장바구니 목록을 조회하여 반환한다
     */
    @GetMapping
    public ResponseEntity<Map<String, List<CartItem>>> getCartItems() {
        log.debug("장바구니 목록 불러오기");
        return ResponseEntity.ok(cartService.getCartItems());
    }

    /*
     * 장바구니에 상품을 추가한다
     * 장바구니에 이미 있던 상품과 새롭게 추가하는 상품을 구분하여 처리한다
     */
    @PostMapping("/{prnum}")
    public ResponseEntity<CartItemInsertResponse> addCartItem(@PathVariable int prnum) {
        log.debug("장바구니에 상품 추가 시작");
        return new ResponseEntity<>(cartService.addCartItem(productService.findProductById(prnum)), HttpStatus.OK);
    }

    /*
     * 장바구니 상품의 수량을 수정한다
     * +/- 버튼이 아닌 사용자가 값을 직접 바꿀 경우 호출된다
     */
    @PostMapping("{prnum}/{prcnt}")
    public ResponseEntity<HttpStatus> updatePrcnt(@PathVariable int prnum, @PathVariable int prcnt) {
        log.debug("장바구니 수량 수정 - 사용자가 직접 값 입력");
        log.debug(prnum + "" + prcnt);
        int beforePrcnt = cartService.getCartItem(prnum).getPrcnt();
        if (beforePrcnt != prcnt) {
            cartService.updatePrcnt(prnum, prcnt);
        }
        return ResponseEntity.ok().build();
    }

    /*
     * 장바구니의 상품 수량을 증가시킨다
     * +/-버튼을 누르면 동작
     */
}