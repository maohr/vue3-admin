<template>
	<el-container style="height: 100%;">
		<side-bar></side-bar>
		<el-container direction="vertical" style="height: 100%;">
			<nav-bar></nav-bar>
			<tags-view></tags-view>
			<app-main></app-main>
<!--			<router-view></router-view>-->
		</el-container>
	</el-container>
</template>

<script lang="ts">
  import {value} from "vue-function-api";
  import {Context} from "@/utils/interface";
  import sideBar from "./SideBar/index.vue";
  import navBar from "./NavBar.vue";
  import tagsView from "./TagsView.vue";
  import appMain from "./AppMain.vue"


  export default {
    name: "",
    components: {
      sideBar,
      navBar,
      tagsView,
      appMain
    },

    setup(props: any, context: Context) {
      return {

      }
    }
  }
</script>