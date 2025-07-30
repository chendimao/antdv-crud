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
    
    // 修复onMounted调用中的多余逗号
    content = content.replace(
      /props\.item\?\..*?onMounted\(props\.item,\s*props\.formState,\s*props\.formData,\s*\);/g,
      'props.item?.$attrs?.onMounted(props.item, props.formState, props.formData);'
    );
    
    // 修复toString属性问题（如果存在）
    content = content.replace(
      /props\.item\.toString\s*!==\s*false/g,
      'props.item.toStringField !== false'
    );
    
    content = content.replace(
      /props\.item\?\.toString\?\?/g,
      'props.item?.toStringField ??'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
});

console.log('All syntax errors fixed!'); 