<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!-- Formatting (dates) --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- CSS Link -->
	<link rel="stylesheet" type="text/css" href="/css/style2.css">
	<script type="text/javascript" src="/js/app.js"></script>
	<script src="/webjars/jquery/jquery.min.js"></script>	
<!-- <!-- Bootstrap Link -->
	<link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css" />
<title>Pacific Northwest Campgrounds</title>
</head>
<body class="campgroundsList-bg text-white">
	<div class="nav-bar d-flex justify-content-end">
		<a class="btn btn-secondary" href="/">Home</a>
	</div>
	<div class="mainWrapper">
		<h1 class="pageTitle">All Campgrounds in <span id=state>${state}</span></h1>
		<div class="container"></div>
	</div>
	<script src="/js/campgroundsList.js"></script>
	
</body>
</html>