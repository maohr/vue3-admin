import {post, get} from "@/utils/request";

export namespace Item {
  export const getItem = () => get("/getItem");
}