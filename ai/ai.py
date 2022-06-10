import time
import os
from camunda.external_task.external_task import ExternalTask, TaskResult
from camunda.external_task.external_task_worker import ExternalTaskWorker


# configuration for the Client
default_config = {
    "maxTasks": 1,
    "lockDuration": 10000,
    "asyncResponseTimeout": 5000,
    "retries": 3,
    "retryTimeout": 5000,
    "sleepSeconds": 30
}

def genderToInt(gender) -> int:
    if gender == "M":
        return 0
    return 1

def skitypeToInt(skytype) -> int:
    if skytype == "racing":
        return 0
    if skytype == "freestyle":
        return 1
    if skytype == "freeride":
        return 2
    if skytype == "carving":
        return 3
    if skytype == "mountain":
        return 4
    if skytype == "allmountain":
        return 5
    return -1


def handle_task(task: ExternalTask) -> TaskResult:
    """
    This task handler you need to implement with your business logic.
    After completion of business logic call either task.complete() or task.failure() or task.bpmn_error()
    to report status of task to Camunda
    """
    # add your business logic here
    # ...
    print("task taken")

    gender = task.get_variable("gender")
    height = task.get_variable("height")
    level = task.get_variable("level")
    ski_type = task.get_variable("skitype")
    weight = task.get_variable("weight")

    # k*x + d
    ski_length = float(weight) * 0.75
    edge_radius = genderToInt(gender) * 0.4 + 0.5
    height_return = genderToInt(gender) + float(ski_length) / 100 + 5 + float(height) * 0.3
    skitype_int = skitypeToInt(ski_type)
    if ski_type == -1:
        task.failure("invalid skitype", "skitype " + ski_type + "could not be resolved", 0, 0)
    width = skitype_int + 10

    response = {
        "ski_length": ski_length,
        "edge_radius": edge_radius,
        "ski_height": height_return,
        "ski_width": width,
        "curvature_height_front": 20,
        "curvature_height_back": 20,
        "kernal_material": "metal",
        "outside_material": "wood"
    }

    print(response)
    return task.complete(response)

def random_true():
    current_milli_time = int(round(time.time() * 1000))
    return current_milli_time % 2 == 0

if __name__ == '__main__':
    ExternalTaskWorker(worker_id="1", base_url=os.environ['BASE_URL'],config=default_config).subscribe("PARALLEL_STEP_2", handle_task)