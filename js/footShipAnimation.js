var ship = document.getElementsByClassName("foot-ship")[0];
var start = Date.now();
var timer = setInterval(function() {
	var timePassed = Date.now() - start;
	ship.style.left = timePassed * (document.documentElement.clientWidth - ship.width*1.1)  / 9000 + 'px';
	if (timePassed > 9000) { 
		clearInterval(timer);
		ship.style.display = "none";
	};
}, 20);
