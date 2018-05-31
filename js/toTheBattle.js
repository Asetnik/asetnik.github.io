var ready = document.getElementsByClassName("ready")[0];
var himarea = document.getElementById("himarea");
var ourarea = document.getElementById("ourarea");

var ourName = document.getElementsByClassName("left-name")[0];
var himName = document.getElementsByClassName("right-name")[0];

ready.addEventListener('click',function(){
	document.getElementsByClassName("parking")[0].style.display = "none";
	himarea.style.display = "inline";
	
	ourName.style.display = "block";
	ourName.innerHTML="Ваши корабли";
	himName.style.display = "block";
	himName.innerHTML="Корабли бота";
	
	gameBot();
});



function gameBot(){
var himmass = creatMas();

function setHimShips(){
	settingShips(4, himmass);
	settingShips(3, himmass);
	settingShips(3, himmass);
	settingShips(2, himmass);
	settingShips(2, himmass);
	settingShips(2, himmass);
	settingShips(1, himmass);
	settingShips(1, himmass);
	settingShips(1, himmass);
	settingShips(1, himmass);
}
	setHimShips();

var ln = 0;
var canShoot = [];
for (var i =1; i<=10; i++){
	for(var j =1; j<=10; j++){
		canShoot[ln]= i+"_"+j;
		ln++;
	}
}

var numbHimShip = 20;
var numbOurShip = 20;

var turn = true; // переменная отвечающая за то чей сейчас код

himarea.addEventListener('click',function(event){
	
	if (!turn) {
		return false;
	}
	if (event.target.classList.length < 3) return false;
	var i = searchElementMass (event)[0];
	var j = searchElementMass (event)[1];
	if (himarea.getElementsByClassName(i + "_" + j)[0].classList[3] == "killed" || himarea.getElementsByClassName(i + "_" + j)[0].classList[3]== "miss" || himarea.getElementsByClassName(i + "_" + j)[0].classList[3] == "injured"){
		alert("(ง ͠° ͟ل͜ ͡°)ง   Нет смысла стрелять в одну клетку");
		return false; // чтобы не минусовались корабли
	}
	if (himmass[i][j] == 1) {
		himarea.getElementsByClassName(i + "_" + j)[0].classList.add("injured");
		himmass[i][j] = 3;
		painting (i,j, himmass, himarea);
		numbHimShip --;
		if (numbHimShip == 0) {
			alert ("\\ (•◡•) /  С победой!");
			return false;
		}
		turn = true;
	}else {
		himarea.getElementsByClassName(i + "_" + j)[0].classList.add("miss");
		turn = false;
		while(!turn) bot(ourmass);
	}
});


function delElemMas(mass, id){
		var buf = mass[mass.length-1];
		mass[mass.length-1] = mass[id];
		mass[id] = buf;
		mass.pop();
	}


function bot(ourmass){
	
	var shootCell = randomInteger(0, canShoot.length-1);
	
	var str = canShoot[shootCell];
			var hypen = str.indexOf("_");
			var x = str.slice(0, hypen)-1+1;
			var y = str.slice(hypen+1)-1+1;
	
	delElemMas(canShoot, shootCell);
	
	
	switch (ourmass[x][y]){
		case 0:
			turn = true;
			ourarea.getElementsByClassName(x + "_" + y)[0].classList.add("miss");
			break;
		case 2:
			turn = true;
			
			ourarea.getElementsByClassName(x + "_" + y)[0].classList.add("miss");
			break;
		case 3:
			return turn;
			break;
		case 1:
			ourarea.getElementsByClassName(x + "_" + y)[0].classList.remove("active");
			ourarea.getElementsByClassName(x + "_" + y)[0].classList.add("ourinjured");
			ourmass[x][y] = 3;
			painting (x,y, ourmass, ourarea);
			numbOurShip --;
			if (numbOurShip == 0) {
			alert ("(ಠ╭╮ಠ)   Ничего страшного, выиграешь в следующий раз ");
				turn = true;
				return turn;
			}
			return turn;
			break;
		default:
			break;
	}
	return turn;
}







function painting(x,y, mass, area){
	
	y = y-1;
	
	if(area.getElementsByClassName(x-1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1 + "_" + y)[0].classList.add("miss");
		
		if (area == ourarea) {
		
		var index = canShoot.indexOf(x-1+"_"+y);
		if (index != -1){
				delElemMas(canShoot, index);
			}
		}
		
	}
	if(area.getElementsByClassName(x-1+2 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1+2 + "_" + y)[0].classList.add("miss");
		
		if (area == ourarea) {
		var index = canShoot.indexOf(x-1+2+"_"+y);
		if (index != -1){
				delElemMas(canShoot, index);
			}
		}
	}
	
	y = y+2;
	
	if(area.getElementsByClassName(x-1+2 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1+2 + "_" + y)[0].classList.add("miss");
		
		if (area == ourarea) {
		var index = canShoot.indexOf(x-1+2+"_"+y);
		if (index != -1){
				delElemMas(canShoot, index);
			}
		}
	}
	if(area.getElementsByClassName(x-1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1 + "_" + y)[0].classList.add("miss");
		
		if (area == ourarea) {
		var index = canShoot.indexOf(x-1+"_"+y);
		if (index != -1){
				delElemMas(canShoot, index);
			}
		}
	}
	
	var i=x-1+1, j=y-1, count=0;
	
	var mis = [];
	var injured = [];
	injured.push(i + '_' + j);
	//vverh
	for (var x = 1; x <=4; x++){
		if (mass[i-x][j] == 3){
			injured.push(i-x + '_' + j);
		}
		if (mass[i-x][j] == 2){
			count++;
			mis.push(i-x + '_' + j);
			break;
		}
		if (mass[i-x][j] == 1){
			break;
		}
	}
	//vhiz
	for (var x = 1; x <=4; x++){
		if (mass[i+x][j] == 3){
			injured.push(i-1+x+1 + '_' + j);
		}
		if (mass[i+x][j] == 2){
			count++;
			mis.push(i-1+x+1 + '_' + j);
			break;
		}
		if (mass[i+x][j] == 1){
			break;
		}
	}
	//flefo
	for (var x = 1; x <=4; x++){
		if (mass[i][j-x] == 3){
			var jj=j-x;
			injured.push(i + '_' + jj);
		}
		if (mass[i][j-x] == 2){
			count++;
			var jj=j-x;
			mis.push(i + '_' + jj);
			break;
		}
		if (mass[i][j-x] == 1){
			break;
		}
	}
	//fprafo
	for (var x = 1; x <=4; x++){
		if (mass[i][j+x] == 3){
			var jj=j-1+x+1;
			injured.push(i + '_' + jj);
		}
		if (mass[i][j+x] == 2){
			count++;
			var jj=j-1+x+1;
			mis.push(i + '_' + jj);
			break;
		}
		if (mass[i][j+x] == 1){
			break;
		}
	}
	
	if (count == 4) {
		if(area.getElementsByClassName(mis[0])[0] != undefined) 
		{
			area.getElementsByClassName(mis[0])[0].classList.add("miss");
			
			if (area == ourarea) {
			var index = canShoot.indexOf(mis[0]);
			if (index != -1){
				delElemMas(canShoot, index);
			}
			}
			
		}
		if(area.getElementsByClassName(mis[1])[0] != undefined) {
			area.getElementsByClassName(mis[1])[0].classList.add("miss");
			if (area == ourarea) {
			var index = canShoot.indexOf(mis[1]);
			if (index != -1){
				delElemMas(canShoot, index);
			}
			}
			
		}
		if(area.getElementsByClassName(mis[2])[0] != undefined) {
			area.getElementsByClassName(mis[2])[0].classList.add("miss");
			if (area == ourarea) {
			
			
			var index = canShoot.indexOf(mis[2]);
			if (index != -1){
				delElemMas(canShoot, index);
			}
			}
			
		}
		if(area.getElementsByClassName(mis[3])[0] != undefined) {
			area.getElementsByClassName(mis[3])[0].classList.add("miss");
			if (area == ourarea) {
			
			
			var index = canShoot.indexOf(mis[3]);
			if (index != -1){
				delElemMas(canShoot, index);
			}
			
			}
		}
		
		if (area == himarea) {
			for (var i = 0; i < injured.length; i++){
				area.getElementsByClassName(injured[i])[0].classList.remove("injured");
				area.getElementsByClassName(injured[i])[0].classList.add("killed");
		}
		}
		if (area == ourarea) {
			for (var i = 0; i < injured.length; i++){
				area.getElementsByClassName(injured[i])[0].classList.remove("ourinjured");
				area.getElementsByClassName(injured[i])[0].classList.add("ourkilled");
		}
		}		
	}
}

}

function searchElementMass (event){
	
	var str = event.target.classList[2];
	var hypen = str.indexOf("_");
	var i = str.slice(0, hypen);
	var j = str.slice(hypen+1);
	var ij = [];
	ij[0]=i;
	ij[1]=j;
	return ij;
}