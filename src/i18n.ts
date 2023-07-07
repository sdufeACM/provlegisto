import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      "Quick Start": "Quick Start",
      "Recent": "Recent",
      "Empty": "Empty",

      "Problem": "Problem",
      "New Problem": "New Problem",
      "New Contest": "New Contest",
      "New Problem List": "New Problem List",
      "Open Contest": "Open Contest",
      "Open Problem List": "Open Problem List",
      "Open Recent Item": "Open Recent Item",
      "Save": "Save",
      "Move": "Move",
      "Export": "Export",
      "Export as Picture": "Export as Picture",
      "Export as Source": "Export as Source",
      "Preferences": "Preferences",
      "Global Preferences": "Global Preferences",
      "Problem List Preferences": "Problem List Preferences",
      "Close Contest": "Close Contest",
      "Close Problem List": "Close Problem List",
      "Exit": "Exit",

      "Edit": "Edit",
      "Undo": "Undo",
      "Redo": "Redo",
      "Cut": "Cut",
      "Copy": "Copy",
      "Paste": "Paste",
      "Find": "Find",
      "Replace": "Replace",
      "Toggle Line Comment": "Toggle Line Comment",
      "Toggle Block Comment": "Toggle Block Comment",


      "Selection": "Selection",
      "Select All": "Select All",
      "Expand All": "Expand All",
      "Shrink All": "Shrink All",
      "Copy Line Up": "Copy Line Up",
      "Copy Line Down": "Copy Line Down",
      "Move Line Up": "Move Line Up",
      "Move Line Down": "Move Line Down",
      "Duplicate Selection": "Duplicate Selection",
      "Add Cursor Above": "Add Cursor Above",
      "Add Cursor Below": "Add Cursor Below",
      "Add Cursor to Line Ends": "Add Cursor to Line Ends",
      "Add Next Occurrence": "Add Next Occurrence",
      "Add Previous Occurrence": "Add Previous Occurrence",
      "Select All Occurrences": "Select All Occurrences",

      "Teamwork": "Teamwork",
      "Start": "Start",
      "Join": "Join",
      "Focus Me": "Focus Me",
      "Focus Other": "Focus Other",
      "Request to Edit": "Request to Edit",
      "Virtual Print": "Virtual Print",
      "Printer": "Printer",
      "About Teamwork": "About Teamwork",

      "Run": "Run",
      "Compile": "Compile",
      "Compile and Run": "Compile and Run",
      "Compile and Test": "Compile and Test",
      "Submit": "Submit",
      "Toggle Breakpoint": "Toggle Breakpoint",
      "Start Debugging": "Start Debugging",
      "Stop Debugging": "Stop Debugging",
      "Step Over": "Step Over",
      "Step Into": "Step Into",
      "Step Out": "Step Out",
      "Continue": "Continue",

      "Help":"Help",
      "Statistics": "Statistics",
      "Show All Commands": "Show All Commands",
      "Documentation": "Documentation",
      "Changelog": "Changelog",
      "Report Issue": "Report Issue",
      "View License": "View License",
      "Toggle Developer Tools": "Toggle Developer Tools",
      "About": "About",

      "Join Team": "Join Team",
    }
  },
  zh: {
    translation: {
      "Quick Start": "快速开始",
      "Recent": "最近",
      "Empty": "无数据",

      "Problem": "题目",
      "New Problem": "新建题目",
      "New Contest": "新建比赛",
      "New Problem List": "新建题目集",
      "Open Contest": "打开比赛",
      "Open Problem List": "打开题目集",
      "Open Recent Item": "最近项目",
      "Save": "保存",
      "Move": "移动到",
      "Export": "导出",
      "Export as Picture": "图片",
      "Export as Source": "源代码",
      "Preferences": "首选项",
      "Global Preferences": "全局设置",
      "Problem List Preferences": "题目集设置",
      "Close Contest": "关闭比赛",
      "Close Problem List": "关闭题目集",
      "Exit": "退出",

      "Edit": "编辑",
      "Undo": "撤销",
      "Redo": "重做",
      "Cut": "剪切",
      "Copy": "复制",
      "Paste": "粘贴",
      "Find": "搜索",
      "Replace": "替换",
      "Toggle Line Comment": "行注释",
      "Toggle Block Comment": "块注释",


      "Selection": "选择",
      "Select All": "全选",
      "Expand All": "全部展开",
      "Shrink All": "全部收起",
      "Copy Line Up": "复制上一行",
      "Copy Line Down": "复制下一行",
      "Move Line Up": "移动到上一行",
      "Move Line Down": "移动到下一行",
      "Duplicate Selection": "克隆选中文字",
      "Add Cursor Above": "在上一行增加光标",
      "Add Cursor Below": "在下一行增加光标",
      "Add Cursor to Line Ends": "增加光标到最后一行",
      "Add Next Occurrence": "选中下一个重复项",
      "Add Previous Occurrence": "选中上一个重复项",
      "Select All Occurrences": "选中所有重复项",

      "Teamwork": "团队",
      "Start": "启动",
      "Join": "加入",
      "Focus Me": "让队友聚焦我的位置",
      "Focus Other": "聚焦队友",
      "Request to Edit": "请求编辑",
      "Virtual Print": "虚拟打印",
      "Printer": "打印机",
      "About Teamwork": "关于团队功能",

      "Run": "运行",
      "Compile": "编译",
      "Compile and Run": "编译并运行",
      "Compile and Test": "编译并测试",
      "Submit": "提交",
      "Toggle Breakpoint": "启用/禁止断点",
      "Start Debugging": "开始调试",
      "Stop Debugging": "结束调试",
      "Step Over": "跨过",
      "Step Into": "跳入",
      "Step Out": "跳出",
      "Continue": "继续",

      "Help":"帮助",
      "Statistics": "统计数据",
      "Show All Commands": "显示所有命令",
      "Documentation": "文档",
      "Changelog": "更新日志",
      "Report Issue": "反馈",
      "View License": "查看开源许可",
      "Toggle Developer Tools": "开发者工具",
      "About": "关于",

      "Join Team": "加入队伍",
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh",
    fallbackLng: "en",  
    interpolation: {
      escapeValue: false
    }
  })

  export default i18n