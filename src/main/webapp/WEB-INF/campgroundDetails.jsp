<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Campground Details</title>
<!-- CSS Link -->
	<link rel="stylesheet" type="text/css" href="/css/style2.css">	
<!-- <!-- Bootstrap Link -->
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
</head>
<body>
	<div class="detailsWrapper">
		<p id="id">${id }</p>
		<div class="container"></div>
	</div>
	<!-- <!-- JavaScript Link -->	
	<script type="text/javascript" src="/js/campgroundDetails.js"></script>
</body>
</html>