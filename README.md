# 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?  
  Every time you merge two tiles together the merged total is added to your score
  1. When do tiles enter the game?  
  Tiles appear on random empty spaces at the beginning of each turn, after you press the arrow key and tiles are merged together. The game starts with two tiles, and 1 new tile is added at the end of each turn. Only 2 and 4 are added as new tiles, 4 seems slightly less common.
  1. How do you know if you've won?  
  You have won if you get a tile of 2048
  1. How do you know if you've lost?  
  If you fill up the board and nothing can merge  
  1. What makes tiles move?  
  Arrow keys  
  1. What happens when they move?  
  Tiles move all the way in the direction of the key pressed, up a column or row. Tiles combine if they are the same.  
  1. How would you know how far a tile should move?  
  The tile moves all the way to the way in the direction of the arrow key pressed until there is a tile blocking it.

  1. How would you know if tiles would collide?  
  If they have the same value.
  1. What happens when tiles collide?   
  The tiles combine into one with double value. If there are three in a row, only two combine.
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
