package com.dbgeneration.entity;

import java.util.List;


public class Table {
	
	private String tableName;
	private List<Column> tableColumns;
	private List<List<String>> tableRecords;
	private List<Constraint> lstConstraint;
	
	public List<Constraint> getLstConstrain() {
		return lstConstraint;
	}

	public void setLstConstrain(List<Constraint> lstConstrain) {
		this.lstConstraint = lstConstrain;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public List<Column> getTableColumns() {
		return tableColumns;
	}

	public void setTableColumns(List<Column> tableColumns) {
		this.tableColumns = tableColumns;
	}

	public List<List<String>> getTableRecords() {
		return tableRecords;
	}

	public void setTableRecords(List<List<String>> tableRecords) {
		this.tableRecords = tableRecords;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();

		sb.append("Table: " + tableName + "\r\n");
		sb.append("List of columns:\r\n");
		for( Column column : tableColumns) {
			sb.append(column.toString());
			sb.append("\r\n");
		}
		sb.append("List of constraints: \r\n");
		for (Constraint constraint : lstConstraint) {
			sb.append(constraint.toString());
			sb.append("\r\n");
		}
		return sb.toString();
	}
}
