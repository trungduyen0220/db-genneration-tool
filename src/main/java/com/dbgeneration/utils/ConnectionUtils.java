package com.dbgeneration.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.dbgeneration.constants.InputConstants;


public class ConnectionUtils  {
	private String url = InputConstants.JDBC_URL;
	private String user = InputConstants.URL_USERNAME;
	private String password = InputConstants.URL_PASSWORD;

    private static final Logger logger = LogManager.getLogger(ConnectionUtils.class);
	/**
	 * Connect to database
	 *
	 * @return a Connection object
	 */
	public Connection connect(String driver) {

		logger.debug("connect() start.");
		
		Connection conn = null;
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, user, password);
			logger.info("Connected to the driver server successfully.");
		} catch (SQLException e) {
			logger.error(e.getMessage());
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		}
		
		logger.debug("connect() end.");
		return conn;
	}
}