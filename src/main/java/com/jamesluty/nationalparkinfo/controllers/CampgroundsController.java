package com.jamesluty.nationalparkinfo.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Controller
public class CampgroundsController {
	
	@GetMapping("/campgrounds/{state}")
	public String state(@PathVariable("state") String state, Model model) {
		String stateFull;
		if(state.equals("WA")) {
			stateFull = "Washington";
		} else if (state.equals("OR")) {
			stateFull = "Oregon";
		} else {
			stateFull = "Idaho";
		}
		String host = "https://developer.nps.gov/api/v1/campgrounds";
		String stateCode = "stateCode=" + state;
		String api_key = "api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd";
		HttpResponse<JsonNode> response = null;
		System.out.println(host + "?" + stateCode + "&" + api_key);
		try {
			response = Unirest.get(host + "?" + stateCode + "&" + api_key)
					.asJson();
		} catch (UnirestException e) {
			System.out.println(e);
			e.printStackTrace();
		}
		
		ObjectMapper mapper = new ObjectMapper();
		ArrayList<Object> listUrls = new ArrayList<Object>(); 
		ArrayList<Object> listNames = new ArrayList<Object>(); 
		ArrayList<Object> listDescriptions = new ArrayList<Object>();
//		ArrayList<Object> listAddressCity = new ArrayList<Object>();
		JSONArray items = (JSONArray) response.getBody().getObject().get("data");
		for(Object item: items) {
			String thisItem = item.toString();
			JSONObject itemObj = new JSONObject(items);
			System.out.println(itemObj.getClass().getSimpleName());
			Map<String, Object> itemMap = new HashMap<String, Object>();
			try {
				itemMap = mapper.readValue(thisItem, new TypeReference<Map<String, Object>>(){});
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				System.out.println(e);
				e.printStackTrace();
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				System.out.println(e);
				e.printStackTrace();
			}
//			listDescriptions.add(itemMap.keySet());
			listUrls.add(itemMap.get("url"));
			listNames.add(itemMap.get("name"));
			listDescriptions.add(itemMap.get("description"));
		}
		

		model.addAttribute("allUrls", listUrls);
		model.addAttribute("allNames", listNames);
		model.addAttribute("allDescriptions", listDescriptions);
		model.addAttribute("state", stateFull);
		
		return "campgroundsList.jsp";
	}
	
	@GetMapping("/campgrounds/{state}/{id}")
	public String id(@PathVariable("state") String state, Model model) {		
		return "campgroundInfo.jsp";
	}

}
