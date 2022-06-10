<template>
  <div>
    <ul class="pagination">
      <li><span :class="PreButton.class" class="pageButton" @click="toPrev"> Prev </span></li>
    <li v-for="index of total" :key="index">
          <a class="pageNumber page" :class="{active: cur_page == index}">{{ index }}</a>
      </li>
      <li><span :class="NextButton.class" class="pageButton" @click="toNext"> Next </span></li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";

export default {
  name: "Pager",
  props: ["total", "page_size", "cur_page"],
  emits : ["update:cur_page"],
  setup(props, ctx) {
    let total = ref(5);
    // TODO : 有时间可以完善一下page_size，它代表同一时刻最多显示的标签数
    let page_size = ref(5);
    let cur_page = ref(1);
    if (props.total !== undefined) total.value = props.total;
    if (props.page_size !== undefined) page_size.value = props.page_size;
    if (props.cur_page !== undefined) cur_page.value = props.cur_page;

    let PreButton = reactive({
        class : computed(() => {
            if (cur_page.value == 1)
                return "button disabled"
            else
                return "button"
        }),

    })
    
    let NextButton = reactive({
        class : computed(() => {
            if (cur_page.value == total.value)
                return "button disabled"
            else
                return "button"
        }),
    })

    function toPrev() {
      if (cur_page.value > 1) {
        cur_page.value --;
        ctx.emit("update:cur_page", cur_page.value);
      }
    }

    function toNext() {
      if (cur_page.value < total.value) {
        cur_page.value ++;
        ctx.emit("update:cur_page", cur_page.value);
      }
    }

    return {
      total,
      page_size,
      cur_page,
      PreButton,
      NextButton,
      toPrev,
      toNext
    };
  },
};
</script>

<style>

.pageNumber {
    font-size: 18px !important;
}

.pageButton {
    font-size: 18px;
    border-radius: .5em;
    color: white;
    background-color: var(--base-color);
    padding: 5px 10px;
    font-family: "Glow Sans";
    cursor: pointer;
}

ul.pagination {
  cursor: default;
  list-style: none;
  padding-left: 0; }
  ul.pagination li {
    display: inline-block;
    padding-left: 0;
    vertical-align: middle; }
    ul.pagination li > .page {
      -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      border-bottom: 0;
      border-radius: 0.375em;
      display: inline-block;
      font-size: 0.8em;
      font-weight: 600;
      height: 2em;
      line-height: 2em;
      margin: 0 0.125em;
      min-width: 2em;
      padding: 0 0.5em;
      text-align: center; }
      ul.pagination li > .page.active {
        background-color: var(--mainColor);
        color: #ffffff !important; }
        ul.pagination li > .page.active:hover {
          /* background-color: #f67878;  */
          background-color: color(var(--mainColor) lightness(90%));
        }
        ul.pagination li > .page.active:active {
          /* background-color: #f45c5c;  */
          background-color: color(var(--mainColor) lightness(100%));
        }
    ul.pagination li:first-child {
      padding-right: 0.75em; }
    ul.pagination li:last-child {
      padding-left: 0.75em; }
  @media screen and (max-width: 480px) {
    ul.pagination li:nth-child(n+2):nth-last-child(n+2) {
      display: none; }
    ul.pagination li:first-child {
      padding-right: 0; } }

</style>