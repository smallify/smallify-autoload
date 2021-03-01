import { Smallify, PluginOptions, Route } from 'smallify'

export class AutoloadOptions extends PluginOptions {
  dir: string
  dirAsScope?: boolean
  ignorePattern?: RegExp
  indexPattern?: RegExp
  maxDepth?: number
}

export type SmallifyAutoloadRoute = (route: Route) => Route

export type SmallifyAutoload = {
  (smallify: Smallify, opts: AutoloadOptions): Promise<void>
  route: SmallifyAutoloadRoute
}
