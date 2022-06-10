const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

var baseUrl = process.env.BASE_URL;
if(baseUrl == undefined) {
    baseUrl = "http://localhost:8080/engine-rest"
}

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl, use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'Production'
client.subscribe("Production", async function ({ task, taskService }) {
    // Put your business logic
    console.log("Production and Customizing tasks with ski parameter:")
    const ski_length = task.variables.get("ski_length");
    const edge_radius = task.variables.get("edge_radius");
    const ski_height = task.variables.get("ski_height");
    const ski_width = task.variables.get("ski_width");
    const curvature_height_front = task.variables.get("curvature_height_front");
    const curvature_height_back = task.variables.get("curvature_height_back");
    const kernal_material = task.variables.get("kernal_material");
    const outside_material = task.variables.get("outside_material");
    console.log("ski length - " + ski_length);
    console.log("edge radius - " + edge_radius);
    console.log("ski height - " + ski_height);
    console.log("ski width - " + ski_width);
    console.log("curvature height front - " + curvature_height_front);
    console.log("curvature height back - " + curvature_height_back);
    console.log("kernal material - " + kernal_material);
    console.log("outside material - " + outside_material);
    const processVariables = new Variables();
    const number = Math.floor(Math.random() * 100);
    console.log("Random number: " + number);


    if (number <= 90) {
        const damage = "no";
        processVariables.set("damage", damage)
        console.log("Is there a damage? " + damage)
    } else {
        const damage = "yes";
        const FAULTY_SKI = "FAULTY_SKI";
        processVariables.set("damage", damage)
        processVariables.set("FAULTY_SKI", FAULTY_SKI)
        console.log("Is there a damage? " + damage)
        console.log("New production of the damaged ski with the AI data.")
    }

    response = {
        "ski_length": ski_length,
        "edge_radius": edge_radius,
        "ski_height": ski_height,
        "ski_width": ski_width,
        "curvature_height_front": curvature_height_front,
        "curvature_height_back": curvature_height_back,
        "kernal_material": kernal_material,
        "outside_material": outside_material
    }
  

    // complete the task
    await taskService.complete(task, processVariables, response);
});

// susbscribe to the topic: 'Service'
client.subscribe("Service", async function ({ task, taskService }) {
    // Put your business logic
    console.log("Service tasks with ski-parameter:")
    const ski_length = task.variables.get("ski_length");
    const edge_radius = task.variables.get("edge_radius");
    const ski_height = task.variables.get("ski_height");
    const ski_width = task.variables.get("ski_width");
    const curvature_height_front = task.variables.get("curvature_height_front");
    const curvature_height_back = task.variables.get("curvature_height_back");
    const kernal_material = task.variables.get("kernal_material");
    const outside_material = task.variables.get("outside_material");
    console.log("ski length - " + ski_length);
    console.log("edge radius - " + edge_radius);
    console.log("ski height - " + ski_height);
    console.log("ski width - " + ski_width);
    console.log("curvature height front - " + curvature_height_front);
    console.log("curvature height back - " + curvature_height_back);
    console.log("kernal material - " + kernal_material);
    console.log("outside material - " + outside_material);

    response = {
        "ski_length": ski_length,
        "edge_radius": edge_radius,
        "ski_height": ski_height,
        "ski_width": ski_width,
        "curvature_height_front": curvature_height_front,
        "curvature_height_back": curvature_height_back,
        "kernal_material": kernal_material,
        "outside_material": outside_material
    }
    // complete the task
    await taskService.complete(task, response);
});