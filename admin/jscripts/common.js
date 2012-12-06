jQuery(document).ready(function(){
	jQuery('ul.menu li a[title]').tooltip({
        effect: 'slide',
        position: 'top center',
        direction: "down",
        bounce: true
    });
});