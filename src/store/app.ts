import Vue from "vue";
import Cookie from "js-cookie"

export const AppState = Vue.observable({
  sidebar: {
    opened: Cookie.get("sidebarStatus") === "closed",
    withoutAnimation: false
  }
});
export const AppModel = {
  ToggleSidebar(withoutAnimation: boolean) {
    if(withoutAnimation) {
      Cookie.set("sidebarStatus", "closed")
    }else {
      Cookie.set("sidebarStatus", "opened")
    }
    AppState.sidebar.opened = !AppState.sidebar.opened;
    AppState.sidebar.withoutAnimation = withoutAnimation
  }
};