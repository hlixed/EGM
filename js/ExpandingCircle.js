ExpandingCircle.prototype.images = [];
ExpandingCircle.prototype.loaded = false;
ExpandingCircle.prototype.imagesLoaded = 0;
ExpandingCircle.prototype.imageurls = [""];

ExpandingCircle.prototype.numRays = 0;

function ExpandingCircle(game){

	if(!this.loaded){
		for(var i=0;i<this.imageurls.length;i++){
			ExpandingCircle.prototype.images.push(new Image());
			ExpandingCircle.prototype.images[i].src = "resources/" + ExpandingCircle.prototype.imageurls[i];
			ExpandingCircle.prototype.images[i].onload = function(){
				ExpandingCircle.prototype.imagesLoaded+= 1;
				if(ExpandingCircle.prototype.imagesLoaded >= ExpandingCircle.prototype.imageurls.length){
					ExpandingCircle.prototype.loaded = true;
				}
			}.bind(this);
		}
	}



	this.imgIndex = 0; //parametrize?

	this.timer = 0;
	this.appearAnimTimer = 0;

	this.rotation = 0;
	//random twiddling to make each ray distinct
	this.rotateSpeed = 0.2;
	this.scale = 1.0;

	this.opacity = 0.0;

	ExpandingCircle.prototype.numRays++;
}
ExpandingCircle.prototype.draw = function(game){
	this.x = 250;
	this.y = game.gameHeight-300+70;
	
	//position
	game.ctx.save();
	game.ctx.translate(this.x-10,this.y);

	//var rotatePoint = [this.images[this.imgIndex].width/2,this.images[this.imgIndex].height/2]; //x,y
	var rotatePoint = [150,0];

	game.ctx.translate(rotatePoint[0],rotatePoint[1]);
	//The thing all this junk is for: rotate the image

	//game.ctx.scale(this.scale,this.scale);
	game.ctx.globalAlpha = this.opacity;
	//game.ctx.rotate(this.rotation*Math.PI/360);
	//game.drawSprite(this.images[this.imgIndex],-rotatePoint[0],-rotatePoint[1]);
	game.drawCircle(-rotatePoint[0],-rotatePoint[1],this.scale,"#eef")
	//game.drawCircle(500,500,this.scale,"#aaf")
	game.ctx.restore();

}

ExpandingCircle.prototype.tick = function(delta){
	this.timer += delta;
	if(this.timer > 400){ //in ms
		this.timer -= 400;
	}	
	this.rotation+= this.rotateSpeed * delta;

	this.appearAnimTimer += delta;
	if(this.appearAnimTimer > 1000){
		this.timer += delta;
		this.opacity = 0.0;
	}else{
		this.opacity = 0.7 - 0.7 * (this.appearAnimTimer /1000) * (this.appearAnimTimer /1000);
	}

	this.scale += delta * (this.scale - 300);
}
