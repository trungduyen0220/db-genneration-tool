package com.dbgeneration.controller;

import java.sql.SQLException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 
 */
@Controller
public class LoginController {

	/**
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:21:46 PM
	 * @param model
	 * @return
	 * @throws SQLException
	 */
	@GetMapping("/login")
	public String welcome(Model model) throws SQLException {

		return "login";
	}
}