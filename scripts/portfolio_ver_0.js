function ConstructWorksSection(worksSection, worksList) {
		this.worksSection = worksSection;
		this.worksList = worksList;
		this._fillWorksSection(this.worksSection, this.worksList);
}

ConstructWorksSection.prototype._fillWorksSection = function(targetArea, items){
	var _this = this;
	for(var i = items.length -1; i >= 0; i--) {
		targetArea.appendChild(_this._makeSingleWorkHTML(items[i], i));
	};
}

ConstructWorksSection.prototype._makeSingleWorkHTML = function(singleWork, id){
	var workContainer = document.createElement("div");
		workContainer.className = "single-work";
		workContainer.id = id.toString();

	var imageContainer = document.createElement("div");
		imageContainer.className = "work-image-container animation";
	var imageWork = document.createElement("img");
		imageWork.src = singleWork.image;
	var maskDiv = document.createElement("div");
		maskDiv.className = "mask";
	var descript = document.createElement("p");
		descript.innerHTML = singleWork.description;
	var workTitleDiv = document.createElement("div");
		workTitleDiv.className = "work-title";
	var workTitle = document.createElement("h3");
		workTitle.innerHTML = singleWork.title;
	var workTitleLink = document.createElement("a");
		workTitleLink.href = singleWork.linkToDemo;
		workTitleLink.target = "_blank";
		
	workTitleLink.appendChild(workTitle);	
	workTitleDiv.appendChild(workTitleLink);
	maskDiv.appendChild(descript);
	imageContainer.appendChild(imageWork);
	imageContainer.appendChild(maskDiv);	
	workContainer.appendChild(imageContainer);
	workContainer.appendChild(workTitleDiv);
	
	return workContainer;	
}

// This function performs smoothly scrolling when clicked back-to-top or header's links
function makeScrolling(evt) {
	evt.preventDefault();

	function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
	}

	function elmYPosition(elm) {
	    var y = elm.offsetTop;
	    var node = elm;
	    while (node.offsetParent && node.offsetParent != document.body) {
	        node = node.offsetParent;
	        y += node.offsetTop;
	    } return y;
	}


    var startY = currentYPosition();
    var stopY;
    if (evt.target == document.getElementsByClassName("back-to-top")[0].firstChild) {
		stopY = 0;
	}
	else {
    	stopY = elmYPosition(document.getElementById(evt.target.getAttribute("href").slice(1)));
    }
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 50);
    if (speed >= 40) speed = 40;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for (var i=startY; i>stopY; i-=step) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
	}
}
window.addEventListener('load', function () {	

	var worksSection = document.getElementsByClassName('works-target').item(0);
	var worksConstruction = new ConstructWorksSection(worksSection, worksList);
	
	var myPage = document.getElementsByClassName('page').item(0);
	var skills = document.getElementById('skills');
	var contacts = document.getElementById('contacts');
	var works = document.getElementsByClassName('works').item(0);
	var worksHeader = document.getElementsByClassName('works-header').item(0);
	var worksSection = document.getElementsByClassName('works-section').item(0);
	var myInfo = document.getElementsByClassName('my-info').item(0);
	var header = document.getElementsByTagName('header').item(0);
	var worksNameSection = document.getElementById('works');
	
	var backToTop = document.getElementsByClassName("back-to-top")[0];
	var headerLinks = document.getElementsByClassName("header-links")[0];
	headerLinks.onclick = makeScrolling;
	backToTop.onclick = makeScrolling;
	var didScroll = false;
	
	if (matchMedia) {
  		var mq = window.matchMedia("(max-width: 800px)");
  		mq.addListener(WidthChange);
  		WidthChange(mq);
	}
// media query change
	function WidthChange(mq) {
  		if (mq.matches) {
    // window width is less than 800px
    		myPage.appendChild(skills);
    		myPage.appendChild(contacts);
    		myInfo.appendChild(worksHeader);
    		myPage.insertBefore(header, myInfo);
    		works.insertBefore(worksNameSection, worksSection);
  		} 
  		else {
    // window width is greater than 800px
			myInfo.appendChild(skills);
			myInfo.appendChild(contacts);
			works.insertBefore(worksHeader, worksSection);
			header = header.parentNode.removeChild(header);
			worksNameSection = worksNameSection.parentNode.removeChild(worksNameSection);
			
  		}
	}
	
	window.onscroll = function() {
		didScroll = true;
  		var pageY = window.pageYOffset || document.documentElement.scrollTop;
  		var innerHeight = document.documentElement.clientHeight;
		if (pageY - innerHeight > 0) {
			backToTop.style.opacity = "1.0";
		}
		else{
			backToTop.style.opacity = "0.0";
		}
	};
	setInterval(function() {
    	if(didScroll) {
       		didScroll = false;
    	}
	}, 100);
}); 
