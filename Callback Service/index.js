import { Client, logger } from "camunda-external-task-client-js";
import { Variables } from "camunda-external-task-client-js";
import axios from 'axios';
// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("CallbackEndpoint", async function ({ task, taskService }) {

    const decision = task.variables.get("decision");
    const requestID = task.variables.get("requestID");

    console.log(requestID);
    const processVarible = new Variables();
    
       
        const responsevarible = "Your request is approved";
        

        const response = await axios
            .post(`https://cef5c67b-7de7-4867-a400-4d7836607358-dev.e1-us-east-azure.choreoapis.dev/xgdm/workflowextern-whi/1.0.0/CallbackEndPoint`,{
                "requestID": `${requestID}`,
                "status": `${decision}`
            },)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {

            console.log(response.data, response.status);
            if (response.status == 200) {
                await taskService.complete(task);
            }
            else{
                await taskService.complete(task);
            }
        }
        processVarible.set("response", responsevarible);


    
   
       
    

});