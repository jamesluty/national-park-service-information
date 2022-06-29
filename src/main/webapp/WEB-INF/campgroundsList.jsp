<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Pacific Northwest Campgrounds</title>
<!-- CSS Link -->
	<link rel="stylesheet" type="text/css" href="/css/style2.css">
	<script type="text/javascript" src="/js/app.js"></script>
	
<!-- <!-- Bootstrap Link -->
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
</head>
<body class="campgrounds-bg">
	<div class="nav-bar d-flex justify-content-end">
		<button class="buttons"><a href="/" class="buttons">Back</a></button>
	</div>
	<h1>Campgrounds Result Page</h1>
	
	<c:forEach var="campground" items="${campground}">
	<c:out value="${campground.name}"/>
	</c:forEach>
	
</body>
</html>