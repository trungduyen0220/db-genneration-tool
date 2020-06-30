package com.dbgeneration.utils;

import java.util.Random;

import org.apache.log4j.Logger;

import com.dbgeneration.constants.Constants;

public class RandomUtils {

	private static final Logger logger = Logger.getLogger(RandomUtils.class);

	private static Random rand = new Random();

	/**
	 * Randome một ô text, string
	 * 
	 * @return
	 */
	public static String randomString(int maxLength, String caseOfString) {

		logger.debug("randomString() start.");

		int count = rand.nextInt(1) + 1;

		StringBuilder strBuilder = new StringBuilder();
		while (count-- != 0) {
			int character = (int) (Math.random() * Constants.STRING_ALPHA_ABCD.length());
			strBuilder.append(Constants.STRING_ALPHA_ABCD.charAt(character));
		}

		String randomString = strBuilder.toString();
		int pointer = 1;
		while (pointer < randomString.length()) {
			int randomLocationOfSpace = rand.nextInt(1) + 7;
			if (pointer % randomLocationOfSpace == 0) {
				randomString = randomString.substring(0, pointer).concat(" ")
						+ randomString.substring(pointer, randomString.length());
			}
			pointer++;
		}

		if (randomString.length() > maxLength) {
			randomString = randomString.substring(0, maxLength - 1);
		}

		// Handle the case of random String
		switch (caseOfString) {
		case Constants.LOWER_CASE:
			randomString = randomString.toLowerCase();
			break;
		case Constants.UPPER_CASE:
			randomString = randomString.toUpperCase();
			break;
		case Constants.TITLE_CASE:
			randomString = StringHandleUtils.titleCaseConversion(randomString);
			break;
		case Constants.NORMAL_CASE:
			randomString = StringHandleUtils.normalCaseConversion(randomString);
			break;
		default:
			break;
		}

		logger.info(randomString);

		logger.debug("randomString() end.");
		return randomString;
	}

	public static String randomKata() {
		Random rand = new Random();
		int count = rand.nextInt(10) + 5;
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
//			int character = (int) (Math.random() * KATAKANA.length());
//			builder.append(KATAKANA.charAt(character));
		}

		String randomString = builder.toString();
		int count1 = 1;
		while (count1 < randomString.length()) {

			if (count1 % 4 == 0) {
				randomString = randomString.substring(0, count1).concat(" ")
						+ randomString.substring(count1, randomString.length());
			}
			count1++;
		}

		if (randomString.length() > 15) {
			randomString = randomString.substring(0, 14);
		}
		return randomString;
	}

	public static String randomAlphaNumeric() {
		Random rand = new Random();
		int count = rand.nextInt(10) + 5;
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
//			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
//			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		String randomString = builder.toString();
		int count1 = 1;
		while (count1 < randomString.length()) {

			if (count1 % 4 == 0) {
				randomString = randomString.substring(0, count1).concat(" ")
						+ randomString.substring(count1, randomString.length());
			}
			count1++;
		}

		if (randomString.length() > 15) {
			randomString = randomString.substring(0, 14);
		}
		return randomString;
	}

	public static String randomDate() {
		Random rand = new Random();
//		int randomBoolean = rand.nextInt(2) + 1;
//		int randomTen = rand.nextInt(9) + 1;
		// String date = '2020/' + randomBoolean + randomTen
		return null;
	}

}
