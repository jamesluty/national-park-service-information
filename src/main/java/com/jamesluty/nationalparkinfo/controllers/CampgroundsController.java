package com.jamesluty.nationalparkinfo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


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
		model.addAttribute("state", stateFull);
		model.addAttribute("stateAbr", state);
		
		return "campgroundsList.jsp";
	}
	
	@GetMapping("/campgrounds/details/{parkCode}")
	public String campgroundDetails(@PathVariable("parkCode") String parkCode, Model model) {		
		
		model.addAttribute("parkCode", parkCode);
		return "campgroundDetails.jsp";
	}

}
