const fs = require('fs')
const path = require('path')
const walk = require('walk')
const csv = require('csv-parser')
const crypto = require('crypto')
const _ = require('lodash')
const args = process.argv.splice(2)
const [filepath] = args
function init() {
    const options = {
        followLinks: false,
        filters: []
    }
    const walker = walk.walk(path.resolve(filepath), options)
    walker.on('file', function(base, name, next) {
        const routerReg = new RegExp(``)
        if (/permissible.+?\.csv$/.test(name.name)) {
            // console.log(name.name)
            id2number(path.resolve(base, name.name))
        }
        next()
    })
}
function id2number(csvFilePath) {
    const source = path.basename(csvFilePath)
    const target = path.resolve(
        csvFilePath,
        '../result/' + source.substr(0, source.indexOf('_permissible')) + '_permissible.csv'
    )
    const result = []
    fs.createReadStream(csvFilePath, { encoding: 'utf-8' })
        .pipe(csv())
        .on('data', e => {
            e.id = parseInt(
                crypto
                    .createHash('md5')
                    .update(e.id)
                    .digest('hex')
                    .substr(0, 8),
                16
            )
            e.parent_id = parseInt(
                crypto
                    .createHash('md5')
                    .update(e.parent_id)
                    .digest('hex')
                    .substr(0, 8),
                16
            )
            result.push(e)
        })
        .on('end', () => {
            // const content = JSON.stringify(result)
            const content = result
                .map(v =>
                    _(v)
                        .map(value => value)
                        .join(',')
                )
                .join('\n')

            fs.writeFileSync(target, content)
        })
    console.log(target)
}
init()
