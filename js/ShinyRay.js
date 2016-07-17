ShinyRay.prototype.images = [];
ShinyRay.prototype.loaded = false;
ShinyRay.prototype.imagesLoaded = 0;
ShinyRay.prototype.imageurls = ["shiny2.png"];

ShinyRay.prototype.numRays = 0;

//preload shiny ray images
for(var i=0;i<ShinyRay.prototype.imageurls.length;i++){
	ShinyRay.prototype.images.push(new Image());
	ShinyRay.prototype.images[i].src = "resources/" + ShinyRay.prototype.imageurls[i];
	ShinyRay.prototype.images[i].onload = function(){
		ShinyRay.prototype.imagesLoaded+= 1;
		if(ShinyRay.prototype.imagesLoaded >= ShinyRay.prototype.imageurls.length){
			ShinyRay.prototype.loaded = true;
		}
	}
}

function ShinyRay(game){

	if(!this.loaded){
		for(var i=0;i<this.imageurls.length;i++){
			ShinyRay.prototype.images.push(new Image());
			ShinyRay.prototype.images[i].src = "resources/" + ShinyRay.prototype.imageurls[i];
			ShinyRay.prototype.images[i].onload = function(){
				ShinyRay.prototype.imagesLoaded+= 1;
				if(ShinyRay.prototype.imagesLoaded >= ShinyRay.prototype.imageurls.length){
					ShinyRay.prototype.loaded = true;
				}
			}.bind(this);
		}
	}

	this.x = 0;
	this.y = game.gameHeight-this.images[0].height-50;

	this.imgIndex = 0; //parametrize?

	this.timer = 0;
	this.appearAnimTimer = 0;

	this.rotation = Math.random()*5;
	//random twiddling to make each ray distinct
	this.rotateSpeed = (0.2 + 0.05*((this.numRays+1)*3)%4) * ((this.numRays%2==0) ? 1 : -1);
	this.scale = 1.0;

	this.opacity = 0.0;

	ShinyRay.prototype.numRays++;
}
ShinyRay.prototype.draw = function(game){
	this.y = game.gameHeight-this.images[0].height-50;
	//wings
	
	//position
	game.ctx.save();
	game.ctx.translate(this.x-10,this.y);

	var rotatePoint = [this.images[this.imgIndex].width/2,this.images[this.imgIndex].height/2]; //x,y

	game.ctx.translate(rotatePoint[0],rotatePoint[1]);
	//The thing all this junk is for: rotate the image

	game.ctx.scale(this.scale,this.scale);
	game.ctx.globalAlpha = this.opacity;
	game.ctx.rotate(this.rotation*Math.PI/360);
	game.drawSprite(this.images[this.imgIndex],-rotatePoint[0],-rotatePoint[1]);
	game.ctx.restore();

}

ShinyRay.prototype.tick = function(delta){
	this.timer += delta;
	if(this.timer > 400){ //in ms
		this.timer -= 400;
	}	
	this.rotation+= this.rotateSpeed * delta;

	this.appearAnimTimer += delta;
	if(this.appearAnimTimer > 1000){
		this.timer += delta;
		this.opacity = 1.0;
	}else{
		this.opacity = 0.0 + 1.0 * (this.appearAnimTimer /1000) * (this.appearAnimTimer /1000);
	}
}
