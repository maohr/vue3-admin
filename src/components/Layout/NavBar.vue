<template>
	<el-header>
		<i :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold': isCollapse}" @click="toggleCollapse" class="v-header-collapse-icon"></i>
		<v-spacer/>
	</el-header>
</template>

<script lang="ts">
  import {value, computed, onCreated} from "vue-function-api";
  import {Context} from "@/utils/interface";
  import {AppState, AppModel} from "@/store/app";

  export default {
    name: "nav-bar",

    setup(props: any, context: Context) {
      const sidebar = computed(() => AppState.sidebar);
      const isCollapse = computed(() => sidebar.value.opened);
      const toggleCollapse = () => AppModel.ToggleSidebar(!isCollapse.value);
      onCreated(() => {
        window.onresize = (e: Event) => {
          // if(e.target)
				}
			});
      return {
        isCollapse,
        toggleCollapse
			}
    }
  }
</script>