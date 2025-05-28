(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("autoFormatOnStart", false);
  CodeMirror.defineOption("autoFormatOnChange", false);

  CodeMirror.commands.autoFormat = function(cm) {
    var totalLines = cm.lineCount();
    var totalChars = cm.getTextArea().value.length;
    var selection = cm.getSelection();
    var start = cm.getCursor("start");
    var end = cm.getCursor("end");
    
    // 格式化整个文档
    cm.operation(function() {
      var text = cm.getValue();
      try {
        // 使用 JavaScript 格式化
        var formatted = formatJavaScript(text);
        if (formatted !== text) {
          var scrollInfo = cm.getScrollInfo();
          cm.setValue(formatted);
          // 保持光标位置
          cm.setCursor(start);
          // 保持滚动位置
          cm.scrollTo(scrollInfo.left, scrollInfo.top);
        }
      } catch(e) {
        console.error("格式化失败:", e);
      }
    });
  };

  // JavaScript 格式化函数
  function formatJavaScript(text) {
    // 处理缩进
    var lines = text.split('\n');
    var indent = 0;
    var result = [];
    var inString = false;
    var stringChar = '';
    var inComment = false;
    var inBlockComment = false;
    
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line === '') {
        result.push('');
        continue;
      }

      // 处理注释
      if (line.includes('//')) {
        inComment = true;
      }
      if (line.includes('/*')) {
        inBlockComment = true;
      }
      if (line.includes('*/')) {
        inBlockComment = false;
      }

      // 处理字符串
      for (var j = 0; j < line.length; j++) {
        var char = line[j];
        if (!inComment && !inBlockComment) {
          if ((char === '"' || char === "'") && line[j-1] !== '\\') {
            if (!inString) {
              inString = true;
              stringChar = char;
            } else if (char === stringChar) {
              inString = false;
            }
          }
        }
      }

      // 减少缩进
      if (!inString && !inComment && !inBlockComment && line.indexOf('}') === 0) {
        indent = Math.max(0, indent - 1);
      }

      // 添加缩进
      result.push('  '.repeat(indent) + line);

      // 增加缩进
      if (!inString && !inComment && !inBlockComment && line.indexOf('{') === line.length - 1) {
        indent++;
      }

      // 重置行级状态
      inComment = false;
    }
    
    return result.join('\n');
  }

  // 自动格式化
  CodeMirror.defineExtension("autoFormat", function() {
    this.execCommand("autoFormat");
  });

  // 初始化时自动格式化
  CodeMirror.defineExtension("autoFormatOnStart", function() {
    if (this.getOption("autoFormatOnStart")) {
      this.autoFormat();
    }
  });

  // 内容变化时自动格式化
  CodeMirror.defineExtension("autoFormatOnChange", function() {
    if (this.getOption("autoFormatOnChange")) {
      this.autoFormat();
    }
  });

  // 注册事件监听
  CodeMirror.defineOption("formatOnLoad", false, function(cm, val) {
    if (val) {
      cm.on("change", function() {
        cm.autoFormatOnChange();
      });
    }
  });
}); 