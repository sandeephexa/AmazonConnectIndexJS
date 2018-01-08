'use strict';

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled 
function close(sessionAttributes, fulfillmentState, message, responseCard) {
    var result = {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
            responseCard
        },
    };
    
    console.log(result);
    return result;
}
//

function requestNextIntent(sessionAttributes, message, responseCard) {
    var result= {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitIntent',
            message,
            responseCard
        },
    };
    console.log(result);
    return result;
}//SessionEndedRequest : false. Waiting for another Intent


function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`Request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.intentName}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const insuranceType = slots.query_category;
    console.log("Request : "+JSON.stringify(intentRequest)); 

   if(intentRequest.currentIntent.name==="BookFlight")
   {
     console.log('BookFlight Intent Fired');
     
        
        callback(requestNextIntent(sessionAttributes,{'contentType': 'PlainText','content': `Okay, you want me to book a flight for you. Please give me some information before I transfer you to an agent to confirm your booking. Is this reservation one way, round trip or multi city?`},null));
        //callback(delegate(sessionAttributes,slots));
       
   }//Welcome Intent Triggered on WelcomeDefaultIntent's Lex Invocation to This Lambda
   else if(intentRequest.currentIntent.name==="OneWay")
   {
     console.log('OneWay Intent Fired');
        
        callback(close(sessionAttributes,"Fulfilled",{'contentType': 'PlainText','content': `Great! That is all I need to help you book your flight.`},null));
        //callback(delegate(sessionAttributes,slots));
       
   }//Welcome Intent Triggered on WelcomeDefaultIntent's Lex Invocation to This Lambda
   
   else if(intentRequest.currentIntent.name==="RoundTripDetails")
   {
     console.log('RoundTripDetails Intent Fired');
        
        callback(close(sessionAttributes,"Fulfilled",{'contentType': 'PlainText','content': `Thansk for sharing details.with me`},null));
        //callback(delegate(sessionAttributes,slots));
       
   }
   else if(intentRequest.currentIntent.name==="SatisfactoryIntent")
   {
     console.log('MultiWay Intent Fired');
        
        callback(close(sessionAttributes,"Fulfilled",{'contentType': 'PlainText','content': `Thank you for calling Delta Airlines. You are a valued customer and we hope you have a good experience with us. Have a nice day.`},null));
        //callback(delegate(sessionAttributes,slots));
       
   }
   
     else if(intentRequest.currentIntent.name==="FlightStatus")
   {
     console.log('Flight Status Intent Fired');
        
        callback(close(sessionAttributes,"Fulfilled",{'contentType': 'PlainText','content': `Your Flight DL234 is going to be delayed by 15 minutes.`},null));
        //callback(delegate(sessionAttributes,slots));
       
   }
}
 
// --------------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    
    console.log(""+ JSON.stringify(event));
    console.log(""+ JSON.stringify(context));
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
