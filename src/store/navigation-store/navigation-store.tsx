import { types, Instance, flow } from 'mobx-state-tree';

export const NavigationStore = types.model({
  loading: types.boolean,
  loginValue: types.boolean
})
  .views(self => ({}))
  .actions(self => {
    // change login value for show login page or home page
    const changeLoginValue = (login: boolean) => {
      if (login == true) {
        self.loginValue = true;
      } else {
        self.loginValue = false;
      }
    };

    return {changeLoginValue};
  });

export type NavigationStore = Instance<typeof NavigationStore>;

export function initNavigationStore() {
  return NavigationStore.create({
    loading: false,
    loginValue: false,
  });
}
