package com.dbgeneration.dto;

import com.dbgeneration.constants.Constants;

public class Constraint {
	private String constrainName;
	private String columnName;
	private String referenceTable;
	private String referenceColumn;
	private String constraintType;

	public String getConstrainName() {
		return constrainName;
	}
	public void setConstrainName(String constrainName) {
		this.constrainName = constrainName;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	
	public String getReferenceTable() {
		return referenceTable;
	}
	public void setReferenceTable(String referenceTable) {
		this.referenceTable = referenceTable;
	}
	public String getReferenceColumn() {
		return referenceColumn;
	}
	public void setReferenceColumn(String referenceColumn) {
		this.referenceColumn = referenceColumn;
	}
	public String getConstraintType() {
		return constraintType;
	}
	public void setConstraintType(String constraintType) {
		this.constraintType = constraintType;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(constraintType + ": " + constrainName + ", " +  columnName);
		if(constraintType.equals(Constants.FOREIGN_KEY)) {
			sb.append(", " + referenceTable + ", " + referenceColumn);
		}
		return sb.toString();
	}
	
}

