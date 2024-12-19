import generatepkg from '@babel/generator'
import { parse } from '@babel/parser'
import traversepkg from '@babel/traverse'
import esbuild from 'esbuild'
import { nodeExternals } from 'esbuild-plugin-node-externals'
import postcss from 'esbuild-postcss'
import fs from 'fs/promises'
import glob from 'tiny-glob'

const traverse = traversepkg.default
const generate = generatepkg.default

const files = await glob('./pages/**/*.js', { filesOnly: true })

await esbuild
  .build({
    entryPoints: files,
    bundle: true,
    format: 'esm',
    outdir: 'out',
    platform: 'node',
    jsx: 'automatic',
    jsxImportSource: 'preact',
    target: 'node12',
    external: ['next', 'react', 'react-dom'],
    loader: {
      '.js': 'jsx',
    },
    plugins: [nodeExternals(), postcss()],
  })
  .catch(() => process.exit(1))

await esbuild.build({
  entryPoints: files,
  bundle: true,
  format: 'esm',
  outdir: 'out/client',
  platform: 'browser',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  loader: {
    '.js': 'jsx',
  },
  plugins: [
    {
      name: 'remove-server-code',
      setup(builder) {
        builder.onLoad({ filter: /\.jsx?$/ }, args => {
          const removeServerCode = async args => {
            const source = await fs.readFile(args.path, 'utf8')
            const ast = parse(source, {
              sourceType: 'module',
              plugins: ['jsx'],
            })

            const importedDependencies = new Set()
let defaultExportName
            traverse(ast, {
              ImportDeclaration(path) {
                path.node.specifiers.forEach(specifier => {
                  importedDependencies.add(specifier.local.name)
                })
              },
              ExportDefaultDeclaration(path){
              defaultExportName = path?.node?.declaration?.name??false
              },
              FunctionDeclaration(path) {
                if (path.node.id.name === 'getServerSideProps') {
                  const usedDependencies = new Set()
                  path.traverse({
                    Identifier(innerPath) {
                      if (importedDependencies.has(innerPath.node.name)) {
                        usedDependencies.add(innerPath.node.name)
                      }
                    },
                  })
                  path.remove()
                  ast.program.body = ast.program.body.filter(node => {
                    if (node.type === 'ImportDeclaration') {
                      return !node.specifiers.some(specifier => usedDependencies.has(specifier.local.name))
                    }
                    return true
                  })
                }
              },
            })

            const { code } = generate(ast)


            if(defaultExportName){
              return {
                contents: `import {hydrate} from "preact"
                  ${code}
                  const pageProps = JSON.parse(document.getElementById("pageProps").textContent)
                  hydrate(<${defaultExportName} {...pageProps} />,document.getElementById("app"))
                  `  ,
                loader: 'jsx',
              }
            }


            return {
              contents: code,
              loader: 'jsx',
            }
          }

          return removeServerCode(args)
        })
      },
    },
  ],
})
