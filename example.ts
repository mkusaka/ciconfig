import { type JSONSchemaForCircleCIConfigurationFiles } from "./types/circleci-config-types";
import { dump } from "js-yaml";
import fs from "fs";

const config: JSONSchemaForCircleCIConfigurationFiles = {
  version: 2.1,
  jobs: {
    build: {
      docker: [
        {
          image: "circleci/<language>:<version TAG>",
          auth: {
            username: "mydockerhub-user",
            password: "$DOCKERHUB_PASSWORD",
          },
        },
      ],
      steps: [
        "checkout",
        "setup_remote_docker",
        {
          setup_remote_docker: {
            version: "20.10.18",
          },
        },
        {
          run: 'echo "this is the build job"',
        },
      ],
    },
    test: {
      docker: [
        {
          image: "circleci/<language>:<version TAG>",
          auth: {
            username: "mydockerhub-user",
            password: "$DOCKERHUB_PASSWORD",
          },
        },
      ],
      steps: [
        "add_ssh_keys",
        {
          run: 'echo "this is the test job"',
        },
      ],
    },
  },
  workflows: {
    version: 2,
    build_and_test: {
      jobs: ["build", "test"],
    },
  },
};

fs.writeFileSync("output.yaml", dump(config));
