package com.jamesluty.nationalparkinfo.controllers;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class CampgroundsController {
	
	@GetMapping("/campgrounds/{state}")
	public String state(@PathVariable("state") String state, Model model) {
		String stateAbr = StringUtils.substringBetween(state, "(", ")");
		String stateFull = StringUtils.substringBefore(state, " ");
		
		model.addAttribute("stateAbr", stateAbr);
		model.addAttribute("stateFull", stateFull);
		return "campgroundsList.jsp";
	}
	
	@GetMapping("/campgrounds/details/{id}")
	public String campgroundDetails(@PathVariable("id") String id, Model model) {		
		
		model.addAttribute("id", id);
		return "campgroundDetails.jsp";
	}

}
