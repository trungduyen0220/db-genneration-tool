package com.dbgeneration.service.impl;

/**
 * ntmduyen
 */
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.dbgeneration.constants.Constants;
import com.dbgeneration.dao.ReadStructureDatabaseDAO;
import com.dbgeneration.entity.Column;
import com.dbgeneration.entity.Constraint;
import com.dbgeneration.entity.Table;
import com.dbgeneration.service.ReadStructureDatabase;
import com.mysql.cj.util.StringUtils;

@Service
public class ReadStructureDatabaseImpl implements ReadStructureDatabase{

    private static final Logger logger = LogManager.getLogger(ReadStructureDatabaseImpl.class);

    /**
	 * Read table from database
	 * 
	 * @param conn
	 * @param typeDb
	 * @return
	 * @throws SQLException
	 */
	public List<Table> readTable(Connection conn, String typeDb) throws SQLException {
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
	private List<String> getTableList(Connection conn, String typeDb) throws SQLException {
		logger.debug("START: getTableList()");

		List<String> lstTable = new ArrayList<>();
		String sql = ReadStructureDatabaseDAO.getSQLListTable(typeDb);
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
	private List<Column> getTableColumnsLst(Connection conn, String typeDb, String tableName) throws SQLException {
		logger.debug("START: getTableColumnsLst().");

		List<Column> lstColumn = new ArrayList<>();

		String sql = ReadStructureDatabaseDAO.getSQLColumnProperties(typeDb, tableName);
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
	private List<Constraint> getLstTblConstraint(Connection conn, String typeDb, String tableName) throws SQLException {
		logger.debug("START: getTableConstraintLst()");
		
		List<Constraint> lstConstraint = new ArrayList<>();

		String sql = ReadStructureDatabaseDAO.getSQLReturnConstraint(typeDb, tableName);
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
