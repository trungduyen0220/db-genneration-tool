package com.dbgeneration.controller;

import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

	 @GetMapping("/login")  
	public String welcome(Model model) throws SQLException {
		
		return "login";
	}
}