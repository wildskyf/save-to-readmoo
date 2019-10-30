/* eslint-env browser, webextensions */
// https://api.readmoo.com/store/v3

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

  window.addEventListener('load', () => {
    if (location.href.includes('readmoo')) {
      const token = localStorage.getItem('READ_TOKEN')
      if (!token) {
        return createMessage('初次安裝 Save to Readmoo 套件請先登入，以便取得用來儲存網址的 API 金鑰。')
      }

      browser.runtime.sendMessage({
        type: 'save_token',
        token
      })
    }

    browser.runtime.onMessage.addListener((req) => {
      if (req.type === 'save_url_success') {
        createMessage('網址已成功存入 Readmoo 書櫃。')
      }
    })
  })
})()
