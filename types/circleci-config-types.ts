/* eslint-disable */

export type Step =
  | "checkout"
  | "setup_remote_docker"
  | "add_ssh_keys"
  | string
  | {
      run?:
        | string
        | {
            /**
             * Command to run via the shell
             */
            command: string;
            /**
             * Title of the step to be shown in the CircleCI UI (default: full `command`)
             */
            name?: string;
            /**
             * Shell to use for execution command
             */
            shell?: string;
            /**
             * Additional environmental variables, locally scoped to command
             */
            environment?: {
              [k: string]: string | number;
            };
            /**
             * Whether or not this step should run in the background (default: false)
             */
            background?: boolean;
            /**
             * In which directory to run this step (default: `working_directory` of the job
             */
            working_directory?: string;
            /**
             * Elapsed time the command can run without output. The string is a decimal with unit suffix, such as "20m", "1.25h", "5s" (default: 10 minutes)
             */
            no_output_timeout?: string;
            /**
             * Specify when to enable or disable the step. Takes the following values: `always`, `on_success`, `on_fail` (default: `on_success`)
             */
            when?: "always" | "on_success" | "on_fail";
          };
      checkout?: Checkout;
      setup_remote_docker?: SetupRemoteDocker;
      save_cache?: SaveCache;
      restore_cache?:
        | {
            /**
             * Single cache key to restore
             */
            key: string;
            /**
             * Title of the step to be shown in the CircleCI UI (default: 'Restoring Cache')
             */
            name?: string;
          }
        | {
            /**
             * Title of the step to be shown in the CircleCI UI (default: 'Restoring Cache')
             */
            name?: string;
            /**
             * List of cache keys to lookup for a cache to restore. Only first existing key will be restored.
             */
            keys: string[];
          };
      deploy?:
        | string
        | {
            /**
             * Command to run via the shell
             */
            command: string;
            /**
             * Title of the step to be shown in the CircleCI UI (default: full `command`)
             */
            name?: string;
            /**
             * Shell to use for execution command
             */
            shell?: string;
            /**
             * Additional environmental variables, locally scoped to command
             */
            environment?: {
              [k: string]: string | number;
            };
            /**
             * Whether or not this step should run in the background (default: false)
             */
            background?: boolean;
            /**
             * In which directory to run this step (default: `working_directory` of the job
             */
            working_directory?: string;
            /**
             * Elapsed time the command can run without output. The string is a decimal with unit suffix, such as "20m", "1.25h", "5s" (default: 10 minutes)
             */
            no_output_timeout?: string;
            /**
             * Specify when to enable or disable the step. Takes the following values: `always`, `on_success`, `on_fail` (default: `on_success`)
             */
            when?: "always" | "on_success" | "on_fail";
          };
      store_artifacts?: StoreArtifacts;
      store_test_results?: StoreTestResults;
      persist_to_workspace?: PersistToWorkspace;
      attach_workspace?: AttachWorkspace;
      add_ssh_keys?: AddSshKeys;
      when?: When;
      unless?: Unless;
      [k: string]: unknown;
    };
export type Checkout = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Checkout directory (default: job's `working_directory`)
   */
  path?: string;
};
export type SetupRemoteDocker = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * When `docker_layer_caching` is set to `true`, CircleCI will try to reuse Docker Images (layers) built during a previous job or workflow (Paid feature)
   */
  docker_layer_caching?: boolean;
  /**
   * If your build requires a specific docker image, you can set it as an image attribute
   */
  version?:
    | "20.10.18"
    | "20.10.17"
    | "20.10.14"
    | "20.10.12"
    | "20.10.11"
    | "20.10.7"
    | "20.10.6"
    | "20.10.2"
    | "19.03.13";
};
export type SaveCache = {
  /**
   * List of directories which should be added to the cache
   */
  paths: string[];
  /**
   * Unique identifier for this cache
   */
  key: string;
  /**
   * Title of the step to be shown in the CircleCI UI (default: 'Saving Cache')
   */
  name?: string;
  /**
   * Specify when to enable or disable the step. Takes the following values: `always`, `on_success`, `on_fail` (default: `on_success`)
   */
  when?: "always" | "on_success" | "on_fail";
};
export type StoreArtifacts = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Directory in the primary container to save as job artifacts
   */
  path: string;
  /**
   * Prefix added to the artifact paths in the artifacts API (default: the directory of the file specified in `path`)
   */
  destination?: string;
};
export type StoreTestResults = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Path (absolute, or relative to your `working_directory`) to directory containing subdirectories of JUnit XML or Cucumber JSON test metadata files
   */
  path: string;
};
export type PersistToWorkspace = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Either an absolute path or a path relative to `working_directory`
   */
  root: string;
  /**
   * Glob identifying file(s), or a non-glob path to a directory to add to the shared workspace. Interpreted as relative to the workspace root. Must not be the workspace root itself.
   */
  paths: string[];
};
export type AttachWorkspace = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Directory to attach the workspace to
   */
  at: string;
};
export type AddSshKeys = {
  /**
   * Title of the step to be shown in the CircleCI UI
   */
  name?: string;
  /**
   * Directory to attach the workspace to
   */
  fingerprints?: string[];
};
export type When = {
  condition: Logical;
  /**
   * A list of steps to be performed
   */
  steps: Step[];
};
/**
 * https://circleci.com/docs/configuration-reference#logic-statements
 *
 * A logical statement to be used in dynamic configuration
 */
export type Logical = string | boolean | number;
export type Unless = {
  condition: Logical;
  /**
   * A list of steps to be performed
   */
  steps: Step[];
};
export type ExecutorChoice = {
  /**
   * Amount of CPU and RAM allocated to each container in a job. Note: A performance plan is required to access this feature.
   */
  resource_class?:
    | "small"
    | "medium"
    | "medium+"
    | "large"
    | "xlarge"
    | "2xlarge"
    | "2xlarge+"
    | "gpu.nvidia.small"
    | "gpu.nvidia.medium"
    | "windows.gpu.nvidia.medium"
    | "macos.x86.medium.gen2"
    | "macos.x86.metal.gen1";
  /**
   * Shell to use for execution command in all steps. Can be overridden by shell in each step (default: See [Default Shell Options](https://circleci.com/docs/configuration-reference#default-shell-options)
   */
  shell?: string;
  /**
   * In which directory to run the steps.
   */
  working_directory?: string;
  /**
   * A map of environment variable names and values.
   */
  environment?: {
    [k: string]: string | number;
  };
} & (
  | {
      docker: DockerExecutor;
    }
  | {
      machine: MachineExecutor;
    }
  | {
      /**
       * Use the default machine executor image
       */
      machine: boolean;
    }
  | {
      macos: MacosExecutor;
    }
);
/**
 * Options for the [docker executor](https://circleci.com/docs/configuration-reference#docker)
 */
export type DockerExecutor = {
  /**
   * The name of a custom docker image to use
   */
  image: string;
  /**
   * The name the container is reachable by. By default, container services are accessible through `localhost`
   */
  name?: string;
  /**
   * The command used as executable when launching the container
   */
  entrypoint?: string | string[];
  /**
   * The command used as pid 1 (or args for entrypoint) when launching the container
   */
  command?: string | string[];
  /**
   * Which user to run the command as
   */
  user?: string;
  /**
   * A map of environment variable names and values
   */
  environment?: {
    [k: string]: string | number | boolean;
  };
  /**
   * Authentication for registries using standard `docker login` credentials
   */
  auth?: {
    username?: string;
    password?: string;
  };
  /**
   * Authentication for AWS EC2 Container Registry (ECR)
   */
  aws_auth?: {
    aws_access_key_id?: string;
    aws_secret_access_key?: string;
  };
}[];
export type ExecutorChoice1 =
  | {
      docker: DockerExecutor;
      steps: Step[];
    }
  | {
      machine: MachineExecutor;
      steps: Step[];
    }
  | {
      /**
       * Use the default machine executor image
       */
      machine: boolean;
      steps: Step[];
    }
  | {
      macos: MacosExecutor;
      steps: Step[];
    };

export interface JSONSchemaForCircleCIConfigurationFiles {
  /**
   * The version field is intended to be used in order to issue warnings for deprecation or breaking changes.
   */
  version: 2 | 2.1;
  orbs?: Orbs;
  commands?: Commands;
  executors?: Executors;
  jobs?: Jobs;
  /**
   * Used for orchestrating all jobs. Each workflow consists of the workflow name as a key and a map as a value
   */
  workflows?: {
    /**
     * The Workflows `version` field is used to issue warnings for deprecation or breaking changes during v2 Beta. It is deprecated as of CircleCI v2.1
     */
    version: 2;
    [k: string]:
      | {
          /**
           * Specifies which triggers will cause this workflow to be executed. Default behavior is to trigger the workflow when pushing to a branch.
           */
          triggers?: {
            /**
             * A workflow may have a schedule indicating it runs at a certain time, for example a nightly build that runs every day at 12am UTC:
             */
            schedule?: {
              /**
               * See the [crontab man page](http://pubs.opengroup.org/onlinepubs/7908799/xcu/crontab.html)
               */
              cron?: string;
              /**
               * A map defining rules for execution on specific branches
               */
              filters?: {
                branches?: Filter;
              };
            };
          }[];
          jobs?: (
            | string
            | {
                [k: string]: JobRef;
              }
          )[];
          /**
           * https://circleci.com/docs/configuration-reference#logic-statements
           *
           * A logical statement to be used in dynamic configuration
           */
          when?: string | boolean | number;
          /**
           * https://circleci.com/docs/configuration-reference#logic-statements
           *
           * A logical statement to be used in dynamic configuration
           */
          unless?: string | boolean | number;
        }
      | number;
  };
}

/**
 * https://circleci.com/docs/configuration-reference#orbs-requires-version-21
 *
 * Orbs are reusable packages of CircleCI configuration that you may share across projects, enabling you to create encapsulated, parameterized commands, jobs, and executors that can be used across multiple projects.
 */
export interface Orbs {
  [k: string]:
    | string
    | {
        orbs?: Orbs;
        commands?: Commands;
        executors?: Executors;
        jobs?: Jobs;
      };
}

/**
 * https://circleci.com/docs/configuration-reference#commands-requires-version-21
 *
 * A command definition defines a sequence of steps as a map to be executed in a job, enabling you to reuse a single command definition across multiple jobs.
 */
export interface Commands {
  /**
   * https://circleci.com/docs/configuration-reference#commands-requires-version-21
   *
   * Definition of a custom command.
   */
  [k: string]: {
    /**
     * A sequence of steps run inside the calling job of the command.
     */
    steps: Step[];
    /**
     * https://circleci.com/docs/reusing-config#using-the-parameters-declaration
     *
     * A map of parameter keys.
     */
    parameters?: {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^[a-z][a-z0-9_-]+$".
       */
      [k: string]:
        | {
            type: "string";
            description?: string;
            default?: string;
          }
        | {
            type: "boolean";
            description?: string;
            default?: boolean;
          }
        | {
            type: "integer";
            description?: string;
            default?: number;
          }
        | {
            type: "enum";
            /**
             * @minItems 1
             */
            enum: [string, ...string[]];
            description?: string;
            default?: string;
          }
        | {
            type: "executor";
            description?: string;
            default?: string;
          }
        | {
            type: "steps";
            description?: string;
            default?: Step[];
          }
        | {
            type: "env_var_name";
            description?: string;
            default?: string;
          };
    };
    /**
     * A string that describes the purpose of the command.
     */
    description?: string;
  };
}

/**
 * Executors define the environment in which the steps of a job will be run, allowing you to reuse a single executor definition across multiple jobs.
 */
export interface Executors {
  [k: string]: ExecutorChoice;
}

/**
 * Options for the [machine executor](https://circleci.com/docs/configuration-reference#machine)
 */
export interface MachineExecutor {
  /**
   * The VM image to use. View [available images](https://circleci.com/docs/configuration-reference#available-machine-images). **Note:** This key is **not** supported on the installable CircleCI. For information about customizing machine executor images on CircleCI installed on your servers, see our [VM Service documentation](https://circleci.com/docs/vm-service).
   */
  image: string;
  /**
   * Set to `true` to enable [Docker Layer Caching](https://circleci.com/docs/docker-layer-caching). Note: If you haven't already, you must open a support ticket to have a CircleCI Sales representative contact you about enabling this feature on your account for an additional fee.
   */
  docker_layer_caching?: boolean & string;
}

/**
 * Options for the [macOS executor](https://circleci.com/docs/configuration-reference#macos)
 */
export interface MacosExecutor {
  /**
   * The version of Xcode that is installed on the virtual machine, see the [Supported Xcode Versions section of the Testing iOS](https://circleci.com/docs/testing-ios#supported-xcode-versions) document for the complete list.
   */
  xcode: number | string;
}

/**
 * Jobs are collections of steps. All of the steps in the job are executed in a single unit, either within a fresh container or VM.
 */
export interface Jobs {
  [k: string]:
    | ExecutorChoice1
    | {
        /**
         * The name of the executor to use (defined via the top level executors map).
         */
        executor: string;
      }
    | {
        /**
         * Executor stanza to use for the job
         */
        executor: {
          /**
           * The name of the executor to use (defined via the top level executors map).
           */
          name: string;
        };
      };
}

/**
 * A map defining rules for execution on specific branches
 */
export interface Filter {
  /**
   * Either a single branch specifier, or a list of branch specifiers
   */
  only?: string | string[];
  /**
   * Either a single branch specifier, or a list of branch specifiers
   */
  ignore?: string | string[];
}

/**
 * Run a job as part of this workflow
 */
export interface JobRef {
  /**
   * Jobs are run in parallel by default, so you must explicitly require any dependencies by their job name.
   */
  requires?: string[];
  /**
   * The name key can be used to ensure build numbers are not appended when invoking the same job multiple times (e.g., sayhello-1, sayhello-2). The name assigned needs to be unique, otherwise numbers will still be appended to the job name
   */
  name?: string;
  /**
   * Either a single context name, or a list of contexts. The default name is `org-global`
   */
  context?: string | string[];
  /**
   * A job may have a `type` of `approval` indicating it must be manually approved before downstream jobs may proceed.
   */
  type?: "approval";
  /**
   * A map defining rules for execution on specific branches
   */
  filters?: {
    branches?: Filter;
    tags?: Filter;
  };
  /**
   * https://circleci.com/docs/configuration-reference#matrix-requires-version-21
   *
   * The matrix stanza allows you to run a parameterized job multiple times with different arguments.
   */
  matrix?: {
    /**
     * A map of parameter names to every value the job should be called with
     */
    parameters: {
      [k: string]: unknown[];
    };
    /**
     * A list of argument maps that should be excluded from the matrix
     */
    exclude?: {
      [k: string]: unknown;
    }[];
    /**
     * An alias for the matrix, usable from another job's requires stanza. Defaults to the name of the job being executed
     */
    alias?: string;
  };
}
