Textbox.prototype.images = [];
Textbox.prototype.loaded = false;
Textbox.prototype.imagesLoaded = 0;
Textbox.prototype.imageurls = ["textbox.png", "textboxcirno.png","textboxreimu.png"];

function Textbox(speaker, text){
	this.speaker = speaker || ""; //speaker is either "cirno", "reimu", or "none";

	if(!this.loaded){
		for(var i=0;i<this.imageurls.length;i++){
			Textbox.prototype.images.push(new Image());
			Textbox.prototype.images[i].src = "resources/" + Textbox.prototype.imageurls[i];
			Textbox.prototype.images[i].onload = function(){
				Textbox.prototype.imagesLoaded+= 1;
				if(Textbox.prototype.imagesLoaded >= Textbox.prototype.imageurls.length){
					Textbox.prototype.loaded = true;
				}
			}.bind(this);
		}
	}

	this.timer = 0;
	this.appearAnimTimer = 0;

	this.currentDialogueLine = text || "Testing testing 123!\nI'd call that a pretty\ngood test.";
	this.currentlyDisplayed ="";

	this.currentChar = 0;

	this.active = true;

	this.x = 0;
	this.y = 50;

	this.textMarginLeft = 40;
	this.textMarginTop = 100;
	this.lineSpacing = 80;

	this.scaleFactor = 1.0;

	this.visible = true;
	this.done = false;
}
Textbox.prototype.draw = function(game){
	if(!this.visible)return;

	this.x = game.gameWidth/2 - this.images[0].width/2;
	this.y = 50;

	game.ctx.translate(this.x,this.y);

	//support shrinking effect
	game.ctx.save();
	game.ctx.translate(this.images[0].width/2,this.images[0].height/2);
	game.ctx.scale(this.scaleFactor,this.scaleFactor);

	var bgsprite = this.images[0];
	if(this.speaker == "cirno")bgsprite = this.images[1];
	if(this.speaker == "reimu")bgsprite = this.images[2];

	game.drawSprite(bgsprite,-this.images[0].width/2,-this.images[0].height/2);

	game.ctx.translate(-this.images[0].width/2,-this.images[0].height/2);

	//draw text
	game.ctx.font = "60px sans";
	game.ctx.fillStyle = "#333";
	game.ctx.lineWidth = 3;
	var lines = this.currentlyDisplayed.split("\n");
	for(var i=0;i<lines.length;i++){
		game.ctx.fillText(lines[i],this.textMarginLeft,this.textMarginTop + i * this.lineSpacing + 50);
	}

	game.ctx.restore();
}

Textbox.prototype.tick = function(delta){
	//show one character X ms after the next one
	var timeBeforeNextLetter = key.enter ? 10 : 50;

	if(this.timer > timeBeforeNextLetter && this.active && this.visible){ //in ms
		this.timer -= timeBeforeNextLetter;
		this.currentlyDisplayed += this.currentDialogueLine[this.currentChar];
		this.currentChar++;
		//Lines may be too wide; newlines must be inserted properly


		if(this.currentlyDisplayed == this.currentDialogueLine){
			//finished
			this.done = true;
			this.active = false;
		}else{
			//do a text beep effect
			if(this.currentDialogueLine[this.currentChar] != '.' && this.currentDialogueLine[this.currentChar] != '!' && this.currentDialogueLine[this.currentChar] != '?'){
				game.audio.play("speechblip.wav");
			}

		}
	}

	if(this.timer > 20000 && this.active){

	}

	this.appearAnimTimer += delta;
	if(this.appearAnimTimer > 200){
		this.timer += delta;
		this.scaleFactor = 1.0;
	}else{
		this.scaleFactor = 0.8 + 0.2 * (this.appearAnimTimer /200);
	}
}


