(function (appConfig) {

	document.addEventListener( 'keydown', announceContent, false );

	var statusDiv = createStatusDiv();
	var str='';
	getScreenContent();
	function announceContent(ev){

			switch( ev.keyCode ) {
					// p, page up
					case 37: case 38: case 39: case 40: getScreenContent(ev.keyCode); break;
			}
	}


	function getScreenContent(keyCode){
		setTimeout(function(){

			var curSlide = document.querySelectorAll( 'section.present' );
			curSlide = curSlide[curSlide.length - 1];
			var fragments = curSlide.querySelectorAll( '.fragment' );
			var visibleFragments = curSlide.querySelectorAll( '.fragment.visible' );

			if(fragments.length>0){
				if( visibleFragments.length ==0 ) str='';
					[].forEach.call( 
					  curSlide.querySelectorAll( ':not(.fragment)' ),
						function  fn(elem){
							if (elem != 'undefined' && !elem.parentNode.classList.contains("fragment") && elem.querySelectorAll(".fragment").length ===0){
						   		if(str.indexOf(elem.textContent) === -1) {str+= ' ' + elem.textContent;}
						   		if(keyCode == 37 && fragments.length === visibleFragments.length) {elem.textContent;}
							}  
					});

					if(keyCode == 37 && fragments.length === visibleFragments.length){
						for (i = 0, l = visibleFragments.length; i < l; i = i + 1) {
							if(str.indexOf(visibleFragments[i].textContent) === -1) str+= visibleFragments[i].textContent; 
						}
					}
					if( visibleFragments.length > 0) {
						if(keyCode ===39) str = visibleFragments[visibleFragments.length-1].textContent;
						if(keyCode ===37) str = str + ' ' + visibleFragments[visibleFragments.length-1].textContent;					
					}
					// console.log(str)
					statusDiv.innerHTML = str;	
			}else{
				// console.log(curSlide.textContent);
				statusDiv.innerHTML = curSlide.textContent;
			}

		} , 200)
	}

	/**
	 * Creates a hidden div with role aria-live to announce the current slide content
 	* Hide the div off-screen to make it available only to Assistive Technologies
 	*/
	function createStatusDiv() {

		var statusDiv = document.getElementById( 'statusDiv' );
		if( !statusDiv ){
			statusDiv = document.createElement( 'div' );
			var statusStyle = statusDiv.style;
			statusStyle.position = "absolute";
			statusStyle.height = "1px";
			statusStyle.width = "1px";
			statusStyle.overflow ="hidden";
			statusStyle.clip = "rect( 1px, 1px, 1px, 1px )";
			statusDiv.setAttribute( 'id', 'statusDiv' );
			statusDiv.setAttribute( 'aria-live', 'polite' );
			statusDiv.setAttribute( 'aria-atomic','true' );
			document.querySelector( '.reveal' ).appendChild( statusDiv);
		}
		return statusDiv;
	}
		

}({}));