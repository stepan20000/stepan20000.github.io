/*
*              SIMON GAME
*
*         by Stepan Yefimov - 2017
*
  *             Using 
            CSS3 & jQuery
*
***********************************************
*/ 
//Declare the "constructor" function
function MakeSimon($simon) {
//Checking for WEB Audio API 
  this.audioCtx = new (window.AudioContext || window.webkitAudioContext)() || false;
  if (!this.audioCtx) {
    alert('Sorry, but the Web Audio API is not supported by your browser.');
  }
  else {   
// Save reference to created object into the variable for later using 
    _this = this;
//In future we will select items only within the current DOM element with the following id 
    this.id = '#' + $simon.attr('id');

    this.onOffSwitch = $('#myonoffswitch');
// On-off switch will always be false after refreshing the page, avoid cashing the the checkbox's state
    this.onOffSwitch.prop('checked', false);
// Led element for displaying the "strict" mode
    this.led = $(this.id + ' .led')[0];
// Flag indicates the "on" or "off" states of switch and therefore the state of the whole device 
    this.on = false;
// Flag for "strict mode"
    this.strict = false;
// Spec frequency corresponds to the each colors, this variables are used for calculating those frequencies 
    this.startFreq = 250;
    this.stepFreq = 62.5;
    this.multiplier = 0;
// Parameters for the gain.linearRampToValueAtTime
    this.vol = 0.5;
    this.ramp = 0.05;
//Manimum game level
    this.topLevel = 20;
      
// Thi object with our color items, here we add DOM elements as a plates
    this.items = {
      red: {
        plate: $(this.id + ' .red')[0],
      },
      yellow: {
        plate: $(this.id + ' .yellow')[0],
      },
      green: {
        plate: $(this.id + ' .green')[0],
      },
      blue: {
        plate: $(this.id + ' .blue')[0],
      }
    };
//Fill the items object      
    for (var i in this.items) {
//Calculate the freq for oscillators, create oscillator, create gain, connect gain with distination and oscillator with gain, start oscillator
      this.items[i].freq = this.startFreq + this.multiplier * this.stepFreq;
      this.items[i].osc = this.audioCtx.createOscillator();
      this.items[i].osc.type = 'triangle';
      this.items[i].osc.frequency.value = this.items[i].freq;
      this.items[i].gainNode = this.audioCtx.createGain();
      this.items[i].osc.connect(this.items[i].gainNode);
      this.items[i].gainNode.connect(this.audioCtx.destination);
      this.items[i].gainNode.gain.value = 0;
      this.items[i].osc.start();
// activate method turn on the item's sound and highlight item
      this.items[i].activate = function () {
        $(this.plate).addClass('active');
        this.gainNode.gain.linearRampToValueAtTime(_this.vol, _this.audioCtx.currentTime + _this.ramp);
      }
// deactivate method turn off the item's sound and stop highlighting
      this.items[i].deactivate = function () {
        $(this.plate).removeClass('active');
        this.gainNode.gain.linearRampToValueAtTime(0, _this.audioCtx.currentTime + _this.ramp);
      }
 // Increase multiplier for calculating item's oscillators frequencies      
      this.multiplier++; 
    }
    
    
 // Add event listener for on-off switch, if we switch on game switchOn method is called from prototype object and correspondingly 
// the switchOff method is called from prototype object when we turn off the game
    $(this.onOffSwitch).click(function (evt) {
      if (evt.target.checked) {
        _this._switchOn(_this);
      }
      else {
        _this._switchOff(_this);
      }
    });
 // Use gameObj for storage current game level, timers array and intervals array for clearing them when reset the game   
    this.gameObj = {
      level: 0, timeouts: [], intervals: []
    };

    this.gameObj.clearTimers = function () {
      for (var i in this.timeouts) {
        clearTimeout(this.timeouts[i]);
      }
      for (var i in this.intervals) {
        clearInterval(this.intervals[i]);
      }
    }
    
    this.gameObj.init = function () {
      this.level = 0;
      this.clearTimers();
    }
// Set up the error sound    
    this.errOsc = this.audioCtx.createOscillator();
    this.errOsc.type = 'triangle';
    this.errOsc.frequency.value = 120;
    this.errOsc.start(); 
    this.errGainNode = this.audioCtx.createGain();
    this.errOsc.connect(this.errGainNode);
    this.errGainNode.gain.value = 0;
    this.errGainNode.connect(this.audioCtx.destination);
  }
}

// switchOn function just show special symbols on display and add event listeners to "Start" and "Strict" buttons
MakeSimon.prototype._switchOn = function (_this) {
  
  this._display('--');
  
  $(this.id + ' .start').click(function (evt) {
    _this._startGame();
  });
  
  $(this.id + ' .strict').click(function (evt) {
    if (_this.strict === false) {
      _this.strict = true;
      $(_this.led).addClass('active');
    }
    else {
      _this.strict = false;
      $(_this.led).removeClass('active');
    }
  });
}
//Remove event listener from the "Start" and "Strict" buttons, turn off display, reset the game...
MakeSimon.prototype._switchOff = function (_this) {
  this._display('');
  _this.strict = false;
  for (var i in this.items) {
    $(this.items[i].plate).css('cursor', 'default');
  }
// Set the gainNode values to 0 and remove the 'active' class from the plates
  if (_this.on) {
    _this._reset();
    _this.on = false;
  }
  $(_this.id + ' .start').off('click');
  $(_this.id + ' .strict').off('click');
  $(_this.id + ' .box').off();
}

MakeSimon.prototype._reset = function () {
  for (var i in this.items) {
    this.items[i].deactivate();
  }
  this.gameObj.clearTimers();
  _this.errGainNode.gain.linearRampToValueAtTime(0, _this.audioCtx.currentTime + _this.ramp);
}

MakeSimon.prototype._startGame = function () {
  if(this.on) {
    this._reset();
  }
  else {
    this.on = true;
  }
  this.gameObj.init();
  this._play();
}
//Display the number received as an argument on the screen
MakeSimon.prototype._display = function (num) {
  var $screen = $(this.id + ' .screen-value');
  if ($.isNumeric(num)) { 
    if (num >= 10) {
      $screen.html(num);
    }
    else {
      $screen.html('0' + num);
    }
  }
  else {
    $screen.html(num);
  }
}
// The function to control the game flow
MakeSimon.prototype._play = function () {
  var _this = this;
  var pressedIntem, count;
  var gap = 3000, showSeqSpeed = 1000;
  var sequence = [];
  
  
  function nextStep() {
     $(_this.id + ' .box').off();
    _this.gameObj.level++;
    if (_this.gameObj.level >= 3) {
      showSeqSpeed = 1000 - _this.gameObj.level * 38;
      gap = 2 * showSeqSpeed * _this.gameObj.level;
    }
    
    _this._display(_this.gameObj.level);

    function generateColor() {
        var colors = [_this.items.red, _this.items.yellow, _this.items.green, _this.items.blue];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
   sequence.push(generateColor());
   _this.gameObj.timeouts[2] = setTimeout(showSequence, 2000);   
  }

  function showSequence() {
    var i = 0;

    function showColor() {
      sequence[i].activate();
      _this.gameObj.timeouts[0] = setTimeout(function () {
        sequence[i].deactivate();
        i++;
        if (i < sequence.length) {
          _this.gameObj.timeouts[1] = setTimeout(showColor, showSeqSpeed);
        }      
        else {
          listenHuman();
        }
      }, showSeqSpeed); 
    }
    _this._display(_this.gameObj.level);
    showColor();  
  }
  
  function listenHuman() {
    var count = 1;
    var pressedItem;
    
    for (var i in _this.items) {
      $(_this.items[i].plate).css('cursor', 'pointer');
    }    
    
    $(_this.id + ' .box').mousedown(function (evt) {
      clearTimeout(_this.gameObj.timeouts[6]);
      switch(evt.target) {
        case _this.items.red.plate:
          pressedItem = _this.items.red;
          break;
        case _this.items.yellow.plate:
          pressedItem = _this.items.yellow;
          break;
        case _this.items.green.plate:
          pressedItem = _this.items.green;
          break;
        case _this.items.blue.plate:
          pressedItem = _this.items.blue;
          break;
        default:
          pressedItem = false;      
      }
      if (pressedItem !== sequence[count - 1] && pressedItem !== false) { // Human pressed incorrect color
        showError(pressedItem);
        return;
      }
      if (pressedItem.activate) {
        pressedItem.activate();
      }
    });
    
    $(_this.id + ' .box').mouseup(function () {
      if (pressedItem) {
        pressedItem.deactivate();
        clearTimeout(_this.gameObj.timeouts[6]);       
        if (count === _this.gameObj.level) { 
          for (var i in _this.items) {
            $(_this.items[i].plate).css('cursor', 'default');
          }
          clearTimeout(_this.gameObj.timeouts[7]); 
          if (_this.gameObj.level === _this.topLevel) {
            showWin(pressedItem);
          }
          else {
            nextStep();
          }
        }
        else {
          count++;
        }
      }
    }); 
 // Show error if player have not pressed any colors within 3 sec   
    _this.gameObj.timeouts[6] = setTimeout(function () {
      if(!pressedItem) {
        showError();
      } 
    }, 3000);
// Show error if player nave not enter right colors sequence within gap 
    _this.gameObj.timeouts[7] = setTimeout(function () {
      showError(pressedItem);
      }, gap);
  }
  
  function showError(item) {
    for (var i in _this.items) {
      $(_this.items[i].plate).css('cursor', 'default');
    }
    _this.errGainNode.gain.linearRampToValueAtTime(_this.vol, _this.audioCtx.currentTime + _this.ramp);
    if (item) {
      item.deactivate();
      $(item.plate).addClass('active');
    }
    $(_this.id + ' .box').off();
    _this.gameObj.clearTimers();
    _this._display('!!');
    _this.gameObj.intervals[0] = setInterval(blinkScreen, 250);
    _this.gameObj.timeouts[4] = setTimeout(function () {
      if(item){ 
        $(item.plate).removeClass('active');
      }
      _this.errGainNode.gain.linearRampToValueAtTime(0, _this.audioCtx.currentTime + _this.ramp);
      clearInterval(_this.gameObj.intervals[0]);
       $(_this.id + ' .screen-value').fadeIn();
       $(_this.id + ' .screen-value').html('--');
      _this.gameObj.timeouts[5] = setTimeout(function () {
        if (_this.strict) {
          _this._startGame();
        }
        else {
          showSequence(); 
        }
        }, 1500);
    }, 2000);    
  } 
 
  function showWin(item) {
    function blinkItem(item) {
      if ($(item.plate).hasClass('active')) {
        item.deactivate();
      }
      else {
        item.activate();
      }
    }
    $(_this.id + ' .box').off();
    _this._display('**');
    _this.gameObj.intervals[1] = setInterval(function () {
      blinkItem(item);
      blinkScreen(200);
    }, 200);
    _this.gameObj.timeouts[8] = setTimeout(function () {
      clearInterval(_this.gameObj.intervals[1]);
      $(_this.id + ' .screen-value').fadeIn();
      item.deactivate();
    }, 3000);  
  } 
  
  function blinkScreen(speed) {
    $(_this.id + ' .screen-value').fadeToggle(speed);
  } 
  nextStep();
}

$(document).ready(function($) { 
  var simon = new MakeSimon($('#simon'));    
});