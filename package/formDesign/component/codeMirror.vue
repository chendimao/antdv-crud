<template>
  <div v-if="showType === 'modal'" class="code-editor-container">
    <a-modal
      :visible="localVisible"
      @update:visible="handleVisibleChange"
      title="代码编辑器"
      width="100%"
      :footer="null"
      wrap-class-name="full-modal"
      :bodyStyle="{ padding: '0' }"
      :style="{ top: 0 }"
      :destroyOnClose="true"
    >
      <div style="height: calc(100vh - 130px);">
        <Codemirror
          v-model:value="localCode"
          :options="{...cmOptions, ...options}"
          ref="editor"
          border
          :height="'100%'"
          :width="'100%'"
          @ready="onReady">
        </Codemirror>
        <div class="editor-footer" v-if="showFooterComputed">
          <a-button v-if="showCancel" @click="handleCancel">取消</a-button>
          <a-button v-if="showCheckSyntax" @click="handleCheckSyntax" type="danger">语法检测</a-button>
          <a-button v-if="showCopy" @click="handleCopy" type="primary" style="margin-left: 8px;">复制</a-button>
          <a-button v-if="showSave" type="primary" @click="handleSave" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>
  </div>
  <div v-else class="code-editor-container">
    <Codemirror
      v-model:value="localCode"
      :options="{...cmOptions, ...options}"
      ref="editor"
      border
      :height="height"
      :width="width"
      @ready="onReady">
    </Codemirror>
    <div class="editor-footer" v-if="showFooterComputed">
      <a-button v-if="showCheckSyntax" @click="handleCheckSyntax">语法检测</a-button>
      <a-button v-if="showCopy" @click="handleCopy" type="primary" style="margin-left: 8px;">复制</a-button>
      <a-button v-if="showSave" type="primary" @click="handleSave" style="margin-left: 8px;">保存</a-button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue';
import Codemirror from 'codemirror-editor-vue3';
import { Modal, message } from 'ant-design-vue';

// 引入css文件
import 'codemirror/lib/codemirror.css'
// 引入主题 可以从 codemirror/theme/ 下引入多个
import 'codemirror/theme/monokai.css'
// 引入语言模式 可以从 codemirror/mode/ 下引入多个
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
// 括号匹配
import 'codemirror/addon/edit/matchbrackets';
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
// 代码高亮
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/comment/comment';
import { customStringify } from '../../utils';

const props = defineProps({
    value: {
        type: [String, Object],
        default: ''
    },
    height: {
        type: String,
        default: '300px'
    },
    width: {
        type: String,
        default: '100%'
    },
    options: {
        type: Object,
        default: () => ({})
    },
    showType: {
        type: String,
        default: 'normal' // 'normal' 或 'modal'
    },
    visible: {
        type: Boolean,
        default: false
    },
    language: {
        type: String,
        default: 'javascript', // 'javascript', 'css', 'json'
        validator: (value) => ['javascript', 'css', 'json'].includes(value)
    },
    showCheckSyntax: {
        type: Boolean,
        default: true
    },
    showCancel: {
        type: Boolean,
        default: true
    },
    showSave: {
        type: Boolean,
        default: true
    },
    showFooter: {
        type: Boolean,
        default: true
    },
    showCopy: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:value', 'update:visible']);

const cmOptions = {
    // 语言及语法模式
    mode: props.language,
    // 主题
    theme: 'monokai',
    // 显示函数
    line: true,
    // 显示行号
    lineNumbers: true,
    // 软换行
    lineWrapping: true,
    // tab宽度
    tabSize: 2,
    // 自动缩进
    indentUnit: 2,
    // 括号匹配
    matchBrackets: true,
    // 代码折叠
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    // 代码提示功能
    hintOptions: {
        completeSingle: false
    },
    // 代码高亮
    styleActiveLine: true,
    autoCloseBrackets: true,
    // 自动格式化
    autoFormatOnStart: true,
    autoFormatOnChange: true,
    formatOnLoad: true,
    extraKeys: {
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment',
        'Ctrl-L': 'autoFormat',
        'Cmd-L': 'autoFormat',
        'Tab': 'autoFormat'
    }
};

const localCode = ref(typeof props.value === 'object' ? customStringify(props.value) : props.value);
const localVisible = ref(props.visible);

// 计算是否显示底部按钮区域
const showFooterComputed = computed(() => {
    return props.showFooter && (props.showCheckSyntax || props.showCancel || props.showSave || props.showCopy);
});

// 计算是否自动绑定
const isAutoBinding = computed(() => {
    return !props.showSave;
});

watch(() => props.visible, (newVal) => {
    localVisible.value = newVal;
});

watch(() => props.value, (newVal) => {
    if (newVal !== localCode.value) {
        localCode.value = typeof newVal === 'object' ? customStringify(newVal) : newVal;
    }
    console.log(newVal);
}, {deep: true});

// 监听代码变化，如果自动绑定则直接更新
watch(() => localCode.value, (newVal) => {
    if (isAutoBinding.value) {
        emits('update:value', newVal);
    }
});

watch(() => props.language, (newVal) => {
    cmOptions.mode = newVal;
});

const handleVisibleChange = (value) => {
    localVisible.value = value;
    emits('update:visible', value);
};

// 检查 JavaScript 语法
const checkJsSyntax = (jsString) => {
    if (!props.showCheckSyntax) return true;
    try {
        // 尝试解析为 JavaScript 值
        const value = new Function('return ' + jsString)();
        // 检查是否为有效的 JavaScript 值
        if (value === undefined) {
            message.error('请输入有效的 JavaScript 值');
            return false;
        }
        return true;
    } catch (e) {
        message.error('JavaScript 语法不正确，请检查语法');
        return false;
    }
};

// 检查 CSS 语法
const checkCssSyntax = (cssString) => {
    if (!props.showCheckSyntax) return true;
    try {
        // 移除注释
        const cssWithoutComments = cssString.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
        
        // 检查基本语法结构
        const ruleRegex = /([^{}]+)\{([^}]*)\}/g;
        const rules = cssWithoutComments.match(ruleRegex);
        
        if (!rules && cssWithoutComments.trim()) {
            throw new Error('CSS 语法错误：缺少选择器或规则');
        }

        // 验证每个规则
        rules?.forEach(rule => {
            // 分离选择器和声明
            const [selector, declarations] = rule.split('{');
            const selectorText = selector.trim();
            
            // 验证选择器
            if (!selectorText) {
                throw new Error('CSS 语法错误：选择器不能为空');
            }

            // 验证声明
            const declarationRegex = /([^:]+):([^;]+);/g;
            const declarationsMatch = declarations.match(declarationRegex);
            
            if (!declarationsMatch && declarations.trim()) {
                throw new Error('CSS 语法错误：声明格式不正确');
            }

            // 验证每个声明
            declarationsMatch?.forEach(declaration => {
                const [property, value] = declaration.split(':').map(s => s.trim());
                if (!property || !value) {
                    throw new Error('CSS 语法错误：属性或值不能为空');
                }
            });
        });

        return true;
    } catch (e) {
        console.error('CSS 语法错误:', e);
        message.error(e.message || 'CSS 语法不正确，请检查语法');
        return false;
    }
};

// 检查 JSON 语法
const checkJsonSyntax = (jsonString) => {
    if (!props.showCheckSyntax) return true;
    try {
        JSON.parse(jsonString);
        return true;
    } catch (e) {
        message.error('JSON 语法不正确，请检查语法');
        return false;
    }
};

const handleCheckSyntax = () => {
    if (!props.showCheckSyntax) return;
    let isValid = true;
    switch (props.language) {
        case 'javascript':
            isValid = checkJsSyntax(localCode.value);
            break;
        case 'css':
            isValid = checkCssSyntax(localCode.value);
            break;
        case 'json':
            isValid = checkJsonSyntax(localCode.value);
            break;
    }
    if (isValid) {
        message.success('语法检查通过');
    }
};

const handleCancel = () => {
    if (!props.showCancel) return;
    localCode.value = typeof props.value === 'object' ? customStringify(props.value) : props.value;
    if (props.showType === 'modal') {
        handleVisibleChange(false);
    }
};

const handleSave = () => {
    if (!props.showSave) return;
    let isValid = true;
    if (props.showCheckSyntax) {
        switch (props.language) {
            case 'javascript':
                isValid = checkJsSyntax(localCode.value);
                break;
            case 'css':
                isValid = checkCssSyntax(localCode.value);
                break;
            case 'json':
                isValid = checkJsonSyntax(localCode.value);
                break;
        }
    }
    if (isValid) {
        emits('update:value', localCode.value);
        if (props.showType === 'modal') {
            handleVisibleChange(false);
        }
    }
};

const onReady = (editor) => {
    // 设置自动补全
    editor.on('inputRead', function (cm, location) {
        if (/[a-zA-Z]/.test(location.text[0])) {
            cm.showHint();
        }
    });

    // 设置自动格式化
    editor.on('change', function() {
        if (cmOptions.autoFormatOnChange) {
            // editor.autoFormat();
        }
    });

    // 初始化时格式化
    if (cmOptions.autoFormatOnStart) {
        // editor.autoFormat();
    }
};

// 添加复制功能
const handleCopy = async () => {
    if (!props.showCopy) return;
    
    // 创建一个临时的 textarea 元素
    const textarea = document.createElement('textarea');
    textarea.value = localCode.value;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    try {
        // 先尝试使用现代 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(localCode.value);
                message.success('复制成功');
                return;
            } catch (clipboardError) {
                console.warn('Clipboard API 失败，尝试备用方法:', clipboardError);
            }
        }

        // 备用方法：使用传统方式
        textarea.focus();
        textarea.select();
        
        // 尝试使用 execCommand
        const successful = document.execCommand('copy');
        if (successful) {
            message.success('复制成功');
        } else {
            // 如果 execCommand 失败，尝试使用 Selection API
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(textarea);
            selection.removeAllRanges();
            selection.addRange(range);
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    message.success('复制成功');
                } else {
                    throw new Error('复制命令执行失败');
                }
            } catch (err) {
                throw new Error('复制操作失败');
            } finally {
                selection.removeAllRanges();
            }
        }
    } catch (error) {
        console.error('复制失败:', error);
        message.error('复制失败，请手动复制');
        
        // 如果所有方法都失败，让用户手动复制
        textarea.style.position = 'fixed';
        textarea.style.left = '50%';
        textarea.style.top = '50%';
        textarea.style.transform = 'translate(-50%, -50%)';
        textarea.style.zIndex = '9999';
        textarea.style.opacity = '1';
        textarea.style.padding = '10px';
        textarea.style.background = '#fff';
        textarea.style.border = '1px solid #ccc';
        textarea.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        
        // 添加提示文本
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '50%';
        tip.style.top = 'calc(50% - 30px)';
        tip.style.transform = 'translate(-50%, -50%)';
        tip.style.zIndex = '10000';
        tip.style.background = '#fff';
        tip.style.padding = '5px 10px';
        tip.style.borderRadius = '4px';
        tip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        tip.textContent = '请手动复制内容（Ctrl+C）';
        document.body.appendChild(tip);
        
        // 3秒后移除提示和文本框
        setTimeout(() => {
            document.body.removeChild(textarea);
            document.body.removeChild(tip);
        }, 3000);
    } finally {
        // 清理
        if (document.body.contains(textarea)) {
            document.body.removeChild(textarea);
        }
    }
};

// 暴露方法给父组件
defineExpose({
    show: () => {
        localVisible.value = true;
        emits('update:visible', true);
    }
});
</script>

<style scoped>
.code-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(.CodeMirror) {
  flex: 1;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #1e1e1e;
}

:deep(.CodeMirror-gutters) {
  background-color: #1e1e1e;
  border-right: 1px solid #303030;
}

:deep(.CodeMirror-linenumber) {
  color: #858585;
}

:deep(.CodeMirror-cursor) {
  border-left: 1px solid #fff;
}

:deep(.CodeMirror-selected) {
  background: #264f78;
}

:deep(.CodeMirror-focused .CodeMirror-selected) {
  background: #264f78;
}

:deep(.CodeMirror-matchingbracket) {
  color: #0f0 !important;
  background: #264f78;
}

:deep(.CodeMirror-nonmatchingbracket) {
  color: #f22 !important;
}

.editor-footer {
  padding: 10px;
  text-align: right; 
}

.editor-footer button {
  margin-left: 8px;
}
</style>

