const {Application} = require('spectron')
const assert = require('assert')

describe('application launch', function() {
  this.timeout(10000)

  beforeEach(() => {
    this.app = new Application({
      path: `${__dirname}/../node_modules/.bin/electron`,
      args: [`${__dirname}/../app/main.js`]
    })
    return this.app.start()
  })

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('app has 3 windows', () => {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 3) // including DevTools.
    })
  })
})
