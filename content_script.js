/* eslint-env browser, webextensions */
// https://api.readmoo.com/store/v3

(() => {
  window.addEventListener('load', () => {
    const showHint = () => {
      const hintMessage = document.createElement('div')
      hintMessage.classList.add('save-to-readmoo-hint')
      hintMessage.textContent = '初次安裝 Save to Readmoo 套件請先登入，以便取得用來儲存網址的 API 金鑰。'
      document.body.append(hintMessage)
      setTimeout(() => hintMessage.classList.add('show'), 500)
    }
    const saveToken = token => {
      browser.runtime.sendMessage({
        type: 'save_token',
        token
      })
    }

    const token = localStorage.getItem('READ_TOKEN')
    if (!token) {
      return showHint()
    }

    saveToken(token)
  })
})()
