/*!
 * jQuery plugin to prevent double submission of forms 1.0.0
 *
 * https://github.com/ychumak/preventDoubleSubmission
 * 
 * Copyright 2014 Yuriy Chumak
 * Released under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function( $ ) {
	$.fn.preventDoubleSubmission = function(config) {
		
	    var defaults = {
	    	doThrottle: false,
	    	throttleTime: 2000 // 2 seconds by default
	    };
	    var last_clicked = undefined;
	    var time_since_clicked = undefined;
		var $form = undefined;

	    if ( config ) $.extend(defaults, config);

		enableForm = function() {
			if ($form) {
				$form.data('submitted', false);
			}
		};

		disableForm = function() {
			if ($form) {
				if ($form) $form.data('submitted', true);
			}
		};
		
		enableThrottle = function(timeOut) {
			defaults.doThrottle = true;
			if (timeOut) {
				defaults.throttleTime = timeOut;
			}
		};

		disableThrottle = function() {
			defaults.doThrottle = false;
			defaults.throttleTime = 2000;
		};

		$(this).on('submit', function(e){
			$form = $(this);
		 
			if (defaults.doThrottle) {
			    if (last_clicked) {
			    	time_since_clicked = e.timeStamp - last_clicked;
			    }
	
			    last_clicked = e.timeStamp;

			    if(time_since_clicked < defaults.throttleTime) {
			    	// submitted so fast - don't submit again
			    	alert('catch !!!');
			    	e.preventDefault();
			        return false;
			    }
			} else {
			    if ($form.data('submitted') === true) {
				      // Previously submitted - don't submit again
				      e.preventDefault();
				    } else {
				      // Mark it so that the next submit can be ignored
				      //$form.data('submitted', true);
				    	disableForm();
				    }
			}
		});
		 
		// Keep chainability
		return this;
		
		  
	};
})( jQuery );
