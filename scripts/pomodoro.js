function MakePomodoro($pomodoro) {
  _this = this;
  this.pomodoro = $pomodoro;
  this.idPom = '#' + this.pomodoro.attr("id");
  
  this.workDurDef = 7;
  this.relaxDurDef = 5;
  this.sessionsDef = 1;
  this.workDur = this.workDurDef;
  this.relaxDur = this.relaxDurDef;
  this.sessions = this.sessionsDef;
  this.sessionsCount = this.sessions;
  this.playFlag = false;
  this.pauseFlag = false;
  this.playTimeout = undefined; 
  this.endFlag = true; 
  this.color1 = "#FF6347";
  this.color2 = "#47E3FF";
  this.color3 = "#18353A";
  
  this._makeDial();
 
  $(this.idPom + ' .show-set').click(function () {
   _this._showHideSetting();  
  });
 
  this._loadDefaultSet();
 
  $('.timers').click(function(evt){
   _this._adjustTimers(evt);   
  });
   
  $('.controls').click(function(evt) {
    _this._makeControl(evt);    
  });     
}

MakePomodoro.prototype._makeDial = function() {
  for (i=1;i<=6;i++) {
      $('#' + this.pomodoro.attr('id') + ' .center').before('<div class="l'+i+'"></div>');
  }
  for (i=1;i<=30;i++) {
      $(this.idPom + ' .center').before('<div class="ln'+i+'"></div>');
      $(this.idPom + ' .ln'+i).css({
          "-moz-transform" : "rotate(" + i*6 + "deg)", 
          "-webkit-transform" : "rotate(" + i*6 + "deg)", 
          "-o-transform" : "rotate(" + i*6 + "deg)", 
          "padding" : "100px 1px 100px 0", 
          "left" : "99px", 
          "position" : "absolute",
          "display" : "block",
          "content" : "",
     });
  }
}

MakePomodoro.prototype._showHideSetting = function () {
  if($(this.idPom + ' .timers').css("opacity") == "0") {
    $(this.idPom + ' .timers').css("opacity", "1.0");
    $(this.idPom).css('height', "500px");
    $(this.idPom).css('transition', '1.0s');
    $(this.idPom + ' .timers').css('transition', '1.0s 0.8s');
    $(this.idPom + ' .show-set').html('<i class="fa fa-chevron-up" aria-hidden="true"></i>' +
                                    '&nbsp Hide Settings &nbsp' + 
                                    '<i class="fa fa-chevron-up" aria-hidden="true"></i>');
  }
  else {
    $(this.idPom + ' .timers').css("opacity", ".0");
    $(this.idPom).css('height', "340px");
    $(this.idPom).css('transition', '1.0s 0.8s');
    $(this.idPom + ' .timers').css('transition', '1.0s');
    $(this.idPom + ' .show-set').html('<i class="fa fa-chevron-down" aria-hidden="true"></i>' + 
  	                                 '&nbsp Show Settings &nbsp' + 
  	                                  '<i class="fa fa-chevron-down" aria-hidden="true"></i>');
  }
}

MakePomodoro.prototype._loadDefaultSet = function () {
  this.workDur = this.workDurDef;
  this.relaxDur = this.relaxDurDef;
  this.sessions = this.sessionsDef;
  $( this.idPom + ' .rem-ses').html(this.sessionsDef);
  $( this.idPom + ' .relax .value').html(this.relaxDurDef);
  $( this.idPom + ' .work .value').html(this.workDurDef);
  $( this.idPom + ' .sessions .value').html(this.sessionsDef);
  $( this.idPom + ' .work-arrow').css('transform','rotate(' + this.workDurDef * 6 + 'deg)');
  $( this.idPom + ' .relax-arrow').css('transform','rotate(' + this.relaxDurDef * 6 + 'deg)');
}

MakePomodoro.prototype._adjustTimers = function(evt) {
  if(!this.playFlag) {
    if($(evt.target).hasClass('plus')){
      var audio = new Audio('sounds/pomodoro/plus-click.mp3');
      audio.play();
    }
    else if($(evt.target).hasClass('minus')) {
      var audio = new Audio('sounds/pomodoro/minus-click.mp3');
      audio.play();
    }
    switch(evt.target) {
      case $(this.idPom + ' .work .plus')[0]:
        this.workDur++; 
        if(this.workDur > 60) {
          this.workDur = 60;  
        } 
        $('.work .value').html(this.workDur); 
        $('.work-arrow').css('transform','rotate(' + this.workDur * 6 + 'deg)');
        break;
      case $(this.idPom + ' .work .minus')[0]:
        this.workDur--;
        if(this.workDur < 1) {
          this.workDur = 1;  
        } 
        $('.work .value').html(this.workDur); 
        $('.work-arrow').css('transform','rotate(' + this.workDur * 6 + 'deg)');
        break;
      case $(this.idPom + ' .relax .plus')[0]:
        this.relaxDur++;
        if(this.relaxDur > 60) {
          this.relaxDur = 60;  
        } 
        $('.relax .value').html(this.relaxDur); 
        $('.relax-arrow').css('transform','rotate(' + this.relaxDur * 6 + 'deg)');
        break;
      case $(this.idPom + ' .relax .minus')[0]:
        this.relaxDur--;
        if(this.relaxDur < 1) {
          this.relaxDur = 1;  
        } 
        $('.relax .value').html(this.relaxDur); 
        $('.relax-arrow').css('transform','rotate(' + this.relaxDur * 6 + 'deg)');
        break;
      case $(this.idPom + ' .sessions .plus')[0]:
        this.sessions++;
        if(this.sessions > 99) {
          this.sessions = 99;  
        } 
        $('.sessions .value').html(this.sessions); 
        $('.rem-ses').html(this.sessions);
        this.sessionsCount = this.sessions;
        break;
      case $(this.idPom + ' .sessions .minus')[0]:
        this.sessions--;
        if(this.sessions < 1) {
          this.sessions = 1;  
        } 
        $('.sessions .value').html(this.sessions);
        $('.rem-ses').html(this.sessions);
        this.sessionsCount = this.sessions; 
        break;
      case $(this.idPom + ' .default-set')[0]:
        this._loadDefaultSet();
        var audio = new Audio('sounds/pomodoro/default.mp3');
        audio.play();
    }
  }
}

MakePomodoro.prototype._makeControl = function(evt) {
  switch(evt.target) {
    case $(this.idPom + ' .controls .fa-play')[0]:
      if(!this.playFlag) {
        var _this = this;       
        if (this.endFlag) {
          this._play();
        }
        this.playFlag = true;
        $(this.idPom + ' .timers button').addClass('button-inactive');
        $(this.idPom + ' .controls .fa-play').addClass('control-inactive');
        $(this.idPom + ' .controls .fa-stop').removeClass('control-inactive');
        $(this.idPom + ' .controls .fa-pause').removeClass('control-inactive');
        if(this.pauseFlag){
          this.pauseFlag = false;
        }    
        var audio = new Audio('sounds/pomodoro/play.mp3');
        audio.play();    
      }
      else if(this.pauseFlag){
        this.pauseFlag = false;
        $(this.idPom + ' .controls .fa-pause').removeClass('control-inactive');
        $(this.idPom + ' .controls .fa-play').addClass('control-inactive');
        var audio = new Audio('sounds/pomodoro/play.mp3');
        audio.play(); 
      }
      break;
    case $(this.idPom + ' .controls .fa-pause')[0]:
      if(!this.pauseFlag && this.playFlag){
          this.pauseFlag = true; 
          $(this.idPom + ' .controls .fa-pause').addClass('control-inactive');
          $(this.idPom + ' .controls .fa-play').removeClass('control-inactive');  
          var audio = new Audio('sounds/pomodoro/pause.mp3');
          audio.play();   
      }
      break;
    case $(this.idPom + ' .controls .fa-stop')[0]:
      if(this.playFlag) {
        this.playFlag = false;
        $(this.idPom + ' .timers button').removeClass('button-inactive');
        $(this.idPom + ' .controls .fa-play').removeClass('control-inactive');
        $(this.idPom + ' .controls .fa-stop').addClass('control-inactive');
        $(this.idPom + ' .controls .fa-pause').addClass('control-inactive');
        if(this.pauseFlag){ 
          this.pauseFlag = false;
        }
        $( this.idPom + ' .work-arrow').css('transform','rotate(' + this.workDurDef * 6 + 'deg)');
        $( this.idPom + ' .relax-arrow').css('transform','rotate(' + this.relaxDurDef * 6 + 'deg)');
        $( this.idPom + ' .rem-ses').html(this.sessions);
        var audio = new Audio('sounds/pomodoro/stop.mp3');
        audio.play();
      }
      break; 
  }
}

MakePomodoro.prototype._play = function() {
  this.endFlag = false;
  if(this.pauseFlag) {
    this.pauseFlag = false;
  }  

  $(this.idPom + ' .work-arrow').css('transform','rotate(' + this.workDur * 6 + 'deg)');
  $(this.idPom + ' .relax-arrow').css('transform','rotate(' + this.relaxDur * 6 + 'deg)');
  this.sessionsCount--;
  $( this.idPom + ' .rem-ses').html(this.sessionsCount);
    

  (function () {
    return new Promise(function(resolve, reject) {
      var remainsWork = _this.workDur; 
      
      for (var i = 1; i <= 6; i++) {
            $(_this.idPom + ' .l'+ i).addClass('work-run');   
          }
      var workInt = setInterval(function () {
        if(!_this.playFlag) {
          _this.pauseFlag = false;
          clearInterval(workInt);
          resolve(false);    
        }
        else if (!_this.pauseFlag) {  
          remainsWork--;
          $(_this.idPom + ' .work-arrow').css('transform','rotate(' + remainsWork * 6 + 'deg)');
          if (remainsWork === 0) {
            clearInterval(workInt);
            resolve(true); 
          }
        }
      }, 1000);  
    });
  })()
  .then(function (result) {
    if(result) {
      var audio = new Audio('sounds/pomodoro/work-relax.mp3');
      audio.play();
    for (var i = 1; i <= 6; i++) {
            $(_this.idPom + ' .l'+ i).removeClass('work-run');
            $(_this.idPom + ' .l'+ i).addClass('relax-run');   
          }
    return new Promise(function(resolve, reject) {
      var remainsRelax = _this.relaxDur; 
      var relaxInt = setInterval(function () {
        if(!_this.playFlag) {
          clearInterval(relaxInt);
          resolve(false);    
        }
        else if (!_this.pauseFlag) {        
          remainsRelax--;
          $(_this.idPom + ' .relax-arrow').css('transform','rotate(' + remainsRelax * 6 + 'deg)');
          if (remainsRelax === 0) {
            clearInterval(relaxInt);
            resolve(true); 
          }
        }
      }, 1000);
    })
  }
  else {
    return false;  
  }  
  })
  .then(function (result) {
    if (_this.sessionsCount > 0 && result) {
      _this._play();
      var audio = new Audio('sounds/pomodoro/play.mp3');
      audio.play();
    }
    else {
      _this.sessionsCount = _this.sessions;
      $(_this.idPom + ' .controls .fa-play').removeClass('control-inactive'); 
      $(_this.idPom + ' .controls .fa-stop').addClass('control-inactive');
      $(_this.idPom + ' .controls .fa-pause').addClass('control-inactive'); 
      $(_this.idPom + ' .timers button').removeClass('button-inactive');
      _this.playFlag = false;
      if(result){
        var audio = new Audio('sounds/pomodoro/end.mp3');
        audio.play();
      }    
    }
    _this.endFlag = true;
    for (var i = 1; i <= 6; i++) {
            $(_this.idPom + ' .l'+ i).removeClass('work-run');
            $(_this.idPom + ' .l'+ i).removeClass('relax-run');   
          }
  });
}

$(document).ready(function($) { 
  var myPomodoro = new MakePomodoro($('#pomodoro'));    


});