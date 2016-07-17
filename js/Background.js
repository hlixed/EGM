function Background(game){
	this.imageurls = ["background.png"]

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

}
Background.prototype.draw = function(game){
	game.drawSprite(this.images[0],0,0);
}
