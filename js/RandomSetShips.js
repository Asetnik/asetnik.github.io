function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

function creatMas (){
	var n = 12, m = 12;
	var mas = [];
	for (var i = 0; i < m; i++){
		mas[i] = [];
    	for (var j = 0; j < n; j++){
        	mas[i][j] = 0;
		}}
	return mas;
}

var ourmass = creatMas();

function zeroingMas(mas){
	for (var i =0; i < 12; i++){
		for (var j=0; j <12; j++){
			mas[i][j]=0;
		}
	}
}

var cell = {
	x: 0,
	y: 0,
	newCell: function(){
		this.x = randomInteger(1,10);
		this.y = randomInteger(1,10);
	}
}

function settingShips(shipSize, mass){
	cell.newCell();
	var location = randomInteger(0,1);
	var check = testCell( cell, location, shipSize, mass );
	if (check == false) settingShips(shipSize, mass)
	else setShip(cell, location, shipSize, mass);
}

function testCell(cell, location, shipSize, mass){
	if ( mass[cell.x][cell.y] == 2 || mass[cell.x][cell.y] == 1 ) return false;
	switch(location){
		case 0:
			if (cell.x -1 + shipSize > 10) return false;
			for (var i = 1; i < shipSize; i++) {
				if (mass[cell.x+i][cell.y] == 2) 
				{
					return false;
				}
			};
		case 1:
			if (cell.y -1 + shipSize > 10 ) return false;
			for (var i = 1; i < shipSize; i++) {
				if (mass[cell.x][cell.y+i] == 2) 
				{
					return false;
				}
			};
	}
}

function setShip (cell, location, shipSize, mass){
	switch(location){
		case 0:
			for (var i = 0; i < shipSize; i++ ) 
			{
				mass[cell.x+i][cell.y] = 1;
			}
			mass[cell.x-1][cell.y] = 2;
			mass[cell.x+shipSize][cell.y] = 2;
			for (var i = -1; i <= shipSize; i++) {
				mass[cell.x+i][cell.y-1] = 2;
				mass[cell.x+i][cell.y+1] = 2;
			}
			break;
		case 1:
			for (var i = 0; i < shipSize; i++ ) 
			{
				mass[cell.x][cell.y+i] = 1;
			}
			mass[cell.x][cell.y-1] = 2;
			mass[cell.x][cell.y+shipSize] = 2;
			for (var i = -1; i <= shipSize; i++) {
				mass[cell.x-1][cell.y+i] = 2;
				mass[cell.x+1][cell.y+i] = 2;
			}
			break;
	}
}

function printOurShips (mass, name){
	for (var i = 1; i <= 10; i++){
    	for (var j = 1; j <= 10; j++){
        	if (mass[i][j] == 1)
				{
					var element = document.getElementById(name);
					element.getElementsByClassName(i+"_"+j)[0].classList.add("active");
				}
		}}
}

function delShip(mass){
		for (var i = 1; i <= 10; i++){
    	for (var j = 1; j <= 10; j++){
        	if (mass[i][j] ==1)
				{
					var elem = document.getElementsByClassName(i+"_"+j)[0];
					elem.classList.remove("active");
				}
		}}
}

var setRandomShips = document.getElementById("setRandomShips"); // объявление кнопки
setRandomShips.addEventListener('click',function(){ // назначение обработчика на данную кнопку, 
													// сработает при клике на элемент левой кнопкой мыши
	
	delShip(ourmass); 				// убираем прорисовку кораблей
	zeroingMas(ourmass); 			// обнуление массива с нашими кораблями
	
	settingShips(4, ourmass);		// утсановка 4-ёх палубника
	settingShips(3, ourmass);		// установка 3-ёх палубника
	settingShips(3, ourmass);		// установка 3-ёх палубника
	settingShips(2, ourmass);		// установка 2-ух палубника
	settingShips(2, ourmass);		// установка 2-ух палубника
	settingShips(2, ourmass);		// установка 2-ух палубника
	settingShips(1, ourmass);		// установка 1-но палубника
	settingShips(1, ourmass);		// установка 1-но палубника
	settingShips(1, ourmass);		// установка 1-но палубника
	settingShips(1, ourmass);		// установка 1-но палубника
	
	printOurShips(ourmass, "ourarea");		// отрисовка всех кораблей
	document.getElementsByClassName("all-ships")[0].style.display = "none";		// скрытие поля с кораблями
	document.getElementsByClassName("buttons")[0].style.paddingTop = "240px";	
	document.getElementById("ready").style.display = "block";		// отображение кнопки "в бой !"
	document.getElementById("pvp").style.display = "block";			// отображение кнопки "в бой онлайн !"
});

var clearShips = document.getElementById("clearShips");
clearShips.addEventListener('click',function(){
	delShip(ourmass);
	zeroingMas(ourmass);
	document.getElementsByClassName("all-ships")[0].style.display = "block";
	document.getElementsByClassName("buttons")[0].style.paddingTop = "0px";
	document.getElementById("ready").style.display = "none";
	document.getElementById("pvp").style.display = "none";
});


