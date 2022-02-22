import { types, Instance, flow } from 'mobx-state-tree';

export const NavigationStore = types.model({
  loading: types.boolean,
})
  .views(self => ({}))
  .actions(self => {
    return {};
  });

export type NavigationStore = Instance<typeof NavigationStore>;

export function initNavigationStore() {
  return NavigationStore.create({
    loading: false,
  });
}
