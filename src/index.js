import { gameBoard } from "./gameBoard";
import { knight } from "./knight";

const start = [4, 5];
const end = [1, 2];

gameBoard.display();
knight.moves(start, end, gameBoard);

const initialDestinations = knight.getPossibleMoves(start, gameBoard);
knight.searchMoveTree(initialDestinations, gameBoard, end);
