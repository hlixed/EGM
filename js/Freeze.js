function freeze(){
	window.localStorage["cirnofrozen"] = "true";
	if(window.busy_applied === undefined){
		document.getElementById("container").style.cursor = "wait";
		var start = performance.now();
		document.title += " (Not Responding)";
		document.getElementById("frostedeffect").style.backgroundColor = 'rgba(230,230,255,0.5)';
		window.busy_applied = 1;
	}else if(window.busy_applied == 1){
		window.busy_applied = 2;
		close();
		//other things that are nice to do when freezing
		//alert("[ERROR]\nWhoops! ");
	}else{
		while(performance.now() - start < 500){
			//haha frozen
		}

	}
	game.stopped = true;
	window.requestAnimationFrame(freeze);
}
