/*$(function(){
	var drag=function(ele){
		ele.css({'position':'absolute','cursor':'move'});
		ele.on('mousedown',function(e){
			var offset=$(this).offset(); 
			var x=e.pageX-offset.left;
			var y=e.pageY-offset.top;
			$(document).on('mousemove',function(ev){
				var _x=ev.pageX-x,
						_y=ev.pageY-y;
				var w=document.body.scrollWidth-ele.offsetWidth,
            h=document.body.scrollHeight-ele.offsetHeight,
        _x=_x<0?0:_x>w?w:_x;
        _y=_y<0?0:_y>h?h:_y;
        ele.css({'left':_x+'px','top':_y+'px'});
			})
		})
		$(document).on('mouseup',function(){
			$(this).off('mousemove');
		})
	};

});*/
var insertAfter=function(newEle,oldEle){
	var parent=oldEle.parentNode;
	parent.insertBefore(newEle,oldEle.nextSibling);
	/*if(parent.lastChild==oldEle){
		parent.appendChild(newEle);
	}
	else{
		parent.insertBefore(newEle,oldEle.nextSibling);
	}*/
};
var x,y,_x,_y;
var canDrop=false;
var move=function(ev){

	var _x=ev.pageX-x,
			_y=ev.pageY-y;
	var w=document.body.clientWidth-ele.offsetWidth,
      h=document.body.clientHeight-ele.offsetHeight;
  _x=_x<0?0:_x>w?w:_x;
  _y=_y<0?0:_y>h?h:_y;
  ele.style.left=_x+'px';
	ele.style.top=_y+'px';

	// console.log(_x);
	var x_center=_x+ele.offsetWidth/2;
	var y_center=_y+ele.offsetHeight/2;
	//droparea
	var drop_l=drop.offsetLeft;
	var drop_t=drop.offsetTop;
	var drop_r=drop.offsetLeft+drop.offsetWidth;
	var drop_b=drop.offsetTop+drop.offsetHeight;
	canDrop=false;
	if(x_center>drop_l&&x_center<drop_r&&y_center>drop_t&&y_center<drop_b){
		drop.style.border='2px dashed #aaa';

		var div=document.getElementsByClassName('div')[0];
		div.parentNode.removeChild(div);

		var div=document.createElement('div');
	  div.className='div';
		div.style.border='2px dashed #bbb';
		div.style.backgroundColor='#f8f8f8';
		div.style.width=drop.offsetWidth+'px';
		div.style.height=drop.offsetHeight+'px';
		div.style.position='relative';
		div.style.left='0';
		div.style.top='0';
		insertAfter(div,drop);

		canDrop=true;
	}
	else{
		drop.style.border='none';
	}

};
var mousedown=function(e){
	if(e.button==0){//阻止右键点击 or e.which==1;
		e.preventDefault();//阻止默认事件
	  e.stopPropagation();//阻止事件冒泡
	  //
		ele.style.position='absolute';
	  //
	  var div=document.createElement('div');
	  div.className='div';
		div.style.border='2px dashed #bbb';
		div.style.backgroundColor='#f8f8f8';
		div.style.width=ele.offsetWidth+'px';
		div.style.height=ele.offsetHeight+'px';
		div.style.position='relative';
		div.style.left='0';
		div.style.top='0';
		insertAfter(div,ele);
	  //
		ele.style.position='absolute';
		x=e.pageX-ele.offsetLeft;
		y=e.pageY-ele.offsetTop;
		document.addEventListener('mousemove',move,false);
	}
}
var mouseup=function(e){
	ele.style.position='relative';
	if(canDrop){
		var newNode=ele.cloneNode(true);
		var oldNode=drop.children[0];
		newNode.style.left=0;
		newNode.style.top=0;
		drop.replaceChild(newNode,oldNode);
		drop.style.border='none';
		ele.parentNode.removeChild(ele);
	}
	else{
		ele.style.left='0';
		ele.style.top='0';
	}

	var div=document.getElementsByClassName('div')[0];
	div.parentNode.removeChild(div);

	document.removeEventListener('mousemove',move,false);
	document.removeEventListener('mousemove',mousedown,false);
}
var drag=function(ele){
	ele.addEventListener('mousedown',mousedown,false);
	document.addEventListener('mouseup',mouseup,false);
};

var ele=document.getElementsByClassName('move')[0];
var drop=document.getElementsByClassName('drop-area')[0];
drag(ele);

















