var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();



var socket = null;
if (window.io !== undefined) {
	console.log("Database connected!");

	socket = io.connect('http://73.19.38.112:8888');

	socket.on("connect", function () {
		databaseConnected();
	});
	
	socket.on("disconnect", function () {
		databaseDisconnected();
	});

	socket.addEventListener("log", console.log);
}

function reset() {
    isRunning = true;
	loadParameters();
	gameEngine.entities = [];
	gameEngine.graphs = [];
	new Automata();
};


function harvest() {
	for (let pond of gameEngine.automata.ponds) {
	    pond.harvest(.1);
	}
};

function pause() {
    isRunning = !isRunning;
};

ASSET_MANAGER.downloadAll(function () {
	console.log("starting up da sheild");
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	reset();

	gameEngine.start();
});
