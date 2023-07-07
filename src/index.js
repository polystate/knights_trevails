import { gameBoard } from "./gameBoard";
import { knight } from "./knight";

const start = [4, 5];
const end = [7, 0];

gameBoard.display();
knight.movePath(start, end, gameBoard);

const initialDestinations = knight.getPossibleMoves(start, gameBoard);
knight.searchMoveTree(initialDestinations, gameBoard, end);
