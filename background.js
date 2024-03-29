/* eslint-env browser, webextensions */

(() => {
  const setToken = token => browser.storage.local.set({ token })
  const getToken = () => browser.storage.local.get('token')
  const removeToken = () => browser.storage.local.remove('token')
  const openLoginPage = () => browser.tabs.create({ url: 'https://read.readmoo.com' })

  ;(async () => {
    const { token } = await getToken()
    if (!token) {
      openLoginPage()
    }
  })()

  browser.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (!req || !req.type) {
      console.error('Req Format not correct', req)
    }

    switch (req.type) {
      case 'check_token': {
        getToken().then(({ token }) => sendResponse({ hasToken: !!token }))
        break
      }
      case 'save_token': {
        setToken(req.token).then(() => console.log('token saved'))
        break
      }
      case 'remove_token': {
        removeToken()
        break
      }
      default: {
        console.warn('Not defined behavior', req)
      }
    }
    return true
  })

  browser.browserAction.onClicked.addListener(async ({ url, id }) => {
    const apiUrl = 'https://api.readmoo.com/store/v3/me/documents/'
    const urlToSave = url
    const { token } = await getToken()

    if (!token) { openLoginPage() }

    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        data: { type: 'documents' },
        meta: { webpage: urlToSave }
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      }
    }).then(r => r.json())

    await browser.tabs.insertCSS({ file: 'notification.css' })
    browser.tabs.executeScript({ file: 'success-save.js' })
  })
})()
