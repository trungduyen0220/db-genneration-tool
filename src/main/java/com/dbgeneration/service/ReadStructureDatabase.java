package com.dbgeneration.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dbgeneration.entity.Table;

@Service
public interface ReadStructureDatabase {
	
	/**
	 * Read table from database
	 * 
	 * @param conn
	 * @param typeDb
	 * @return
	 * @throws SQLException
	 */
	List<Table> readTable(Connection conn, String typeDb) throws SQLException;

}
