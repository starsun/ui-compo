
var ALP = {};

ALP.demo = {
	
	CURRENT:null,
	
	init: function(vmLink){
	
		$('#demo-nav').find('a.vm-link').click(function(){
			$('#demo-nav').find('a.current').removeClass('current');
			Util.URLHash.remove('vmLink');
			var vmLink = $(this).attr('vm');
			$(this).addClass('current');
			$('#ui-com').load(vmLink);

			Util.URLHash.set('vmLink', vmLink);
			ALP.demo.CURRENT = vmLink;			
			
			
			return false;
		});
		
		if (!vmLink) {
			vmLink = 'demo-dev-guide.html';
		}
		
		
		$('#demo-nav').find('a[vm="' + vmLink + '"]').click();
		
	}
};

$(document).ready(function(){
	Util.URLHash.init();
	var vmLink = Util.URLHash.get('vmLink');
	
	ALP.demo.init(vmLink);
});


