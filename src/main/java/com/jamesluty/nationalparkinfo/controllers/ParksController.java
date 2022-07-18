package com.jamesluty.nationalparkinfo.controllers;

import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;
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
		ArrayList<String> statesFull = new ArrayList<String>();
		statesFull.add("Alabama (AL)");
		statesFull.add("Alaska (AK)");
		statesFull.add("Arizona (AZ)");
		statesFull.add("Arkansas (AR)");
		statesFull.add("California (CA)");
		statesFull.add("Colorado (CO)");
		statesFull.add("Connecticut (CT)");
		statesFull.add("Delaware (DE)");
		statesFull.add("Florida (FL)");
		statesFull.add("Georgia (GA)");
		statesFull.add("Hawaii (HI)");
		statesFull.add("Idaho (ID)");
		statesFull.add("Illinois (IL)");
		statesFull.add("Indiana (IN)");
		statesFull.add("Iowa (IA)");
		statesFull.add("Kansas (KS)");
		statesFull.add("Kentucky (KY)");
		statesFull.add("Louisiana (LA)");
		statesFull.add("Maine (ME)");
		statesFull.add("Maryland (MD)");
		statesFull.add("Massachusetts (MA)");
		statesFull.add("Michigan (MI)");
		statesFull.add("Minnesota (MN)");
		statesFull.add("Mississippi (MS)");
		statesFull.add("Missouri (MO)");
		statesFull.add("Montana (MT)");
		statesFull.add("Nebraska (NE)");
		statesFull.add("Nevada (NV)");
		statesFull.add("New Hampshire (NH)");
		statesFull.add("New Jersey (NJ)");
		statesFull.add("New Mexico (NM)");
		statesFull.add("New York (NY)");
		statesFull.add("North Carolina (NC)");
		statesFull.add("North Dakota (ND)");
		statesFull.add("Ohio (OH)");
		statesFull.add("Oklahoma (OK)");
		statesFull.add("Oregon (OR)");
		statesFull.add("Pennsylvania (PA)");
		statesFull.add("Rhode Island (RI)");
		statesFull.add("South Carolina (SC)");
		statesFull.add("South Dakota (SD)");
		statesFull.add("Tennessee (TN)");
		statesFull.add("Texas (TX)");
		statesFull.add("Utah (UT)");
		statesFull.add("Vermont (VT)");
		statesFull.add("Virginia (VA)");
		statesFull.add("Washington (WA)");
		statesFull.add("West Virginia (WV)");
		statesFull.add("Wisconsin (WI)");
		statesFull.add("Wyoming (WY)");
		ArrayList<String> searchType = new ArrayList<String>();
		searchType.add("Campgrounds");
		searchType.add("National Parks");
		model.addAttribute("searchType", searchType);
		model.addAttribute("statesFull", statesFull);
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
		String stateAbr = StringUtils.substringBetween(state, "(", ")");
		String stateFull = StringUtils.substringBefore(state, " ");
		model.addAttribute("stateAbr", stateAbr);
		model.addAttribute("stateFull", stateFull);
		return "parksList.jsp";
	}
	
	@GetMapping("/parks/details/{parkCode}")
	public String parkDetails(@PathVariable("parkCode") String parkCode, Model model) {
		
		model.addAttribute("parkCode", parkCode);
		return "parkDetails.jsp";
	}
	
}
