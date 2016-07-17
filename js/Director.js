function Director(){
	this.script = [['There you are!', 'cirno'],
['Cirno? Not you again.','reimu'],
['I challenge you, Reimu! \nI\'ve been training hard,\nand I\'ve pushed my \nabilities to the limit!','cirno'],
['I can freeze everything \nnow!','cirno'],
['Can we get this over \nwith? I\'m not in the \nmood for games now.','reimu'],
['Yeah! Just you watch; \nI\'m going to freeze \nyou and everything else\naround!','cirno'],
['All I\'ve gotta do \nis press <space> ...','cirno'],
	];

	this.script2 = [
		["Well?",'reimu'],
		["I don't see anything \nthat looks frozen.",'reimu'],
		["Well... \nI just haven't pressed\n<space> yet!",'cirno'],
		["Pressed what?",'reimu'],
		["The <space> button!\nWatch!",'cirno'],
	];
	if(window.localStorage['cirnofrozen'] === undefined){
		//no changes
	}else if(window.localStorage['cirnofrozen'] == "1"){
		//already played
			this.script = [["Ha! Did you see that?",'cirno'],
		['See what?','reimu'],
		['It was just a few \nseconds ago! I was \nstanding right here and \nyou were all frozen!','cirno'],
		['I didn\'t see anything.\nYou just got here, Cirno.','reimu'],
		["Huh? No I didn't! I just \nfroze everything, right \nin front of you!",'cirno'],
		["I didn't see you do \nanything.",'reimu'],
		["You just flew up\nto me and started \ntalking nonsense. I \ndidn't see anything\nelse.",'reimu'],
		["Yes you did! I pressed \n<space> to activate it\n and everything!",'cirno']
		];
	}
	else if(window.localStorage['cirnofrozen'] == "2"){
		//already played
			this.script = [["Did you see it this time?",'cirno'],
		['See what?','reimu'],
		['Ugh! You missed it \nAGAIN? How do you \nforget being trapped in\nsolid ice?','cirno'],
		['Solid ice? There\'s\nnothing here but snow.','reimu'],
		["Nuh-uh. I'm not going \nthrough this again.\nI pressed <space> \ntwice now.",'cirno'],
		["If you don't want to \nadmit defeat, that's \nyour problem.",'cirno'],
		["I'll gladly admit when \nyou're defeated.",'reimu'],
		["Not if I press <space> \nbefore you!",'cirno']
		];

			this.script2 = [["Well?",'reimu'],
		["I don't see anything \nthat looks frozen.",'reimu'],
		["Well, you should have\nlooked last time I \npressed <space>, then!",'cirno']];
	}else if(window.localStorage['cirnostarted'] == "3" || window.localStorage['cirnofrozen'] == '3'){
		this.script = [["You didn't see it, did \nyou?",'cirno'],
		['See what?','reimu'],
		["Me pressing the \n<space> button!",'cirno'],
		["Space... button?",'reimu'],
		["No, it's called\nsomething else...\nWhat was it again?\nA spacerod?",'cirno'],
		["You can't just go\naround pressing space.",'reimu'],
		['You\'d die if you tried \nto fly that high.\nEven an idiot like\nyou should know that.','reimu'],
		['Nuh-uh! Maybe I\'ll \nprove it to you by \npressing <space> now!','cirno']];

		this.script2 = [['Didn\'t you fly up to\nthe moon a while ago,\nthough?','cirno'],
		["That was different.","reimu"],
		["Maybe you're the\nreal idiot, then!",'cirno'],
		["...The only idiot here\nis a little fairy who\ndoesn't quite know \nwhen to go away.",'reimu'],
		];
	}else{
		this.script = [["You didn't see it\nagain.",'cirno'],
		['See what?','reimu'],
		["Exactly! It's like\nyou don't remember\nanything at all!",'cirno'],
		["I remember enough to \nknow that you're a pain.",'reimu'],
		['Maybe there\'s some \nyoukai with forgetting \npowers around.','cirno'],
		['How many times do I\nhave to press <space>\nbefore you see it?','cirno']];

		this.script2 = [["Maybe I'll go find\nthat youkai later today.",'cirno'],
		["...after I'm done\nstanding here.",'cirno'],
		];
	}

	this.lineNumber = 0;

	this.timer = 0;
	this.endLineWait = 2000; //in ms
	this.endLineWaitFast = 500;

	this.phase = 1;
	
}
Director.prototype.start = function(game){
	game.textbox = new Textbox(this.script[0][1], this.script[0][0]);
}

Director.prototype.tick = function(delta){
	if(this.phase == 1){
		this.phase1Tick(delta);
	}else if(this.phase ==2){
		//waiting to press space
		this.phase2Tick(delta);
	}else if(this.phase ==3){
		//space pressed
		this.phase3Tick(delta);
	}else{
		//currently nothing happens if you don't press space
		this.phase4Tick(delta);
	}
}
Director.prototype.phase1Tick = function(delta){
	if(!this.done && game.textbox.done){
		//wait a bit before starting a new line
		this.timer += delta;
		var endLineWait = key.enter ? this.endLineWaitFast : this.endLineWait;

		if(this.timer > endLineWait){
			this.timer -= endLineWait;

			//now that we've waited, start the new line
			if(this.lineNumber < this.script.length-2){
				this.lineNumber++;
				game.textbox = new Textbox(this.script[this.lineNumber][1],this.script[this.lineNumber][0]);
			}else{
				//Last line, so transition into waiting-for-space phase
				this.lineNumber++;
				game.textbox = new Textbox(this.script[this.lineNumber][1],this.script[this.lineNumber][0]);
				this.phase = 2;
				this.timer = 0;
			}
		}
	}
}

Director.prototype.phase2Tick = function(delta){
	//waiting for the user to press space
	this.timer += delta;
	if(this.timer > 5000){
		game.textbox.visible = false;
	}
	if(this.timer > 10000){
		//space has not been pressed.
		this.phase = 4;
		this.script = this.script2;
		this.lineNumber = 0;
		this.timer = 0;
		game.textbox = new Textbox(this.script[this.lineNumber][1],this.script[this.lineNumber][0]);
	}

	if(key.space){
		//Good! Time to activate the animation
		game.textbox.visible = false;
		game.cirno.beginWingRotation();
		this.phase = 3;
		this.timer = 0;
		this.shinyCount = 0;
		this.snowApplied = false;
		game.audio.play("cirnability.wav")
		this.circleSize = 1;
	}	
}

Director.prototype.phase3Tick = function(delta){
	//space has been pressed
	this.timer += delta;
	if(this.timer > 1000 && !this.snowApplied){
		this.snowApplied = true;
		for(var i=0;i<100;i++){
			game.snowflakes.push(new Snowflake(game));
		}
	}

	if(this.timer > 4000 && this.shinyCount == 0){
		this.shinyCount++;
		game.shinyrays.push(new ShinyRay(game));
	}
	if(this.timer > 5000 && this.shinyCount == 1){
		this.shinyCount++;
		game.shinyrays.push(new ShinyRay(game));
	}
	if(this.timer > 6000 && this.shinyCount == 2){
		this.shinyCount++;
		game.shinyrays.push(new ShinyRay(game));
	}

	if(this.timer > 7000 && !this.circleDeployed){
		this.circleDeployed = true;
		//game.shinyrays.push(new ExpandingCircle(game));
	}

	if(this.timer > 9000){
		freeze();
	}
}

Director.prototype.phase4Tick = function(delta){
	//playing this.script2 while waiting to press space still

	if(!this.done && game.textbox.done){
		//wait a bit before starting a new line
		this.timer += delta;
		var endLineWait = key.enter ? this.endLineWaitFast : this.endLineWait;

		if(this.timer > endLineWait){
			this.timer -= endLineWait;

			//now that we've waited, start the new line
			if(this.lineNumber < this.script2.length-1){
				this.lineNumber++;
				game.textbox = new Textbox(this.script[this.lineNumber][1],this.script[this.lineNumber][0]);
			}else{
				//Last line, so transition into waiting-for-space phase
				//this.phase = 2;
				//this.timer = 0;
			}
		}
	}

	if(key.space){
		game.textbox.visible = false;
		game.cirno.beginWingRotation();
		this.phase = 3;
		this.timer = 0;
		this.shinyCount = 0;
		this.snowApplied = false;
		game.audio.play("cirnability.wav");
		this.circleSize = 0;
	}
}
