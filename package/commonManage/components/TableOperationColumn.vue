<template>
  <vxe-column :width="menuWidth??menu.menuWidth" v-if="isMenu??menu.isMenu" :fixed="menu.fixed??'right'" :title="menu.title??'操作'" v-bind="menu?.$attrs??{}">
    <template #default="{ row }">
      <slot :row="row">
        <a-button type="link" v-if="isView??menu.isView" @click="handleView(row)">
          <template #icon v-if="(viewIcon??menu.viewIcon) !== undefined">
            <component v-if="(viewIcon??menu.viewIcon) !== false && typeof (viewIcon??menu.viewIcon) === 'function'" :is="viewIcon??menu.viewIcon"></component>
          </template>
          <template #icon v-else>
            <EyeOutlined />
          </template>
          {{ viewText??menu.viewText??'查看' }}
        </a-button>
        <a-button type="link" v-if="isEdit??menu.isEdit" @click="handleEdit(row)">
          <template #icon v-if="(editIcon??menu.editIcon) !== undefined">
            <component v-if="(editIcon??menu.editIcon) !== false && typeof (editIcon??menu.editIcon) === 'function'" :is="editIcon??menu.editIcon"></component>
          </template>
          <template #icon v-else>
            <EditOutlined />
          </template>
          {{ editText??menu.editText??'编辑' }}
        </a-button>
      </slot>
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
  menu?: {
    isMenu?: boolean;
    menuWidth?: number;
    isView?: boolean;
    isEdit?: boolean;
    viewIcon?: any;
    editIcon?: any;
    viewText?: string;
    editText?: string;
    $attrs: object;
  };
}

const props = withDefaults(defineProps<Props>(), {
  menu: () => ({})
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