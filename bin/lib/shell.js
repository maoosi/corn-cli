const shell = require('shelljs')
const log = require('consola')
const path = require('path')

exports.default = async (argv, command, task) => {
    return new Promise((resolve) => {
        let cwd = process.cwd()

        let options = argv
        let custom = argv.custom

        shell.cd(path.join(cwd, task.options.folder))

        shell.exec(
            eval('`'+ task.options.commands[command] + '`'),
            () => {
                shell.cd(cwd)
                log.success(`Task "${task.name}" executed`)
                resolve()
        })
    })
}
