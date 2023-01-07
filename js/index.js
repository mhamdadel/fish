var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ch = canvas.height;
var cw = canvas.width;
var c = canvas.getContext("2d");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var init = requestAnimationFrame(start);
player1 = new Player(cw * .1, ch * 2 / 3, '1');
let randomEnemeySize = Math.floor((Math.random() * player1.size * 2) + 1);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;

let callDown = 0;
let Enemies = [];
Enemies.push(new Enemey(-player1.size, 200, 1, randomEnemeySize));

function start() {
	clear();
	renderBackground();
	checkKeyboardStatus();
	checkPlayersBounds();
	checkPlayers_BallCollision();
	movePlayers();
	renderPlayers();
	renderEnemies();
	enemeyMovement();

	requestAnimationFrame(start);
}

function Player(x, y, name) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.size = cw * .015;
	this.xVel = 0;
	this.yVel = 0;
	this.score = 0;
	this.accel = .5;
	this.decel = .5;
	this.maxSpeed = 7;
}

function Enemey(x, y, dir, size) {
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.size = size;
}

function reset() {

	var score1 = player1.score;
	var out;

	player1 = new Player(cw * .1, ch * 2 / 3, '1');
	player1.score = score1;

	wDown = false;
	sDown = false;
	aDown = false;
	dDown = false;
}

function movePlayers() {
	player1.x += player1.xVel;
	player1.y += player1.yVel;
}

function checkPlayers_BallCollision() {
	//between players and themselfs player 1
	
	for (const enemey of Enemies) {
		var p1_p2_distance = getDistance(player1.x, player1.y, enemey.x, enemey.y) - player1.size - enemey.size;
		if (p1_p2_distance < 0) {
			collide(player1, enemey);
		}
	}
	
}

function collide(cir1, cir2) {

	if (cir1.size > cir2.size){
		//Enemies.find(en => en === Enemies[0]
		Enemies.splice(Enemies.indexOf(cir2));
	}else if (cir1.size < cir2.size){
		//Enemies.splice(Enemies.indexOf(cir2));
		endGame = 1;
	}
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function checkPlayersBounds() {
	if (player1.x + player1.size > canvas.width) {
		player1.x = canvas.width - player1.size;
		player1.xVel *= -0.5;
	}
	if (player1.x - player1.size < 0) {
		player1.x = 0 + player1.size;
		player1.xVel *= -0.5;
	}
	if (player1.y + player1.size > canvas.height) {
		player1.y = canvas.height - player1.size;
		player1.yVel *= -0.5;
	}
	if (player1.y - player1.size < 0) {
		player1.y = 0 + player1.size;
		player1.yVel *= -0.5;
	}
}

function checkKeyboardStatus() {
	if (wDown) {
		if (player1.yVel > -player1.maxSpeed) {
			player1.yVel -= player1.accel;
		} else {
			player1.yVel = -player1.maxSpeed;
		}
	} else {
		if (player1.yVel < 0) {
			player1.yVel += player1.decel;
			if (player1.yVel > 0) player1.yVel = 0;
		}
	}
	if (sDown) {
		if (player1.yVel < player1.maxSpeed) {
			player1.yVel += player1.accel;
		} else {
			player1.yVel = player1.maxSpeed;
		}
	} else {
		if (player1.yVel > 0) {
			player1.yVel -= player1.decel;
			if (player1.yVel < 0) player1.yVel = 0;
		}
	}
	if (aDown) {
		if (player1.xVel > -player1.maxSpeed) {
			player1.xVel -= player1.accel;
		} else {
			player1.xVel = -player1.maxSpeed;
		}
	} else {
		if (player1.xVel < 0) {
			player1.xVel += player1.decel;
			if (player1.xVel > 0) player1.xVel = 0;
		}
	}
	if (dDown) {
		if (player1.xVel < player1.maxSpeed) {
			player1.xVel += player1.accel;
		} else {
			player1.xVel = player1.maxSpeed;
		}
	} else {
		if (player1.xVel > 0) {
			player1.xVel -= player1.decel;
			if (player1.xVel < 0) player1.xVel = 0;
		}
	}

	document.onkeydown = function (e) {
		if (e.keyCode === 87) {
			wDown = true;
		}
		if (e.keyCode === 65) {
			aDown = true;
		}
		if (e.keyCode === 68) {
			dDown = true;
		}
		if (e.keyCode === 83) {
			sDown = true;
		}
		if (e.keyCode === 70) {
			fDown = true;
		}
	}

	document.onkeyup = function (e) {
		if (e.keyCode === 87) {
			wDown = false;
		}
		if (e.keyCode === 65) {
			aDown = false;
		}
		if (e.keyCode === 68) {
			dDown = false;
		}
		if (e.keyCode === 83) {
			sDown = false;
		}
		if (e.keyCode === 70) {
			fDown = false;
		}
	}
}


function enemeyMovement(){
	for (let enemey of Enemies) {
		enemey.x += 5;
	}
}

function renderPlayers() {
	c.save();
	c.fillStyle = "black";
	c.beginPath();
	c.arc(player1.x, player1.y, player1.size, 0, Math.PI * 2);
	c.fill();
	c.closePath();
	c.restore();
}

function renderEnemies() {
	for (let enemey of Enemies) {
		c.save();
		c.fillStyle = "red";
		c.beginPath();
		c.arc(enemey.x, enemey.y, enemey.size, 0, Math.PI * 2);
		c.fill();
		c.closePath();
		c.restore();
	}
}

function renderBackground() {
	c.save();
	c.fillStyle = "#1ca7d0";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.lineWidth = 10;
	c.stroke();
	c.closePath();
	c.restore();
}

function clear() {
	c.clearRect(0, 0, canvas.width, canvas.height);
}