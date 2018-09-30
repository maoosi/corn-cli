exports.default = (cfg) => {
    let optionsUsage = ''
    let defaultPipelineExist = typeof cfg.pipelines.default !== 'undefined'

    let options = {
        'pipeline': {
            describe: 'Pipeline(s) to run',
            demandOption: !defaultPipelineExist
        }
    }

    if (defaultPipelineExist) options['pipeline']['default'] = 'default'
    else optionsUsage += ` --pipeline [pipeline]`

    for (let option in cfg.options) {
        options[option] = {
            describe: cfg.options[option].description || options[option],
            demandOption: cfg.options[option].required || false
        }

        if (options[option]['demandOption']) optionsUsage += ` --${option} [${option}]`
    }

    return { options, optionsUsage }
}
