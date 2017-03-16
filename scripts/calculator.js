function MakeCalc(calcTarget) {
	var _this = this;
	this.onOffSwitch =  calcTarget.getElementsByClassName('onoffswitch-checkbox')[0];
	this.digits = calcTarget.getElementsByClassName("digit");
	this.dots = calcTarget.getElementsByClassName("dot");
	this.keys = calcTarget.getElementsByClassName("keys")[0];
	this.numberDisplayed = 0;
	this.cash1 = false;
	this.cash2 = false;
	this.mathOperation = false;
	this.overflowFlag = false;
	this.inputing = true;
	this.addDot = false;
	this.equalMath = false;
	this.digitsNum = this.digits.length;
	
//After loading the page the calculator will be surely turned off, the fact that browsers cache the state of the check-box will not have impact 
	this.onOffSwitch.checked = false;
//Add event listener to the on-off switch
	this.onOffSwitch.addEventListener("change",  function () { 
		_this._makeOnOff();
	});
	
	this._keyboardDriver = this._keyboardDriver.bind(this);
}	

// The method which makes the on-off switch works, if check-box is checked the _switchOnCalc method from .prototype object is invoked
// else (if check-box is checked off) the _switchOffCalc method from .prototype object is invoked  	
MakeCalc.prototype._makeOnOff = function () {
	if(this.onOffSwitch.checked){
		this._switchOnCalc(this);
	}		
	else {
		this._switchOffCalc(this);
	}
}

MakeCalc.prototype._clearDisplay = function () {
	for(var digit of this.digits){
			digit.style.opacity = "0.1";
			digit.innerHTML = "8";						
		}
	this.digits[0].innerHTML = "-";
	for(var dot of this.dots){
			dot.style.opacity = "0.1";			
		}	
}

//After switching-on we slightly highlight all digits(opacity 0.1), turn on first dot and first digit and set first digit value to the "0"
MakeCalc.prototype._switchOnCalc = function(currentCalc) {
	this._clearDisplay();
	this.digits[this.digitsNum - 1].style.opacity = "1.0";
	this.digits[this.digitsNum - 1].innerHTML = "0";
	this.dots[this.digitsNum - 2].style.opacity = "1.0";
	this.numberDisplayed = 0;
	this.inputing = true;
	this.addDot = false;
	this.cash1 = false;
	this.cash2 = false;
	this.mathOperation = false;
	this.equalMath = false;
	
//Add event listener for keyboard after calculator is switched on
	this.keys.addEventListener("click", currentCalc._keyboardDriver);
}

//After switching-off we slightly set opacity of all digits and dots to the "0.0" and set all digits values to the "8"
MakeCalc.prototype._switchOffCalc = function(currentCalc) {
	for(var digit of this.digits){
		digit.style.opacity = "0.0";
	}
	for(var dot of this.dots){
		dot.style.opacity = "0.0";			
	}
//Remove event listener for keyboard after calculator is switched off
	this.keys.removeEventListener("click", currentCalc._keyboardDriver);
} 	
// This method displays on the screen the number passed as an argument, write displayed number to the this.numberDisplayed and 
// set this.overflowFlag if needed;
MakeCalc.prototype._showOnScreen = function(num) {
	if (Number.isNaN(num) || num == Infinity || num == -Infinity) {
		this._clearDisplay();
		this.overflowFlag = true;
		this.numberDisplayed = 0;
		for(var digit of this.digits){
			digit.style.opacity = "1.0";
			digit.innerHTML = "0";						
		}
		this.digits[0].innerHTML = "-";
		this.digits[0].style.opacity = "0.1";
		for(var dot of this.dots){
			dot.style.opacity = "1.0";			
		}
		return;		
	}
	if(typeof num == "number" && num != Infinity && num != -Infinity){
		this._clearDisplay();
		var toDisplay = [];
		var fractionToDisplay = [];		
		this.overflowFlag = false;
		var isNegative = false;
		var allFractionAddedIsZero = true;
		var dotPosition = 0;
		
		if(num < 0){
			isNegative = true;
			num = num * (-1);	
		}
		var integerPart = num.toString().split(".")[0].split("");
		var fractionPart = num.toString().split(".")[1];
		if (fractionPart) {
			fractionPart = num.toString().split(".")[1].split("");
		}			
		
		if (integerPart.length > this.digitsNum -1) {
			this.overflowFlag = true;
			toDisplay = integerPart.slice(0, this.digitsNum -1);
			this.numberDisplayed = num / Math.pow(10, this.digitsNum -1);
			if(isNegative) {
				this.numberDisplayed = this.numberDisplayed *(-1)
			}
		}
		else {
			Array.prototype.push.apply(toDisplay, integerPart);
			if (fractionPart) {
				for (var i = fractionPart.length - 1; i >= 0; i--) {		
					if(fractionPart[i] == 0) {
						fractionPart.pop();
					}
					else  break;			
				}
				for (i = 0; i + 1 + integerPart.length <= this.digitsNum -1 && i <= fractionPart.length -1; i++) {
					if(fractionPart[i] != 0) {
						allFractionAddedIsZero = false;
					}
					fractionToDisplay.push(fractionPart[i]);		
				}
				if (!allFractionAddedIsZero) {
					Array.prototype.push.apply(toDisplay, fractionToDisplay);
					dotPosition = this.dots.length - 1 - (this.digitsNum - 2 - fractionToDisplay.length);
				}
			}
			else {
				fractionToDisplay = [""];		
			}
			this.numberDisplayed = parseFloat(integerPart.join("") + "." + fractionToDisplay.join(""));
		}		
		if(isNegative) {
			this.numberDisplayed = this.numberDisplayed * (-1);
			this.digits[0].style.opacity = "1.0";
			this.digits[0].innerHTML = "-";
		}	
		if (this.overflowFlag) {
			for(var dot of this.dots){
				dot.style.opacity = "1.0";			
			}
		}
		else {
			/*for(var dot of this.dots) {
				dot.style.opacity = "0.1";
			}*/
			this.dots[this.dots.length -1 - dotPosition].style.opacity = "1.0";
		}
		for(var i = toDisplay.length -1; i >=0; i --){
			this.digits[this.digitsNum - 1 - toDisplay.length  +1 + i].style.opacity = "1.0";
			this.digits[this.digitsNum - 1 - toDisplay.length  +1 + i].innerHTML = toDisplay[i];		
		}
	}
	else {
		this._switchOnCalc(this);
		alert("Error. Value " + num + " can not be displayed");
	}
}

MakeCalc.prototype._keyboardDriver = function(evt) {

	switch(true) {
		case !evt.target.value : 
			break;
		case evt.target.value == "C":
			if (this.overflowFlag) {
				this.overflowFlag = false;
				this._showOnScreen(this.numberDisplayed);	
			}
			else {
				this._switchOnCalc(this);	
			}
			break;
		case Boolean(evt.target.value.match(/[1234567890]/)):
			if(this.numberDisplayed.toString().split(".")[0].length < this.digitsNum - 1 || !this.inputing) {
				if (this.inputing) {
					if (this.addDot) {
						this.addDot = false;
						this._showOnScreen(parseFloat(this.numberDisplayed.toString() + "." + evt.target.value));
					}
					else {
						this._showOnScreen(parseFloat(this.numberDisplayed.toString() + evt.target.value));
					}			
				}
				else {
					this.inputing = true;
					if (this.addDot) {
						this.addDot = false;
						this._showOnScreen(parseFloat("0" + "." + evt.target.value.toString()));
					}	
					else {
						this._showOnScreen(parseFloat(evt.target.value));
					}
				}
			}
			break;
		case Boolean(evt.target.value.match(/[\\.]/)):
			this.addDot = true;
			break;
		case Boolean(evt.target.value.match(/radic/)):	
				this._showOnScreen(Math.sqrt(this.numberDisplayed));	
			break;
		case Boolean(evt.target.value.match(/\+/)):
			this.inputing = false;	
			if(this.cash1 === false || this.equalMath){
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 + cash2};
			}
			else {
				this.cash2 = this.numberDisplayed;
				this._showOnScreen(this.mathOperation(this.cash1, this.cash2));
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 + cash2};	
			}
			this.equalMath = false;	
			break;	
		case Boolean(evt.target.value.match(/\-/)):
			this.inputing = false;
			if(this.cash1 === false || this.equalMath){
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 - cash2};
			}
			else {
				this.cash2 = this.numberDisplayed;
				this._showOnScreen(this.mathOperation(this.cash1, this.cash2));
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 - cash2};	
			}	
			this.equalMath = false;
			break;	
		case Boolean(evt.target.value.match(/x/)):
			this.inputing = false;
			if(this.cash1 === false || this.equalMath){
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 * cash2};
			}
			else {
				this.cash2 = this.numberDisplayed;
				this._showOnScreen(this.mathOperation(this.cash1, this.cash2));
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 * cash2};	
			}	
			this.equalMath = false;
			break;	
		case Boolean(evt.target.value.match(/\//)):
			this.inputing = false;
			if(this.cash1 === false || this.equalMath){
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 / cash2};
			}
			else {
				this.cash2 = this.numberDisplayed;
				this._showOnScreen(this.mathOperation(this.cash1, this.cash2));
				this.cash1 = this.numberDisplayed;
				this.mathOperation = function (cash1, cash2) {return cash1 / cash2};	
			}	
			this.equalMath = false;
			break;	
		case Boolean(evt.target.value.match(/\=/)):
			if (this.cash1 !== false) {
				if (this.cash2 === false) {
					this.cash2 = this.numberDisplayed;
				}
				else {
					if (this.equalMath === true) {
						this.cash1 = this.numberDisplayed;				
					}	
					else {			
						this.cash2 = this.numberDisplayed;
					}			
				}	
				this._showOnScreen(this.mathOperation(this.cash1, this.cash2));			
				this.equalMath = true;			
			}
	}
}



window.addEventListener('load', function () {
	var myCalcTarget = document.getElementById("myCalc");
	var myCalcObj = new MakeCalc(myCalcTarget);
});