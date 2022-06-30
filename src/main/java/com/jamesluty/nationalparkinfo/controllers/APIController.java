package com.jamesluty.nationalparkinfo.controllers;

import org.json.JSONArray;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@RestController
public class APIController {

	@RequestMapping("/api/parks/{state}")
	public String parks(@PathVariable("state") String state) {
		String host = "https://developer.nps.gov/api/v1/parks";
		String stateCode = "stateCode=" + state;
		String api_key = "api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd";
		HttpResponse<JsonNode> response = null;
		
		try {
			response = Unirest.get(host + "?" + stateCode + "&" + api_key)
					.asJson();
		} catch (UnirestException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		JSONArray items = (JSONArray) response.getBody().getObject().get("data");
		
		return items.toString();
	}
	
	@RequestMapping("/api/parks/details/{parkCode}")
	public String parkDetails(@PathVariable("parkCode") String parkCode) {
		String host = "https://developer.nps.gov/api/v1/parks";
		String park = "parkCode=" + parkCode;
		String api_key = "api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd";
		HttpResponse<JsonNode> response = null;
		
		try {
			response = Unirest.get(host + "?" + park + "&" + api_key)
					.asJson();
		} catch (UnirestException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		JSONArray items = (JSONArray) response.getBody().getObject().get("data");
		
		return items.toString();
	}
	
	@RequestMapping("/api/campgrounds/{state}")
	public String campgrounds(@PathVariable("state") String state) {
		String host = "https://developer.nps.gov/api/v1/campgrounds";
		String stateCode = "stateCode=" + state;
		String api_key = "api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd";
		HttpResponse<JsonNode> response = null;
		
		try {
			response = Unirest.get(host + "?" + stateCode + "&" + api_key)
					.asJson();
		} catch (UnirestException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		JSONArray items = (JSONArray) response.getBody().getObject().get("data");
		
		return items.toString();
	}
}
