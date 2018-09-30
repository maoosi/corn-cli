exports.default = (argv, cfg) => {
    let executionChain = []

    const addToChain = (pipename, pipe) => {
        if (pipe.type === 'pipeline') {
            pipe.flow.forEach(p => addToChain(p, cfg.pipelines[p]))
        } else {
            if (pipe.dependsOn) addToChain(pipe.dependsOn, cfg.pipelines[pipe.dependsOn])

            if (executionChain.findIndex(p => p.name === pipename) < 0) {
                executionChain.push({
                    name: pipename,
                    options: pipe
                })
            }
        }
    }

    addToChain(argv.pipeline, cfg.pipelines[argv.pipeline])

    return executionChain
}
