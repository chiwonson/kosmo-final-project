package BreadTour.models.Product.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import BreadTour.models.Product.service.CartService;
import BreadTour.models.Product.service.OrdersService;
import BreadTour.models.Product.service.PaymentService;
import BreadTour.models.Product.service.ProductService;
import BreadTour.models.Product.vo.Cart;
import BreadTour.models.Product.vo.Orders;
import BreadTour.models.Product.vo.Payment;
import BreadTour.models.Product.vo.Product;

@Controller
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/product")
    public String getPoduct(Model model) {
        model.addAttribute("products", productService.findAll());
        return "productList";
    }

    @PostMapping("/cart")
    public String addToCart(@RequestParam Long prnum, @RequestParam int quantity, Model model) {
        Product product = productService.findById(prnum);
        Cart cart = new Cart();
        cart.setCrid("cart" + System.currentTimeMillis()); // 임시 ID, 실제로는 세션이나 사용자 정보를 활용
        cart.setMid("testUser"); // 실제 사용자 정보로 교체
        cart.setMname("Test User"); // 실제 사용자 정보로 교체
        cart.setCrcnt(quantity);
        cart.setCrtotal(product.getPrprice().multiply(BigDecimal.valueOf(quantity)));
        cart.setPrphoto(product.getPrphoto());
        cart.setPrid(product.getPrid());
        cartService.save(cart);
        return "redirect:/api/product/cart";
    }

    @GetMapping("/cart")
    public String viewCart(Model model) {
        List<Cart> cartItems = cartService.findAll();
        model.addAttribute("cartItems", cartItems);
        return "cart";
    }

    @PostMapping("/checkout")
    public String checkout(@RequestParam String mid, @RequestParam String mname, @RequestParam String poption,
            Model model) {
        // 주문 생성
        Orders order = new Orders();
        order.setMnum(1L);
        order.setMid(mid);
        order.setMaddr("Test Address");
        order.setMhp("010-9670-5011");
        ordersService.save(order);

        // 결제 생성
        Payment payment = new Payment();
        payment.setMnum(1L); // 실제 사용자 정보로 교체
        payment.setMname(mname);
        payment.setCrtotal(
                cartService.findAll().stream().map(Cart::getCrtotal).reduce(BigDecimal.ZERO, BigDecimal::add));
        payment.setPoption(poption);
        payment.setPstatus("Completed");
        paymentService.save(payment);

        return "redirect:/api/product/confirmation";
    }

    @GetMapping("/confirmation")
    public String confirmation(Model model) {
        model.addAttribute("orders", ordersService.findAll());
        model.addAttribute("payments", paymentService.findAll());
        return "confirmation";
    }
}
