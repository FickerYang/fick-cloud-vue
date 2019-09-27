// import Vue from 'vue'
import Clipboard from 'clipboard'
import {  message } from 'ant-design-vue'

function clipboardSuccess() {
    //   Vue.prototype.$message({
    //     message: 'Copy successfully',
    //     type: 'success',
    //     duration: 1500
    //   })
    message.success('Copy successfully', 3);
}

function clipboardError() {
    //   Vue.prototype.$message({
    //     message: 'Copy failed',
    //     type: 'error'
    //   })
    message.error('Copy failed', 3);
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
