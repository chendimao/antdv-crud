/**
 * 动态加载 CSS 样式
 * @param {string} cssText - CSS 或 Less 样式字符串
 * @param {string} [id] - 样式标签的 ID，用于后续删除样式
 * @param {boolean} [isLess=false] - 是否为 Less 样式
 * @returns {Promise<string>} 返回样式标签的 ID
 */
export async function loadStyle(cssText, id, isLess = false) {
  let finalCssText = cssText;

  

  // 如果提供了 ID，先检查是否已存在
  if (id) {
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.textContent = finalCssText;
      return id;
    }
  }

  // 创建新的 style 标签
  const style = document.createElement('style');
  style.type = 'text/css';
  
  // 设置 ID（如果有）
  if (id) {
    style.id = id;
  }

  // 添加样式内容
  try {
    style.appendChild(document.createTextNode(finalCssText));
  } catch (ex) {
    // 兼容 IE
    style.styleSheet.cssText = finalCssText;
  }

  // 添加到页面
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(style);

  return style.id;
}

/**
 * 移除动态加载的 CSS 样式
 * @param {string} id - 样式标签的 ID
 */
export function removeStyle(id) {
  const style = document.getElementById(id);
  if (style) {
    style.parentNode.removeChild(style);
  }
} 