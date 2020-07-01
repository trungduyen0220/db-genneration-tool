package com.dbgeneration.utils;

import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;

public class StringHandleUtils {
	/**
	 * Convert string to title case
	 * @param inputString
	 * @return
	 */
	public static String titleCaseConversion(String inputString) {
		
		if (StringUtils.isBlank(inputString)) {
			return StringUtils.EMPTY;
		}

		if (StringUtils.length(inputString) == 1) {
			return inputString.toUpperCase();
		}

		StringBuilder resultPlaceHolder = new StringBuilder(inputString.length());

		Stream.of(inputString.split(" ")).forEach(stringPart -> {
			if (stringPart.length() > 1)
				resultPlaceHolder.append(stringPart.substring(0, 1).toUpperCase())
						.append(stringPart.substring(1).toLowerCase());
			else
				resultPlaceHolder.append(stringPart.toUpperCase());

			resultPlaceHolder.append(" ");
		});
		
		return StringUtils.trim(resultPlaceHolder.toString());
	}

	/**
	 * Convert string to normal case
	 * @param inputString
	 * @return
	 */
	public static String normalCaseConversion(String inputString) {
		if (StringUtils.isBlank(inputString)) {
			return StringUtils.EMPTY;
		}
		
		inputString = inputString.substring(0, 1).toUpperCase().concat((inputString).substring(1, inputString.length() - 1));
		
		return inputString;
	}
	
	/**
	 * 
	 * @param inputString
	 * @param findString: inputString contains findString
	 * @param occurence: firstIndex of findString in inputString
	 * @return
	 */
	public static int getIndexOfFindString(String inputString, String findString, int occurence) {
		int length = findString.length();
		String replaceString = "";
		for(int i = 0; i < length; i++) {
			replaceString+= "~";
		}
		
		for (int i = 0; i < occurence; i++) {
			 inputString = StringUtils.replaceOnce(inputString, findString, replaceString);
		}
		return inputString.indexOf(findString);
	}
}
