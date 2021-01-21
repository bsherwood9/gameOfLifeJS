# gameOfLifeJS
## Overview
This is my first attempt at Conway's game of life, John Conway's famous cellular automata. This version uses CSS and vanilla JavaScript. 

## Techstack
This was created with JS, HTML, and CSS. Simple does it. 

## Bugs
None yet found.

## Possible improvements
The speed is sometimes an issue. Maybe using just one long array would help so I don't need to use nested loops that are O(n^2). One loop would optimize speed.
Also a future update could include different cell configurations that one could add with just a click. 

## Status
Finished

## How to use
Basic functionality is a grid that you can click on to fill cells. You can also select a random grid which will populate the grid with randomly filled cells 
Then press "Start" and watch how the cells behave and mutate.
You can adjust the speed of the generational change with the slider. 
Press "Clear" to clear the grid so you can start again. 
A Grid Size drop down allows one to adjust the size of the grid. 

## Rules
The rules of this game are pretty straightforward. Every square or cell is either alive(black) or dead(white). Every cell interacts with the cells around it according to a few rules.

1. Any live cell that has two or three adjacent live cells lives.

2. A dead cell that has three living adjacent cells, becomes a live cell.

3. Any other cell that doesn't meet the above two rules dies.

These rules are applied every generation or step.
