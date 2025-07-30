import fs from 'fs';
import path from 'path';

// 组件目录
const componentDir = 'package/commonManage/InputItem/src/component';

// 读取目录中的所有Vue文件
const files = fs.readdirSync(componentDir).filter(file => file.endsWith('.vue'));

files.forEach(file => {
  const filePath = path.join(componentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否包含eventHandlers
  if (content.includes('eventHandlers')) {
    console.log(`Processing ${file}...`);
    
    // 简单的替换：为每个事件处理函数添加setTimeout包裹
    // 匹配模式：onXxx: (params) => { ... }
    content = content.replace(
      /(\s+)(on\w+):\s*\(([^)]+)\)\s*=>\s*\{([^}]*)\}/g,
      (match, indent, eventName, params, body) => {
        // 如果已经包含setTimeout，跳过
        if (body.includes('setTimeout')) {
          return match;
        }
        
        // 处理body中的内容，确保emit语句正确缩进
        const processedBody = body.replace(/^(\s+)(emit\('[^']+',[^;]+\);)/gm, '$1  $2');
        
        return `${indent}${eventName}: (${params}) => {\n${indent}  setTimeout(() => {\n${indent}    ${processedBody.trim()}\n${indent}  }, 0);\n${indent}}`;
      }
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('All files processed!'); 