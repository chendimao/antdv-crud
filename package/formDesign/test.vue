<template>
  <div>
    <!-- 父组件 -->
    <draggable
        v-model="parentItems"
        :group="{ name: 'parent-group', pull: true, put: true, }"
        :animation="200"
        ghost-class="ghost-placeholder"

    >
      <template #item="{ element }">
        <div class="parent-item">
          <p>父元素: {{ element.text }}</p>
          <!-- 子组件 -->
          <draggable
              v-model="element.children"
                :animation="200"
              :group="{ name: 'child-group', pull: true, put: true }"
              ghost-class="ghost-placeholder"

          >
            <template #item="{ element }">
              <div class="child-item">子元素: {{ element.text }}</div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref } from "vue";
import draggable from "vuedraggable";

export default {
  name: "Test",
  components: { draggable },
  setup() {
    // 数据定义
    const parentItems = ref([
      {
        text: "父项11111 1",
        children: [
          { text: "子项 1-1" },
          { text: "子项 1-2" }
        ]
      },
      {
        text: "父项 2222222",
        children: [
          { text: "子项 2-1" },
          { text: "子项 2-2" }
        ]
      }
    ]);



    return {
      parentItems,
    };
  }
};
</script>

<style scoped>
/* 拖拽中元素的样式 */
.ghost-placeholder {
  background-color: rgba(0, 0, 255, 0.1);
}

/* 父组件和子组件样式 */
.parent-item {
  padding: 10px;
  border: 1px solid #000;
  margin-bottom: 10px;
}

.child-item {
  margin-left: 20px;
  padding: 5px;
  border: 1px dashed #aaa;
}
</style>