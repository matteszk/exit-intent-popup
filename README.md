# exit-intent-popup

# Features

- Can use third party forms to collect emails.
- Cookie support with optional expiry date.
- Set a timed delay before the script starts tracking exit intent.
- Display popup based on exit intent or timed delay.

# Usage

This fork of brunogianni's exit-intent-popup removes the popup generation blocks, instead using elements you already have on your page. You will need to have a designed modal element set to `display:none` on your page. This also removes the resizing functions so you need to be handling that in your CSS, etc.

```html
<script type="text/javascript" src="bioep.min.js"></script>

<script type="text/javascript">
    bioEp.init({
        // Options
    });
</script>
```

You must also add HTML and CSS directly on the page, and supply the elements.

```html
<head>
    <div id="exitIntent">
        <div id="exitIntentOverlay"></div>
        <div>
            <div id="exitIntentClose"></div>    
            <h1>Don't go just yet!</h1>
            <p>Here is an enticing offer…</p>
        </div>
    </div>

    <script type="text/javascript" src="bioep.min.js"></script>

    <script type="text/javascript">
        bioEp.init({
            bgEl: document.getElementById("exitIntent"),
            closeBtnEl: [document.getElementById("exitIntentClose"), document.getElementById("exitIntentOverlay")],
            cookieExp: 0 //always show popup, which you will probably remove after initial testing! (see options)
        });
    </script>

    <style type="text/css">
        #exitIntent {          
          position: fixed;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
        //     
        #exitIntent {
          position: fixed;
          height: 100%;
          width: 100%;
          background: black;
          opacity: 0.5;          
        }
        // close button, probably in the upper right of the conent...
        #exitIntentClose {
            position: absolute;
            right: 1em;
            top: 1em;
            ...
        }  

    </style>
</head>
<body>
    <div id="bio_ep">
        <!-- your popup HTML goes here -->
    </div>
</body>
```

# Options

All options must be added to the init function as an object.

Name            | Type        | Default | Description
--------------- | ----------- | ------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**bgEl**        | HTMLElement | null    | The element to show when the popup activates. Element toggles between display: block and, assumedly, display: none which you have set in your CSS, etc.
**closeBtnEl**  | Array | null    | Array of HTMLElements that close that close the popup, example uses the close button as well as the 50% black overlay to close.
**delay**       | integer     | 5       | The time, in seconds, until the popup activates and begins watching for exit intent. If showOnDelay is set to true, this will be the time until the popup shows.
**showOnDelay** | boolean     | false   | If true, the popup will show after the delay option time. If false, popup will show when a visitor moves their cursor above the document window, showing exit intent.
**cookieExp**   | integer     | 30      | The number of days to set the cookie for. A cookie is used to track if the popup has already been shown to a specific visitor. If the popup has been shown, it will not show again until the cookie expires. A value of 0 will always show the popup.

# License

MIT license, feel free to use however you wish!

Created by [beeker.io](http://beeker.io/exit-intent-popup-script-tutorial)
