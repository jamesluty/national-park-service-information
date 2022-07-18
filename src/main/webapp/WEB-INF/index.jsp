<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Formatting (dates) --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/webjars/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css"> <!-- change to match your file/naming structure -->
    <script src="/webjars/jquery/jquery.min.js"></script>
    <script src="/webjars/bootstrap/js/bootstrap.min.js"></script>
	<title>Escape Outdoors</title>
</head>
<body class="main-bg">
	<div class="mainWrapper">
		<h1 class="pageTitle">Outdoor Adventures</h1>
		
		<div class="formDiv">
			<form class="switchForm" action="/switch" method="post">
				<select name="state">
					<option value="" disabled selected hidden>-- Select a state --</option>
					<c:forEach var="state" items="${statesFull }">
						<option value="${state }">${state }</option>
					</c:forEach>
				</select>
				<select name="type">
					<option value="" disabled selected hidden>-- Select an activity --</option>
					<c:forEach var="searchType" items="${searchType }">
						<option value="${searchType }">${searchType }</option>
					</c:forEach>
				</select>
				<button class="btn btn-dark">Submit</button>
			</form>
		</div>
	</div>
</body>
</html>