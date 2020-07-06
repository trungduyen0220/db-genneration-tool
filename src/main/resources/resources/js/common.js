$(function() {
	'use strict';

	//右クリックメニュー機能のカスタマイズ
	$(document).bind('contextmenu', function(event) {
		if ($('#box').length > 0) {
			$('#box').remove();
		}
		//現在のフォーカスの要素タイプを取得します
		var dom = event.target.type;
		// マウスで選択したテキスト
		var text = '';
		var p1;
		var p2;
		if (dom === 'text' || dom === 'textarea' || dom === 'password') {
			//テキストボックス内のテキスト
			p1 = event.target.selectionStart;
			p2 = event.target.selectionEnd;
			text = event.target.value.substring(p1, p2);
		} else {
			//ブラウザページのテキスト
			text = window.getSelection().toString();
		}
		var box = $('<div id="box" class="cctx"/>');
		var boxBody1 = $('<div/ class="boxbody">');
		var boxSeparator = $('<div/ class="cctx-separator">');
		var boxBody2 = $('<div/ class="boxbody">');
		var boxSeparator2 = $('<div/ class="cctx-separator">');
		var boxBody3 = $('<div/ class="boxbody">');
		var boxItem0 = $('<p/>');
		//元に戻す
		boxItem0.addClass('cctx-item');
		boxItem0.text('元に戻す');
		boxItem0.on('click', function() {
			document.execCommand('Undo');
		});
		boxBody1.append(boxItem0);
		//切り取り
		var boxItem1 = $('<p/>');
		boxItem1.addClass('cctx-item');
		boxItem1.text('切り取り');
		boxItem1.on('click', function() {
			var aux = document.createElement('input');
			aux.setAttribute('value', text);
			document.body.appendChild(aux);
			aux.select();
			var newText = event.target.value.replace(text, '');
			event.target.value = newText;
			document.execCommand('Cut');
			document.body.removeChild(aux);
		});
		boxBody1.append(boxItem1);
		//コピー
		var boxItem2 = $('<p/>');
		boxItem2.addClass('cctx-item');
		boxItem2.text('コピー');
		boxItem2.on('click', function() {
			var aux = document.createElement('input');
			aux.setAttribute('value', text);
			document.body.appendChild(aux);
			aux.select();
			document.execCommand('copy');
			document.body.removeChild(aux);
		});
		boxBody1.append(boxItem2);
		//貼り付け
		var boxItem3 = $('<p/>');
		boxItem3.addClass('cctx-item');
		boxItem3.text('貼り付け');
		boxItem3.on('click', function() {
			var startText = event.target.value.substring(0, p1);
			var endText = event.target.value.substring(p2);
			getClipboard(function(pasteText) {
				event.target.value = startText + pasteText + endText;
			});
		});
		boxBody1.append(boxItem3);
		box.append(boxBody1);
		box.append(boxSeparator);
		//すべて選択
		var boxItem4 = $('<p/>');
		boxItem4.addClass('cctx-item');
		boxItem4.text('すべて選択');
		boxItem4.on('click', function() {
			event.target.select();
		});
		boxBody2.append(boxItem4);
		box.append(boxBody2);
		box.append(boxSeparator2);
		// 印刷
		var boxItem5 = $('<p/>');
		boxItem5.addClass('cctx-item');
		boxItem5.text('印刷');
		boxItem5.on('click', function() {
			printScreen();
		});
		boxBody3.append(boxItem5);
		// 印刷プレビュー
		var boxItem6 = $('<p/>');
		boxItem6.addClass('cctx-item');
		boxItem6.text('印刷プレビュー');
		boxItem6.on('click', function() {
			printScreenPreview();
		});
		boxBody3.append(boxItem6);
		box.append(boxBody3);

		$('body').append(box);
		//選択不可
		if (text === '') {
			boxItem2.addClass('cctx-item-disabled');
		} else {
			boxItem5.addClass('cctx-item-non-display');
			boxItem6.addClass('cctx-item-non-display');
		}
		if (text === '' || (dom !== 'text' && dom !== 'textarea' && dom !== 'password')) {
			boxItem1.addClass('cctx-item-disabled');
		}
		getClipboard(function(pasteText) {
			if (pasteText === '' || (dom !== 'text' && dom !== 'textarea' && dom !== 'password')) {
				boxItem3.addClass('cctx-item-disabled');
			}
		});
		if (event.target.value === '' || (dom !== 'text' && dom !== 'textarea' && dom !== 'password')) {
			boxItem4.addClass('cctx-item-disabled');
		}
		//カーソル位置
		box
			.css('top', event.pageY)
			.css('left', event.pageX)
			.show();
		return false;
	});

	// クリップボード取得
	function getClipboard(callbackFunction) {
		if (navigator.clipboard) {
			navigator.clipboard.readText().then(callbackFunction);
		} else if (window.clipboardData) {
			var pasteText = window.clipboardData.getData('text');
			callbackFunction(pasteText);
		}
	}

	//カスタムメニューを閉じる
	$(document).on('mouseup', function() {
		if ($('#box').length > 0) {
			$('#box').hide();
		}
	});
});

// 印刷プレビュー
function printScreenPreview() {
	if (document.body.insertAdjacentHTML == null) return;
	var sWebBrowserCode = '<object width="0" height="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
	document.body.insertAdjacentHTML('beforeEnd', sWebBrowserCode);
	var objWebBrowser = document.body.lastChild;
	if (objWebBrowser == null) return;
	try {
		objWebBrowser.ExecWB(7, 1);
	} catch (e) {
		// 何もしない。
	}
	document.body.removeChild(objWebBrowser);
}

// 印刷
function printScreen() {
	window.print();
}

var shinsyukuFlg = true;

var CommonPartsJs = {
	navipanel: function navipanel(initialization, map) {
		'use strict';

		var list = '';
		Object.keys(map).forEach(function(key) {
			var str = '<li id = li_';
			str += key;
			str += ' onclick=\'CommonPartsJs.pagejump("';
			str += key;
			str += "\")'><a class='link-decoration-none' href=#";
			str += key;
			str += "><span class='pagejump'>";
			str += map[key];
			str += '</span></a></li>';
			list += str;
		});
		window.location.href = '#' + initialization;
		$('#li_navipanel').html("<ul id='detail-content-left-ul'>" + list + '</ul>');
		$('#li_' + initialization).addClass('detail-content-left-background');
		$('#li_' + initialization)
			.find('span')
			.addClass('detail-content-left-span');
		$('#detail-content-left-ul li').click(function() {
			$(this).addClass('detail-content-left-background');
			$(this)
				.find('span')
				.addClass('detail-content-left-span');
		});
	},
	// 縦タブパネル（ナビ型）
	pagejump: function pagejump(strId) {
		'use strict';

		window.location.hash = '#' + strId;
		$('#detail-content-left-ul li').removeClass('detail-content-left-background');
		$('#detail-content-left-ul li')
			.find('span')
			.removeClass('detail-content-left-span');
	},
	// 縦タブパネル（切替型）
	pagejumpall: function pagejumpall(strId) {
		'use strict';

		$('.switchpanel').hide();
		$('#' + strId).show();
		$('#detail-content-left-ul li').removeClass('detail-content-left-background');
		$('#detail-content-left-ul li')
			.find('span')
			.removeClass('detail-content-left-span');
	}, // アップロードパネル
	clickGetFile: function clickGetFile(id) {
		'use strict';

		$('#' + id).click();
	},
	selectFile: function selectFile(id, filePath, fileName) {
		'use strict';

		var filename = $('#' + id).val();
		var filenames = filename.split('\\');
		var Profile = filenames[filenames.length - 1];
		filenames = Profile.split('.');
		var ProfileName = filenames[0];
		if (filePath !== '') {
			$('#' + filePath).val(filename);
		}
		if (fileName !== '') {
			$('#' + fileName).val(ProfileName);
		}
	}, // 動的に生成するパネル
	change: function change(strId, fromId, toId, buttonId, imgId1, imgId2, selectValue) {
		'use strict';

		var str;
		var i;
		if (strId === 1) {
			str = '<td class="width23per" data="forSpeciel"><select class="width90per" name="' + fromId + '" id="' + fromId + '">';
			for (i = 0; i < selectValue.length; i += 1) {
				str = str + '<option value="' + selectValue[i].value + '">' + selectValue[i].label + '</option>';
			}
			str = str + '</select></td><td class="width4per" data="forSpeciel">～</td> <td class="width23per" data="forSpeciel"><select class="width90per" name="' + toId + '" id="' + toId + '">';
			for (i = 0; i < selectValue.length; i += 1) {
				str = str + '<option value="' + selectValue[i].value + '">' + selectValue[i].label + '</option>';
			}
			str += '</select></td>';
		}
		if (strId === 2) {
			str =
				'<td class="width23per" data="forSpeciel">' +
				'<input class="width90per" type="text"  name="' +
				fromId +
				'" id="' +
				fromId +
				'"/> <img name="' +
				imgId1 +
				'" id="' +
				imgId1 +
				'" src="./images/btn_datepicker.png"' +
				'class="common-inputdate-img" /></td>' +
				'<td class="width4per" data="forSpeciel">～</td>' +
				'<td class="width23per" data="forSpeciel">' +
				'<input class="width90per" type="text"  name="' +
				toId +
				'" id="' +
				toId +
				'"/> <img name="' +
				imgId2 +
				'" id="' +
				imgId2 +
				'" src="./images/btn_datepicker.png"' +
				'class="common-inputdate-img" /></td>	';
		}
		if (strId === 3) {
			str = '<td class="width50per" data="forSpeciel"><input class="width90per" name="' + fromId + '" id="' + fromId + '"/></td>';
		}
		if (strId === 4) {
			str =
				'<td class="width50per" data="forSpeciel"><div><input class="width80per" name="' +
				fromId +
				'" id="' +
				fromId +
				'"/>' +
				'<input class="width15per" type="button"  value="選択"  name="' +
				buttonId +
				'" id="' +
				buttonId +
				'" class="selectClick" /></div></td>';
		}
		return str;
	},
	switchpanel: function switchpanel(initialization, map) {
		'use strict';

		var list = '';
		Object.keys(map).forEach(function(key) {
			var str = '<li id = li_';
			str += key;
			str += ' onclick=\'CommonPartsJs.pagejumpall("';
			str += key;
			str += "\")'><a class='link-decoration-none' href=#";
			str += key;
			str += "><span class='pagejump'>";
			str += map[key];
			str += '</span></li>';
			list += str;
		});
		$('#li_switchpanel').html("<ul id='detail-content-left-ul'>" + list + '</ul>');
		$('.switchpanel').hide();
		$('#' + initialization).show();
		$('#li_' + initialization).addClass('detail-content-left-background');
		$('#li_' + initialization)
			.find('span')
			.addClass('detail-content-left-span');
		$('#detail-content-left-ul li').click(function() {
			$(this).addClass('detail-content-left-background');
			$(this)
				.find('span')
				.addClass('detail-content-left-span');
		});
	},

	// パネル用伸縮ボタン
	panelonclick: function panelonclick(strId, imgId, panelUpImagePath, panelDownImagePath) {
		'use strict';

		$('#' + strId).slideToggle(100, function() {
			if ($(this).is(':visible')) {
				$('#' + imgId).attr('src', panelUpImagePath);
			} else {
				$('#' + imgId).attr('src', panelDownImagePath);
			}
		});
	},

	// DTOP001パネル用伸縮ボタン
	dtop001Panelonclick: function dtop001Panelonclick(strId, imgId, panelUpImagePath, panelDownImagePath) {
		'use strict';

		if (shinsyukuFlg) {
			shinsyukuFlg = false;
			var changeShinsyuku = '0';

			if ($('#' + strId).is(':visible')) {
				changeShinsyuku = '1';
			} else {
				changeShinsyuku = '0';
			}

			$.ajax({
				headers: { 'X-CSRF-TOKEN': $("input[name='_csrf']").val() },
				url: projectName + '/DTOP001/changeShinsyuku',
				type: 'post',
				data: { area: strId, shinsyuku: changeShinsyuku },
				dataType: 'text',
				success: function(data) {
					shinsyukuFlg = true;
					if (data === '1') {
						$('#' + strId).slideToggle(100, function() {
							if ($(this).is(':visible')) {
								$('#' + imgId).attr('src', panelUpImagePath);
							} else {
								$('#' + imgId).attr('src', panelDownImagePath);
							}
						});
					}
				},
				error: function(thrownError) {
					shinsyukuFlg = true;
				},
			});
		}
	},
	// FieldSet用伸縮ボタン
	tableTitleOnclick: function tableTitleOnclick(strTable) {
		'use strict';

		$('#' + strTable).slideToggle(100, function() {
			if ($(this).is(':visible')) {
				$('#' + strTable + '_up').css({ display: 'block' });
				$('#' + strTable + '_down').css({ display: 'none' });
				$('#' + strTable)
					.parent()
					.css({ 'border-left': '1px solid #b4b4b4' });
				$('#' + strTable)
					.parent()
					.css({ 'border-right': '1px solid #b4b4b4' });
				$('#' + strTable)
					.parent()
					.css({ 'border-bottom': '1px solid #b4b4b4' });
			} else {
				$('#' + strTable + '_up').css({ display: 'none' });
				$('#' + strTable + '_down').css({ display: 'block' });
				$('#' + strTable)
					.parent()
					.css({ 'border-left': 'none' });
				$('#' + strTable)
					.parent()
					.css({ 'border-right': 'none' });
				$('#' + strTable)
					.parent()
					.css({ 'border-bottom': 'none' });
			}
		});
	},
	// ラジオボタン（クリック解除可能）
	RadioBtnClick: function RadioBtnClick(thisRadio) {
		'use strict';

		var domName;
		var radio = $(this);
		if (thisRadio.data === true) {
			domName = thisRadio.name;
			$("input:radio[name='" + domName + "']").prop('data', false);
			thisRadio.checked = false;
			thisRadio.data = false;
		} else {
			domName = thisRadio.name;
			$("input:radio[name='" + domName + "']").prop('data', false);
			thisRadio.checked = true;
			thisRadio.data = true;
		}
	},

	keypress: function keypress(areaId, totalId, total) {
		'use strict';

		var text1 = document.getElementById(areaId).value;

		var len;

		len = text1.length;

		document.getElementById(totalId).innerText = len + '/' + total;

		if (text1.length > total) {
			document.getElementById(totalId).style.color = 'red';
		} else {
			document.getElementById(totalId).style.color = 'black';
		}
	},

	showMsgDialog: function showMsgDialog(DialogType, DialogMsg, Dialogwidth, Dialogheight) {
		'use strict';

		var DialogTitle = '';
		var ModalFlg = true;
		if (DialogType === '1') {
			DialogTitle = 'エラーメッセージ';
			ModalFlg = false;
			$('#iconErrorImage').show();
			$('#iconInfoImage').hide();
			$('#iconWarningImage').hide();
			$('#btnClose').hide();
		} else if (DialogType === '2') {
			DialogTitle = 'インフォメッセージ';
			ModalFlg = false;
			$('#iconErrorImage').hide();
			$('#iconInfoImage').show();
			$('#iconWarningImage').hide();
			$('#btnClose').hide();
		} else if (DialogType === '3') {
			DialogTitle = 'ワーニングメッセージ';
			ModalFlg = false;
			$('#iconErrorImage').hide();
			$('#iconInfoImage').hide();
			$('#iconWarningImage').show();
			$('#btnClose').show();
		} else if (DialogType === '5') {
			DialogTitle = 'ロック確認';
			ModalFlg = false;
			$('#iconErrorImage').hide();
			$('#iconInfoImage').hide();
			$('#iconWarningImage').hide();
			$('#btnOk').show();
			$('#btnOutput').hide();
			$('#btnAsyncOutput').hide();
			$('#btnClose').show();
		}
		$('#myArea').height(Dialogheight - 80);
		$('#myArea').val(DialogMsg);
		$('#dialog-contentjq').dialog({
			target: '#dialog',
			resizable: false,
			mask: true,
			modal: ModalFlg,
			width: Dialogwidth,
			height: Dialogheight,
			title: DialogTitle,
			close: function(event, ui) {
				$('#dialog-contentjq').dialog('destroy');
			},
		});
	},

	Msg: {
		ERROR: 'error',
		INFO: 'info',
		QUESTION: 'question',
	},

	showPsMsgDialog: function(msg, iconParam, buttonsParam) {
		'use strict';

		// デフォルト値設定
		var icon = iconParam === undefined ? CommonPartsJs.Msg.INFO : iconParam;
		var buttons = [
			{
				text: 'ＯＫ',
				click: function() {
					$(this).dialog('close');
				},
			},
		];

		if (buttonsParam !== undefined) {
			buttons = buttonsParam;
		}

		var htmlDialog =
			'<div id="dl" class="psmsg-dialog-body">' +
			'<div class="psmsg-dialog-image">' +
			'<img id="iconQuestionImage" src="../images/icon-' +
			icon +
			'.png" />' +
			'</div><div class="psmsg-dialog-content">' +
			msg +
			'</div></div>';
		$(htmlDialog).dialog({
			dialogClass: 'psMsgClass',
			resizable: false,
			modal: true,
			width: 'auto',
			buttons: buttons,
			close: function(event) {
				$(this).remove();
			},
		});
	},

	showGridTip: function showGridTip(record, showContentsMap, width, height) {
		'use strict';

		var modalDiv = $('<div id="Modal" style="overflow-y: auto; width: 100%"/>');
		var table = $('<table class="input-detail-tbl-area"/>');
		var tbody = $('<tbody/>');
		var count = 0;
		var th;
		var tr;
		var td;
		for (var i = 1; i <= showContentsMap.length; i += 1) {
			if (count === 0) {
				tr = $('<tr style="background-color: #f0fff0;"/>');
			}

			th = $('<th class="width20per"/>');
			if (showContentsMap[i - 1].singleFlag) {
				td = $('<td class="width30per" colspan="3"/>');
				count = 2;
			} else {
				td = $('<td class="width30per" colspan="1"/>');
				count += 1;
			}

			th.append(showContentsMap[i - 1].colName);
			td.append(record[showContentsMap[i - 1].colIndex]);
			th.appendTo(tr);
			td.appendTo(tr);

			if (i === showContentsMap.length) {
				tr.appendTo(tbody);
				count = 0;
			} else if (count === 2 || showContentsMap[i].singleFlag) {
				if (count !== 2) {
					th = $('<th class="width20per"/>');
					td = $('<td class="width30per" colspan="1"/>');
					th.appendTo(tr);
					td.appendTo(tr);
				}
				tr.appendTo(tbody);
				count = 0;
			}
		}

		tbody.appendTo(table);
		table.appendTo(modalDiv);
		$('#Modal').remove();
		$('body').append(modalDiv);
		$('#Modal').dialog({
			width: width,
			height: height,
		});
	},
};
