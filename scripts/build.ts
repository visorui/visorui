import { resolve } from 'path'
import { build, InlineConfig } from 'vite'
import { copy, remove, readdirSync, statSync } from 'fs-extra'
import Vue from '@vitejs/plugin-vue'
import Dts from 'vite-plugin-dts'
import { $ } from 'zx'
import chalk from 'chalk'

const packagesDir = resolve(__dirname, '../packages')
const packages = readdirSync(packagesDir).filter((name) =>
  statSync(resolve(packagesDir, name)).isDirectory()
)

async function main() {
  for (const packageName of packages) {
    await buildPackage(packageName)
    await bundleDts(packageName)
  }

  remove('temp')
}

async function buildPackage(name: string) {
  console.log(chalk.bold.cyan(`Building package ${name}...`))

  try {
    await build(createPackageConfig(name))
    console.log(chalk.bold.green(`Successfully built package ${name}.`))
  } catch (e) {
    console.log(chalk.bold.red(`Failed while building package ${name}:\n${e}`))
  }
}

async function bundleDts(name: string) {
  await $`rollup -c --environment TARGET:${name}`
  const srcPath = resolve(__dirname, `../temp/${name}.d.ts`)
  const distPath = resolve(__dirname, `../packages/${name}/dist/${name}.d.ts`)
  await copy(srcPath, distPath)
}

function createPackageConfig(name: string): InlineConfig {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const pkg = require(resolve(packagesDir, name, 'package.json'))
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  return {
    build: {
      lib: {
        entry: resolve(packagesDir, name, 'src/index.ts'),
        formats: ['cjs', 'es'],
        fileName: (format) => `${name}.${format}.js`
      },
      rollupOptions: {
        external,
        output: {
          dir: resolve(packagesDir, name, 'dist')
        }
      },
      minify: false
    },
    plugins: [
      Vue(),
      Dts({
        tsConfigFilePath: resolve(__dirname, '../tsconfig.json'),
        outputDir: 'temp',
        include: [`packages/${name}`]
      })
    ]
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
