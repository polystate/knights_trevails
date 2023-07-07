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
  traverse() {
    console.log("Traversing...");
  },
  getPossibleMoves(start, board) {
    //this function should only get the possibleMoves, traverse
    //should not be added here
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
  clearDestinations(board) {
    const squares = Array.from(
      board.gridContainer.getElementsByClassName("square")
    );
    squares.forEach((square) => {
      if (square.textContent === this.display.dest) {
        square.textContent = "";
      }
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
        endPointReached = true;
        break;
      }
    }

    //break out of recursion
    if (endPointReached) return;

    const knightTraverse =
      destinations[Math.floor(Math.random() * destinations.length)];
    board.placePiece(this, knightTraverse, "path");
    const newBranch = this.getPossibleMoves(knightTraverse, board);

    //recursive call
    setTimeout(() => {
      this.searchMoveTree(newBranch, board, endpoint);
    }, 500);
  },
};

export { knight };
