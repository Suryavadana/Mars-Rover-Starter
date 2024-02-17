class Rover {
   // Write code here!
    constructor(position,mode,generatorWatts)
   {
      this.position=position;
      if(!position)
      {
         throw Error('Position required.');
      }
      this. mode='NORMAL';
      this.generatorWatts=110;
   }

   receiveMessage(message)
   {  
      this.message=message;
      // this condition will check if the message object exist and its command property is an array.
       if (!message || !Array.isArray(message.commands)) {
      return { message: message.name, results: [{ completed: false }] };
      }
      let results = [];
      try{
        for (let command of message.commands) 
         {
            let result;
            if (command.commandType === 'STATUS_CHECK') {
               result = {
                     completed: true,
                     roverStatus: {
                        mode: this.mode,
                        generatorWatts: this.generatorWatts,
                        position: this.position
                     }
               };
               
            }
            
            else if(command.commandType === 'MODE_CHANGE'){
               this.mode = command.value;
               result = { completed: true  }
               // this.mode === 'LOW_POWER'
               // result = {completed:true}
               // this.position === 'NORMAL'
               // result = {completed : true}
            }

            else if(command.commandType === 'MOVE')
            {
               
               if(this.mode === 'LOW_POWER')
               {
                  result = {completed:false}
               }
               else if(this.position === command.value)
               {
                  result = {completed : true}
               }
               else
               {
                  this.position = command.value;
               result = {completed:true};

               }
            
                
            } 
           
         else {
            result = { completed: false };
            
         }
            results.push(result);
         }
      }
      catch (error) {
         console.error("Error receiving message:", error.message);
      }
      
      return { 
         message: message.name, 
         results: results 
      };
   
   }
}

module.exports = Rover;