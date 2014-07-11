YUI().use(
    'node'
  , 'anim'
  , 'crossframe'
  , 'json-stringify'
  , function (Y) {
  
    'use strict'
    
    // http://stackoverflow.com/questions/3811913/firing-events-between-an-iframe-and-its-parent-using-yui  

    var body = Y.one('body')
      , topOffsetHeight = Y.one('.home-menu').get('offsetHeight')
      , iframe = Y.one('iframe')
      , match = location.pathname.match(/\/book\/(.*)\/(.*)/)
      , viewport = Y.DOM.viewportRegion()
      , src

    iframe.setStyles({
      top: topOffsetHeight,
      visibility: 'hidden', // wait until the book is available to show it
      opacity: '0', // wait until the book is available to show it
      height: viewport.height - topOffsetHeight
    })

    if (
        match 
        &&
        match[2]  
    ) {
      src = body.getAttribute("data-sourceUrl") + '/books/' + match[2] + '/1';
    }

    iframe.set('src', src)
    
    Y.Global.on("crossframe:message", function (e, data, callback) { });

    // https://github.com/josephj/yui3-crossframe
    iframe.on('load', function() {  

        var frameName = 'frames["book"]'
          , message   = body.getAttribute("data-app") + '/css/book.css'
          , config    = {
              "eventType"   : "crossframe:css",
              "callback"    : function (o) {

                  iframe.setStyles({ visibility: 'visible' })

                  var anim = new Y.Anim({
                    node: '#book',
                    to: { opacity: 1 },
                    duration: 0.2
                  });
                  
                  anim.run();
                  
                  Y.one('.loading').removeClass('active')
                  
              }
          };

        Y.CrossFrame.postMessage(frameName, message, config)
    
    })

})