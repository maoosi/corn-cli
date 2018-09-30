const shell = require('shelljs')
const log = require('consola')
const path = require('path')

exports.default = async (argv, command, pipeline) => {
    return new Promise((resolve) => {
        let cwd = process.cwd()

        let options = argv
        let custom = argv.custom

        shell.cd(path.join(cwd, pipeline.options.path))

        shell.exec(
            eval('`'+ pipeline.options.commands[command] + '`'),
            () => {
                shell.cd(cwd)
                log.success(`Pipeline "${pipeline.name}" executed`)
                resolve()
        })
    })
}
