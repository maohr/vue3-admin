import Vue, {Component, VNode} from "vue";

export interface Context {
  readonly parent: Vue;
  readonly root: Vue;
  readonly refs: {
    [key: string]: Vue | Element | Vue[] | Element[] | any;
  };
  readonly slots: {
    [key: string]: VNode[] | undefined;
  };
  readonly attrs: Record<string, string>;
  emit(event: string, ...args: any[]): void;
}