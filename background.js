/* eslint-env browser, webextensions */

(() => {
  const setToken = token => browser.storage.local.set({ token })
  const getToken = () => browser.storage.local.get('token')
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
      case 'save_token': {
        setToken(req.token).then(() => console.log('token saved'))
        break
      }
      default: {
        console.warn('Not defined behavior', req)
      }
    }
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

    browser.tabs.sendMessage(id, { type: 'save_url_success' })
  })
})()
