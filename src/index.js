import { gameBoard } from "./gameBoard";
import { knight } from "./knight";

const start = [0, 0];
const end = [1, 2];

gameBoard.display();
knight.moves(start, end, gameBoard);
knight.getPossibleMoves(start, gameBoard);
