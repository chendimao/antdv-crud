<template>
  <vxe-column field="a" title="操作" fixed="right" v-if="isMenu" :width="menuWidth">
    <template #default="{ row }">
      <a-button type="link" v-if="isView" @click="handleView(row)">
        <template #icon v-if="viewIcon !== undefined">
          <component v-if="viewIcon !== false && typeof viewIcon === 'function'" :is="viewIcon"></component>
        </template>
        <template #icon v-else>
          <EyeOutlined />
        </template>
        {{ viewText || '查看' }}
      </a-button>
      <a-button type="link" v-if="isEdit" @click="handleEdit(row)">
        <template #icon v-if="editIcon !== undefined">
          <component v-if="editIcon !== false && typeof editIcon === 'function'" :is="editIcon"></component>
        </template>
        <template #icon v-else>
          <EditOutlined />
        </template>
        {{ editText || '编辑' }}
      </a-button>
      <slot :row="row"></slot>
    </template>
  </vxe-column>
</template>

<script setup lang="ts">
import { EyeOutlined, EditOutlined } from '@ant-design/icons-vue';

interface Props {
  isMenu?: boolean;
  menuWidth?: number;
  isView?: boolean;
  isEdit?: boolean;
  viewIcon?: any;
  editIcon?: any;
  viewText?: string;
  editText?: string;
  formMethods?: any;
}

const props = withDefaults(defineProps<Props>(), {
  isMenu: true,
  menuWidth: 150,
  isView: true,
  isEdit: true,
  viewText: '查看',
  editText: '编辑'
});

const emit = defineEmits(['view', 'edit']);

const handleView = (row: any) => {
  if (props.formMethods) {
    props.formMethods.handleFormShow('show', row);
  }
  emit('view', row);
};

const handleEdit = (row: any) => {
  if (props.formMethods) {
    props.formMethods.handleFormShow('update', row);
  }
  emit('edit', row);
};
</script> 