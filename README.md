# 🌽 Corn CLI

> Work in progress

## Getting started (Work in progress)

**1. Clone repo and install cli on your local machine:**

```bash
cd corn-cli
yarn link
```

**2. Create a `corn.yml` file at the root of your project:**

Example below is to manage two serverless stacks as:

- `microservice1/serverless.yml`
- `microservice2/serverless.yml`

```yml
commands:
    deploy:
        description: Deploy my 2 serverless stacks
    remove:
        description: Remove my 2 serverless stacks

options:
    profile:
        required: true
        description: AWS profile
    region:
        required: true
        description: AWS region

pipelines:

    default:
        type: pipeline
        flow:
            - microservice1
            - microservice2

    microservice1:
        type: shell
        path: ./microservice1/
        commands:
            deploy: 'sls deploy --profile ${options.profile} --region ${options.region}'
            remove: 'sls remove --profile ${options.profile} --region ${options.region}'

    microservice2:
        dependsOn: microservice1
        type: shell
        path: ./microservice2/
        commands:
            deploy: 'sls deploy --profile ${options.profile} --region ${options.region}'
            remove: 'sls remove --profile ${options.profile} --region ${options.region}'
```

**3. You can now run your pipelines using `corn`:**

```bash
# Corn CLI syntax
corn [command] [options]

# Run default pipeline
corn deploy --profile default --region ap-southeast-2

# Run `microservice1` only
corn deploy --profile default --region ap-southeast-2 --pipeline microservice1

# Run `microservice2` only (because of dependency, `microservice1` will automatically run first)
corn deploy --profile default --region ap-southeast-2 --pipeline microservice2
```
