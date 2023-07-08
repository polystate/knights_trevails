const knight = {
  queue: [],
  visited: new Set(),
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
    board.clearDestinations(this.display.dest, true);
    board.placePiece(this, start, "start");

    for (let move in this.movements) {
      const destination = start.map(
        (elem, index) => elem + this.movements[move][index]
      );
      if (!board.outOfBounds(destination)) {
        // board.placePiece(this, destination, "dest");
        initialDestinations.push(destination);
      }
    }
    return initialDestinations;
  },
  randomSearch(destinations, board, endpoint) {
    //pass a reference to the recursive call to trace the path
    //of its endpoint
    let endPointReached = false;

    //base case
    for (let destination of destinations) {
      if (JSON.stringify(destination) === JSON.stringify(endpoint)) {
        console.log("Endpoint reached.");
        board.clearDestinations(this.display.dest, true);
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

    //get new branch from landing position
    const newBranch = this.getPossibleMoves(knightTraverse, board);

    //recursive call
    setTimeout(() => {
      this.randomSearch(newBranch, board, endpoint);
    }, 500);
  },
  breadthFirstSearch(current, endpoint, board, initial, parentMap = {}) {
    if (initial) {
      this.queue.push(current);
      this.visited.add(JSON.stringify(current));
      parentMap[JSON.stringify(current)] = null;
    }

    while (this.queue.length > 0) {
      const node = this.queue.shift();

      if (JSON.stringify(node) === JSON.stringify(endpoint)) {
        console.log("Found endpoint.");
        console.log(this.queue);
        console.log(this.visited);

        // Retrace the path from the endpoint to the start
        let path = [node];
        let parent = parentMap[JSON.stringify(node)];
        while (parent) {
          path.unshift(parent);
          parent = parentMap[JSON.stringify(parent)];
        }

        console.log("Path:", path);

        // Place the knight on each element of the path
        for (let i = 0; i < path.length; i++) {
          const pathElement = path[i];
          setTimeout(() => {
            board.clearDestinations(this.display.token, true);
            board.placePiece(this, pathElement, "start");
          }, i * 1000);
        }

        return;
      }

      const connections = this.getPossibleMoves(node, board);
      for (let i = 0; i < connections.length; i++) {
        const connection = connections[i];
        const connectionString = JSON.stringify(connection);

        if (!this.visited.has(connectionString)) {
          this.queue.push(connection);
          this.visited.add(connectionString);
          parentMap[connectionString] = node;
        }
      }
    }
  },
};

export { knight };
