# 事件处理

Antdv-Crud 提供了丰富的事件处理机制，可以满足各种交互需求。

## 搜索组件事件

### 搜索事件

```vue
<template>
  <a-crud-search
    :formData="searchForm"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchForm = ref({
  unitName: {
    type: 'text',
    label: '单位名称'
  }
})

const handleSearch = (values) => {
  console.log('搜索值：', values)
  // 处理搜索逻辑
}
</script>
```

### 重置事件

```vue
<template>
  <a-crud-search
    :formData="searchForm"
    @reset="handleReset"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchForm = ref({
  unitName: {
    type: 'text',
    label: '单位名称'
  }
})

const handleReset = () => {
  console.log('重置表单')
  // 处理重置逻辑
}
</script>
```

### 表单项事件

```vue
<template>
  <a-crud-search
    :formData="searchForm"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchForm = ref({
  unitName: {
    type: 'text',
    label: '单位名称',
    events: {
      change: (value) => {
        console.log('值变化：', value)
      },
      blur: (value) => {
        console.log('失去焦点：', value)
      },
      focus: (value) => {
        console.log('获得焦点：', value)
      }
    }
  }
})
</script>
```

## 表格组件事件

### 加载事件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
    @load="handleLoad"
  />
</template>

<script setup>
import { ref } from 'vue'

const api = {
  list: '/api/list'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  }
])

const handleLoad = (params) => {
  console.log('加载参数：', params)
  // 处理加载逻辑
}
</script>
```

### 选择事件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const api = {
  list: '/api/list'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  }
])

const handleSelectionChange = (selectedRows) => {
  console.log('选中行：', selectedRows)
  // 处理选择逻辑
}
</script>
```

### 行事件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue'

const api = {
  list: '/api/list'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  },
  {
    title: '操作',
    width: 200,
    slots: {
      customRender: 'action'
    },
    events: {
      click: (record) => {
        console.log('点击行：', record)
      },
      dblclick: (record) => {
        console.log('双击行：', record)
      }
    }
  }
])
</script>
```

## 表单组件事件

### 提交事件

```vue
<template>
  <a-crud-form
    :formData="formData"
    :api="api"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  unitName: {
    type: 'text',
    label: '单位名称'
  }
})

const api = {
  insert: '/api/insert'
}

const handleSuccess = () => {
  console.log('表单提交成功')
  // 处理提交成功逻辑
}
</script>
```

### 取消事件

```vue
<template>
  <a-crud-form
    :formData="formData"
    :api="api"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  unitName: {
    type: 'text',
    label: '单位名称'
  }
})

const api = {
  insert: '/api/insert'
}

const handleCancel = () => {
  console.log('取消表单')
  // 处理取消逻辑
}
</script>
```

### 表单项事件

```vue
<template>
  <a-crud-form
    :formData="formData"
    :api="api"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  unitName: {
    type: 'text',
    label: '单位名称',
    events: {
      change: (value) => {
        console.log('值变化：', value)
      },
      blur: (value) => {
        console.log('失去焦点：', value)
      },
      focus: (value) => {
        console.log('获得焦点：', value)
      }
    }
  }
})

const api = {
  insert: '/api/insert'
}
</script>
```

## 自定义事件

### 自定义组件事件

```vue
<template>
  <a-crud-form
    :formData="formData"
    :api="api"
  />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  customField: {
    type: 'custom',
    label: '自定义组件',
    component: 'my-custom-component',
    events: {
      'custom-event': (value) => {
        console.log('自定义事件：', value)
      }
    }
  }
})

const api = {
  insert: '/api/insert'
}
</script>
```

### 自定义表格列事件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue'

const api = {
  list: '/api/list'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  },
  {
    title: '操作',
    width: 200,
    slots: {
      customRender: 'action'
    },
    events: {
      'custom-action': (record) => {
        console.log('自定义操作：', record)
      }
    }
  }
])
</script>
```

## 事件总线

### 全局事件

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'

const app = createApp(App)
app.use(AntdvCrud, {
  // 事件总线配置
  eventBus: {
    // 全局事件处理
    on: (event, callback) => {
      console.log('注册事件：', event)
      // 处理事件注册
    },
    emit: (event, data) => {
      console.log('触发事件：', event, data)
      // 处理事件触发
    }
  }
})
```

### 组件事件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
    @custom-event="handleCustomEvent"
  />
</template>

<script setup>
import { ref } from 'vue'

const api = {
  list: '/api/list'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  }
])

const handleCustomEvent = (data) => {
  console.log('自定义事件：', data)
  // 处理自定义事件
}
</script>
``` 