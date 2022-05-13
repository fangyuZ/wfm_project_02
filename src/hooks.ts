import { camunda } from '$lib/server/camunda';
import { handler as queueOrderHandler } from '$lib/server/workers/queueOrder';

camunda.createWorker('queue-order', queueOrderHandler)
