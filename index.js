const { readdir } = require('fs').promises
const path = require('path')

const kAutoloadRoute = Symbol('smallify.autoload.route')

const defaults = {
  scriptPattern: /((^.?|\.[^d]|[^.]d|[^.][^d])\.ts|\.js|\.cjs|\.mjs)$/i,
  indexPattern: /^index(\.ts|\.js|\.cjs|\.mjs)$/i,
  dirAsScope: true
}

async function loadDirents (smallify, dir, depth, opts) {
  const {
    indexPattern,
    ignorePattern,
    scriptPattern,
    maxDepth,
    dirAsScope
  } = opts

  const list = await readdir(dir, { withFileTypes: true })

  const idxDirent = list.find(dirent => indexPattern.test(dirent.name))
  if (idxDirent) {
    const file = path.join(dir, idxDirent.name)
    smallify.register(require(file))
    return
  }

  for (const dirent of list) {
    if (ignorePattern && dirent.name.match(ignorePattern)) {
      continue
    }

    const isMaxDepth = Number.isFinite(maxDepth) && maxDepth <= depth
    const file = path.join(dir, dirent.name)
    if (dirent.isDirectory() && !isMaxDepth) {
      if (dirAsScope === true) {
        // new scope
        smallify.register(
          async ins => {
            // recursion
            await loadDirents(ins, file, depth + 1, opts)
          },
          {
            name: dirent.name,
            prefix: `/${dirent.name}`
          }
        )
      } else {
        // recursion
        await loadDirents(smallify, file, depth + 1, opts)
      }
    } else if (idxDirent) {
      continue
    }

    if (dirent.isFile() && scriptPattern.test(dirent.name)) {
      const mod = require(file)
      if (mod[kAutoloadRoute] === true) {
        const ex = path.extname(dirent.name)
        mod.url = `/${dirent.name.replace(ex, '')}`
        mod.$IsAutoload = true
        smallify.route(mod)
      } else {
        smallify.register(mod)
      }
    }
  }
}

module.exports = async function (smallify, options) {
  const opts = { ...defaults, ...options }

  smallify.addHook('onRoute', function (route) {
    const { url, $IsAutoload = false } = route

    if ($IsAutoload) {
      route.url = url.replace(/\/_/g, '/:')
    }
  })

  await loadDirents(smallify, opts.dir, 0, opts)
}

module.exports.route = function (route) {
  route[kAutoloadRoute] = true
  return route
}
