/* eslint-env browser, webextensions */
(() => {
  const createMessage = (text, alwaysShow) => {
    const hintMessage = document.createElement('div')
    hintMessage.classList.add('save-to-readmoo-message')
    hintMessage.textContent = text

    hintMessage.addEventListener('click', () => {
      hintMessage.classList.remove('show')
      setTimeout(() => hintMessage.remove(), 1000)
    })

    document.body.append(hintMessage)
    setTimeout(() => hintMessage.classList.add('show'), 500)
    if (!alwaysShow) {
      setTimeout(() => hintMessage.click(), 3000)
    }
  }

  browser.runtime.sendMessage({
    type: 'remove_token'
  })

  createMessage('初次安裝 Save to Readmoo 套件請先登入，以便取得用來儲存網址的 API 金鑰。', true)
})()
