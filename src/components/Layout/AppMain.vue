<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive :include="cacheList" v-if="$route.meta.keepAlive">
				<router-view></router-view>
			</keep-alive>
			<router-view v-else></router-view>
		</transition>
	</section>
</template>

<script lang="ts">
	import {computed, onCreated} from "vue-function-api";
	import {TagState} from "@/store/tags";

  export default  {
	  name: "app-main",
		setup() {
	    const cacheList = computed(() => TagState.cachedViews);
	    onCreated(() => {
	      console.log(cacheList.value)
			})
	    return {
	      cacheList
			}
		}
	}
</script>