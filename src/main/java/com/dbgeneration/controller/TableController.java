package com.dbgeneration.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.dbgeneration.constants.InputConstants;
import com.dbgeneration.entity.Table;
import com.dbgeneration.service.impl.ReadStructureDatabase;
import com.dbgeneration.utils.ConnectionUtils;


@Controller
public class TableController {

	@GetMapping({ "/", "/tables" })
	public String welcome(Model model) throws SQLException {
		ConnectionUtils app = new ConnectionUtils();
		Connection conn = app.connect(InputConstants.JDBC_DRIVER);

		List<Table> lstTable = ReadStructureDatabase.readTable(conn, InputConstants.TYPE_OF_DB);
		
		model.addAttribute("lstTable",lstTable);
		return "tables";
	}
}