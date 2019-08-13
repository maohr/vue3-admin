<template>
	<div class="v-tags-view-wrapper">
		<el-scrollbar ref="scrollPane">
			<router-link v-for="(tag, k) in Array.from(visitedViews)" :to="tag.path" :key="k" @contextmenu.prevent.native="openMenu(tag, $event)">
				<el-tag
					@close.prevent.stop="closeSelectedTag(tag)"
					:type="tag.name === $route.name ? '' : 'info'"
					:closable="visitedViews.length > 1"
				>
					{{tag.meta.title}}
				</el-tag>
			</router-link>
		</el-scrollbar>
		<ul
			v-show="visible"
			:style="{ left: left + 'px', top: top + 'px' }"
			class="contextmenu"
		>
			<li @click="closeSelectedTag(selectedTag)">关闭</li>
			<li @click="closeOthersTags">关闭其他</li>
			<li @click="closeAllTags">关闭所有</li>
		</ul>
	</div>
</template>

<script lang="ts">
  import {value, computed, watch} from "vue-function-api";
  import {Context} from "@/utils/interface";
  import {TagModel, TagState} from "@/store/tags";
  import {Route} from 'vue-router';

  export default {
    name: "",

    setup(props: any, context: Context) {
      const visitedViews = value(TagState.visitedViews);
      const selectedTag = value({} as Route);
      const visible = value(false);
      const left = value(0);
      const top = value(0);
      const generateRoute = () => {
        if(!context.root.$route.name) return;
        return context.root.$route
			};
      const addViewTags = () => {
        const route = generateRoute();
        if(!route) return;
        TagModel.AddVisitedViews(route)
			};
      const isActive = (route: Route) => {
        return route.name === context.root.$route.name
			};
      const openMenu = (tag: Route, e: MouseEvent) => {
				visible.value = true;
        selectedTag.value = tag;
        const offset = context.root.$el.getBoundingClientRect().left;
        left.value = e.clientX - offset;
        top.value = e.clientY
			};
      const closeSelectedTag = (view: Route) => {
        TagModel.DelVisitedViews(view)
					.then(() => {
						if(isActive(view)) {
						  const views = TagState.visitedViews;
						  const latestView = views.slice(-1)[0];
						  if(latestView) context.root.$router.push(latestView);
						  else context.root.$router.push("/")
						}
					})
			};
			const closeOthersTags = () => {
        context.root.$router.push(selectedTag.value);
			  TagModel.DelOthersViews(selectedTag.value)
					.then(() => {

					})
			};
			const closeAllTags = () => {
			  TagModel.DelAllViews();
			  context.root.$router.push("/")
			};
			const closeMenu = () => {
			  visible.value = false
			};
      watch(() => context.root.$route, (route: Route) => {
        addViewTags()
			});
      watch(() => visible.value, (val: boolean) => {
				if(val) document.body.addEventListener("click", closeMenu);
				else document.body.removeEventListener("click", closeMenu)
			});
      return {
        visible,
				left,
				top,
        visitedViews,
        selectedTag,
        openMenu,
        closeSelectedTag,
        closeOthersTags,
        closeAllTags
			}
    }
  }
</script>