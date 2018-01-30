/*! cracker-trap - v1.0.0 - 2018-01-29 */
((function () {
	var devtools = {
		open: false,
		orientation: null,
		undocked: null,
	};
	var threshold = 160;

	// Emit an event when devtools status is changed
	var emitEvent = function emitEvent(state, orientation, undocked) {
		window.dispatchEvent(new CustomEvent('onDevToolsChange', {
			detail: {
				open: state,
				orientation,
				undocked,
			},
		}));
	};

	function timeValidation() {
		var startTime = new Date();
		debugger;
		var endTime = new Date();

		return endTime - startTime > 100;
	}

	// Every half second check if developer tools is opened or not
	setInterval(function () {
		// Check between browser width/height and visible width/height and compare
		// with max threshold.
		var widthThreshold = window.outerWidth - window.innerWidth > threshold;
		var heightThreshold = window.outerHeight - window.innerHeight > threshold;
		var orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (heightThreshold === true || widthThreshold === true) {
			if (devtools.open === true || devtools.orientation !== orientation) {
				emitEvent(true, orientation, null);
			}

			devtools.open = true;
			devtools.orientation = orientation;
			devtools.undocked = false;
		} 
		else if (timeValidation() === true) {
			emitEvent(true, null, true);
			devtools.undocked = true;
		} 
		else {
			if (devtools.open) {
				emitEvent(false, null, null);
			}

			devtools.open = false;
			devtools.orientation = null;
			devtools.undocked = null;
		}
	}, 500);
console.log('alo');
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} 
	else {
		window.devtools = devtools;
	}
})());
