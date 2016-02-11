(function(){

  //utility functions used by others

  //sets leading zero on one digit time formats
  function padTime ( timeNum ){
    return ("0" + timeNum ).slice(-2);
  }

  // returns a nonzero 0-255 value for where 255 is at the highPt between 0 and
  // 60 seconds
  function prorateMinute ( curSec, highPt ){
    var value = Math.floor( (Math.abs((curSec - highPt))/60)* 255);
    return value;
  }

  //sets all the values each time the main interval runs
  function setValues(){
    //time values
    hours = padTime( d.getHours() );
    minutes = padTime( d.getMinutes() );
    seconds = padTime( d.getSeconds() );
    builtTime = hours + ":" + minutes + ":" + seconds;

    //line width values
    minuteRatio = ( d.getSeconds() / 60);
    minutePercent = (minuteRatio * 400) + "px";

    //color values
    rValue = prorateMinute( d.getSeconds(), 30 ).toString(16);
    gValue = prorateMinute( d.getSeconds(), 20 ).toString(16);
    bValue = prorateMinute( d.getSeconds(), 40 ).toString(16);
    colorCode = "#"+rValue+gValue+bValue;
    colorCodeDisplay = '#' + padTime(rValue) + ' : ' + padTime(gValue) + ' : ' + padTime(bValue);

    //print stuff to console
    console.log ( 'time: ' + hours + ":" + minutes + ":" + seconds );
    console.log ( 'at ' + seconds + ' seconds it is ' + Math.floor(minuteRatio*100) + '% of a minute');
    console.log ( 'current color for the background is calculated at: ' + colorCodeDisplay );

    //update DOM Elements
    document.querySelector(".clock").innerHTML = builtTime;
    document.querySelector(".line").style.width = minutePercent;
    document.querySelector("body").style.backgroundColor = colorCode;
  }

  var d = new Date();
  var hours, minutes, seconds, builtTime, minutePercent, newInterval, colorCode, colorCodeDisplay;
  var clockEnter = document.querySelector('.clock');
  var hexExit = document.querySelector('.hexcode');
  var rValue = 'ff';
  var gValue = '00';
  var bValue = 'ff';

  //setup initial layout of the page
  setValues();

  //set interval
  var myInterval = setInterval( setClock, 1000);
  //update data on interval
  function setClock(){
    d = new Date();
    setValues();
  }

  //            EVENT HANDLING FUNCTIONS
  function setHexCode () {
    document.querySelector('.hexcode').innerHTML = colorCodeDisplay;
    document.querySelector('.hexcode').style.display = 'block';
    document.querySelector('.clock').style.display = 'none';
    newInterval = setInterval(updateHex, 1000);
  }

  function updateHex(){
    document.querySelector('.hexcode').innerHTML = colorCodeDisplay;
  }

  function resetClock(){
    document.querySelector('.hexcode').style.display = 'none';
    document.querySelector('.clock').style.display = 'block';
    clearInterval( newInterval );
  }

  //          EVENT LISTENTERS
  clockEnter.addEventListener( 'mouseenter', setHexCode );
  hexExit.addEventListener('mouseleave', resetClock );

}());
