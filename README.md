# Water Bucket Challenge

## Project Description

This project implements an interactive solution to the classic "Water Bucket Challenge". The challenge consists of measuring exactly Z gallons of water using only two buckets with capacities X and Y, where only the operations of filling, emptying, and transferring water between buckets are allowed.

## Features

- Interactive visualization of bucket states at each step
- Step-by-step navigation through the solution
- Automatic detection of unsolvable cases
- Optimized algorithm to find the most efficient solution

## Technologies Used

- HTML5
- CSS3
- JavaScript 
- Bootstrap 5

## Algorithmic Approach

The algorithm uses a Breadth-First Search (BFS) to find the most efficient solution to the problem. This approach guarantees that the first solution found will be the one requiring the least number of steps.

The algorithm works as follows:

1. Starts with both buckets empty.
2. Explores all possible actions in each state (fill, empty, transfer).
3. Maintains a record of visited states to avoid infinite cycles.
4. When it finds a state where one of the buckets contains exactly Z gallons, it reconstructs the sequence of steps that led to that state.

The time complexity of the algorithm is O(X * Y), where X and Y are the bucket capacities, as in the worst case we would need to explore all possible filling states of both buckets.

## How to Use

1. Open the `index.html` file in your web browser.
2. Enter the bucket capacities (X and Y) and the target amount (Z).
3. Click "Solve" to find the solution.
4. Use the "Previous" and "Next" buttons to navigate through the solution steps.
5. Observe the bucket visualization and description of each action.

## Test Cases

### Case 1: Simple Solution
- Bucket X: 2
- Bucket Y: 10
- Target Z: 4
- Expected Result: Solution found in 4 steps

### Case 2: Efficient Solution
- Bucket X: 2
- Bucket Y: 100
- Target Z: 96
- Expected Result: Solution found in 4 steps

### Case 3: No Solution
- Bucket X: 2
- Bucket Y: 6
- Target Z: 5
- Expected Result: "No solution found"

## Limitations

- Only filling, emptying, and transferring between the two buckets are allowed.
- X, Y, and Z must be positive integers greater than 0.
- Partial or approximate measurements cannot be used.
