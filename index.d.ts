import { Smallify } from 'smallify'

import { AutoloadOptions, SmallifyAutoload } from './types/options'

declare const autoload: SmallifyAutoload

export = autoload

declare module 'smallify' {
  interface SmallifyPlugin {
    (plugin: SmallifyAutoload, opts: AutoloadOptions): Smallify
  }
}
