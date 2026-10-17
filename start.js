const request = new XMLHttpRequest()
const appUrl = 'https://cafechat.app/assets/'
const srcPost = '?&v=' + (new Date()).getTime()
if (!window.cafechatAppLoaded) {
  request.open('GET', appUrl + 'index.html' + srcPost, true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const resp = request.responseText
      if (!document.getElementById('apppopupmax')) {
        const ch = document.createElement('div')
        ch.setAttribute('id', 'apppopupmax')
        document.body.appendChild(ch)
      }
      const srcs = resp.match(/src="(.*?)"|href="(.*?)"/g)
      if (!srcs) return
      for (let i = 0; i < srcs.length; i++) {
        let src = srcs[i].replace(/src=|href=/, '').replace(/"/g, '')
        if (!src) continue
        const isJs = /\.js($|\?)/.test(src)
        const isCss = /\.css($|\?)/.test(src)
        if (!isJs && !isCss) continue

        const isRelative = !src.startsWith('http://') && !src.startsWith('https://')
        if (isRelative) {
          src = appUrl + src.replace(/^(\.\/|\/)?(assets\/)?/, '')
        }

        const versionParam = isRelative ? srcPost : ''

        if (isJs) {
          const tag = document.createElement('script')
          tag.type = 'module'
          tag.crossOrigin = 'anonymous'
          tag.src = src + versionParam
          document.head.appendChild(tag)
        } else if (isCss) {
          const tag = document.createElement('link')
          tag.rel = 'stylesheet'
          tag.href = src + versionParam
          document.head.appendChild(tag)
        }
      }
    }
  }
  request.send()
  window.cafechatAppLoaded = true
}
