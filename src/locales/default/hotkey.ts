import { HotkeyI18nTranslations } from '@/types/hotkey';

const hotkey: HotkeyI18nTranslations = {
  addUserMessage: {
    desc: '将当前输入内容添加为用户消息，但不触发生成',
    title: '添加一条用户消息',
  },
  clearCurrentMessages: {
    desc: '清空当前会话的消息和上传的文件',
    title: '清空会话消息',
  },
  editMessage: {
    desc: '通过按住 Alt 并双击消息进入编辑模式',
    title: '编辑消息',
  },
  openChatSettings: {
    desc: '查看和修改当前会话的设置',
    title: '打开会话设置',
  },
  openHotkeyHelper: {
    desc: '查看所有快捷键的使用说明',
    title: '打开快捷键帮助',
  },
  openSettings: {
    desc: '打开应用设置页面',
    title: '应用设置',
  },
  regenerateMessage: {
    desc: '重新生成最后一条消息',
    title: '重新生成消息',
  },
  saveRecord: {
    desc: '下载当前对话记录的数据',
    title: '存储实验数据',
  },
  saveTopic: {
    desc: '保存当前话题并打开新话题',
    title: '开启新话题',
  },
  search: {
    desc: '唤起当前页面主要搜索框',
    title: '搜索',
  },
  switchAgent: {
    desc: '通过按住 Ctrl 加数字 0~9 切换固定在侧边栏的助手',
    title: '快捷切换助手',
  },
  toggleLeftPanel: {
    desc: '显示或隐藏左侧助手面板',
    title: '显示/隐藏助手面板',
  },
  toggleRightPanel: {
    desc: '显示或隐藏右侧话题面板',
    title: '显示/隐藏话题面板',
  },
  toggleZenMode: {
    desc: '专注模式下，只显示当前会话，隐藏其他 UI',
    title: '切换专注模式',
  },
};

export default hotkey;
