(() => {
  function loadJSSequentially (aList, finished) {
    if (aList.length === 0) {
      if (finished) { finished() }
      return
    }
    let item = aList.shift()

    let newScript = document.createElement('script')

    let url = null
    let shouldSkip = null
    let loaded = null

    if (typeof item === 'object') {
      ({ url, shouldSkip, loaded } = item)
      if (shouldSkip()) {
        if (loaded) { loaded() }
        loadJSSequentially(aList, finished)
      } else {
        newScript.onload = () => {
          if (loaded) { loaded() }
          loadJSSequentially(aList, finished)
        }
      }
    } else if (typeof item === 'string') {
      url = item
      newScript.onload = () => {
        loadJSSequentially(aList, finished)
      }
    }
    newScript.src = url
    document.head.appendChild(newScript)
  }

  loadJSSequentially([
    'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', //https://cdn.jsdelivr.net/npm/vue
    
  ])
})();