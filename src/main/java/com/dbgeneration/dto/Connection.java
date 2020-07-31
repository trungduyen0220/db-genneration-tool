package com.dbgeneration.dto;

public class Connection {
	private String jdbcUrl;
	private String urlUserName;
	private String urlPassword;
	private String typeOfDb;
	private String jdbcDriver;
	public String getJdbcUrl() {
		return jdbcUrl;
	}
	public void setJdbcUrl(String jdbcUrl) {
		this.jdbcUrl = jdbcUrl;
	}
	public String getUrlUserName() {
		return urlUserName;
	}
	public void setUrlUserName(String urlUserName) {
		this.urlUserName = urlUserName;
	}
	public String getUrlPassword() {
		return urlPassword;
	}
	public void setUrlPassword(String urlPassword) {
		this.urlPassword = urlPassword;
	}
	public String getTypeOfDb() {
		return typeOfDb;
	}
	public void setTypeOfDb(String typeOfDb) {
		this.typeOfDb = typeOfDb;
	}
	public String getJdbcDriver() {
		return jdbcDriver;
	}
	public void setJdbcDriver(String jdbcDriver) {
		this.jdbcDriver = jdbcDriver;
	}
}
