<template>
	<el-main>
		<el-button type="primary" @click="handleClick">Click</el-button>
	</el-main>
</template>

<script lang="ts">
  import {value, onCreated} from "vue-function-api";
  import {Context} from "@/utils/interface";
  import {Item} from "@/api/Item";

  export default {
    name: "home",
    setup(props: any, context: Context) {
      const handleClick = () => {

			};

      return {
        handleClick
			}
    }
  }
</script>