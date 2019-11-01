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
  createMessage('網址已成功存入 Readmoo 書櫃。')
})()
