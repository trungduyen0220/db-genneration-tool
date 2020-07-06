/*
 * jQuery UI Monthpicker
 *
 * @licensed MIT <see below>
 * @licensed GPL <see below>
 *
 * @author Luciano Costa
 * http://lucianocosta.com.br/jquery.mtz.monthpicker/
 *
 * Depends:
 *  jquery.ui.core.js
 */

/**
 * MIT License
 * Copyright (c) 2011, Luciano Costa
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * GPL LIcense
 * Copyright (c) 2011, Luciano Costa
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or 
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
 * for more details.
 * 
 * You should have received a copy of the GNU General Public License along 
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

;(function ($) {

    var methods = {
        init : function (options) { 
            return this.each(function () {
                var 
                    $this = $(this),
                    data = $this.data('monthpicker'),
                    year = (options && options.year) ? options.year : (new Date()).getFullYear(),
                    month = (options && options.month) ? options.month : (new Date()).getMonth()+1,
                    settings = $.extend({
                        pattern: 'yyyy/mm',
                        selectedMonth: month,
                        selectedMonthName: '',
                        selectedYear: year,
                        startYear: year - 10,
                        finalYear: year + 10,
                        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        id: "monthpicker_" + (Math.random() * Math.random()).toString().replace('.', ''),
                        openOnFocus: true,
                		next: 'xdsoft_next',
                		prev : 'xdsoft_prev',
                		monthChangeSpinner : true,
                		clickCount : Math.floor(((new Date()).getFullYear()-year)/10) + 1,
                		ownerDocument: document,
                		contentWindow: window,
                        disabledMonths: [],
                        disabledYears:[],
                        PreviousYear: '',
                        PreviousMonth: '',
                        input:$this
                    }, options);

                settings.dateSeparator = settings.pattern.replace(/(mmm|mm|m|yyyy|yy|y)/ig,'');

                // If the plugin hasn't been initialized yet for this element
                if (!data) {

                    $(this).data('monthpicker', {
                        'target': $this,
                        'settings': settings
                    });

                    if (settings.openOnFocus === true) {
                        $this.on('focus', function () {
                            $this.monthpicker('show');
                        });
                    }

                    $this.monthpicker('parseInputValue', settings);

                    $this.monthpicker('mountWidget', settings);
                      
                    $this.on('monthpicker-click-year', function (e, year, month) {
                    	settings.selectedYear = year;
                    });

                    $this.on('monthpicker-click-ok', function (e, month, year) {
                    	settings.PreviousYear = settings.selectedYear;
                    	settings.PreviousMonth = settings.selectedMonth;
                        $this.monthpicker('setValue', settings);
                        $this.monthpicker('hide');
                    });
                    
                    $this.on('monthpicker-click-cancel', function (e) {
                    	
                        $this.monthpicker('setValue', settings);
                        $this.monthpicker('hide');
                    });

                    // hide widget when user clicks elsewhere on page
                    $this.addClass("mtz-monthpicker-widgetcontainer");
                    $(document).unbind("mousedown.mtzmonthpicker").on("mousedown.mtzmonthpicker", function (e) {
                        if (!e.target.className || e.target.className.toString().indexOf('mtz-monthpicker') < 0) {
                            $(this).monthpicker('hideAll'); 
                        }
                    });
                }
            });
        },

        show: function () {
            $(this).monthpicker('hideAll'); 
            var widget = $('#' + this.data('monthpicker').settings.id);
            widget.css("top", this.offset().top  + this.outerHeight());
            if ($(window).width() > (widget.width() + this.offset().left) ){
                widget.css("left", this.offset().left);
            } else {
                widget.css("left", this.offset().left - widget.width());
            }
            widget.show();
            widget.find('.hiddenBtn').click();
            widget.find('select').focus();
            this.trigger('monthpicker-show');
        },

        hide: function () {
            var widget = $('#' + this.data('monthpicker').settings.id);
            if (widget.is(':visible')) {
                widget.hide();
                this.trigger('monthpicker-hide');
            }
        },

        hideAll: function () {
            $(".mtz-monthpicker-widgetcontainer").each(function () {
                if (typeof($(this).data("monthpicker"))!="undefined") { 
                    $(this).monthpicker('hide'); 
                }
            });
        },

        setValue: function (settings) {
            var 
                month = settings.selectedMonth,
                year = settings.selectedYear;

            if(settings.pattern.indexOf('mmm') >= 0) {
                month = settings.selectedMonthName;
            } else if(settings.pattern.indexOf('mm') >= 0 && settings.selectedMonth < 10) {
                month = '0' + settings.selectedMonth;
            }

            if(settings.pattern.indexOf('yyyy') < 0) {
                year = year.toString().substr(2,2);
            } 

            if (settings.pattern.indexOf('y') > settings.pattern.indexOf(settings.dateSeparator)) {
                this.val(month + settings.dateSeparator + year);
            } else {
                this.val(year + settings.dateSeparator + month);
            }
            
            this.change();
        },

        disableMonths: function (months) {
            var 
                settings = this.data('monthpicker').settings,
                container = $('#' + settings.id);

            settings.disabledMonths = months;

            container.find('.mtz-monthpicker-month').each(function () {
                var m = parseInt($(this).data('month'));
                if ($.inArray(m, months) >= 0) {
                    $(this).addClass('ui-monthpicker-state-disabled');
                } else {
                    $(this).removeClass('ui-monthpicker-state-disabled');
                }
            });
        },

        mountWidget: function (settings) {
            var
                monthpicker = this,
                container = $('<div id="'+ settings.id +'" class="xdsoft_datetimepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"  style="padding:8px;margin:1px;"/>'),
                header = $('<div class="ui-monthpicker-header ui-widget-header ui-helper-clearfix ui-corner-all mtz-monthpicker" />'),
                year = $('<div class="xdsoft_calendar" style="width:50%;"/>'),
                month = $('<div class="xdsoft_calendar" style="padding-top:8px;width:50%;float:right;"/>'),
                div = $('<div style="width:50%;float:left"/>'),
                
                span = $('<div class="xdsoft_today" style="width:100%;"></div>'),
                button = $('<div class="xdsoft_today" style="width:100%;padding-top:2px;"><span class="hiddenBtn" style="display:none;"></span><button type="button" class="OKbtn xdsoft_today_button_class" style="margin-right:8px;">OK</button><button type="button" class="Cancelbtn xdsoft_today_button_class"  style="margin-left:8px;">キャンセル</button></div>'),
                     
                combo = $('<select class="mtz-monthpicker mtz-monthpicker-year" />'),
                
                yearTable = $('<table class="year-monthpicker" />'), 
                tYearBody = $('<tbody class="year-monthpicker" />'),
                trYear = $('<tr class="year-monthpicker" />'),
                tdYear = '',
                
                table = $('<table class="mtz-monthpicker" />'),
                tbody = $('<tbody class="mtz-monthpicker" />'),
                tr = $('<tr class="mtz-monthpicker" />'),
                td = '',
                selectedYear = settings.selectedYear,
                option = null,
                attrSelectedYear = $(this).data('selected-year'),
                attrStartYear = $(this).data('start-year'),
                attrFinalYear = $(this).data('final-year'),
            
                
	            btnTable = $('<table class="btn-monthpicker" style="width:100%;" />'), 
	            btnBody = $('<tbody class="btn-monthpicker" style="width:100%;"/>'),
	            trBtn = $('<tr class="btn-monthpicker" />'),
	            tdBtn = ""
	            
	            tdBtn = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-btn"/>');
	            tdBtn.append('<button type="button" class="xdsoft_prev"></button>');
	            trBtn.append(tdBtn).appendTo(btnBody);
	            tdBtn = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-btn"/>');
	            tdBtn.append('<button type="button" class="xdsoft_next"></button>');
	            trBtn.append(tdBtn).appendTo(btnBody);

            trBtn
			.find('.xdsoft_prev,.xdsoft_next')
			.on('touchend mousedown.xdsoft', function (event) {
				event.stopPropagation();
				var $this = $(this),
					timer = 0,
					stop = false;

				(function arguments_callee1(v) {
					if ($this.hasClass(settings.next)) {
						settings.clickCount = settings.clickCount - 1;
						//_xdsoft_datetime.nextMonth();
					} else if ($this.hasClass(settings.prev)) {
						settings.clickCount = settings.clickCount + 1;
					}
					
					tYearBody.html("");
					trYear = $('<tr class="year-monthpicker" />'); 
					tdBtn = ""
		            for (var i=1; i<=10; i++) {
		                tdYear = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-year" style="padding:5px;cursor:default;text-align:center;" />').attr('data-year',(new Date()).getFullYear() - (10 * settings.clickCount) + i);
		                
		                if (settings.selectedYear == (new Date()).getFullYear() - (10 * settings.clickCount) + i) {
		                	tdYear.addClass('xdsoft_current');
		                }
		                
		                tdYear.append((new Date()).getFullYear() - (10 * settings.clickCount) + i);
		                trYear.append(tdYear).appendTo(tYearBody);
		                if (i % 2 === 0) {
		                    trYear = $('<tr class="year-monthpicker" />'); 
		                }
		            }
					
		            tYearBody.find('.mtz-monthpicker-year').on('click', function () {
		                var m = parseInt($(this).data('year'));
		                if ($.inArray(m, settings.disabledYears) < 0 ) {
		                    settings.selectedYear = $(this).closest('.ui-monthpicker').find('.mtz-monthpicker-year').first().val();
		                    monthpicker.trigger('monthpicker-click-year', $(this).data('year'));
		                    $(this).closest('table').find('.xdsoft_current').removeClass('xdsoft_current');
		                    $(this).addClass('xdsoft_current');
		                }
		            });
						
					if (settings.monthChangeSpinner) {
						if (!stop) {
							timer = setTimeout(arguments_callee1, v || 100);
						}
					}
				}(500));

				$([settings.ownerDocument.body, settings.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee2() {
					clearTimeout(timer);
					stop = true;
					$([settings.ownerDocument.body, settings.contentWindow]).off('touchend mouseup.xdsoft', arguments_callee2);
				});
			});
            
            if (attrSelectedYear) {
                settings.selectedYear = attrSelectedYear;
            }

            if (attrStartYear) {
                settings.startYear = attrStartYear;
            }

            if (attrFinalYear) {
                settings.finalYear = attrFinalYear;
            }

            container.css({
                position:'absolute',
                zIndex:999999,
                whiteSpace:'nowrap',
                width:'250px',
                overflow:'hidden',
                textAlign:'center',
                display:'none',
                top: monthpicker.offset().top + monthpicker.outerHeight(),
                left: monthpicker.offset().left
            });

            combo.on('change', function () { 
                var months = $(this).parent().parent().find('td[data-month]');
                months.removeClass('xdsoft_current');
                if ($(this).val() == settings.selectedYear) {
                    months.filter('td[data-month='+ settings.selectedMonth +']').addClass('xdsoft_current');
                }
                monthpicker.trigger('monthpicker-change-year', $(this).val());
            });

            // mount years combo
            for (var i = settings.startYear; i <= settings.finalYear; i++) {
                var option = $('<option class="mtz-monthpicker" />').attr('value', i).append(i);
                if (settings.selectedYear == i) {
                    option.attr('selected', 'selected');
                }
                combo.append(option);
            }
            //header.append(combo).appendTo(container);

            // mount years table
            for (var i=1; i<=10; i++) {
                tdYear = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-year" style="padding:5px;cursor:default;text-align:center;text-align:center;" />').attr('data-year',settings.selectedYear - 10 + i);
                if (settings.selectedYear == settings.selectedYear - 10 + i) {
                	tdYear.addClass('xdsoft_current');
                }
                tdYear.append(settings.selectedYear - 10 + i);
                trYear.append(tdYear).appendTo(tYearBody);
                if (i % 2 === 0) {
                    trYear = $('<tr class="year-monthpicker" />'); 
                }
            }
            
            tYearBody.find('.mtz-monthpicker-year').on('click', function () {
                var m = parseInt($(this).data('year'));
                if ($.inArray(m, settings.disabledYears) < 0 ) {
                    settings.selectedYear = $(this).closest('.ui-monthpicker').find('.mtz-monthpicker-year').first().val();
                    monthpicker.trigger('monthpicker-click-year', $(this).data('year'));
                    $(this).closest('table').find('.xdsoft_current').removeClass('xdsoft_current');
                    $(this).addClass('xdsoft_current');
                }
            });
            
            // mount months table
            for (var i=1; i<=12; i++) {
                td = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-month" style="padding:5px;cursor:default;text-align:center;" />').attr('data-month',i);
                if (settings.selectedMonth == i) {
                   td.addClass('xdsoft_current');
                }
                td.append(settings.monthNames[i-1]);
                tr.append(td).appendTo(tbody);
                if (i % 2 === 0) {
                    tr = $('<tr class="mtz-monthpicker" />'); 
                }
            }

            tbody.find('.mtz-monthpicker-month').on('click', function () {
                var m = parseInt($(this).data('month'));
                if ($.inArray(m, settings.disabledMonths) < 0 ) {
                    settings.selectedMonth = $(this).data('month');
                    $(this).closest('table').find('.xdsoft_current').removeClass('xdsoft_current');
                    $(this).addClass('xdsoft_current');
                }
            });

            button.find('.hiddenBtn').on('click', function () {
            	
            	var date = settings.input.val();
            	var reg = new RegExp("[0-9]+");
            	
            	if(reg.test(date)){
            		if(date.length>=4){
            			date = date.substring(0,4) + "/" + date.substring(5,7) + "/01";
            		}else{
            			date = "";           			
            		}
            	}

            	if(date=='' || isNaN(Date.parse(date))){
                	settings.selectedYear = (new Date()).getFullYear();
                	settings.selectedMonth = (new Date()).getMonth() + 1;
            	}else{
                	settings.selectedYear = (new Date(date)).getFullYear();
                	settings.selectedMonth = (new Date(date)).getMonth() + 1;
            	}
            	
            	settings.clickCount = Math.floor(((new Date()).getFullYear()-settings.selectedYear)/10) + 1;
            	
				tYearBody.html("");
				trYear = $('<tr class="year-monthpicker" />'); 
				tdBtn = ""
	            for (var i=1; i<=10; i++) {
	                tdYear = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-year" style="padding:5px;cursor:default;text-align:center;" />').attr('data-year',(new Date()).getFullYear() - (10 * settings.clickCount) + i);
	                
	                if (settings.selectedYear == (new Date()).getFullYear() - (10 * settings.clickCount) + i) {
	                	tdYear.addClass('xdsoft_current');
	                }
	                
	                tdYear.append((new Date()).getFullYear() - (10 * settings.clickCount) + i);
	                trYear.append(tdYear).appendTo(tYearBody);
	                if (i % 2 === 0) {
	                    trYear = $('<tr class="year-monthpicker" />'); 
	                }
	            }
            	
	            tYearBody.find('.mtz-monthpicker-year').on('click', function () {
	                var m = parseInt($(this).data('year'));
	                if ($.inArray(m, settings.disabledYears) < 0 ) {
	                    settings.selectedYear = $(this).closest('.ui-monthpicker').find('.mtz-monthpicker-year').first().val();
	                    monthpicker.trigger('monthpicker-click-year', $(this).data('year'));
	                    $(this).closest('table').find('.xdsoft_current').removeClass('xdsoft_current');
	                    $(this).addClass('xdsoft_current');
	                }
	            });
	            
				tbody.html("");
				tr = $('<tr class="mtz-monthpicker" />'); 
				td = ""
	            
	            // mount months table
	            for (var i=1; i<=12; i++) {
	                td = $('<td class="ui-monthpicker-state-default mtz-monthpicker mtz-monthpicker-month" style="padding:5px;cursor:default;text-align:center;" />').attr('data-month',i);
	                if (settings.selectedMonth == i) {
	                   td.addClass('xdsoft_current');
	                }
	                td.append(settings.monthNames[i-1]);
	                tr.append(td).appendTo(tbody);
	                if (i % 2 === 0) {
	                    tr = $('<tr class="mtz-monthpicker" />'); 
	                }
	            }

	            tbody.find('.mtz-monthpicker-month').on('click', function () {
	                var m = parseInt($(this).data('month'));
	                if ($.inArray(m, settings.disabledMonths) < 0 ) {
	                    settings.selectedMonth = $(this).data('month');
	                    $(this).closest('table').find('.xdsoft_current').removeClass('xdsoft_current');
	                    $(this).addClass('xdsoft_current');
	                }
	            });
            });
            
            button.find('.OKbtn').on('touchend mousedown.xdsoft', function () {
                monthpicker.trigger('monthpicker-click-ok', settings.selectedMonth);
            });
            
            button.find('.Cancelbtn').on('touchend mousedown.xdsoft', function () {      	
            	var date = settings.input.val();
            	
            });
            
            btnTable.append(btnBody).appendTo(div);
            yearTable.append(tYearBody).appendTo(year);       
            table.append(tbody).appendTo(month);        
            year.appendTo(div);
            month.appendTo(div);           
            div.appendTo(container);
            month.appendTo(container);
            year.appendTo(container);            
            button.appendTo(container);
            container.appendTo('body');
        },

        destroy: function () {
            return this.each(function () {
                $(this).removeClass('mtz-monthpicker-widgetcontainer').unbind('focus').removeData('monthpicker');
            });
        },

        getDate: function () {
            var settings = this.data('monthpicker').settings;
            if (settings.selectedMonth && settings.selectedYear) {
                return new Date(settings.selectedYear, settings.selectedMonth -1);
            } else {
                return null;
            }
        },

        parseInputValue: function (settings) {
            if (this.val()) {
                if (settings.dateSeparator) {
                    var val = this.val().toString().split(settings.dateSeparator);
                    if (settings.pattern.indexOf('m') === 0) {
                        settings.selectedMonth = val[0];
                        settings.selectedYear = val[1];
                    } else {
                        settings.selectedMonth = val[1];
                        settings.selectedYear = val[0];                                
                    }
                }
            }
        }

    };

    $.fn.monthpicker = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mtz.monthpicker');
        }    
    };

})(jQuery);
