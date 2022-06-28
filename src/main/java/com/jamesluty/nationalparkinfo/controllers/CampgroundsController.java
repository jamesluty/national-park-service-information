package com.jamesluty.nationalparkinfo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class CampgroundsController {
	
	@GetMapping("/campgrounds/{state}")
	public String state(@PathVariable("state") String state, Model model) {
		return "campgroundsList.jsp";
	}

}
