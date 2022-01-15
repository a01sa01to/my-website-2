import { Route } from 'vue-router/types/router'

type PositionDescriptor =
  { x: number, y: number } |
  { selector: string } |
  void

type scrollBehaviorHandler = (
  to: Route,
  from: Route,
  savedPosition?: { x: number, y: number }
) => PositionDescriptor | Promise<PositionDescriptor>

const scrollBehavior: scrollBehaviorHandler = (to, _from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  else if (to.hash) {
    return { selector: to.hash }
  }
  else {
    return { x: 0, y: 0 }
  }
}

export default scrollBehavior
