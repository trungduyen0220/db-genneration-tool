function pictureMigration(str) {
	'use strict';

	if (str === 'kensakuSummary' || str === 'gyoumukanri' || str === 'systemkanri') {
		$('#' + str).toggle();
	} else if (str === '/DRET001/index') {
		openNewWindow(projectName + str);
	} else {
		var frmObj = $('#menu');
		frmObj.attr('action', projectName + str);
		frmObj.submit();
	}
}

$('#kensakuSummaryUl').mouseleave(function() {
	'use strict';

	$('#kensakuSummary').css({ display: 'none' });
});

$('#gyoumukanriUl').mouseleave(function() {
	'use strict';

	$('#gyoumukanri').css({ display: 'none' });
});

$('#systemkanriUl').mouseleave(function() {
	'use strict';

	$('#systemkanri').css({ display: 'none' });
});

function openNewWindow(url) {
	'use strict';

	var formStr =
		"<form style='visibility:hidden;' method='POST' action='" +
		url +
		"'> " +
		"<input type='hidden' name='pictureId' value='" +
		pictureId +
		"'/>" +
		"<input type='hidden' name='_csrf' value='" +
		$("input[name='_csrf']").val() +
		"'/> </form>";

	var win = window.open('', '簡易検索（消費）', 'width=1320, height=680, top=5, left=15, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no');
	win.document.body.innerHTML = formStr;
	win.document.forms[0].submit();
}
