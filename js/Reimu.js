function LevelReimu(game){
	this.imageurls = ["reimu.png",'reimu2.png','reimu3.png']

	this.images = []
	this.imagesLoaded = 0;

	for(var i=0;i<this.imageurls.length;i++){
		this.images.push(new Image());
		this.images[i].src = "resources/" + this.imageurls[i];
		this.images[i].onload = function(){
			this.imagesLoaded+= 1;
			if(this.imagesLoaded >= this.imageurls.length){
				this.loaded = true;
			}
		}.bind(this);
	}
	this.loaded = false;

	this.x = 0;
	this.y = game.gameHeight - this.images[0].height-50;

	this.imageno = 0;
	this.timer = 0;

}
LevelReimu.prototype.draw = function(game){
	this.x = game.gameWidth - this.images[0].width;
	this.y = game.gameHeight-this.images[0].height-50;
	if(this.imageno == 0){
		game.drawSprite(this.images[0],this.x, this.y);
	}else if(this.imageno == 1){
		game.drawSprite(this.images[1],this.x, this.y);
	}else if(this.imageno == 2){
		game.drawSprite(this.images[2],this.x, this.y);
	}else{
		game.drawSprite(this.images[1],this.x, this.y);
	}
}

LevelReimu.prototype.tick = function(delta){
	this.timer += delta;
	if(this.timer > 400){ //in ms
		this.timer -= 400;
		this.imageno = (this.imageno +1 ) % 2;
	}	
}
