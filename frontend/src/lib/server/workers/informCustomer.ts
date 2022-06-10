export async function handler({ task, taskService }: any) {
    console.log('Sending customer notification')
    // Put your business logic
    // complete the task

    await new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(taskService.complete(task))
        }, 5000)
    })
}