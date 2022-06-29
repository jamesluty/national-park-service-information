package com.jamesluty.nationalparkinfo.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Controller
public class ParksController {

	@GetMapping("/")
	public String index(Model model) {
		ArrayList<String> states = new ArrayList<String>();
		states.add("WA");
		states.add("OR");
		states.add("ID");
		ArrayList<String> searchType = new ArrayList<String>();
		searchType.add("Campgrounds");
		searchType.add("Parks");
		model.addAttribute("searchType", searchType);
		model.addAttribute("states", states);
		return "index.jsp";
	}
	
	@PostMapping("/switch")
	public String switcher(@RequestParam("state") String state, @RequestParam("type") String type) {
		if(type.equals("Campgrounds")) {
			return "redirect:/campgrounds/" + state;
		} else {
			return "redirect:/parks/" + state;
		}
	}
	
	@GetMapping("/parks/{state}")
	public String state(@PathVariable("state") String state, Model model) {
		String stateFull;
		if(state.equals("WA")) {
			stateFull = "Washington";
		} else if (state.equals("OR")) {
			stateFull = "Oregon";
		} else {
			stateFull = "Idaho";
		}
		String host = "https://developer.nps.gov/api/v1/parks";
		String stateCode = "stateCode=" + state;
		String api_key = "api_key=MZ7Qm9huvc8sZk2jzmwn9eA4ge9OLfzRwMV1pkPd";
		HttpResponse<JsonNode> response = null;
		System.out.println(host + "?" + stateCode + "&" + api_key);
		try {
			response = Unirest.get(host + "?" + stateCode + "&" + api_key)
					.asJson();
		} catch (UnirestException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		model.addAttribute("response", response.getBody());
		model.addAttribute("state", stateFull);
		return "parksList.jsp";
	}
	
}
