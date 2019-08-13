<template>
	<el-aside :width="!isCollapse ? '200px' : '64px'">
		<slot/>
		<el-scrollbar>
			<el-menu
				:default-active="activePath"
				:collapse="isCollapse"
				unique-opened
				mode="vertical"
				background-color="#03152a"
				text-color="#bfcbd9"
				active-text-color="#fff">
				<side-item
					v-for="route in routes"
					:key="route.name"
					:item="route"
					:is-nest="true"
					:base-path="route.path"
				/>
				<side-item></side-item>
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<script lang="ts">
  import {computed} from "vue-function-api";
  import {Context} from "@/utils/interface";
	import sideItem from "./SidebarItem.vue";
	import {AppState} from "@/store/app";

  export default {
    name: "side-bar",
		components: {
      sideItem
		},
    setup(props: any, context: Context) {
      const sidebar = computed(() => AppState.sidebar);
      const activePath = computed(() => context.root.$route.path);
      const routes = computed(() => (context.root.$router as any).options.routes);
      const isCollapse = computed(() => sidebar.value.opened);
      return {
        activePath,
        isCollapse,
				routes
			}
    }
  }
</script>