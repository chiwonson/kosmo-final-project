package BreadTour.models.Cart.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import BreadTour.models.Cart.dto.CartItem;
import BreadTour.models.Cart.dto.CartItemInsertResponse;
import BreadTour.models.Cart.repository.CartRepository;
import BreadTour.models.Product.dto.Product;
import BreadTour.models.Product.exception.SoldOutException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    /*
     * 장바구니의 모든 목록을 반환한다
     * 배송 그룹별로 묶어서 반환하기 위해서 Map을 이용해서 반환한다
     * 
     * @return
     */

    @Override
    public Map<String, List<CartItem>> getCartItems() {
        // TODO Auto-generated method stub
        return cartRepository.selectAll()
                .stream()
                .collect(
                        Collectors.groupingBy(CartItem::getDeliveryGroup,
                                Collectors.mapping(Function.identity(), Collectors.toList())));
    }

    /*
     * 상품 번호로 장바구니에 있는 상품을 찾는다
     * 
     * @param productId 상품 번호(id)
     * 
     * @return
     */
    @Override
    public CartItem getCartItem(int prnum) {
        // TODO Auto-generated method stub
        return cartRepository.selectById(prnum);
    }

    /*
     * 해당 상품의 재고가 남아있는지 확인 후
     * 재고가 있다면 장바구니에 이미 있던 상품인지 확인한다
     * 이미 있던 상품이라면 장바구니의 수량을 하나 늘리고
     * 아니라면 장바구니에 새로 넣는다
     * 
     * @param product 장바구니에 넣을 상품 정보
     */
    @Override
    @Transactional
    public CartItemInsertResponse addCartItem(Product product) {
        // TODO Auto-generated method stub
        CartItem selectedItem = cartRepository.selectById(product.getPrnum());
        if (selectedItem == null) {
            if (product.getPrcnt() <= 0) {
                log.debug("재고 없음");
                throw new SoldOutException(product.getPrname(), product.getPrcnt());
            }
            log.debug("장바구니에 없는 상품 - 추가");
            cartRepository.insert(new CartItem(product));
            return new CartItemInsertResponse();
        } else {
            log.debug("장바구니에 있던 상품 - 수 늘리기");
            selectedItem.setPrcnt(selectedItem.getPrcnt() + 1);
            cartRepository.updatePrcnt(selectedItem);
            return new CartItemInsertResponse(selectedItem.getPrcnt());
        }
    }

    /*
     * 장바구니의 상품 수량을 수정한다
     * 이때 재고를 확인하여 충분하지않다면 예외를 발생시킨다
     * 
     * @param prnum 상품의번호(id)
     */
    @Override
    @Transactional
    public void updatePrcnt(int prnum, int updatedPrcnt) {
        // TODO Auto-generated method stub
        CartItem selectedItem = cartRepository.selectById(prnum);
        int stockPrcnt = cartRepository.selectStockPrcnt(prnum);
        if (selectedItem.getPrcnt() < updatedPrcnt && stockPrcnt < updatedPrcnt) {
            log.debug("상품 재고 없음");
            throw new SoldOutException(selectedItem.getPrname(), stockPrcnt);
        }
        selectedItem.setPrcnt(updatedPrcnt);
        cartRepository.updatePrcnt(selectedItem);
    }

    /*
     * 장바구니의 상품을 삭제한다
     * 
     * @param prnum 상품의 번호(id)
     */
    @Override
    @Transactional
    public void deleteCartItem(int prnum) {
        // TODO Auto-generated method stub
        cartRepository.delete(prnum);
    }

    /*
     * 장바구니 상품의 selected를 수정한다
     */
    @Override
    @Transactional
    public void updateSelected(int prnum) {
        // TODO Auto-generated method stub
        cartRepository.updateSelected(prnum);
    }

    /*
     * 장바구니의 모든 상품을 구매한다
     * 장바구니의 모든 상품을 조회한 후 모든 상품의 재고가 충분한지 확인한다
     * 충분하지않을 경우 SoldOutException발생
     * 충분할 경우 장바구니에서 모든 상품 삭제
     */
    @Override
    @Transactional
    public void payAll() {
        // TODO Auto-generated method stub
        cartRepository.selectAll().forEach(item -> {
            int stockPrcnt = cartRepository.selectStockPrcnt(item.getPrnum());
            if (stockPrcnt < item.getPrcnt()) {
                throw new SoldOutException(item.getPrname(), stockPrcnt);
            }
        });
        cartRepository.deleteAll();
    }

    /*
     * 장바구니에서 선택된 상품들만 구매한다
     * 구매할 모든 상품의 재고가 충분한지 확인한다
     * 충분하지않다면 SoldOutException 발생 후 종료
     * 충분하다면 구매하고 장바구니 목록에서 삭제한다
     */
    @Override
    public void paySelectedItems() {
        // TODO Auto-generated method stub
        cartRepository.selectAll().stream()
                .filter(CartItem::isSelected).forEach(item -> {
                    int stockPrcnt = cartRepository.selectStockPrcnt(item.getPrnum());
                    if (stockPrcnt < item.getPrcnt()) {
                        throw new SoldOutException(item.getPrname(), stockPrcnt);
                    } else {
                        cartRepository.delete(item.getPrnum());
                    }
                });
    }

}
