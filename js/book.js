YUI().use(
    'node'
  , 'anim'
  , 'crossframe'
  , 'json-stringify'
  , function (Y) {
  
    'use strict'

    var body = Y.one('body')
      , topOffsetHeight = Y.one('.home-menu').get('offsetHeight')
      , iframe = Y.one('iframe')
      , match = location.pathname.match(/\/book\/(.*)\/(.*)/)
      , match_page = location.pathname.match(/\/book\/(.*)\/(.*)\/(.*)/)
      , viewport = Y.DOM.viewportRegion()
      , src

    iframe.setStyles({
      top: topOffsetHeight,
      height: viewport.height - topOffsetHeight
    })

    if (
         match_page
         &&
         match_page[3]
      ) 
    {
      src = body.getAttribute("data-sourceUrl") + '/books/' + match_page[2] + '/' +  match_page[3];
    }
    
    else if (
         match 
         &&
         match[2]
      ) 
    {
      src = body.getAttribute("data-sourceUrl") + '/books/' + match[2] + '/1';
    }    
    
    iframe.set('src', src)
    
    // https://github.com/josephj/yui3-crossframe
    iframe.on('load', function() {  
    
        function onClick(e) {
            Y.log('CLICK')
        }

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

        Y.Global.on("crossframe:message", function (e, data, callback) {
        
            Y.log(
              data
            )
            
        });
    
    })

})