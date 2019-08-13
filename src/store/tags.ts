import Vue from "vue";
import {Route} from "vue-router";

export const TagState = Vue.observable({
  visitedViews: [] as Route[],
  cachedViews: [] as string[]
});

export const TagModel = {
  AddVisitedViews(view: Route) {
    if(TagState.visitedViews.some(v => v.path === view.path)) {
      const _item: Route | undefined = TagState.visitedViews.find((item: Route) => item.path === view.path);
      if(!!_item) _item.query = view.query;
      return;
    }
    TagState.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name"
      })
    );
    if(view.meta.keepAlive) {
      TagState.cachedViews.push(view.name || "")
    }
  },
  DelVisitedViews(view: Route) {
    return new Promise(resolve => {
      for (const [i, v] of TagState.visitedViews.entries()) {
        if (v.path === view.path) {
          TagState.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of TagState.cachedViews) {
        if (i === view.name) {
          const index = TagState.cachedViews.indexOf(i);
          TagState.cachedViews.splice(index, 1);
          break;
        }
      }
      resolve()
    })
  },
  DelOthersViews(view: Route) {
    return new Promise(resolve => {
      for (const [i, v] of TagState.visitedViews.entries()) {
        if (v.path === view.path) {
          TagState.visitedViews = TagState.visitedViews.slice(i, i + 1);
          break;
        }
      }
      for (const i of TagState.cachedViews) {
        if (i === view.name) {
          const index = TagState.cachedViews.indexOf(i);
          TagState.cachedViews = TagState.cachedViews.slice(index, index + 1);
          break;
        }
      }
      resolve()
    })
  },
  DelAllViews() {
    TagState.visitedViews = [];
    TagState.cachedViews = []
  }
};