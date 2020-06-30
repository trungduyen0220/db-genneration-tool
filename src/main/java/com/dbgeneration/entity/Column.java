package com.dbgeneration.entity;

public class Column {

	private String columnName;
	private String columnDataType;
	private String columnDataLength;
	private int ordinalPosition;
	private boolean isNullable;
	
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getColumnDataType() {
		return columnDataType;
	}
	public void setColumnDataType(String columnDataType) {
		this.columnDataType = columnDataType;
	}
	public String getColumnDataLength() {
		return columnDataLength;
	}
	public void setColumnDataLength(String columnDataLength) {
		this.columnDataLength = columnDataLength;
	}
	public boolean isNullable() {
		return isNullable;
	}
	public void setNullable(boolean isNullable) {
		this.isNullable = isNullable;
	}
	
	public int getOrdinalPosition() {
		return ordinalPosition;
	}
	public void setOrdinalPosition(int ordinalPosition) {
		this.ordinalPosition = ordinalPosition;
	}
	
	@Override
	public String toString() {
		String nullable = "NULL";
		if (!isNullable) {
			nullable = "NOT NULL";
		}
		
		return  ordinalPosition + ", " + columnName + ", " + columnDataType + ", " +  nullable;
	}
}
