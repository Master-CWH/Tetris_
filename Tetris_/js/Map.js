function Map(){
	this.code = [
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX"
	]
}

Map.prototype.render = function(){
	for(var i = 0 ; i < 20 ; i++){
		for(var j = 0 ; j < 12 ; j++){
			var char = this.code[i][3 + j];
			if(char != "□"){
				game.setClass(i , j , "b" + char);
			}
		}
	}
}
Map.prototype.check = function(row , col , blockCode){
	var cutSquare = [];
	for(var i = 0 ; i < 4 ; i++){
		cutSquare.push(this.code[row + i].substr(col + 3 , 4));
	}

	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(matrix(blockCode , i , j) == 1 && cutSquare[i][j] != "□"){
				return false;
			}
		}
	}
	return true;
}

Map.prototype.addDiedBlock = function(row , col , blockCode , color){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(matrix(blockCode , i , j) == 1){
				this.code[row + i] = changeChar(this.code[row + i] , col + j + 3 , color);
			}
		}
	}
}

Map.prototype.eliminate = function(){
	for(var i = 0 ; i < 20 ; i++){
		if(this.code[i].indexOf("□") == -1){
			this.code.splice(i , 1);
			this.code.unshift("XXX□□□□□□□□□□□□XXX");
		}
	}
}


function matrix(code , m , n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1;
}

function changeChar(str , n , newchar){
	return str.substr(0,n) + newchar + str.substr(n + 1);
}