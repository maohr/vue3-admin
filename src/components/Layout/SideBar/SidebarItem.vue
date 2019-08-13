<template>
	<div v-if="item.children">
		<template v-if="hasOneShowingChild(item.children)">
			<a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path, $event)" rel="noopener">
				<el-menu-item :index="resolvePath(onlyOneChild.path)">
					<item
						v-if="onlyOneChild.meta"
						:icon="onlyOneChild.meta.icon"
						:title="onlyOneChild.meta.title"
					></item>
				</el-menu-item>
			</a>
		</template>
		<el-submenu v-else :index="item.path">
			<template slot="title">
				<item
					v-if="item.meta"
					:icon="item.meta.icon"
					:title="item.meta.title"></item>
			</template>
			<template v-for="child in item.children">
				<side-item
					v-if="child.children && child.children.length > 0"
					:is-nest="true"
					:item="child"
					:key="child.path"
					:base-path="resolvePath(child.path)"
				></side-item>
				<a
					v-else
					:href="child.path"
					:key="child.name"
					target="_blank"
					rel="noopener"
					@click="clickLink(child.path, $event)"
				>
					<el-menu-item :index="resolvePath(child.path)">
						<item
							v-if="child.meta"
							:icon="child.meta.icon"
							:title="child.meta.title"
						/>
					</el-menu-item>
				</a>
			</template>
		</el-submenu>
	</div>
</template>

<script lang="ts">
  import {value} from "vue-function-api";
  import {Context} from "@/utils/interface";
  import Item from "./Item.vue";
  import {Route} from "vue-router"
	const path = require("path");
  interface Props {
    basePath: string
	}

  export default {
    name: "sideItem",
		props: {
      item: {
        type: Object,
				default: function () {
					return {} as Route
        }
			},
      isNest: {
        type: Boolean,
				default: function () {
					return false
        }
			},
      basePath: {
        type: String,
				default: function () {
					return ""
        }
			}
		},
		components: {
      Item
		},

    setup(props: Props, context: Context) {
      const onlyOneChild = value(null as Route | null);
      const hasOneShowingChild = (children: Route[]) => {
        if(!children) {
          return false
				}
        const showingChildren = children.filter((item: Route) => {
          if(item.meta && item.meta.hidden) {
            return false
					}else {
            onlyOneChild.value = item;
            return true
					}
				});
        return showingChildren.length === 1
			};
      const resolvePath = (routePath: string) => {
        return path.resolve(props.basePath, routePath);
			};
      const validateURL = (textval: string) => {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
			};
      const isExternalLink = (routePath: string) => {
        return validateURL(routePath);
      };
      const clickLink = (routePath: string, e: Event) => {
        if (!isExternalLink(routePath)) {
          e.preventDefault();
					const fullPath = `${props.basePath}/${routePath}`;
          context.root.$router.push(resolvePath(fullPath));
        }
			};
      return {
        onlyOneChild,
        hasOneShowingChild,
        resolvePath,
        clickLink
			}
    }
  }
</script>