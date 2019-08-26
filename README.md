# 🌽 Corn CLI

🚨 Corn CLI has been deprecated, please use [Vīnm CLI](https://github.com/maoosi/vinm-cli).

## Installation

Clone repo and install cli on your local machine:

```bash
# cd at the root of `corn-cli` cloned repository
cd corn-cli

# symlink the package folder to your machine
yarn link
```

## Getting started

Given the below project structure:

```bash
.
|-- microservice1/
|   |-- serverless.yml
|-- microservice2/
|   |-- serverless.yml
|-- getCloudformationOutputs.js
```

**1. Create a `corn.yml` file at the root of your project:**

```yml
commands:
    deploy: Deploy my 2 serverless stacks
    remove: Remove my 2 serverless stacks

options:
    profile:
        required: true
        description: AWS profile
    region:
        required: true
        description: AWS region

tasks:

    microservice1:
        type: shell
        folder: microservice1
        commands:
            deploy: 'sls deploy --profile ${options.profile} --region ${options.region}'
            remove: 'sls remove --profile ${options.profile} --region ${options.region}'

    cloudformationOutputs:
        type: node
        file: getCloudformationOutputs.js

    microservice2:
        type: shell
        folder: microservice2
        commands:
            deploy: 'sls deploy --profile ${options.profile} --region ${options.region}'
            remove: 'sls remove --profile ${options.profile} --region ${options.region}'

pipelines:
    default:
        - microservice1
        - cloudformationOutputs
        - microservice2
```

**2. You can now run your pipelines using `corn`:**

```bash
# Corn CLI syntax
corn [command] [options]

# Run pipeline
corn deploy --profile default --region ap-southeast-2 --pipeline default
```
