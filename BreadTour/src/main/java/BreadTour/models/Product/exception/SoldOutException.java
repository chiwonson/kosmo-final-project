package BreadTour.models.Product.exception;

public class SoldOutException extends RuntimeException {
    private static final String NOT_ENOUGH_QUANTITY_MESSAGE = "'%s'의 재고가 부족합니다.(남은 재고 : %d개)";

    public SoldOutException(String message) {
        super(message);
    }

    public SoldOutException(String prname, int prcnt) {
        super(String.format(NOT_ENOUGH_QUANTITY_MESSAGE, prname, prcnt));

    }
}
