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
	var myDrag=function(draggable){
		// draggable.css({'position':'absolute','cursor':'move'});
		var h=draggable.height();
		var draggable1=draggable[0];
		var x,y;
		var offset=draggable.offset(); 

		console.log(draggable);
	  draggable1.ondragstart=function(event){
	  	// event.dataTransfer.clearData();
	  	x=event.pageX-offset.left;
			y=event.pageY-offset.top;

	  	draggable.append('<div class="dragtest"></div>');
	  	$('.dragtest').height(h);
	  	draggable.css({'position':'absolute','cursor':'move'});
	  	// event.dataTransfer.effectAllowed  = "all";
	    /*var dragImage = document.createElement('img'),dragImageUrl='test.jpg';
	    dragImage.src = dragImageUrl;
	    dragImage.width = 75;
	    event.dataTransfer.setDragImage(dragImage, 0, 0);*/

	    // event.target.style.background = '#eee';
	    event.dataTransfer.setData('text',event.target.id);
	    // event.target.style.opacity = '0';
	  };

	  draggable1.ondrag=function(event){
	  	var _x=event.pageX-x,
					_y=event.pageY-y;
	  	draggable.css({'left':_x+'px','top':_y+'px'})
	  };

	  draggable1.ondragend=function dragEnter(event) {
	  	event.target.style.border = "none";
	  };

	  // var droptarget = $('.drop-area')[0];
	  var droptarget = $('body')[0];
	  // console.log(droptarget);

	  droptarget.ondragenter=function dragEnd(event) {
	  	event.target.style.border = "2px dashed #ff0000";
	  };
	  droptarget.ondragover=function dragOver(event) {
	    event.preventDefault();
	    event.dataTransfer.dropEffect = "move";
	    return false;
	  };
	  droptarget.ondragleave=function dragLeave(event){
	  	event.target.style.borderColor = "#aaa";
	  };
	  droptarget.ondrop=function drop(event) {
	  	event.preventDefault();
	    event.target.style.borderColor = "#aaa";
	    var data = event.dataTransfer.getData(event.dataTransfer.types[0]);
	    console.log(event.dataTransfer.types);
	    event.target.appendChild(document.getElementById(data));
	    // $('.drop-area').append('<h2>1</h2>');
	    
	    draggable.css({'position':'relative','cursor':''});
	    return false;
	  };

  };

	$('.move').on('mousedown',function(e){
		console.log($(this));
		myDrag($(this));
	});
	$('.move').on('mouseup',function(e){
		$(this).off('mousedown');
	});



})