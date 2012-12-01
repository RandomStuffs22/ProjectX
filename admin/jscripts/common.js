// Called it common.js because of future updates in which I'll use jQuery code, e.g. to add inline moderation or beautiful slidefading popups.

jQuery(document).ready(function(){
	jQuery('ul.menu li a[title]').tooltip({
        effect: 'slide',
        position: 'top center',
        direction: "down",
		layout:'<div><span /><i /></div>',
        bounce: true
    });
});