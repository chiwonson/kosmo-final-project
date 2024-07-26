package BreadTour.models.Product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Product {

    private int prnum; // id
    private String deliveryGroup;
    private String prname; // name
    private int prprice; // price
    private int prcnt; // quantity
    private String prphoto; // image

}
