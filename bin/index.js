#! /usr/bin/env node

// dependencies
const log = require('consola')

// extract info from `corn.yml`
const cfg = require('./lib/config').default()
const options = require('./lib/options').default(cfg).options
const optionsUsage = require('./lib/options').default(cfg).optionsUsage
const tasks = require('./lib/tasks').default
const execShell = require('./lib/shell').default
const execNode = require('./lib/node').default

// async foreach
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array)
}

// start cli
let cli = require('yargs').options(options)

// add commands to cli
for (let command in cfg.commands) {
    cli.command({
        command: command,
        desc: cfg.commands[command],
        builder: (yargs) => {
            yargs
                .usage(`Usage: $0 <command> [options]`)
                .example(`$0 ${command}${optionsUsage}`)
        },
        handler: (argv) => {
            asyncForEach(
                tasks(argv, cfg),
                async (task) => {
                    if (task.options.type === 'shell') {
                        await execShell(argv, command, task)
                    } else if (task.options.type === 'node') {
                        let response = await execNode(argv, command, task)
                        argv.custom = Object.assign(argv.custom || {}, response)
                    }
                }
            )
        }
    })
}

// end cli
cli.help().argv
