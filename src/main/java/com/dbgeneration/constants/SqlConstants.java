package com.dbgeneration.constants;

public class SqlConstants {

	public final static String SQL_GET_LIST_TABLE = "SELECT DISTINCT TABLE_NAME FROM {0} ";
	public final static String SQL_GET_COLUMN_PROPERTIES = "SELECT COLUMN_NAME, {0}, {1}, {2}, {3} FROM {4} WHERE TABLE_NAME = '{5}'";

	public final static String SQL_INSERT_STATEMENT = "INSERT INTO {0} ({1}) VALUES ({2))";
	
	public final static String SQL_GET_LIST_PRIMARY_KEY = 
			"SELECT COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME " + 
			"FROM {0} WHERE TABLE_NAME = '{1}' ";
	
	
}
