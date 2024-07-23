<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품 등록</title>
<script  src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
<h3>상품 등록하기</h3>
<hr>
<form name="productForm" id="productForm">
    <table border="1" align="center">
        <tr>
            <td colspan="2" align="center">상품 입력창</td>
        </tr>
        <tr>
            <td>상품이름</td>
            <td><input type="text" name="pname" id="pname" style="width:300px"></td>
        </tr>
        <tr>
            <td>상품이미지</td>
            <td><input type="file" name="pphoto" id="pphoto"></td>
        </tr>
    </table>
</form>
</body>