const knight = {
  speak() {
    console.log("I am a knight.");
  },
  display: { start: "KNS", end: "KNE", dest: "X", path: "P" },
  movements: {
    0: [-2, -1],
    1: [-1, -2],
    2: [1, -2],
    3: [2, -1],
    4: [1, 2],
    5: [-1, 2],
    6: [-2, 1],
    7: [2, 1],
  },
  movePath(start, end, board) {
    board.placePiece(this, start, "start");
    board.placePiece(this, end, "end");
  },
  getPossibleMoves(start, board) {
    const initialDestinations = [];
    this.clearDestinations(board);

    for (let move in this.movements) {
      const destination = start.map(
        (elem, index) => elem + this.movements[move][index]
      );
      if (!board.outOfBounds(destination)) {
        board.placePiece(this, destination, "dest");
        initialDestinations.push(destination);
      }
    }
    return initialDestinations;
  },
  clearDestinations(board, all = false) {
    const squares = Array.from(
      board.gridContainer.getElementsByClassName("square")
    );
    const filteredSquares = squares.filter((square) => {
      return all || square.textContent === this.display.dest;
    });
    filteredSquares.forEach((square) => {
      square.textContent = "";
    });
  },

  searchMoveTree(destinations, board, endpoint) {
    //pass a reference to the recursive call to trace the path
    //of its endpoint
    let endPointReached = false;

    //base case
    for (let destination of destinations) {
      if (JSON.stringify(destination) === JSON.stringify(endpoint)) {
        console.log("Endpoint reached.");
        this.clearDestinations(board, true);
        board.placePiece(this, destination, "start");
        endPointReached = true;
        break;
      }
    }

    //break out of recursion
    if (endPointReached) return;

    //get random new landing position
    const knightTraverse =
      destinations[Math.floor(Math.random() * destinations.length)];

    //place knight-start at new landing position
    board.placePiece(this, knightTraverse, "start");

    //get new branch from landing position
    const newBranch = this.getPossibleMoves(knightTraverse, board);

    //recursive call
    setTimeout(() => {
      this.searchMoveTree(newBranch, board, endpoint);
    }, 500);
  },
};

export { knight };
