/**
 * 序列化和反序列化工具函数
 * 用于处理包含函数的对象的序列化和反序列化
 */

// 函数标识符
const FUNCTION_FLAG = 'FUNCTION_FLAG';

/**
 * 序列化对象，包括函数
 * @param {Object} obj - 要序列化的对象
 * @returns {string} 序列化后的字符串
 * @throws {Error} 序列化失败时抛出错误
 */
export const stringify = (obj) => {
  try {
    return JSON.stringify(obj, (k, v) => {
      if (typeof v === 'function') {
        return `${FUNCTION_FLAG}${v}`;
      }
      return v;
    }, 2); // 使用2个空格进行格式化
  } catch (error) {
    console.error('序列化失败:', error);
    throw new Error('序列化失败，请检查数据格式');
  }
};

/**
 * 反序列化字符串为对象，包括函数
 * @param {string} jsonStr - 要反序列化的字符串
 * @returns {Object} 反序列化后的对象
 * @throws {Error} 反序列化失败时抛出错误
 */
export const parse = (jsonStr) => {
  try {
    return JSON.parse(jsonStr, (key, value) => {
      if (value && typeof value === 'string' && value.indexOf(FUNCTION_FLAG) === 0) {
        try {
          return new Function(`return ${value.slice(FUNCTION_FLAG.length)}`)();
        } catch (e) {
          console.warn(`函数解析失败 [${key}]:`, e);
          return null;
        }
      }
      return value;
    });
  } catch (error) {
    console.error('反序列化失败:', error);
    throw new Error('反序列化失败，请检查数据格式');
  }
};

/**
 * 安全地序列化对象，包括函数
 * 如果序列化失败，返回空对象字符串
 * @param {Object} obj - 要序列化的对象
 * @returns {string} 序列化后的字符串
 */
export const safeStringify = (obj) => {
  try {
    return stringify(obj);
  } catch (error) {
    console.error('安全序列化失败:', error);
    return '{}';
  }
};

/**
 * 安全地反序列化字符串为对象，包括函数
 * 如果反序列化失败，返回空对象
 * @param {string} jsonStr - 要反序列化的字符串
 * @returns {Object} 反序列化后的对象
 */
export const safeParse = (jsonStr) => {
  try {
    return parse(jsonStr);
  } catch (error) {
    console.error('安全反序列化失败:', error);
    return {};
  }
}; 