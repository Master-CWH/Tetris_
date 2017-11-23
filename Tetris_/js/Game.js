function Game(){
	this.init();
	this.block = new Block();
	this.nextBlock = new Block();
	this.map = new Map();
	this.start();
	this.bindEvent();
}
Game.prototype.init = function(){
	this.dom = document.createElement("table");
	this.dom.style.float = "left";
	this.dom.style.marginRight = "10px";

	for(var i = 0 ; i < 20 ; i++){
		var tr = document.createElement("tr");
		for(var j = 0 ; j < 12 ; j++){
			var td = document.createElement("td");
			tr.appendChild(td);
		}
		this.dom.appendChild(tr);
	}
	document.getElementById("app").appendChild(this.dom);

	this.dom2 = document.createElement("table");
	this.dom2.style.float = "left";
	for(var i = 0 ; i < 4 ; i++){
		var tr = document.createElement("tr");
		for(var j = 0 ; j < 4 ; j++){
			var td = document.createElement("td");
			tr.appendChild(td);
		}
		this.dom2.appendChild(tr);
	}
	document.getElementById("app").appendChild(this.dom2);
}
Game.prototype.setClass = function(row,col,classname){
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = classname;
}
Game.prototype.clear = function(row,col,classname){
	for(var i = 0 ; i < 20 ; i++){
 		for(var j = 0 ; j < 12 ; j++){
 			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "";
 		}
 	}

 	for(var i = 0 ; i < 4 ; i++){
 		for(var j = 0 ; j < 4 ; j++){
 			this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "";
 		}
 	}
}
Game.prototype.renderNextBlock = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(matrix(this.nextBlock.code , i , j) == 1){
				this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "b" + this.nextBlock.typeNumber;
			}
		}
	}
}
Game.prototype.start = function(){
	var self = this;
	var f = 0;
	this.timer = setInterval(function(){
		f++;
		self.clear();
		f % 30 == 0 && self.block.update();
		self.block.render();
		self.map.render();
		self.renderNextBlock();
	},20);
}
Game.prototype.bindEvent = function(){
	var self = this;
	document.onkeydown = function(event){
		if(event.keyCode == 37){
			self.block.moveLeft();
		}else if(event.keyCode == 39){
			self.block.moveRight();
		}else if(event.keyCode == 38){
			self.block.rotate();
		}else if(event.keyCode == 40){
			self.block.gotoBottom();
		}
	}
}

function matrix(code , m , n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1
}