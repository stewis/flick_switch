/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Daniel LaBare                        *
*  Date:   2/4/2008                             *
************************************************/

jQuery.fn.flickSwitch = function(options) {
	
	var state = $(this).prop("checked") ? 'on' : 'off';
	var offset = 1.83;
	
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		switch_on_container: 'flick_switch_container_on.png',
		switch_left_container: 'flick_switch_container_left.png',
		switch_right_container: 'flick_switch_container_right.png',
		switch_image: 'flick_switch.png',
		image_path: 'img',
		switch_height: 27,
		switch_width: 94
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	// create the switch
	return this.each(function() {

		var container = '<div style="overflow: hidden; width: '+settings.switch_width+'px; height: '+settings.switch_height+'px; position: relative;"></div>';
		var slider  = '<img class="flick_switch" style="position: absolute; left: ' + (state == 'on' ? 0 : (0 - (settings.switch_width / offset))) + ';  height: '+settings.switch_height+'px;" src="'+settings.image_path+'/'+settings.switch_image+'" /><img class="flick_left" style="position: absolute; left: 0px;  height: '+settings.switch_height+'px;" src="'+settings.image_path+'/'+ (state == 'on' ? settings.switch_on_container : settings.switch_left_container) +'" /><img style="position: absolute; right: 0px;  height: '+settings.switch_height+'px;" src="'+settings.image_path+'/flick_switch_container_right.png" />';

		// insert into placeholder
		jQuery(this).css("display", "none");		
		jQuery(this).wrap(jQuery(container).html(jQuery(slider)));
		
		$(this).parent().mouseover(function(){
			jQuery(this).css("cursor", settings.mouse_over);
		});

		$(this).parent().mouseout(function(){
			jQuery(this).css("background", settings.mouse_out);
		});

		// click handling
		$(this).parent().click(function() {			
			if(state == 'off') {
				jQuery(this).animate({left: '0px'}, "slow", function() {
					jQuery(this).parent().find('.flick_left').attr('src', settings.image_path+'/'+settings.switch_on_container);
					jQuery("input", this).attr("checked", true);
					jQuery("input", this).trigger("change");
				});
				state = 'on';
			}
			else {
				jQuery(this).animate({left: (0 - (settings.switch_width / offset)) + 'px'}, "slow", function() {
					jQuery(this).parent().find('.flick_left').attr('src', settings.image_path+'/'+settings.switch_left_container);
					jQuery("input", this).attr("checked", false);
					jQuery("input", this).trigger("change");
				});
				state = 'off';
			}
		});

	});
	
};
