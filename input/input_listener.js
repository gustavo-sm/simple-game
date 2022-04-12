function inputListener(document){
	
	let observers = [];
	document.addEventListener("keydown", keyPressed);

	function subscribe(fn){
		observers.push(fn);
	}

	function notifyObservers(key){
		for (let i=0; i<observers.length; i++){
			observers[i](key);
		}
	}

	function keyPressed(event){
		const key = event.key;
		notifyObservers(key);
	}
	return {subscribe};
}