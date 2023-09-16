const bdinput = document.querySelector("#bdinput");
const submitbtn = document.querySelector("#submitbtn");
const results = document.querySelector("#results");

function dateToStr(date) {}

function palindromeChecker(str) {
  var strSplit = str.split("");
  var strReverse = strSplit.reverse();
  var newstr = strReverse.join("");
  return str == newstr;
}

function datetoString(date) {
  dateinStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateinStr.day = "0" + date.day;
  } else {
    dateinStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateinStr.month = "0" + date.month;
  } else {
    dateinStr.month = date.month.toString();
  }
  dateinStr.year = date.year.toString();

  return dateinStr;
}

function getDatesAllFormat(date) {
  let DDMMYYYY = date.day + date.month + date.year;
  let MMDDYYYY = date.month + date.day + date.year;
  let DDMMYY = date.day + date.month + date.year.slice(-2);
  let MMDDYY = date.month + date.day + date.year.slice(-2);
  return [DDMMYYYY, MMDDYYYY, DDMMYY, MMDDYY];
}
const daysinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isleapyear(year) {
  if (year % 400 === 0) {
    return (daysinmonth[1] = 29);
  }
  if (year % 100 === 0) {
    return (daysinmonth[1] = 28);
  }
  if (year % 4 === 0) {
    return (daysinmonth[1] = 29);
  } else {
    return (daysinmonth[1] = 28);
  }
}

function netxDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  isleapyear(year);

  if (day > daysinmonth[date.month - 1]) {
    day = 1;
    month = month + 1;
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
function prevDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  isleapyear(year);

  if (day < 1) {
    day = daysinmonth[date.month - 1];
    month = month - 1;
  }
  if (month < 1) {
    month = 12;
    year = year - 1;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
function nextpalindromedate(date) {
  let nxtdate = netxDate(date);
  var dayscounter = 0;
  while (true) {
    var datetostr1 = datetoString(nxtdate);
    var dateformts1 = getDatesAllFormat(datetostr1);
    dayscounter++;
    for (i = 0; i < 4; i++) {
      if (palindromeChecker(dateformts1[i])) {
        return [dayscounter, nxtdate];
      }
    }
    nxtdate = netxDate(nxtdate);
  }
}
function previouspalindromedate(date) {
  let previoudat = prevDate(date);
  var dayscounter = 0;
  while (true) {
    var datetostr1 = datetoString(previoudat);
    var dateformts1 = getDatesAllFormat(datetostr1);
    dayscounter++;
    for (i = 0; i < 4; i++) {
      if (palindromeChecker(dateformts1[i])) {
        return [dayscounter, previoudat];
      }
    }
    previoudat = prevDate(previoudat);
  }
}
function ClickHandler() {
    if(bdinput.value == ""){
        results.innerHTML = "Enter a Date"
        return;
    }
  var datestr = bdinput.value.split("-");
  var date = {
    day: Number(datestr[2]),
    month: Number(datestr[1]),
    year: Number(datestr[0]),
  };
  var datetostr = datetoString(date);
  var dateformts = getDatesAllFormat(datetostr);

  for (i = 0; i < 4; i++) {
    if (palindromeChecker(dateformts[i])) {
      results.innerHTML = "Yes, it's a palindrome date.";
      return;
    }
  }
  let nextdattte = nextpalindromedate(date);
  let previousdate = previouspalindromedate(date);
  results.innerHTML = `No, it's not a palindrome date.<br>The next palindrome date will be in <span class="dates">${nextdattte[0]}</span> days on <span class="dates">${nextdattte[1].day}/${nextdattte[1].month}/${nextdattte[1].year}</span>,and the previous date that passed was <span class="dates">${previousdate[0]}</span> days ago on <span class="dates">${previousdate[1].day}/${previousdate[1].month}/${previousdate[1].year}</span>.`;

}

submitbtn.addEventListener("click", ClickHandler);
