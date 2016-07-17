function freeze(){
	//increment localstorage count
	if(window.localStorage["cirnofrozen"] === undefined){
		window.localStorage["cirnofrozen"] = "1";
	}else{
		window.localStorage["cirnofrozen"] = parseInt(window.localStorage["cirnofrozen"])+1;
	}

	document.getElementById("container").style.cursor = "wait";
	var start = performance.now();
	document.title += " (Not Responding)";
	document.getElementById("frostedeffect").style.backgroundColor = 'rgba(230,230,255,0.5)';
	game.stopped = true;
	lag();
}

function lag(){
	while(performance.now() - start < 500){
		//haha frozen
	}
	window.requestAnimationFrame(lag);
}
