$.datetimepicker.setLocale('ja');

function datetimepicker(elementID, imgElementID) {
	'use strict';

	$('#' + elementID).datetimepicker({
		timepicker: false,
		scrollInput: false,
		yearSet: '年',
		format: 'Y/m/d',
		formatDate: 'Y/m/d',
	});

	$('#' + imgElementID).click(function() {
		$('#' + elementID).focus();
	});
}

function monthpicker(elementID, imgElementID) {
	'use strict';

	$('#' + elementID).blur(function() {
		var data = $('#' + elementID)[0].value;
		var pattern = /((?!0000)[0-9]{4}([-/.])((0[1-9]|1[0-2])([-/.])(0[1-9]|1[0-9]|2[0-8])|((0[13-9]|1[0-2])([-/.])(29|30))|((0[13578]|1[02])([\\-\\/\\.])31)))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)([\\-\\/\\.])02([\\-\\/\\.])29$)/;
		if (data.length === 6) {
			var reg = /^(\d{4})(\d{2})$/;
			data = data.replace(reg, '$1/$2');
			if (pattern.test(data + '/01')) {
				$('#' + elementID)[0].value = data;
			} else {
				$('#' + elementID)[0].value = null;
			}
		} else if (pattern.test(data + '/01')) {
			$('#' + elementID)[0].value = data;
		} else {
			$('#' + elementID)[0].value = null;
		}
	});

	$('#' + elementID).monthpicker({});

	$('#' + imgElementID).click(function() {
		$('#' + elementID).focus();
	});
}

function datetimepickerMinute(elementID, imgElementID) {
	'use strict';

	$('#' + elementID).datetimepicker({
		timepicker: true,
		scrollInput: true,
		format: 'Y/m/d H:i:00',
		step: 5,
	});

	$('#' + imgElementID).click(function() {
		$('#' + elementID).focus();
	});
}

function datetimepickerBetsuSet(imgElementID, year, month, day) {
	'use strict';

	$('#' + imgElementID).datetimepicker({
		timepicker: false,
		scrollInput: false,
		onSelectDate: function(dateText, inst) {
			$('#' + year).val(dateText.getFullYear());
			$('#' + month).val(dateText.getMonth() + 1);
			$('#' + day).val(dateText.getDate());
		},
	});
}

function datetimepickerWarekiSet(imgElementID, year, month, day, wareki) {
	'use strict';

	$('#' + imgElementID).datetimepicker({
		timepicker: false,
		scrollInput: false,
		yearSet: '年',
		onSelectDate: function(dateText, inst) {
			$('#' + year).val(dateText.getFullYear());
			$('#' + month).val(dateText.getMonth() + 1);
			$('#' + day).val(dateText.getDate());
			var dt = new Date(dateText.getFullYear(), dateText.getMonth() + 1, dateText.getDate());
			var opt = { era: 'long', year: 'numeric' };
			var warekiYear = dt.toLocaleDateString('ja-JP-u-ca-japanese', opt);
			$('#' + wareki).val(warekiYear);
		},
	});
}
