const path = require('path')

exports.default = async (argv, command, pipeline) => {
    let file = require(`${path.join(process.cwd(), pipeline.options.file)}`)
    return await file[pipeline.name]({ argv, command })
}
