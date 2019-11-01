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

  window.addEventListener('load', async () => {
    const { hasToken } = await browser.runtime.sendMessage({
      type: 'check_token'
    })

    if (hasToken) { return }

    const token = localStorage.getItem('READ_TOKEN')

    await browser.runtime.sendMessage({
      type: 'save_token',
      token
    })

    createMessage('已取得 API 金鑰，您現在可以開始使用 Save to Readmoo')
  })
})()
