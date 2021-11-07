import { resolve } from 'path'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

const packageName = process.env.TARGET

if (!packageName) {
  throw new Error(
    'Package name needs to be specified as env variable `TARGET`.'
  )
}

/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require(resolve(__dirname, `packages/${packageName}/package.json`))
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]

const config = defineConfig({
  input: `temp/packages/${packageName}/src/index.d.ts`,
  output: {
    file: `temp/${packageName}.d.ts`,
    format: 'es'
  },
  plugins: [dts()],
  external
})

export default config
