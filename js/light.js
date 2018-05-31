var himarea = document.getElementById("himarea");
var areaHimeria = himarea.getElementsByClassName("area")[0];

areaHimeria.onmouseover = function(event) {
  var target = event.target;
  if (target.classList.length == 3 ) {
	  var i = searchElementMass (event)[0];
	  var j = searchElementMass (event)[1];
	  
	  if (himarea.getElementsByClassName(i + "_" + j)[0].classList[3] == undefined){
		himarea.getElementsByClassName("cell-num")[i-1].style.background = "rgba(255, 26, 26, 0.55)";
	  	himarea.getElementsByClassName("cell-letter")[j-1].style.background = "rgba(255, 26, 26, 0.55)";
	}
	  

	  /*
	  for ( i; i>0; i--){
		  himarea.getElementsByClassName(i + "_" + j)[0].style.background = "rgba(255, 26, 26, 0.55)";
	  }
	  i = searchElementMass (event)[0];
	  j = searchElementMass (event)[1];
	  for (j; j>0; j--){
		  himarea.getElementsByClassName(i + "_" + j)[0].style.background = "rgba(255, 26, 26, 0.55)";
	  }
	  */
  };
};

areaHimeria.onmouseout = function(event) {
	var target = event.target;
if (target.classList.length >= 3 ) {
	var i = searchElementMass (event)[0];
	var j = searchElementMass (event)[1];
	
	himarea.getElementsByClassName("cell-num")[i-1].style.background = "";
	himarea.getElementsByClassName("cell-letter")[j-1].style.background = "";
};
	/*
	for ( i; i>0; i--){
		himarea.getElementsByClassName(i + "_" + j)[0].style.background = "";
	}
	i = searchElementMass (event)[0];
	j = searchElementMass (event)[1];
	for (j; j>0; j--){
		himarea.getElementsByClassName(i + "_" + j)[0].style.background = "";
	}
	*/
};
