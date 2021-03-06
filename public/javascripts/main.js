/*
	Full Motion by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {

    var $window = $(window),
      $body = $('body');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $('form').placeholder();

    // Banner.
    var $banner = $('#banner');

    if ($banner.length > 0) {

      // IE fix.
      if (skel.vars.IEVersion < 12) {

        $window.on('resize', function() {

          var wh = $window.height() * 0.60,
            bh = $banner.height();

          $banner.css('height', 'auto');

          window.setTimeout(function() {

            if (bh < wh)
              $banner.css('height', wh + 'px');

          }, 0);

        });

        $window.on('load', function() {
          $window.triggerHandler('resize');
        });

      }

      // Video check.
      var video = $banner.data('video');

      if (video)
        $window.on('load.banner', function() {

          // Disable banner load event (so it doesn't fire again).
          $window.off('load.banner');

          // Append video if supported.
          if (!skel.vars.mobile &&
            !skel.breakpoint('large').active &&
            skel.vars.IEVersion > 9)
            $banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

        });

      // More button.
      $banner.find('.more')
        .addClass('scrolly');

    }

    // Scrolly.
    $('.scrolly').scrolly();

    // Poptrox.
    /*
    	$window.on('load', function() {

    		var $thumbs = $('.thumbnails');

    		if ($thumbs.length > 0)
    			$thumbs.poptrox({
    				onPopupClose: function() { $body.removeClass('is-covered'); },
    				onPopupOpen: function() { $body.addClass('is-covered'); },
    				baseZIndex: 10001,
    				useBodyOverflow: false,
    				overlayColor: '#222226',
    				overlayOpacity: 0.75,
    				popupLoaderText: '',
    				fadeSpeed: 500,
    				usePopupDefaultStyling: false,
    				windowMargin: (skel.breakpoint('small').active ? 5 : 50)
    			});

    	});
    */

    // Initial scroll.
    $window.on('load', function() {
      $window.trigger('scroll');
    });
  });


	$('#checkbox').click(function() {
	    if (this.checked) {
	        $('.date1').prop('disabled', false); // If checked enable item
	    } else {
	        $('.date1').prop('disabled', true); // If checked disable item
	    }
	});

  $('.hide').click(function(){
    $('.expired').toggle();
  });

  var limitByte = 1000;
  $("#text_des").keyup(function() {

        var totalByte = 0;
        var message = $("#text_des").val();

        for(var i =0; i < message.length; i++) {
                var currentByte = message.charCodeAt(i);
                if(currentByte > 128) totalByte += 2;
                else totalByte++;
        }

        $('#messagebyte').text(totalByte);
        if(totalByte > limitByte) {
          alert( limitByte+"바이트까지 전송가능합니다.");
          $("#text_des").val(message.substring(0,limitByte));
        }
    });

})(jQuery);
