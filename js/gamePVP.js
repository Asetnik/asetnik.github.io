"use strict";

var socket;
var map = ourmass;
var player = {
	login: "Pashka",
	type: "startGame",
	map: map
}
var player2; 

socket = new WebSocket("ws://192.168.137.79:9000");
    


var pvp = document.getElementById("pvp");
var himarea = document.getElementById("himarea");
var areaHimarea = himarea.getElementsByClassName("area")[0];
var ourarea = document.getElementById("ourarea");
var waitBlock = document.getElementsByClassName("waitPlayer")[0];
var cancel = document.getElementsByClassName("cancel")[0];
var rightArrow = document.getElementsByClassName("right-arrow")[0];
var leftArrow = document.getElementsByClassName("left-arrow")[0];
var ourName = document.getElementsByClassName("left-name")[0];
var himName = document.getElementsByClassName("right-name")[0];

cancel.addEventListener("click", function(){
	waitBlock.classList.remove("waitActive");
});


function searchElementMass (event){
	var str = event.target.classList[2];
	var hypen = str.indexOf("_");
	var i = str.slice(0, hypen);
	i = Number.parseInt(i);
	var j = str.slice(hypen+1);
	j = Number.parseInt(j);
	var ij = [];
	ij[0]=i;
	ij[1]=j;
	return ij;
}

var turn = true;

pvp.addEventListener('click',function(){
	
	var res = JSON.stringify(player);
	socket.send(res);
	
	waitBlock.classList.add("waitActive"); //ожидаем игрока
	
	
});

	/* наш выстрел*/
function ourShot (event){
	
	if (event.target.classList.length < 3) {return false;}
	if (!turn) {alert("Сейчас очередь другого игрока, пожалуйста подождите пока он походит ;)"); return false; }
	/*************************************************************************************************************************** PROTESTI MEN9 BITCH*/ 
	if (event.target.classList[3] == "killed" || event.target.classList[3]== "miss" || event.target.classList[3] == "injured"){
		alert("(ง ͠° ͟ل͜ ͡°)ง   Нет смысла стрелять в одну клетку");
		return;
	}
	
	var xy = searchElementMass(event);
	var shot = {
		type: "shot",
		x: xy[0],
		y: xy[1]
	}
	var res = JSON.stringify(shot);
	socket.send(res);
}
	
	
	/* сообщение от сервера */
socket.onmessage = function(event){
	
	var msg = event.data;
	msg = JSON.parse(msg);
	
	if (msg.type === "startGame"){
		player2 = msg.player;
		turn = msg.who;
		startGame(event);
	}
		
	if (msg.type === "myShot"){
		var x = msg.x;
		var y = msg.y;
		var typeShot = msg.isShot;
		if(typeShot == 0) {
			turn = false;
			//alert("промазал");
			printMiss(areaHimarea,x,y);
			printArrow(turn);
			return;
		}
		if(typeShot == 1) {
			//alert("ранил");
			printInjured(areaHimarea,x,y);
		}
		if(typeShot == 2) {
			//alert("убил");
			printMissIfInjured(areaHimarea, x, y);
			printKill(areaHimarea, x, y);
		}
	}
		
	if (msg.type === "shot"){
		var x = msg.x;
		var y = msg.y;
		var typeShot = msg.isShot;
		if(typeShot == 0) {
			turn = true; 
			//alert("cоперник промазал");
			printMiss(ourarea,x,y);
			printArrow(turn);
			return;
		}
		if(typeShot == 1) {
			//alert("cоперник ранил");
			printInjured(ourarea,x,y);
		}
		if(typeShot == 2) {
			//alert("cоперник убил");
			printMissIfInjured(ourarea, x, y);
			printKill(ourarea, x, y);
		}
	}
	
}
	
	
function startGame (){
	waitBlock.classList.remove("waitActive"); //удаление модал окна
	document.getElementsByClassName("parking")[0].style.display = "none";
	himarea.style.display = "inline";
	printArrow(turn);
	
	ourName.style.display = "block";
	ourName.innerHTML= player.login;
	himName.style.display = "block";
	himName.innerHTML= player2;
		
	areaHimarea.addEventListener('click',ourShot);
}


function printArrow(turn){
	if (turn){
			rightArrow.style.display = "block";	
			leftArrow.style.display = "none";
		}
	else {
			rightArrow.style.display = "none";	
			leftArrow.style.display = "block";
		}
}


function printMiss (area, x, y) {
	area.getElementsByClassName(x + "_" + y)[0].classList.add("miss");
}

function printInjured (area, x, y) {
	if (area == areaHimarea) {
		area.getElementsByClassName(x + "_" + y)[0].classList.add("injured");
	}
	if (area == ourarea){
		ourarea.getElementsByClassName(x + "_" + y)[0].classList.remove("active");
		ourarea.getElementsByClassName(x + "_" + y)[0].classList.add("ourinjured");
	}
	printMissIfInjured(area, x, y);
}

function printMissIfInjured (area, x, y){
	
	y = y-1;
	
	if(area.getElementsByClassName(x-1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1 + "_" + y)[0].classList.add("miss");
	}
	
	if(area.getElementsByClassName(x+1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x+1 + "_" + y)[0].classList.add("miss");
	}
	
	y = y+2;
	
	if(area.getElementsByClassName(x+1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x+1 + "_" + y)[0].classList.add("miss");
	}
	if(area.getElementsByClassName(x-1 + "_" + y)[0] != undefined) {
		area.getElementsByClassName(x-1 + "_" + y)[0].classList.add("miss");
	}
}

function printKill (area, x , y ){
	
	var nameClassInjured;
	var nameClassKilled;
	
	if (area == areaHimarea) {
		nameClassInjured = "injured";
		nameClassKilled = "killed";
	}
	if (area == ourarea){
		nameClassInjured ="ourinjured";
		nameClassKilled = "ourkilled";
		area.getElementsByClassName(x + "_" + y)[0].classList.remove("active");
	}
	
	area.getElementsByClassName(x + "_" + y)[0].classList.remove(nameClassInjured);
	area.getElementsByClassName(x + "_" + y)[0].classList.add(nameClassKilled);
	
	// vverh
	if (x-1>0 && x-1<11){
		var object = area.getElementsByClassName(x-1 + "_" + y)[0];
		if ( object.classList[3] == nameClassInjured) {
			object.classList.remove(nameClassInjured);
			object.classList.add(nameClassKilled);
			printKill(area, x-1, y);
		}
		else if (object.classList[3] != "miss" && object.classList[3] != nameClassKilled) {
			object.classList.add("miss");
		}
	}
	//vniz
	if (x+1>0 && x+1<11){
		var object = area.getElementsByClassName(x+1 + "_" + y)[0];
		if ( object.classList[3] == nameClassInjured) {
			object.classList.remove(nameClassInjured);
			object.classList.add(nameClassKilled);
			printKill(area, x+1, y);
		}
		else if (object.classList[3] != "miss" && object.classList[3] != nameClassKilled) {
			object.classList.add("miss");
		}
	}
	//vlevo
	if (y-1>0 && y-1<11){
		
		var object = area.getElementsByClassName(x + "_" + Number.parseInt(y-1))[0];
		if ( object.classList[3] == nameClassInjured) {
			object.classList.remove(nameClassInjured);
			object.classList.add(nameClassKilled);
			printKill(area, x, y-1);
		}
		else if (object.classList[3] != "miss" && object.classList[3] != nameClassKilled) {
			object.classList.add("miss");
		}
	}
	//vpravo
	if (y+1>0 && y+1<11){
		
		var object = area.getElementsByClassName(x + "_" + Number.parseInt(y+1) )[0];
		if ( object.classList[3] == nameClassInjured) {
			object.classList.remove(nameClassInjured);
			object.classList.add(nameClassKilled);
			printKill(area, x, y+1);
		}
		else if (object.classList[3] != "miss" && object.classList[3] != nameClassKilled) {
			object.classList.add("miss");
		}
	}
}