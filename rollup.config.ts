import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import { resolve } from 'path'

const packageName = process.env.TARGET

if (!packageName) {
  throw new Error(
    'Package name needs to be specified as env variable `TARGET`.'
  )
}

const packageDir = resolve('packages', packageName)

const config = defineConfig({
  input: `temp/packages/${packageName}/src/index.d.ts`,
  output: {
    file: `temp/${packageName}.d.ts`,
    format: 'es'
  },
  plugins: [dts()]
})

export default config
