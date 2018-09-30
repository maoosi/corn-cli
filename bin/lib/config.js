const log = require('consola')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

exports.default = () => {
    try {
        return yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), 'corn.yml'), 'utf8'))
    } catch (e) {
        log.error(`File "corn.yml" not found.`)
        process.exit()
    }
}
