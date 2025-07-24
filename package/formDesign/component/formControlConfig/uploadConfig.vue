<template>
  <div>
    <a-form-item label="上传地址(action)">
      <a-input v-model:value="modelValue.$attrs.action" />
    </a-form-item>
    <a-form-item label="最大数量(maxCount)">
      <a-input-number v-model:value="modelValue.$attrs.maxCount" :min="1" />
    </a-form-item>
    <a-form-item label="多选(multiple)">
      <a-switch v-model:checked="modelValue.$attrs.multiple" />
    </a-form-item>
    <a-form-item label="禁用(disabled)">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="文件类型(accept)">
      <a-input v-model:value="modelValue.$attrs.accept" placeholder="如: .jpg,.png" />
    </a-form-item>
    <a-form-item label="上传列表类型(listType)">
      <a-select v-model:value="modelValue.$attrs.listType">
        <a-select-option value="text">文本</a-select-option>
        <a-select-option value="picture">图片</a-select-option>
        <a-select-option value="picture-card">图片卡片</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="显示上传列表(showUploadList)">
      <a-switch v-model:checked="modelValue.$attrs.showUploadList" />
    </a-form-item>
    <a-form-item label="自动上传(autoUpload)">
      <a-switch v-model:checked="modelValue.$attrs.autoUpload" />
    </a-form-item>
    <a-form-item label="限制单个文件大小(maxSize, MB)">
      <a-input-number v-model:value="modelValue.$attrs.maxSize" :min="0" />
    </a-form-item>
    <a-form-item label="限制文件数(limit)">
      <a-input-number v-model:value="modelValue.$attrs.limit" :min="0" />
    </a-form-item>
    <a-form-item label="拖拽上传(drag)">
      <a-switch v-model:checked="modelValue.$attrs.drag" />
    </a-form-item>
    <a-form-item label="自定义请求(request)" help="需自定义上传逻辑时使用">
      <a-input v-model:value="modelValue.$attrs.customRequest" placeholder="函数名或表达式" />
    </a-form-item>
    <a-form-item label="文件名字段名(name)">
      <a-input v-model:value="modelValue.$attrs.name" />
    </a-form-item>
    <a-form-item label="请求头(headers)">
      <a-input v-model:value="modelValue.$attrs.headers" placeholder="如: { token: 'xxx' }" />
    </a-form-item>
    <a-form-item label="额外参数(data)">
      <a-input v-model:value="modelValue.$attrs.data" placeholder="如: { key: value }" />
    </a-form-item>
    <a-form-item label="请求方法(method)">
      <a-select v-model:value="modelValue.$attrs.method">
        <a-select-option value="post">POST</a-select-option>
        <a-select-option value="put">PUT</a-select-option>
        <a-select-option value="patch">PATCH</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="withCredentials">
      <a-switch v-model:checked="modelValue.$attrs.withCredentials" />
    </a-form-item>
    <a-form-item label="支持多文件夹(directory)">
      <a-switch v-model:checked="modelValue.$attrs.directory" />
    </a-form-item>
    <a-form-item label="图片预览(showPreviewIcon)">
      <a-switch v-model:checked="modelValue.$attrs.showPreviewIcon" />
    </a-form-item>
    <a-form-item label="图片下载(showDownloadIcon)">
      <a-switch v-model:checked="modelValue.$attrs.showDownloadIcon" />
    </a-form-item>
    <a-form-item label="移除文件(showRemoveIcon)">
      <a-switch v-model:checked="modelValue.$attrs.showRemoveIcon" />
    </a-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }
});
if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}
</script> 