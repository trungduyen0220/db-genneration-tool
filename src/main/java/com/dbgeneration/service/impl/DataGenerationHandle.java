package com.dbgeneration.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;

import com.dbgeneration.entity.Column;
import com.dbgeneration.entity.Table;


/**
 * 
 * @author ntmduyen
 *
 */
public class DataGenerationHandle {

	private static final Logger logger = Logger.getLogger(DataGenerationHandle.class);

	public Set<String> getListColumn(List<Table> lstTable) {
		Set<String> setLstColumn = new HashSet<>();

		for (Table table : lstTable) {
			List<Column> lstColumnOfTable = table.getTableColumns();
			for (Column column : lstColumnOfTable) {
				setLstColumn.add(column.getColumnName());
			}
		}

		return setLstColumn;
	}
}
