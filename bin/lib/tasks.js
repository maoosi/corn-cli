const flattenDeep = require('lodash.flattendeep')

const getTasks = (list, cfg) => {
    return list.map((el) => {
        return typeof cfg.tasks[el] !== 'undefined'
            ? { name: el, options: cfg.tasks[el] }
            : getTasks(cfg.pipelines[el], cfg)
    })
}

exports.default = (argv, cfg) => {
    return flattenDeep(getTasks(cfg.pipelines[argv.pipeline], cfg))
}
