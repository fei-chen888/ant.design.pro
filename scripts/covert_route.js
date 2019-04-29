const fs = require('fs')
const path = require('path')
const walk = require('walk')
const csv = require('csv-parser')
const prettier = require('prettier')
const _ = require('lodash')
const args = process.argv.splice(2)
const [filename] = args
function init() {
    const options = {
        followLinks: false,
        filters: []
    }
    const walker = walk.walk(path.resolve('src'), options)
    walker.on('file', function(base, name, next) {
        const routerReg = new RegExp(`${filename}_router?(_config)?.+?\.csv$`)
        if (routerReg.test(name.name)) {
            covertCSVtoRouteJson(path.resolve(base, name.name))
        }
        const menuReg = new RegExp(`${filename}_menus(_config)?.+?\.csv$`)
        if (menuReg.test(name.name)) {
            covertCSVtoMenuJSON(path.resolve(base, name.name))
        }
        next()
    })
}
/**
 * 转换为路由格式JSON
 * @param {*} csvFilePath
 */
function covertCSVtoRouteJson(csvFilePath) {
    const csvFileName = path.basename(csvFilePath)
    const tsFilePath = path.resolve(
        csvFilePath,
        '../../routes_config/' + csvFileName.substr(0, csvFileName.indexOf('_route')) + '_route_config.ts'
    )
    // const tsFilePath = csvFilePath.substr(0, csvFilePath.indexOf(path.extname(csvFilePath))) + '.ts'
    // console.log(tsFilePath)
    const result = []
    fs.createReadStream(csvFilePath, { encoding: 'utf-8' })
        .pipe(csv())
        .on('data', e => result.push(e))
        .on('end', () => {
            const content = JSON.stringify(result)
                .replace(/"component":"(\w+)"/g, 'component:$1')
                .replace(/"(true|false)"/g, '$1')
            const commit = `/** 
                * 此文件由 npm run create-route 自动生成步骤如下
                * 1. 扫描每个文件夹下的 *-router.csv 文件
                * 2. 将文件内容 由 csv -> json
                * 3. 最后还需要手动导入没有引入的模块
                */\n`
            const codes = prettier.format(commit + 'export default ' + content, { singleQuote: true })
            fs.writeFileSync(tsFilePath, codes)
        })
}
function covertCSVtoMenuJSON(filepath) {
    console.log(filepath)

    const tsFilePath = path.resolve(
        filepath,
        '../../' + path.basename(filepath).substr(0, path.basename(filepath).indexOf('_menus')) + '_menus.ts'
    )
    // console.log(tsFilePath)
    const result = []
    fs.createReadStream(filepath, { encoding: 'utf-8' })
        .pipe(csv())
        .on('data', e => result.push(e))
        .on('end', () => {
            const temp = result
                .filter(f => !f.parentkey)
                .map(v => ({ ...v, submenus: result.filter(f => f.parentkey === v.key) }))
            const content = JSON.stringify(temp)
            const commit = `/** 
                * 不要修改此文件!!
                * 此文件由 npm run create-route nav 自动生成
                * 步骤如下
                * 1. 扫描每个文件夹下的 *_menus.csv 文件
                * 2. 将文件内容 由 csv -> json
                */\n`
            const codes = prettier.format(commit + 'export default ' + content, { singleQuote: true })
            fs.writeFileSync(tsFilePath, codes)
            // console.log(codes)
        })
}
init()
