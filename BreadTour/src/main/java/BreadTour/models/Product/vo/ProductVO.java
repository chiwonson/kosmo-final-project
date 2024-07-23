package BreadTour.models.Product.vo;

public class ProductVO {

    private String crnum;
    private String crid;
    private String mid;
    private String mname;
    private String crcnt;
    private String crtotal;
    private String prphoto;
    private String insertdate;
    private String prid;

    public ProductVO() {
    }

    public ProductVO(String crnum, String crid, String mid, String mname, String crcnt, String crtotal, String prphoto,
            String insertdate, String prid) {
        this.crnum = crnum;
        this.crid = crid;
        this.mid = mid;
        this.mname = mname;
        this.crcnt = crcnt;
        this.crtotal = crtotal;
        this.prphoto = prphoto;
        this.insertdate = insertdate;
        this.prid = prid;
    }

    public String getCrnum() {
        return crnum;
    }

    public void setCrnum(String crnum) {
        this.crnum = crnum;
    }

    public String getCrid() {
        return crid;
    }

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getCrcnt() {
        return crcnt;
    }

    public void setCrcnt(String crcnt) {
        this.crcnt = crcnt;
    }

    public String getCrtotal() {
        return crtotal;
    }

    public void setCrtotal(String crtotal) {
        this.crtotal = crtotal;
    }

    public String getPrphoto() {
        return prphoto;
    }

    public void setPrphoto(String prphoto) {
        this.prphoto = prphoto;
    }

    public String getInsertdate() {
        return insertdate;
    }

    public void setInsertdate(String insertdate) {
        this.insertdate = insertdate;
    }

    public String getPrid() {
        return prid;
    }

    public void setPrid(String prid) {
        this.prid = prid;
    }

}
