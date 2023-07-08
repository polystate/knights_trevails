import { gameBoard } from "./gameBoard";
import { knight } from "./knight";

// const start = [4, 5];
// const end = [7, 0];

const start = [0, 2];
const end = [3, 6];

gameBoard.display();
knight.movePath(start, end, gameBoard);

const initialDestinations = knight.getPossibleMoves(start, gameBoard);
// knight.randomSearch(initialDestinations, gameBoard, end);
knight.breadthFirstSearch(start, end, gameBoard, true);
