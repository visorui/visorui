import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

const packageName = process.env.TARGET

if (!packageName) {
  throw new Error(
    'Package name needs to be specified as env variable `TARGET`.'
  )
}

const config = defineConfig({
  input: `temp/packages/${packageName}/src/index.d.ts`,
  output: {
    file: `temp/${packageName}.d.ts`,
    format: 'es'
  },
  plugins: [dts()]
})

export default config
