package com.dbgeneration.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dbgeneration.dto.Table;

@Service
public interface ReadStructureDatabase {

	/**
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:22:15 PM
	 * @param conn
	 * @param typeDb
	 * @return
	 * @throws SQLException
	 */
	List<Table> readTable(Connection conn, String typeDb) throws SQLException;

}
