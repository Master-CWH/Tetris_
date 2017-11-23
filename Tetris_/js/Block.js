function Block(){
	var alltypes = ["S","Z","J","L","O","T","I"];
	this.typeNumber = parseInt(Math.random() * alltypes.length);
	this.typeChar = alltypes[this.typeNumber];
	var allcodes = {
		"S" : [0x6c00 , 0x8c40],
		"Z"	: [0xc600 , 0x4c80],
		"J" : [0x44c0 , 0x8e00 , 0x6440 , 0x0e20],
		"L" : [0x4460 , 0x0e80 , 0xc440 , 0x2e00],
		"O" : [0x6600],
		"T" : [0x0e40 , 0x4c40 , 0x4e00 , 0x4640],
		"I" : [0x4444 , 0x0f00]
	}
	this.codes = allcodes[this.typeChar];
	this.directionsAmount = this.codes.length;
	this.direction = parseInt(Math.random() * this.directionsAmount);
	this.code = this.codes[this.direction];
	this.row = 0;
	this.col = 4;

}
Block.prototype.render = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(matrix(this.code , i , j) == 1){
				game.setClass(i + this.row , j + this.col, "b" + this.typeNumber);
			}
		}
	}

}
Block.prototype.update = function(){
	if(game.map.check(this.row + 1 , this.col , this.code)){
		this.row++;
	}else{
		game.map.addDiedBlock(this.row , this.col , this.code , this.typeNumber);
		game.block = game.nextBlock;
		game.nextBlock = new Block();
		game.map.eliminate();
		if(!game.map.check(0 , 4 , this.code)){
			alert("Game over");
			clearInterval(game.timer);
		}
	}
}

Block.prototype.moveLeft = function(){
	if(game.map.check(this.row , this.col - 1, this.code)){
		this.col --;
	}
}

Block.prototype.moveRight = function(){
	if(game.map.check(this.row , this.col + 1, this.code)){
		this.col ++;
	}
}
Block.prototype.rotate = function(){
	this.direction ++;
	if(this.direction > this.directionsAmount - 1){
		this.direction = 0;
	}
	var nextCode = this.codes[this.direction];
	if(game.map.check(this.row , this.col , nextCode)){
		this.code = nextCode;
	}
}

Block.prototype.gotoBottom = function(){
	var i = 0;
	while(game.map.check(this.row + i, this.col , this.code)){
		i++;
	}

	this.row = this.row + i - 1;
}

function matrix(code , m , n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1
}