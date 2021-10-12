(function($) {

    "use strict";


    $(document).ready(function() {
        var openDays = [15, 16, 17];

        function c(passed_month, passed_year, calNum, openDays) {
            console.log(openDays);
            var calendar = calNum == 0 ? calendars.cal1 : calendars.cal2;
            makeWeek(calendar.weekline);
            calendar.datesBody.empty();
            var calMonthArray = makeMonthArray(passed_month, passed_year);
            var r = 0;
            var u = false;
            while (!u) {
                if (daysArray[r] == calMonthArray[0].weekday) {
                    u = true
                } else {
                    calendar.datesBody.append('<div class="blank"></div>');
                    r++;
                }
            }
            var availableDates;
            for (var cell = 0; cell < 42 - r; cell++) { // 42 date-cells in calendar
                if (cell >= calMonthArray.length) {
                    calendar.datesBody.append('<div class="blank"></div>');
                } else {
                    var shownDate = calMonthArray[cell].day;
                    var iter_date = new Date(passed_year, passed_month, shownDate);
                    if (openDays.includes(shownDate)) {
                        availableDates = 'selected';
                        console.log('object');
                        if (((shownDate != today.getDate() && passed_month == today.getMonth()) || passed_month != today.getMonth()) && iter_date < today) {
                            var m = '<div class="past-date ' + availableDates + '">';

                        } else {
                            var m = checkToday(iter_date) ? '<div class="today ' + availableDates + '">' : "<div class='" + availableDates + "'>";
                        }
                        calendar.datesBody.append(m + shownDate + "</div>");
                    } else {
                        if (((shownDate != today.getDate() && passed_month == today.getMonth()) || passed_month != today.getMonth()) && iter_date < today) {
                            var m = '<div class="past-date">';

                        } else {
                            var m = checkToday(iter_date) ? '<div class="today">' : "<div>";
                        }
                        calendar.datesBody.append(m + shownDate + "</div>");
                    }
                }
            }

            var color = "#444444";
            calendar.calHeader.find("h2").text(i[passed_month] + " " + passed_year);
            calendar.weekline.find("div").css("color", color);
            calendar.datesBody.find(".today").css("color", "#00bdaa");

            // find elements (dates) to be clicked on each time
            // the calendar is generated
            var clicked = false;

            clickedElement = calendar.datesBody.find('div');
            clickedElement.on("click", function() {
                bothCals.find(".calendar_content").find("div").each(function() {
                    $(this).removeClass("active");
                });
                $(this).addClass('active');
                clicked = $(this);
                getClickedInfo(clicked, calendar);
            });

        }

        function makeMonthArray(passed_month, passed_year) { // creates Array specifying dates and weekdays
            var e = [];
            for (var r = 1; r < getDaysInMonth(passed_year, passed_month) + 1; r++) {
                e.push({
                    day: r,
                    // Later refactor -- weekday needed only for first week
                    weekday: daysArray[getWeekdayNum(passed_year, passed_month, r)]
                });
            }
            return e;
        }

        function makeWeek(week) {
            week.empty();
            for (var e = 0; e < 7; e++) {
                week.append("<div>" + daysArray[e].substring(0, 3) + "</div>")
            }
        }

        function getDaysInMonth(currentYear, currentMon) {
            return (new Date(currentYear, currentMon + 1, 0)).getDate();
        }

        function getWeekdayNum(e, t, n) {
            return (new Date(e, t, n)).getDay();
        }

        function checkToday(e) {
            var todayDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
            var checkingDate = e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate();
            return todayDate == checkingDate;

        }

        function getAdjacentMonth(curr_month, curr_year, direction) {
            var theNextMonth;
            var theNextYear;
            if (direction == "next") {
                theNextMonth = (curr_month + 1) % 12;
                theNextYear = (curr_month == 11) ? curr_year + 1 : curr_year;
            } else {
                theNextMonth = (curr_month == 0) ? 11 : curr_month - 1;
                theNextYear = (curr_month == 0) ? curr_year - 1 : curr_year;
            }
            return [theNextMonth, theNextYear];
        }

        function b() {
            today = new Date;
            year = today.getFullYear();
            month = today.getMonth();
            var nextDates = getAdjacentMonth(month, year, "next");
            nextMonth = nextDates[0];
            nextYear = nextDates[1];
        }

        var e = 480;

        var today;
        var year,
            month,
            nextMonth,
            nextYear;

        var r = [];
        var i = [
            "January",
            "Feburary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        var daysArray = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        var cal1 = $("#calendar_first");
        var calHeader1 = cal1.find(".calendar_header");
        var weekline1 = cal1.find(".calendar_weekdays");
        var datesBody1 = cal1.find(".calendar_content");

        var cal2 = $("#calendar_second");
        var calHeader2 = cal2.find(".calendar_header");
        var weekline2 = cal2.find(".calendar_weekdays");
        var datesBody2 = cal2.find(".calendar_content");

        var bothCals = $(".calendar");

        var switchButton = bothCals.find(".calendar_header").find('.switch-month');

        var calendars = {
            "cal1": {
                "name": "first",
                "calHeader": calHeader1,
                "weekline": weekline1,
                "datesBody": datesBody1
            },
            "cal2": {
                "name": "second",
                "calHeader": calHeader2,
                "weekline": weekline2,
                "datesBody": datesBody2
            }
        }


        var clickedElement;
        var firstClicked,
            secondClicked,
            thirdClicked;
        var firstClick = false;
        var secondClick = false;
        var selected = {};

        b();
        c(month, year, 0, openDays);
        c(nextMonth, nextYear, 1, openDays);
        switchButton.on("click", function() {
            var clicked = $(this);
            var generateCalendars = function(e) {
                var nextDatesFirst = getAdjacentMonth(month, year, e);
                var nextDatesSecond = getAdjacentMonth(nextMonth, nextYear, e);
                month = nextDatesFirst[0];
                year = nextDatesFirst[1];
                nextMonth = nextDatesSecond[0];
                nextYear = nextDatesSecond[1];
                openDays = [];
                c(month, year, 0, openDays);
                c(nextMonth, nextYear, 1, openDays);
            };
            if (clicked.attr("class").indexOf("left") != -1) {
                generateCalendars("previous");
            } else {
                generateCalendars("next");
            }
            clickedElement = bothCals.find(".calendar_content").find("div");
        });


        //  Click picking stuff
        function getClickedInfo(element, calendar) {
            var clickedInfo = {};
            var clickedCalendar,
                clickedMonth,
                clickedYear;
            clickedCalendar = calendar.name;
            clickedMonth = clickedCalendar == "first" ? month : nextMonth;
            clickedYear = clickedCalendar == "first" ? year : nextYear;
            clickedInfo = {
                "calNum": clickedCalendar,
                "date": parseInt(element.text()),
                "month": clickedMonth,
                "year": clickedYear
            }
            var selectedDate = clickedInfo['date'];
            var selectedMonth = getCurrentMonthName(clickedInfo['month']);
            $('.showSelectedDate').html(selectedDate + ' ' + selectedMonth);
            return clickedInfo;
        }

        function getCurrentMonthName(dt) {
            var monthNamelist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNamelist[dt];
        };

        // Finding between dates MADNESS. Needs refactoring and smartening up :)
        function addChosenDates(firstClicked, secondClicked, selected) {
            if (secondClicked.date > firstClicked.date || secondClicked.month > firstClicked.month || secondClicked.year > firstClicked.year) {

                var added_year = secondClicked.year;
                var added_month = secondClicked.month;
                var added_date = secondClicked.date;

                if (added_year > firstClicked.year) {
                    // first add all dates from all months of Second-Clicked-Year
                    selected[added_year] = {};
                    selected[added_year][added_month] = [];
                    for (var i = 1; i <= secondClicked.date; i++) {
                        selected[added_year][added_month].push(i);
                    }

                    added_month = added_month - 1;
                    while (added_month >= 0) {
                        selected[added_year][added_month] = [];
                        for (var i = 1; i <= getDaysInMonth(added_year, added_month); i++) {
                            selected[added_year][added_month].push(i);
                        }
                        added_month = added_month - 1;
                    }

                    added_year = added_year - 1;
                    added_month = 11; // reset month to Dec because we decreased year
                    added_date = getDaysInMonth(added_year, added_month); // reset date as well

                    // Now add all dates from all months of inbetween years
                    while (added_year > firstClicked.year) {
                        selected[added_year] = {};
                        for (var i = 0; i < 12; i++) {
                            selected[added_year][i] = [];
                            for (var d = 1; d <= getDaysInMonth(added_year, i); d++) {
                                selected[added_year][i].push(d);
                            }
                        }
                        added_year = added_year - 1;
                    }
                }

                if (added_month > firstClicked.month) {
                    if (firstClicked.year == secondClicked.year) {
                        selected[added_year][added_month] = [];
                        for (var i = 1; i <= secondClicked.date; i++) {
                            selected[added_year][added_month].push(i);
                        }
                        added_month = added_month - 1;
                    }
                    while (added_month > firstClicked.month) {
                        selected[added_year][added_month] = [];
                        for (var i = 1; i <= getDaysInMonth(added_year, added_month); i++) {
                            selected[added_year][added_month].push(i);
                        }
                        added_month = added_month - 1;
                    }
                    added_date = getDaysInMonth(added_year, added_month);
                }

                for (var i = firstClicked.date + 1; i <= added_date; i++) {
                    selected[added_year][added_month].push(i);
                }
            }
            return selected;
        }
    });

})(jQuery);