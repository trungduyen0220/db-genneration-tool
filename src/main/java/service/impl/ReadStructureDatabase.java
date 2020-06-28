package service.impl;

/**
 * ntmduyen
 */
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.mysql.cj.util.StringUtils;

import constants.Constants;
import entity.Column;
import entity.Constraint;
import entity.Table;
import utils.SqlUtils;

public class ReadStructureDatabase {

	private static final Logger logger = Logger.getLogger(ReadStructureDatabase.class);

	/**
	 * Read table from database
	 * 
	 * @return
	 * @throws SQLException
	 */
	public static List<Table> readTable(Connection conn, String typeDb) throws SQLException {
		logger.debug("START: readTable()");
		List<Table> lstTable = new ArrayList<>();
		List<String> lstTableName = getTableList(conn, typeDb);

		for (String tblName : lstTableName) {
			List<Column> lstColumn = getTableColumnsLst(conn, typeDb, tblName);
			List<Constraint> lstConstraint = getLstTblConstraint(conn, typeDb, tblName);

			Table newTbl = new Table();
			newTbl.setTableName(tblName);
			newTbl.setTableColumns(lstColumn);
			newTbl.setLstConstrain(lstConstraint);
			logger.info("Get infomation of a table: " + newTbl.toString());
			lstTable.add(newTbl);
		}
		logger.debug("END: readTable()");
		return lstTable;
	}

	/**
	 * Get list of table name
	 * 
	 * @param conn
	 * @return
	 * @throws SQLException
	 */
	private static List<String> getTableList(Connection conn, String typeDb) throws SQLException {
		logger.debug("START: getTableList()");

		List<String> lstTable = new ArrayList<>();
		String sql = SqlUtils.getSQLListTable(typeDb);
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				lstTable.add(rs.getString(1));
			}

		} catch (Exception e) {
			logger.error(e.toString());
		} finally {
			if (stmt != null) {
				stmt.close();
			}
			if (rs != null) {
				rs.close();
			}
		}

		logger.debug("END: getTableList()");
		return lstTable;
	}

	/**
	 * Get column information
	 * 
	 * @param conn
	 * @param tableName
	 * @return
	 * @throws SQLException 
	 */
	private static List<Column> getTableColumnsLst(Connection conn, String typeDb, String tableName) throws SQLException {
		logger.debug("START: getTableColumnsLst().");

		List<Column> lstColumn = new ArrayList<>();

		String sql = SqlUtils.getSQLColumnProperties(typeDb, tableName);
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Column tblColumnProperties = new Column();
				tblColumnProperties.setColumnName(rs.getString(1));
				tblColumnProperties.setColumnDataType(rs.getString(2));
				tblColumnProperties.setColumnDataLength(rs.getString(3));
				tblColumnProperties.setNullable(true);
				if(rs.getString(4).toLowerCase().equals("no")) {
					tblColumnProperties.setNullable(false);
				}
				tblColumnProperties.setOrdinalPosition(rs.getInt(5));
				lstColumn.add(tblColumnProperties);
			}

		} catch (SQLException e) {
			logger.error(e.toString());
		} finally {
			if (stmt != null) {
				stmt.close();
			}

			if (rs != null) {
				rs.close();
			}
		}

		logger.debug("END: getTableColumnsLst()");
		return lstColumn;
	}
	
	/**
	 * Get constraint of table
	 * @param conn
	 * @param typeDb
	 * @param tableName
	 * @return
	 * @throws SQLException 
	 */
	private static List<Constraint> getLstTblConstraint(Connection conn, String typeDb, String tableName) throws SQLException {
		logger.debug("START: getTableConstraintLst()");
		
		List<Constraint> lstConstraint = new ArrayList<>();

		String sql = SqlUtils.getSQLReturnConstraint(typeDb, tableName);
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Constraint constraint = new Constraint();

				constraint.setColumnName(rs.getString(1));
				constraint.setConstrainName(rs.getString(2));
				constraint.setReferenceTable("");
				constraint.setReferenceColumn("");
				
				if(constraint.getConstrainName().substring(0, 1).equals("P")) {
					constraint.setConstraintType(Constants.PRIMARY_KEY);
				}
				
				if (rs.getString(3) != null) {
					constraint.setReferenceTable(rs.getString(3));
					constraint.setReferenceColumn(rs.getString(4));
					constraint.setConstraintType(Constants.FOREIGN_KEY);
				}
				
				if (StringUtils.isNullOrEmpty(constraint.getConstraintType())) {
					if(constraint.getConstrainName().toLowerCase().contains("unique")) {
						constraint.setConstraintType(Constants.UNIQUE_CONSTRAINT);
					} else {
						constraint.setConstraintType(Constants.CHECK_CONSTRAINT);
					}
				}

				lstConstraint.add(constraint);
			}

		} catch (SQLException e) {
			logger.error(e.toString());
		} finally {
			if (stmt != null) {
				stmt.close();
			}

			if (rs != null) {
				rs.close();
			}
		}
		
		logger.debug("END: getTableConstraintLst()");
		return lstConstraint;
	}
	
}
