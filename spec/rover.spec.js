const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it ("constructor sets position and default values for mode and generatorWatts", function(){
    expect(function(){ new Rover();}).toThrow(new Error('Position required.')); 
  });

  it("response returned by receiveMessage contains the name of the message",function(){
  
  });

  it ("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
  });

  it ("responds correctly to the status check command",function(){
    // Created test message with a single status check command
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test for STATUS_CHECK command', commands);
    let rover = new Rover(98382);// Creating a rover instance and passes rover position
    //status check command is completed and the status matches
    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);
    expect(rover.receiveMessage(message).results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: 98382
    });
  });

    it ("responds correctly to the mode change command",function(){
    // Creating a test message with a single mode change command
    let commands = [{ commandType: 'MODE_CHANGE' , value : 'LOW_POWER' }];
    let message = { name: 'Test for MODE_CHANGE command',commands };
    // Creating a rover instance
    let rover = new Rover('NORMAL'); // Initialize rover with a position
    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);   // Asserting the completion of the command
    expect(rover.position).toEqual('NORMAL');

    });
  

   it ("responds with a false completed value when attempting to move in LOW_POWER mode" ,function(){
   // Creating a move command
    let commands = { commandType: 'MOVE' }; 
    // Creating a message with the move command
    let message = { name: 'Test for MOVE command in "LOW_POWER"',command:commands}; 
    // Creating a rover instance and setting its mode to LOW_POWER
    let rover = new Rover('NORMAL');
    rover.mode = 'LOW_POWER';
   //sending msg to rover and Asserting the completion status of the move command is false
    expect(rover.receiveMessage(message).results[0].completed).toEqual(false);
    expect(rover.position).toEqual('NORMAL'); // the rover's position remains unchanged
  });

  it ("responds with the position for the move command" ,function(){
    let commands = [new Command('MOVE')];
    let message = new Message('Test for MOVE command', commands);
    let rover = new Rover(98382);
    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);
  });

});
