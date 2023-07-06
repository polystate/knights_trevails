const knight = {
  speak() {
    console.log("I am a knight.");
  },
  display: { start: "KNS", end: "KNE", dest: "X" },
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
  moves(start, end, board) {
    board.placePiece(this, start, "start");
    board.placePiece(this, end, "end");
  },
  getPossibleMoves(start, board) {
    const initialDestinations = [];

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

  searchMoveTree(destinations, board, endpoint) {
    //base case
    try {
      destinations.forEach((destination) => {
        if (JSON.stringify(destination) === JSON.stringify(endpoint)) {
          console.log("Endpoint reached.");
          throw "BreakLoopAndFunction";
        }
      });
    } catch (error) {
      if (error === "BreakLoopAndFunction") {
        return;
      }
      throw error;
    }
    const startDest =
      destinations[Math.floor(Math.random() * destinations.length)];
    const infiniteDest = this.getPossibleMoves(startDest, board);

    //recursive call
    this.searchMoveTree(infiniteDest, board, endpoint);
  },
};

export { knight };
