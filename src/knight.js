import { gameBoard } from "./gameBoard";

const knight = {
  speak() {
    console.log("I am a knight.");
  },
  display: "KN",
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
    board.placePiece(this, start);
    board.placePiece(this, end);
  },
  getPossibleMoves(start, board) {
    for (let move in this.movements) {
      const destination = start.map((e, i) => e + this.movements[move][i]);
      if (!board.outOfBounds(destination)) {
        console.log(destination);
      }
    }
  },
};

export { knight };
