package com.jamesluty.nationalparkinfo.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
		
		model.addAttribute("state", stateFull);
		return "parksList.jsp";
	}
	
	@GetMapping("/parks/details/{state}")
	public String parkDetails(@PathVariable("state") String state, Model model) {
		return "parkDetails.jsp";
	}
	
}
