package com.tuwien.wfm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.javafaker.Faker;

import org.camunda.bpm.BpmPlatform;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.camunda.bpm.spring.boot.starter.event.PostDeployEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;

import camundajar.impl.scala.util.Random;

@SpringBootApplication
@EnableProcessApplication
public class Application {

  public static void main(String... args) {
    SpringApplication.run(Application.class, args);
  }

  @EventListener
  private void processPostDeploy(PostDeployEvent event) {

    /*ProcessEngine processEngine = BpmPlatform.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    ProcessInstance instance = runtimeService.startProcessInstanceByKey("Process_group02");

    Faker faker = new Faker();
    String id = faker.code().ean13();
    runtimeService.setVariable(instance.getId(), "id", id);*/
    return;

    /*
     * Thread t = new Thread(new Runnable() {
     * 
     * @Override
     * public void run() {
     * 
     * ProcessEngine processEngine = BpmPlatform.getDefaultProcessEngine();
     * RuntimeService runtimeService = processEngine.getRuntimeService();
     * RepositoryService repositoryService = processEngine.getRepositoryService();
     * 
     * while (true) {
     * // query for latest process definition with given name
     * ProcessDefinition myProcessDefinition =
     * repositoryService.createProcessDefinitionQuery()
     * .processDefinitionKey("Process_031ohk4")
     * .latestVersion()
     * .singleResult();
     * 
     * // list all running/unsuspended instances of the process
     * List<ProcessInstance> processInstances =
     * runtimeService.createProcessInstanceQuery()
     * .processDefinitionId(myProcessDefinition.getId())
     * .active() // we only want the unsuspended process instances
     * .list();
     * 
     * if (processInstances.size() < 10) {
     * startProcessInstance();
     * }
     * 
     * try {
     * Thread.sleep(10000);
     * } catch (InterruptedException e) {
     * // TODO Auto-generated catch block
     * e.printStackTrace();
     * }
     * }
     * }
     * 
     * private void startProcessInstance() {
     * System.out.println("Starting instance");
     * Faker faker = new Faker();
     * 
     * String model = faker.code().isbn10();
     * Map<String, Object> ski = new HashMap<>();
     * ski.put("model", model);
     * 
     * Map<String, String> address = new HashMap<>();
     * address.put("street", faker.address().streetAddress());
     * address.put("zip", faker.address().zipCode());
     * address.put("city", faker.address().city());
     * address.put("country", faker.address().country());
     * 
     * Map<String, Object> customer = new HashMap<>();
     * customer.put("firstname", faker.name().firstName());
     * customer.put("lastname", faker.name().lastName());
     * customer.put("address", address);
     * 
     * Map<String, Object> data = new HashMap<>();
     * data.put("id", faker.code().ean13());
     * data.put("ski", ski);
     * data.put("customer", customer);
     * 
     * ProcessEngine processEngine = BpmPlatform.getDefaultProcessEngine();
     * RuntimeService runtimeService = processEngine.getRuntimeService();
     * //runtimeService.startProcessInstanceByKey("Process_031ohk4", data);
     * }
     * });
     * 
     * t.run();
     */
  }

}