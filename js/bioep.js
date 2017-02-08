window.ExitIntent = window.bioEp = {
	// Private variables
	bgEl: {},
	closeBtnEl: [],
	shown: false,
	overflowDefault: "visible",

	delay: 5,
	showOnDelay: false,
	cookieExp: 30,
	topExitOnly: true,

	// Object for handling cookies, taken from QuirksMode
	// http://www.quirksmode.org/js/cookies.html
	cookieManager: {
		// Create a cookie
		create: function(name, value, days) {
			var expires = "";

			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}

			document.cookie = name + "=" + value + expires + "; path=/";
		},

		// Get the value of a cookie
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");

			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}

			return null;
		},

		// Delete a cookie
		erase: function(name) {
			this.create(name, "", -1);
		}
	},

	// Handle the bioep_shown cookie
	// If present and true, return true
	// If not present or false, create and return false
	checkCookie: function() {
		// Handle cookie reset
		if (this.cookieExp <= 0) {
			this.cookieManager.erase("bioep_shown");
			return false;
		}

		// If cookie is set to true
		if (this.cookieManager.get("bioep_shown") == "true")
			return true;

		// Otherwise, create the cookie and return false
		this.cookieManager.create("bioep_shown", "true", this.cookieExp);

		return false;
	},

	// Show the popup
	showPopup: function() {
		if (this.shown) return;

		this.bgEl.style.display = "block";

		// Save body overflow value and hide scrollbars
		this.overflowDefault = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		this.shown = true;
	},

	// Hide the popup
	hidePopup: function() {
		this.bgEl.style.display = "none";

		// Set body overflow back to default to show scrollbars
		document.body.style.overflow = this.overflowDefault;

		// Handle the popup close button
		for (var l = this.closeBtnEl.length - 1; l >= 0; l--) {
			this.removeEvent(this.closeBtnEl[l], "click", bioEp.hidePopup.bind(this));
		}
	},

	// Event listener initialisation for all browsers
	addEvent: function(obj, event, callback) {
		if (obj.addEventListener)
			obj.addEventListener(event, callback, false);
		else if (obj.attachEvent)
			obj.attachEvent("on" + event, callback);
	},

	// Event listener initialisation for all browsers
	removeEvent: function(obj, event, callback) {
		if (obj.removeEventListener)
			obj.removeEventListener(event, callback, false);
		else if (obj.detachEvent)
			obj.detachEvent("on" + event, callback);
	},

	// Load event listeners for the popup
	loadEvents: function() {
		// Track mouseout event on document
		this.addEvent(document, "mouseout", function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;

			// Reliable, works on mouse exiting window and user switching active program
			if (!from || (from.nodeName === "HTML")) {
				//only showpopup going to browser top bar
				if (this.topExitOnly && e.clientY > 0) {
					return;
				}
				bioEp.showPopup();
			}
		});

		// Handle the popup close button
		for (var l = this.closeBtnEl.length - 1; l >= 0; l--) {
			this.addEvent(this.closeBtnEl[l], "click", bioEp.hidePopup.bind(this));
		}
	},

	// Set user defined options for the popup
	setOptions: function(opts) {
		this.bgEl = opts.bgEl;
		this.topExitOnly = opts.topExitOnly || false;
		this.closeBtnEl = opts.closeBtnEl;
		this.delay = (typeof opts.delay === 'undefined') ? this.delay : opts.delay;
		this.showOnDelay = (typeof opts.showOnDelay === 'undefined') ? this.showOnDelay : opts.showOnDelay;
		this.cookieExp = (typeof opts.cookieExp === 'undefined') ? this.cookieExp : opts.cookieExp;
	},

	// Ensure the DOM has loaded
	domReady: function(callback) {
		(document.readyState === "interactive" || document.readyState === "complete") ? callback(): this.addEvent(document, "DOMContentLoaded", callback);
	},

	// Initialize
	init: function(opts) {
		// Handle options
		if (typeof opts !== 'undefined')
			this.setOptions(opts);

		// Once the DOM has fully loaded
		this.domReady(function() {
			// Handle the cookie
			if (bioEp.checkCookie()) return;

			// Load events
			setTimeout(function() {
				bioEp.loadEvents();

				if (bioEp.showOnDelay)
					bioEp.showPopup();
			}, bioEp.delay * 1000);
		});
	}
};
