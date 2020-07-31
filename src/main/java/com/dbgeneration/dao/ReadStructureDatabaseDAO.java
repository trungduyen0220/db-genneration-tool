package com.dbgeneration.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.dbgeneration.constants.Constants;
import com.dbgeneration.constants.InputConstants;
import com.dbgeneration.constants.SqlConstants;
import com.dbgeneration.dto.Column;
import com.dbgeneration.dto.Table;

public class ReadStructureDatabaseDAO {

	private static final Logger logger = LogManager.getLogger(ReadStructureDatabaseDAO.class);

	/**
	 * Get SQL statements to get list of table names from database
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:22:38 PM
	 * @param typeOfDB
	 * @return
	 */
	public static String getSQLListTable(String typeOfDB) {
		logger.debug("START: getSQLListTable()");

		String sql = SqlConstants.SQL_GET_LIST_TABLE;
		String tableSystem = StringUtils.EMPTY; // {0}
		String tableSchema = getSchema(); // {1}
		switch (typeOfDB) {
		case Constants.ORACLE:
			tableSystem = "user_tab_columns";
			sql = sql.concat(
					" INNER JOIN USER_OBJECTS ON USER_OBJECTS.OBJECT_NAME = USER_TAB_COLUMNS.TABLE_NAME WHERE OBJECT_TYPE = 'TABLE'");
			break;
		case Constants.MYSQL:
			tableSystem = "information_schema.tables";
			sql = sql.concat(" WHERE TABLE_SCHEMA = '{1}' AND TABLE_TYPE = 'BASE TABLE'");
			sql = StringUtils.replace(sql, "{1}", tableSchema);
			break;
		case Constants.POSTGRESQL:
		case Constants.SQLSERVER:
		default:
			break;
		}

		sql = StringUtils.replace(sql, "{0}", tableSystem);

		logger.debug("{0} " + tableSystem);
		logger.info("Get list table: " + sql);

		logger.debug("END: getSQLListTable()");
		return sql;
	}

	/**
	 * Get SQL statements to get column properties from database
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:22:52 PM
	 * @param typeOfDB
	 * @param tableName
	 * @return
	 */
	public static String getSQLColumnProperties(String typeOfDB, String tableName) {
		logger.debug("START: getSQLColumnProperties()");

		String sql = SqlConstants.SQL_GET_COLUMN_PROPERTIES;
		String dataType = StringUtils.EMPTY; // {0}
		String dataLength = StringUtils.EMPTY; // {1}
		String nullable = StringUtils.EMPTY; // {2}
		String ordinalPosition = StringUtils.EMPTY; // {3}
		String tableSystem = StringUtils.EMPTY; // {4}

		switch (typeOfDB) {
		case Constants.ORACLE:
			dataType = "DATA_TYPE";
			dataLength = "DATA_LENGTH";
			tableSystem = "user_tab_columns";
			nullable = "NULLABLE";
			ordinalPosition = "COLUMN_ID";
			break;
		case Constants.MYSQL:
			dataType = "COLUMN_TYPE";
			dataLength = "CHARACTER_MAXIMUM_LENGTH"; // TODO Hiện tại thì cái này chỉ mới cover cho loại text
			tableSystem = "information_schema.columns";
			nullable = "IS_NULLABLE";
			ordinalPosition = "ORDINAL_POSITION";
			break;
		case Constants.POSTGRESQL:
		case Constants.SQLSERVER:
		default:
			break;

		}
		if (StringUtils.isEmpty(dataType)) {
			sql = StringUtils.replace(sql, ", {0}", StringUtils.EMPTY);
		} else {
			sql = StringUtils.replace(sql, "{0}", dataType);
		}

		if (StringUtils.isEmpty(dataType)) {
			sql = StringUtils.replace(sql, ", {1} ", StringUtils.EMPTY);
		} else {
			sql = StringUtils.replace(sql, "{1}", dataLength);
		}

		if (StringUtils.isEmpty(tableSystem)) {
			sql = StringUtils.replace(sql, ", {2}", StringUtils.EMPTY);
		} else {
			sql = StringUtils.replace(sql, "{2}", nullable);
		}

		if (StringUtils.isEmpty(ordinalPosition)) {
			sql = StringUtils.replace(sql, ", {3}", StringUtils.EMPTY);
		} else {
			sql = StringUtils.replace(sql, "{3}", ordinalPosition);
		}

		sql = StringUtils.replace(sql, "{4}", tableSystem);
		sql = StringUtils.replace(sql, "{5}", tableName);

		logger.debug("{0} " + dataType);
		logger.debug("{1} " + dataLength);
		logger.debug("{2} " + tableSystem);
		logger.debug("{3} " + tableName);
		logger.info("Get column properties: " + sql);

		logger.debug("END: getSQLColumnProperties()");
		return sql;
	}

	/**
	 * Get SQL statements to get constraints of table from databse
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:02 PM
	 * @param typeOfDB
	 * @param tableName
	 * @return
	 */
	public static String getSQLReturnConstraint(String typeOfDB, String tableName) {
		logger.debug("START: getConstraintPrimaryKey()");
		String sql = SqlConstants.SQL_GET_LIST_PRIMARY_KEY;
		String tblSystem = StringUtils.EMPTY; // {0}
		switch (typeOfDB) {
		case Constants.ORACLE:
			tblSystem = "all_cons_columns";
			break;
		default:
			tblSystem = "information_schema. KEY_COLUMN_USAGE";
			break;
		}

		sql = sql.replace("{0}", tblSystem);
		sql = sql.replace("{1}", tableName);

		logger.debug("{0} " + tblSystem);
		logger.debug("{1} " + tableName);

		logger.info("Get list of constraints: " + sql);

		logger.debug("END: getConstraintPrimaryKey()");
		return sql;
	}

	/**
	 * Get create SQL statement to create database
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:09 PM
	 * @param databaseName
	 * @return
	 */
	public static String getCreateDatabaseStatement(String databaseName) {
		logger.debug("START: getCreateDatabaseStatement()");

		logger.debug("END: getCreateDatabaseStatement()");

		return null;
	}

	/**
	 * Get create schema SQL statement
	 * 
	 * @param schemaName
	 * @return
	 */
	public static String getCreateSchemaStatement(String schemaName) {
		logger.debug("START: getCreateSchemaStatement()");

		logger.debug("END: getCreateSchemaStatement()");

		return null;
	}

	/**
	 * Get create table SQL statement
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:17 PM
	 * @param table
	 * @return
	 */
	public static String getCreateTableStatement(Table table) {
		logger.debug("START: getCreateTableStatement()");

		logger.debug("END: getCreateTableStatement()");
		return null;
	}

	/**
	 * Get insert SQl statements, insert data to table
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:23 PM
	 * @param table
	 * @return
	 */
	public static String getInsertStatement(Table table) {
		logger.debug("START: getInsertStatement()");

		String sql = SqlConstants.SQL_INSERT_STATEMENT;
		List<Column> lstColumn = table.getTableColumns();
		List<String> lstColumnName = new ArrayList<>();

		for (Column column : lstColumn) {
			lstColumnName.add(column.getColumnName());
		}

		String arrColumnName[] = lstColumnName.toArray(new String[0]);

		String arrColumn = Arrays.toString(arrColumnName).substring(1, Arrays.toString(arrColumnName).length() - 1);
		logger.info("List of columns: " + arrColumn);

		sql = StringUtils.replace(sql, "{0}", table.getTableName());
		sql = StringUtils.replace(sql, "{1}", arrColumn);
		logger.info("Get insert statements: " + sql);

		logger.debug("END: getInsertStatement()");
		return sql;
	}

	/**
	 * Get formatted SQl statements
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:30 PM
	 * @return
	 */
	public static String getFormattedSQLString() {
		logger.debug("START: getFormattedSQLString()");

		String sql = InputConstants.SQL;
		sql = sql.replace(", ", ", \r\n");
		sql = sql.replace("LEFT JOIN ", "\r\nLEFT JOIN ");
		sql = sql.replace("INNER JOIN ", "\r\nINNER JOIN ");
		sql = sql.replace("FROM ", "\r\nFROM ");
		sql = sql.replace("WHERE ", "\r\nWHERE ");
		sql = sql.replace("SELECT ", "\r\nSELECT ");

		logger.info("Get formatted SQL SELECT statements: " + sql);
		logger.debug("END: getFormattedSQLString()");
		return sql;

	}

	/**
	 * Get name of schema
	 * 
	 * @author ntmduyen
	 * @datetime Jul 31, 2020 - 11:23:37 PM
	 * @return
	 */
	private static String getSchema() {
		logger.trace("START: getSchema()");

		String url = InputConstants.JDBC_URL;

		logger.info("The url is: " + url);

		logger.trace("END: getSchema()");
		return "sakila";
		// return url.substring(url.lastIndexOf('/') + 1, url.length());

	}
}
