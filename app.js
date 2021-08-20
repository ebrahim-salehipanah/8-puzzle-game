var gameStatus = document.querySelector("#game_status");
var moves = document.querySelector("#moves");
var resetBtn = document.querySelector(".btn");
var cells = document.querySelectorAll(".cell");
init_state = [
	[2, 3, 5],
	[1, 4, ""],
	[7, 8, 6]
];

function isWin() {
	var winMassage = "You won !";
	let i;
	for (i = 0; i < 9; i++) {
		if (cells[i].innerHTML == "" || cells[i].innerHTML != i + 1) break;
	}

	gameStatus.innerHTML = i == 8 ? winMassage : "Start moving Tile !";
}

function moveCounter() {
	let moveNum = parseInt(moves.innerHTML);
	moves.innerHTML = moveNum + 1;
}

function swap(fullHomeIndex, emptyHomeIndex) {
	cells[emptyHomeIndex].innerHTML = cells[fullHomeIndex].innerHTML;
	cells[fullHomeIndex].innerHTML = "";
}

function resetState() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) cells[i * 3 + j].innerHTML = init_state[i][j];
	}
	moves.innerHTML = 0;
	gameStatus.innerHTML = "Start moving Tile !";
}

resetState();

resetBtn.addEventListener("click", resetState);

for (var i = 0; i < 9; i++) {
	cells[i].addEventListener("click", cellHandler);
	function cellHandler(e) {
		var index;
		for (let j = 0; j < 9; j++) {
			if (cells[j].innerHTML == e.target.innerHTML) {
				index = j;
				break;
			}
		}

		let top = (index + 6) % 9,
			bottom = (index + 3) % 9,
			left = index % 3 == 0 ? index + 2 : index - 1,
			right = index % 3 == 2 ? index + -2 : index + 1;

		if (!cells[top].innerHTML) {
			moveCounter();
			swap(index, top);
		} else if (!cells[bottom].innerHTML) {
			moveCounter();
			swap(index, bottom);
		} else if (!cells[left].innerHTML) {
			moveCounter();
			swap(index, left);
		} else if (!cells[right].innerHTML) {
			moveCounter();
			swap(index, right);
		}

		isWin();
	}
}
