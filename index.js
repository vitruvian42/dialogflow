// "use strict";

// const express = require("express");
// const bodyParser = require("body-parser");

// const restService = express();

// restService.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

// restService.use(bodyParser.json());

// restService.post("/echo", function(req, res) {
//   var speech =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.echoText
//       ? req.body.result.parameters.echoText
//       : "Seems like some problem. Speak again.";
//   return res.json({
//     speech: "Thank you for talking to HDFC Life. Our agent will contact you soon",
//     displayText: "Thank you for talking to HDFC Life. Our agent will contact you soon",
//     source: "HDFC-Life-Bot"
//   });
// });


// restService.listen(process.env.PORT || 8000, function() {
//   console.log("Server up and listening");
// });

'use strict';
 
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Suggestion } = require('dialogflow-fulfillment');
const http = require('http')
const querystring = require('querystring')
const {
  dialogflow,
  List,
  SimpleResponse,
  Suggestions,
  BasicCard,
  Card
 } = require('actions-on-google');
 
// const http = require('http');
// const querystring = require('querystring');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const app = dialogflow({debug: true});

app.intent('LeadGenIntent',(conv)=> {
    conv.ask(new SimpleResponse({
      speech: 'Thank you for your interest! Our representative will contact you shortly.',
      text: 'Thank you for your interest! Our representative will contact you shortly.',
    }));
});

app.intent('Default Welcome Intent',(conv)=>{
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      conv.ask('Sorry, try this on a screen device or select the ' +
        'phone surface in the simulator.');
      return;
    }
    conv.ask(new SimpleResponse({
      speech: 'Hi, glad to have you here. I am Kea. HDFC Life is one of India\'s leading life insurance companies, offering a range of individual insurance solutions that meet various life stage needs of customers. The products include Protection, Pension, Savings & Investments and Health. If you have any questions about insurance, I am here to answer!',
      text: 'Hi, glad to have you here. I am Kea. HDFC Life is one of India\'s leading life insurance companies, offering a range of individual insurance solutions that meet various life stage needs of customers. The products include Protection, Pension, Savings & Investments and Health. If you have any questions about insurance, I am here to answer!',
    }));
    conv.ask(new Suggestions('Know HDFC Life products'));
    conv.ask(new Suggestions('Buy an insurance plan'));
    // Create a list
    conv.ask(new List({
      title: 'How can I help you ?',
      items: {
        // Add the first item to the list
        ["KNOW_HDFC"]: {
          synonyms: [],
          title: 'Know about HDFC Life products',
          description: 'You are just a few clicks away from tax saving and secured future!'
        },
        // Add the second item to the list
        ["BUY_INSURANCE"]: {
          synonyms: [],
          title: 'I want to buy an insurance plan',
          description: 'Choose a policy that suits your needs and investment style.'
        }
      },
    }));
})

app.intent('optionResponse', (conv, params, option) => {
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      conv.ask('Sorry, try this on a screen device or select the ' +
        'phone surface in the simulator.');
      return;
    }
    if (option == 'KNOW_HDFC') {
            conv.ask(new SimpleResponse({
            speech : 'Insurance is a financial coverage for protection, savings & investment. What kind of insurance do you need?',
            text : 'Insurance is a financial coverage for protection, savings & investment. What kind of insurance do you need?'
        }));
        conv.ask(new Suggestions('Life insurance'));
        conv.ask(new Suggestions('Health insurance'));
        conv.ask(new Suggestions('Saving and Investment'));
        conv.ask(new Suggestions('Retirement Plan'));
        
        // Create a list
    conv.ask(new List({
      title: 'Know about HDFC Life insurance products',
      items: {
        // Add the first item to the list
        ["INSURANCE_PRODUCTS"]: {
          synonyms: [],
          title: 'Life insurance',
          description: ''
        },
        // Add the second item to the list
        ["HEALTH_INSURANCE"]: {
          synonyms: [],
          title: 'Health insurance',
          description: ''
        },
        // Add the second item to the list
        ["SAVING_AND_INVESTMENT_PLANS"]: {
          synonyms: [],
          title: 'Saving and Investment plans',
          description: ''
        },
        // Add the second item to the list
        ["RETIREMENT_PLAN"]: {
          synonyms: [],
          title: 'Retirement Plan',
          description: ''
        }
      } 
    }));
    
    } else if (option == 'BUY_INSURANCE') {
            conv.ask(new SimpleResponse({
            speech : 'What do you need insurance for?',
            text : 'What do you need insurance for?'
        }));
        
        // Create a list
        conv.ask(new List({
          title: 'What do you need insurance for ?',
          items: {
            // Add the first item to the list
            ["PROTECTION"]: {
              synonyms: [],
              title: 'Protection',
              description: ''
            },
            // Add the second item to the list
            ["SAVING_AND_INVESTMENT"]: {
              synonyms: [],
              title: 'Saving and investment',
              description: ''
            },
            // Add the third item to the list
            ["RETIREMENT"]: {
              synonyms: [],
              title: 'Retirement',
              description: ''
            },
            // Add the fourth item to the list
            ["HEALTH"]: {
              synonyms: [],
              title: 'Health',
              description: ''
            }
          },
        }));
    } else if (option == 'INSURANCE_PRODUCTS') {
        conv.ask(new SimpleResponse({
            speech : 'HDFC Life Click 2 Protect 3D Plus is an online term insurance plan that offers comprehensive security against three uncertainties of life: Death, Disability and Disease. Add a little “extra” to your term plan and protect your family in your absence with HDFC Life Click 2 Protect 3D Plus - Extra Life Option. Say ‘Life’ to live well with HDFC Life term insurance!',
            text : 'HDFC Life Click 2 Protect 3D Plus is an online term insurance plan that offers comprehensive security against three uncertainties of life: Death, Disability and Disease. Add a little “extra” to your term plan and protect your family in your absence with HDFC Life Click 2 Protect 3D Plus - Extra Life Option. Say ‘Life’ to live well with HDFC Life term insurance!'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'HEALTH_INSURANCE') {
        conv.ask(new SimpleResponse({
            speech : 'Please select a product',
            text : 'Please select a product'
        }));
        
        // Create a list
        conv.ask(new List({
          title: 'What do you need insurance for ?',
          items: {
            // Add the first item to the list
            ["CLICK_TO_PROTECT_HEALTH"]: {
              synonyms: [],
              title: 'Click to Protect Health',
              description: ''
            },
            // Add the second item to the list
            ["HDFC_LIFE_CANCER_CARE"]: {
              synonyms: [],
              title: 'HDFC Life Cancer Care',
              description: ''
            }
          },
        }));
        
    } else if (option == 'SAVING_AND_INVESTMENT_PLANS') {
        conv.ask(new SimpleResponse({
            speech : 'HDFC Life Click 2 Invest: Meet your investments needs while providing your family with valuable financial protection with HDFC Life Click2Invest – ULIP. Market-linked returns, 8-fund options and tax benefits-all rolled into one! Say ‘Grow my Money’ to know about the ULIP plan!',
            text : 'HDFC Life Click 2 Invest: Meet your investments needs while providing your family with valuable financial protection with HDFC Life Click2Invest – ULIP. Market-linked returns, 8-fund options and tax benefits-all rolled into one! Say ‘Grow my Money’ to know about the ULIP plan!'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'RETIREMENT_PLAN') {
        conv.ask(new SimpleResponse({
            speech : 'HDFC Life Click 2 Retire: Get market-linked returns and enjoy regular income for the rest of your life with this pension scheme. Your retired life is for you to enjoy, not for you to worry about taxes! With HDFC Life Click 2 Retire, you can plan your retirement for just Rs 2000 per month and avail tax benefits. Wonderful, just like your golden period is going to be! Say ‘Golden’ to welcome your golden phase with HDFC Life retirement plan!',
            text : 'HDFC Life Click 2 Retire: Get market-linked returns and enjoy regular income for the rest of your life with this pension scheme. Your retired life is for you to enjoy, not for you to worry about taxes! With HDFC Life Click 2 Retire, you can plan your retirement for just Rs 2000 per month and avail tax benefits. Wonderful, just like your golden period is going to be! Say ‘Golden’ to welcome your golden phase with HDFC Life retirement plan!'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'PROTECTION') {
        conv.ask(new SimpleResponse({
            speech : 'To help you choose the right plan, we request you to share your contact number',
            text : 'To help you choose the right plan, we request you to share your contact number'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'SAVING_AND_INVESTMENT') {
        conv.ask(new SimpleResponse({
            speech : 'To help you choose the right plan, we request you to share your contact number',
            text : 'To help you choose the right plan, we request you to share your contact number'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'RETIREMENT') {
        conv.ask(new SimpleResponse({
            speech : 'To help you choose the right plan, we request you to share your contact number',
            text : 'To help you choose the right plan, we request you to share your contact number'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'HEALTH') {
        conv.ask(new SimpleResponse({
            speech : 'To help you choose the right plan, we request you to share your contact number',
            text : 'To help you choose the right plan, we request you to share your contact number'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'CLICK_TO_PROTECT_HEALTH') {
        conv.ask(new SimpleResponse({
            speech : 'Click to Protect Health bring you the benefits of health and life insurance in a comprehensive and affordable manner. All you have to do is to give a single cheque, go for single documentation and a single medical test to buy this policy.  And that’s not it! This policy rolls in multiple benefits along with it. Say ‘Health is wealth’ to cherish this beautiful gift with HDFC Life health insurance.',
            text : 'Click to Protect Health bring you the benefits of health and life insurance in a comprehensive and affordable manner. All you have to do is to give a single cheque, go for single documentation and a single medical test to buy this policy.  And that’s not it! This policy rolls in multiple benefits along with it. Say ‘Health is wealth’ to cherish this beautiful gift with HDFC Life health insurance.'
        }));
        conv.ask(new Suggestions('I want to know more'));
    } else if (option == 'HDFC_LIFE_CANCER_CARE') {
        conv.ask(new SimpleResponse({
            speech : 'HDFC Life Cancer Care: Stay financially prepared and avail lump sum benefit on detection of early and major cancer. Simplified issuance process without medicals in most cases. Say ‘Yes’ to wage a fight against cancer with HDFC Life Cancer Care policy.',
            text : 'HDFC Life Cancer Care: Stay financially prepared and avail lump sum benefit on detection of early and major cancer. Simplified issuance process without medicals in most cases. Say ‘Yes’ to wage a fight against cancer with HDFC Life Cancer Care policy.'
        }));
        conv.ask(new Suggestions('I want to know more'));
    }
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
