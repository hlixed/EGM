function LevelCirno(game){
	this.imageurls = ["cirno.png","cirno2.png","wings1.png","wingsultrablur.png","wings2.png",'spellcard.png','cirnoconcentrate.png']

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
	this.y = game.gameHeight-this.images[0].height-50;

	this.imageno = 0;
	this.timer = 0;

	this.wingRotation = 0;
	this.rotateSpeed = 10.0;

	this.wingsRotating = false;

	this.spellCardTimer = 0;

}
LevelCirno.prototype.beginWingRotation = function(){
	this.wingsRotating = true;
}
LevelCirno.prototype.draw = function(game){
	//variables for the portrait animation
	var slideTime = 1000;
	var fadeTime = 300;

	this.y = game.gameHeight-this.images[0].height-50;
	//wings

	//all this context mucking is so the wings can rotate

	
	var wingImageIndex = 2;
	if(this.wingsRotating){
		//choose which picture to use
		if(this.rotateSpeed < 30){
			wingImageIndex = 2;
		}else if(this.rotateSpeed < 50){
			wingImageIndex = 4;
		}else{
			//after rotating up to speed, switch to a more swooshy picture
			wingImageIndex = 3;
		}
	}
	
	//position
	game.ctx.save();
	if(this.imageno == 0){
		game.ctx.translate(this.x-10,this.y);
	}else{
		game.ctx.translate(this.x-10,this.y+10);
	}

	var rotatePoint = [167,197]; //x,y

	game.ctx.translate(rotatePoint[0],rotatePoint[1]);
	//The thing all this junk is for: rotate the wings
	game.ctx.scale(0.7,1.0);
	game.ctx.rotate(this.wingRotation*Math.PI/360);
	game.drawSprite(this.images[wingImageIndex],-rotatePoint[0],-rotatePoint[1]);
	game.ctx.restore();

	//body
	if(this.wingsRotating && this.spellCardTimer > slideTime){
		game.drawSprite(this.images[6],this.x, this.y);
	}else if(this.imageno == 0){
		game.drawSprite(this.images[0],this.x, this.y);
	}else{
		game.drawSprite(this.images[1],this.x, this.y);
	}

	//show a cirno picture at the beginning of the wing circle animation
	if(this.spellCardTimer > 0 && this.spellCardTimer < slideTime + fadeTime){
		
		game.ctx.save();

		var scale = 3;
		var alpha = 0.6;

		//fadein
		if(this.spellCardTimer < 200){
			alpha = 0.6*(this.spellCardTimer)/200;
		}


		if(this.spellCardTimer < slideTime){
			//slide to the right
			game.ctx.translate(150 - 150 * (slideTime - this.spellCardTimer)*(slideTime - this.spellCardTimer)/slideTime/slideTime,0);
		}else{
			//fadeout
			scale = 3.0 +(this.spellCardTimer-slideTime)/20;
			alpha = 0.6 - 0.6*(this.spellCardTimer-slideTime)/fadeTime;
			game.ctx.translate(150,0);
		}

		//first, a red background
		game.ctx.fillStyle = "rgba(255,0,0,"+alpha+")";
		game.ctx.fillRect(-150,0,game.gameWidth+150,game.gameHeight);

		//the big cirno
		game.ctx.translate(0,300);
		game.ctx.translate(this.images[0].width/2,this.images[0].height/2);
		game.ctx.scale(scale,scale);
		game.ctx.globalAlpha = alpha;
		game.drawSprite(this.images[0],-this.images[0].width/2,-this.images[0].height/2);

		game.ctx.restore();
		/*
		//draw name of card
		game.ctx.globalAlpha = alpha;
		game.drawSprite(this.images[5],10,700);*/

	}
}

LevelCirno.prototype.tick = function(delta){
	this.timer += delta;
	if(this.timer > 400){ //in ms
		this.timer -= 400;
		this.imageno = (this.imageno +1 ) % 2
	}	

	if(this.wingsRotating){
		this.wingRotation+= this.rotateSpeed * delta;
		if(this.rotateSpeed<50){
			this.rotateSpeed += 0.2;
		}
		this.spellCardTimer += delta;
	}
}
