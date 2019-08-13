<template>
	<div>
		<i v-if="icon" :class="icon" style="margin-right: 20px;"></i>
		<span v-if="title" slot="title">{{ title }}</span>
	</div>
</template>

<script lang="ts">
  export default {
    name: "item",
		props: {
      icon: {
        type: String,
				default: function () {
					return ""
        }
			},
			title: {
        type: String,
				default: function () {
					return ""
        }
			}
		}
  }
</script>