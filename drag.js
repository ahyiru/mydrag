$(function(){
	var drag=function(ele){
		ele.css({'position':'absolute','cursor':'move'});
		ele.on('mousedown',function(e){
			var offset=$(this).offset(); 
			var x=e.pageX-offset.left;
			var y=e.pageY-offset.top;
			$(document).on('mousemove',function(ev){
				var _x=ev.pageX-x,
					_y=ev.pageY-y;
				var w=$(document).width()-ele.outerWidth(),
                    h=$(document).height()-ele.outerHeight();
                _x=_x<0?0:_x>w?w:_x;
                _y=_y<0?0:_y>h?h:_y;
                ele.css({'left':_x+'px','top':_y+'px'});
			})
		})
		$(document).on('mouseup',function(){
			$(this).off('mousemove');
		})
	}
	drag($('.move'));
})