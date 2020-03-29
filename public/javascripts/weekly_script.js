

// // Something else
// var today = new Date()
// var start = new Date(Date.UTC(2020, 2, 29, 14, 0, 0));
// console.log(start);
// var seconds = (start.getTime() - today.getTime()) / 1000;
// seconds = seconds | 0;


// var Binary = document.getElementById("Binary");
// var Decimal = document.getElementById("Decimal")

// setInterval(clock_second, 1000);

// function clock_second() {
//     seconds--;
//     update_timer();
    
// }

// function reset() {
//      Binary.style.opacity = 0;
//      Decimal.style.opacity = 1;
//     update_timer();
// }

// function leave() {
//      Binary.style.opacity = 1;
//      Decimal.style.opacity = 0;
//     update_timer();
// }

// function update_timer() {
//      var _hours = (seconds / 3600) | 0;
//      var _minutes = ((seconds - _hours*3600 ) / 60) | 0;
//      var _seconds = seconds - _hours*3600 - _minutes*60;
//      Decimal.innerHTML = ((_hours < 10)? "0" : "") + _hours + ":" + ((_minutes > 9)? "" : "0") + _minutes + ":" + ((_seconds > 9)? "" : "0") + _seconds;

//      var str = seconds.toString(2);
//      Binary.innerHTML = Array(22 - str.length).join('0') + str;
// }