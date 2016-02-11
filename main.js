(function(){

  function padTime ( timeNum ){
    return ("0" + timeNum ).slice(-2);
  }
  function prorateMinute ( curSec, highPt ){
    var value = Math.floor( (Math.abs((curSec - highPt))/60)* 255);
    console.log(value);
    return value;
  }
  var d = new Date();
  var hours = padTime( d.getHours() );
  var minutes = padTime( d.getMinutes() );
  var seconds = padTime( d.getSeconds() );
  var builtTime = hours + ":" + minutes + ":" + seconds;
  document.querySelector(".clock").innerHTML = builtTime;
  var minutePercent = (( d.getSeconds() / 60) * 100) + "%";
  document.querySelector(".line").width = minutePercent;
  var myInterval = setInterval( setClock, 1000);
  var clockEnter = document.querySelector('.clock');
  var hexExit = document.querySelector('.hexcode');
  var hex = 'ff00ff';
  var colorCode;
  var newInterval;

  function setClock(){
    d = new Date();
    hours = padTime( d.getHours() );
    minutes = padTime( d.getMinutes() );
    seconds = padTime( d.getSeconds() );
    builtTime = hours + ":" + minutes + ":" + seconds;
    console.log ( hours + ":" + minutes + ":" + seconds );
    document.querySelector(".clock").innerHTML = builtTime;
    minuteRatio = ( d.getSeconds() / 60);
    minutePercent = (minuteRatio * 400) + "px";
    console.log (minutePercent);
    document.querySelector(".line").width = minutePercent;
    console.log ( 'current second ' + d.getSeconds() );
    var rValue = prorateMinute( d.getSeconds(), 30 ).toString(16);
    var gValue = prorateMinute( d.getSeconds(), 20 ).toString(16);
    var bValue = prorateMinute( d.getSeconds(), 40 ).toString(16);
    console.log( rValue);
    console.log( gValue);
    console.log( bValue);
    colorCode = "#"+rValue+gValue+bValue;
    console.log( colorCode );
    document.querySelector("body").style.backgroundColor = colorCode;
    document.querySelector(".line").style.width = minutePercent;

  }
  function updateHex(){
    document.querySelector('.hexcode').innerHTML = colorCode;
  }
  function setHexCode () {
    document.querySelector('.hexcode').innerHTML = colorCode;
    document.querySelector('.hexcode').style.display = 'block';
    document.querySelector('.clock').style.display = 'none';
    newInterval = setInterval(updateHex, 1000);

  }
  function resetClock(){
    document.querySelector('.hexcode').style.display = 'none';
    document.querySelector('.clock').style.display = 'block';
    clearInterval( newInterval );
  }
  clockEnter.addEventListener( 'mouseenter', setHexCode );
  hexExit.addEventListener('mouseleave', resetClock );



}());
