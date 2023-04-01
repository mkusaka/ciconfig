import { z } from "zod";

const Workflow = z.object({
  jobs: z.array(z.string()),
  branches: z.record(z.boolean()),
  tags: z.record(z.boolean()),
  parameters: z.record(z.any()),
});

const Job = z.object({
  working_directory: z.string().optional(),
  parallelism: z.number().optional(),
  shell: z.string().optional(),
  environment: z.record(z.string()).optional(),
  resource_class: z.string().optional(),
  executor: z.string().optional(),
  machine: z.boolean().optional(),
  steps: z.array(z.any()).optional(),
  docker: z
    .array(
      z.object({
        image: z.string(),
        entrypoint: z.string().optional(),
        command: z.string().optional(),
        user: z.string().optional(),
        environment: z.record(z.string()).optional(),
        auth: z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .optional(),
      })
    )
    .optional(),
});

const Command = z.object({
  parameters: z.record(z.any()),
  steps: z.array(z.any()),
  description: z.string().optional(),
});

const Executor = z.object({
  docker: z
    .array(
      z.object({
        image: z.string(),
        entrypoint: z.string().optional(),
        command: z.string().optional(),
        user: z.string().optional(),
        environment: z.record(z.string()).optional(),
        auth: z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .optional(),
      })
    )
    .optional(),
  machine: z.boolean().optional(),
  environment: z.record(z.string()).optional(),
  resource_class: z.string().optional(),
  working_directory: z.string().optional(),
  shell: z.string().optional(),
});

const circleciConfig = z.object({
  version: z.number(),
  orbs: z.record(z.any()).optional(),
  workflows: z.record(Workflow).optional(),
  jobs: z.record(Job).optional(),
  commands: z.record(Command).optional(),
  executors: z.record(Executor).optional(),
  parameters: z.record(z.any()).optional(),
});

export default circleciConfig;
