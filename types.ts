// inherit fromschemastore/src/schemas/json/circleciconfig.json

// The version field is intended to be used in order to issue warnings for deprecation or breaking changes.
// Default value: 2.1
type Version = 2 | 2.1;

// Used for orchestrating all jobs. Each workflow consists of the workflow name as a key and a map as a value.
type Workflows = {
  version?: number;
  workflows: { [workflowName: string]: Workflow };
};

type Filters = {
  tags?: {
    only?: string;
  };
};

export type CircleCIConfig = {
  version: Version;
  setup?: boolean;
  orbs?: Orbs;
  jobs: Jobs;
  workflows?: Workflows;
  commands?: Commands;
  executors?: Executors;
};

type Orbs = {
  [key: string]: Orb;
};

type Orb = OrbDefinition | string;

type OrbDefinition = {
  commands?: Commands;
  executors?: Executors;
  jobs?: Jobs;
  description?: string;
};

type Commands = {
  [key: string]: Command;
};

type Command = {
  description?: string;
  parameters?: {
    [key: string]: Parameter;
  };
  steps: (Step | string)[];
};

type Executors = {
  [key: string]: Executor;
};

type Executor = {
  description?: string;
  docker?: Docker[];
  environment?: Environment;
};

type Jobs = {
  [key: string]: Job;
};

type Job = {
  // The user-defined name of the primary container.
  name?: string;
  // The Docker image to use for this primary container.
  docker?: Docker[];
  // Define one or more secondary container(s) in which to run processes alongside the primary container.
  parallelism?: number;
  // Specifies the number of times the job should be run in parallel.
  steps: (Step | string)[];
};

type Docker = {
  image: string;
  auth?: {
    username: string;
    password: string;
  };
  environment?: Environment;
};

type Environment = {
  [key: string]: string;
};

type Workflow = {
  jobs: (WorkflowJob | string)[];
};

type WorkflowJob = {
  job: string;
  // Specifies the workflow execution order.
  requires?: string[];
};

type Step = {
  run?: string;
  name?: string;
  // The command to run in the step.
  // String pattern: "^[\w./:-]+$"
  command?: string;
  // Specifies that the step runs without any environment variables.
  // Default value: "10m"
  no_output_timeout?: string;
  // The step’s overall status will not affect the job’s status.
  when?: "always" | "on_success" | "on_fail";
};

type Parameter = {
  type: "string" | "integer" | "boolean" | "enum" | "executor" | "steps";
  default?: string | number | boolean | any[];
  // Minimum value: 0
  // Maximum value: 2147483647
  min?: number;
  max?: number;
  // String pattern: "^[\w/-]+$"
  description?: string;
  enum?: (string | number)[];
};
