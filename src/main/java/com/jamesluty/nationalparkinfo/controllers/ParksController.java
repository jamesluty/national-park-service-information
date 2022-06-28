package com.jamesluty.nationalparkinfo.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ParksController {

	@GetMapping("/")
	public String index(Model model) {
		ArrayList<String> states = new ArrayList<String>();
		states.add("WA");
		states.add("OR");
		states.add("CA");
		for(String state: states) {
			System.out.println(state);
		}
		model.addAttribute("states", states);
		return "index.jsp";
	}
	
	@GetMapping("/parks/{state}")
	public String state(@PathVariable("state") String state, Model model) {
		return "parksList.jsp";
	}
	
}
