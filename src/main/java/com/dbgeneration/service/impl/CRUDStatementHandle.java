package com.dbgeneration.service.impl;

import java.sql.Connection;

import org.apache.log4j.Logger;

import com.dbgeneration.entity.Table;
import com.dbgeneration.utils.SqlUtils;

public class CRUDStatementHandle {
	private static final Logger logger = Logger.getLogger(CRUDStatementHandle.class);

	public static String executeCreateDatabaseStatement(Connection conn, String typeDb) {
		logger.debug("executeCreateDatabaseStatement() start.");
		logger.debug("executeCreateDatabaseStatement() end.");
		return null;
	}
	
	public static String executeCreateSchemaStatement(Connection conn, Table table) {
		logger.debug("executeCreateSchemaStatement() start.");
		
		String statements = SqlUtils.getInsertStatement(table);
		logger.debug("executeCreateSchemaStatement() end.");
		return statements;
	}
	
	public static String executeCreateTableStatement(Connection conn, String typeDb) {
		logger.debug("executeCreateTableStatement() start.");
		logger.debug("executeCreateTableStatement() end.");
		return null;
	}
	
	public static String executeInsertTableStatement(Connection conn, String typeDb) {
		logger.debug("executeInsertTableStatement() start.");
		logger.debug("executeInsertTableStatement() end.");
		return null;
	}
	


}
