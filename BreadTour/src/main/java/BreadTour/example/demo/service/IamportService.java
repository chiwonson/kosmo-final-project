package BreadTour.example.demo.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class IamportService {
    private final IamportClient iamportClient;

    public IamportService(
            @Value("${iamport.api.key}") String apiKey,
            @Value("${iamport.api.secret}") String apiSecret) {
        this.iamportClient = new IamportClient(apiKey, apiSecret);
    }

    public IamportResponse<Payment> getPayment(String impUid) throws Exception {
        return iamportClient.paymentByImpUid(impUid);
    }
}
