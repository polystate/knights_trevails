const gameBoard = {
  gridContainer: document.getElementById("grid-container"),
  display() {
    for (let row = 7; row >= 0; row--) {
      for (let column = 0; column <= 7; column++) {
        const square = document.createElement("div");
        square.setAttribute("class", `square`);
        square.setAttribute("id", `[${row},${column}]`);
        this.gridContainer.appendChild(square);
      }
    }
  },
  outOfBounds(pos) {
    return pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7;
  },
  placePiece(piece, pos) {
    const squares = this.gridContainer.getElementsByClassName("square");

    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      const [row, column] = square.id.slice(1, -1).split(",");
      const targetRow = parseInt(row);
      const targetColumn = parseInt(column);

      if (targetColumn === pos[0] && targetRow === pos[1]) {
        square.textContent = piece.display;
        break;
      }
    }
  },
};

export { gameBoard };
