
front.send("hello from front");

front.on("hello from back", function(msg){
	console.log(msg);
	$('#msg').html(msg);
});

$(document).ready(function() {
	//console.log('Ready');

	// get the location of this javascript file
	var jsFileLocation = $('script[src*=script]').attr('src');  // the js file path
	jsFileLocation = jsFileLocation.replace('script.js', '');   // the js folder path

	var windowLocation = window.location.href; // the page file path
	windowLocation = windowLocation.replace('views/index.html', 'assets/'); // the assets file path

	// sleep function for generating suspense
	function goTheFuckToSleep(Jeff) {
		const up = Date.now();
		let wake = null;
		do {
			wake = Date.now();
		} while (wake - up < Jeff);
	};

	// Alternate sleep function that doesn't make Valthek cry
/*	const sleep = (ms) => {new Promise(resolve => setTimeout(resolve, ms))}
	And call with
	await sleep(timeInMs);*/

	// update the debug log
	function scream(update) {
		var node = document.createElement('p');
		var textnode = document.createTextNode(update);
		node.appendChild(textnode);
		document.getElementById('debug_log').appendChild(node);
	}

	// theme control
	const medievalTheme = windowLocation + 'medieval.css';
	const lightTheme = windowLocation + 'light.css';
	const darkTheme = windowLocation + 'dark.css';
	var cssState = '';

	$('#theme').on('click touch', function() {
		cssState = document.getElementById('theme_css').href;
		//console.log('theme change');
		//scream('Dark theme location: ' + darkTheme);

		switch (cssState) {
			case medievalTheme:
				document.getElementById('theme_css').href = lightTheme;
				//console.log('light theme');
				scream('Light theme success!');
				break;
			case lightTheme:
				document.getElementById('theme_css').href = darkTheme;
				//console.log('dark theme');
				scream('Dark theme success!');
				break;
			case darkTheme:
				document.getElementById('theme_css').href = medievalTheme;
				//console.log('medieval theme');
				scream('Medieval theme success!');
				break;
		};
	})

	// detect and delete selected entrant row
	var dumpTruck = function() {
		var row = this.id;
		var rowCount = row.split('_')[1];
		var rowName = "row_" + rowCount;

		document.getElementById(rowName).remove();

		//console.log("row " + rowCount + " removed");
	};

	var listLength = 3;

	// add a new entrant row
	$('#addNew').on('click touch', function() {
		var node1 = '';
		var node2 = '';
		var node3 = '';
		var rowCount = '';
		rowCount = "row_" + listLength;
		var attCount = '';
		
		node1 = document.createElement('div');
		node1.setAttribute('id', rowCount);
		node1.setAttribute('class', "entrantList");
		document.getElementById('entrants').appendChild(node1);

		node2 = document.createElement('input');
		attCount = "combatant_" + listLength;
		node2.setAttribute('type', "text");
		node2.setAttribute('name', attCount);
		node2.setAttribute('id', attCount);
		//node2.setAttribute('class', "fighter");
		document.getElementById(rowCount).appendChild(node2);

		node3 = document.createElement('button');
		node3.innerText = "x";
		attCount = "remove_" + listLength;
		node3.setAttribute('id', attCount);
		node3.setAttribute('class', "mod");
		node3.onclick = dumpTruck;
		document.getElementById(rowCount).appendChild(node3);

		//console.log('added new input line (' + listLength + ')');
		listLength++;
	});

	$('.mod').on('click touch', function() {
		var row = this.id;
		var rowCount = row.split('_')[1];
		var rowName = "row_" + rowCount;

		document.getElementById(rowName).remove();

		//console.log("row " + rowCount + " removed");
	});

	var pool1 = [];
	var pool2 = [];
	var list = [];
	var listb = '';
	var field = [];
	var waiting = [];
	var dead = [];
	var victor = "";

	// update the herald
	function shout(update) {
		var node = document.createElement('p');
		var textnode = document.createTextNode(update);
		node.appendChild(textnode);
		document.getElementById('progress').appendChild(node);
	}

	// proclaim the victor
	function announce(winner) {
		if (victor != "") {
			var proclaim = document.getElementById('status');

			proclaim.style.color = 'black';
			proclaim.innerText = winner + " is the champion!";

			shout("...");
			shout(winner + " is the champion!");
			//console.log(winner + " is champion");
		};
		
	};

	// populate pool1
	function assemble() {
		//console.log('Registering combatants');
		shout("Registering combatants...")

		listb = document.querySelectorAll('input');

		//console.log('entrant list:');
		for (b = 0; b < listb.length; b++) {
			var bigBang = listb[b].value;
			if (bigBang.length > 0) {
				list.push(bigBang);
			};
		};

		// check there are combatants then add them to the pool
		//console.log('Combatants listed: ' + list.length);
		if (list != "") {
			for (i = 0; i < list.length; i++) {
				pool1.push ([list[i],0]);
			};

			if (pool1.length > 1) {
				shout(pool1.length + " combatants registered, beginning tournament...");
			} else {
				shout("Only " + pool1.length + " combatant registered...");
			};
		} else {
			shout(pool1.length + " combatants registered...");
		};
		
		//console.log('Combatants registered: ' + pool1.length);
	};

	// run tournament
	function tournament() {
		//console.log('Beginning tournament');
		var stage = 0;
		var round = 1;
		var seed = 0;
		var remaining = pool1.length;

		// check to make sure there are enough combatants
		if (pool1.length == 2) {
			pool2.push(pool1[1]);
			pool1.splice(1, 1);
			stage = 3;
		} else if (pool1.length == 1) {
			shout("Default win!!!");
			stage = 0;
			victor = pool1[0][0];
		} else if (pool1.length == 0) {
			shout("It's raining, go home.");
		} else {
			stage = 1;
		};

		while (stage == 1) {
			// select two combatants for the current round
			shout("Round: " + round);
			//console.log(pool1);
			seed = Math.floor(Math.random() * pool1.length);
			field.push(pool1[seed]);
			pool1.splice(seed, 1);
			seed = Math.floor(Math.random() * pool1.length);
			field.push(pool1[seed]);
			pool1.splice(seed, 1);

			// decide the winner of the round
			switch (Math.floor(Math.random() * 2)) {
				case 0:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[0][0] + ' wins!');
					// increase looser's losses by 1
					field[1][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[0]);
					pool2.push(field[1]);
					break;
				case 1:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[1][0] + ' wins!');
					// increase looser's losses by 1
					field[0][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[1]);
					pool2.push(field[0]);
					break;
			};

			// reset the field for the next round
			field = [];

			// calculate remaining combatants for this stage
			remaining = pool1.length + waiting.length;
			//console.log('combatants remaining: ' + remaining);

			// proceed according to remaining combatants
			if (remaining >= 2 && pool1.length <= 1) {
				for (a = 0; a < waiting.length; a++) {
					//console.log('waiting combatants rejoin pool1')
					pool1.push(waiting[a]);
				};
				waiting = [];
			} else if (remaining == 1) {
				//console.log(waiting[0][0] + ' wins stage 1');
				pool1.push(waiting[0]);
				waiting = [];
				stage++;
			};

			round++;
		};

		while (stage == 2) {
			// double check there are enough combatants
			if (pool2.length == 1) {
				//console.log("Straight to the final");
				stage = 3;
			};

			// select two combatants for the current round
			shout("Round: " + round);
			//console.log(pool2);
			seed = Math.floor(Math.random() * pool2.length);
			field.push(pool2[seed]);
			pool2.splice(seed, 1);
			seed = Math.floor(Math.random() * pool2.length);
			field.push(pool2[seed]);
			pool2.splice(seed, 1);

			// decide the winner of the round
			switch (Math.floor(Math.random() * 2)) {
				case 0:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[0][0] + ' wins!');
					// increase looser's losses by 1
					field[1][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[0]);
					dead.push(field[1]);
					break;
				case 1:
					shout(field[0][0] + ' vs. ' + field[1][0] + ', ' + field[1][0] + ' wins!');
					// increase looser's losses by 1
					field[0][1]++;
					// sort combatants to the apropriate locations
					waiting.push(field[1]);
					dead.push(field[0]);
					break;
			};

			// reset the field for the next round
			field = [];

			// calculate remaining combatants for this stage
			remaining = pool2.length + waiting.length;
			//console.log('combatants remaining: ' + remaining);

			// proceed according to remaining combatants
			if (remaining >= 2 && pool2.length <= 1) {
				for (b = 0; b < waiting.length; b++) {
					//console.log('waiting combatants rejoin pool2')
					pool2.push(waiting[b]);
				};
				waiting = [];
			} else if (remaining == 1) {
				//console.log(waiting[0][0] + ' wins stage 2');
				pool2.push(waiting[0]);
				waiting = [];
				stage++;
			};

			round++;
		};

		while (stage == 3) {
			var finalist1 = 0;
			var finalist2 = 0;
			// set field for the final
			//console.log("Finals");
			shout("Round: Final, best of 3");
			field.push(pool1[0][0]);
			field.push(pool2[0][0]);

			// decide the winner of the round
			for (f = 1; f <=3; f++) {
				switch (Math.floor(Math.random() * 2)) {
					case 0:
						//console.log(finalist1 + " wins round " + f);
						shout(field[0] + ' vs. ' + field[1] + ', ' + field[0] + ' wins!');
						// increase winner's score by 1
						finalist1++;
						break;
					case 1:
						//console.log(finalist2 + " wins round " + f);
						shout(field[0] + ' vs. ' + field[1] + ', ' + field[1] + ' wins!');
						// increase winner's score by 1
						finalist2++;
						break;
				};
			};

			if (finalist1 > finalist2) {
				victor = field[0];
			} else if (finalist1 < finalist2) {
				victor = field[1];
			} else {
				shout('something has gone wrong, lol!');
			};

			stage = 0;
			
		};

	};

	// begin the slaughter
	$('#layOn').on('click touch', function() {
		// reset variables
		pool1 = [];
		pool2 = [];
		list = [];
		field = [];
		waiting = [];
		dead = [];
		victor = "";

		// change view
		document.getElementById('entries').style.display = "none";
		document.getElementById('herald').style.display = "block";

		// run functions
		assemble();
		tournament();
		announce(victor);
	});

	$('#rinseRepeat').on('click touch', function() {
		// change view
		document.getElementById('herald').style.display = "none";
		document.getElementById('entries').style.display = "block";

		// reset status and progress
		document.getElementById('status').style.color = 'white';
		//document.getElementById('status').innerText = "Status:";
		document.getElementById('progress').innerHTML = '';
	})
});