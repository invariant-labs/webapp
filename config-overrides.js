const tsconfigPaths = require('./tsconfig.paths.json')['compilerOptions']['paths']
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const path = require('path')

const alias = {}
const resolve = dir => path.resolve(__dirname, dir)
const removeSlashStar = arg => arg.split('/*')[0]

Object.entries(tsconfigPaths).forEach(([key, [value]]) => {
  const name = removeSlashStar(key)
  const path = removeSlashStar(value)

  alias[name] = resolve(path)
})

module.exports = function (config, env) {
  config = rewireReactHotLoader(config, env)
  config.resolve.alias = Object.assign(config.resolve.alias, alias)

  return config
}
