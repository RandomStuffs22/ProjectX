jQuery(document).ready(function(){
	jQuery('ul.menu li a[title]').tooltip({
        effect: 'slide',
        position: 'top center',
        direction: "down",
        bounce: true
    });
    jQuery('.popup_menu .popup_item[title]').tooltip({
        effect: 'slide',
        position: 'top center',
        direction: "down",
        offset: [-10,0],
        bounce: true
    });
});