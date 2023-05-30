(function($){

    
    (function handleTrailer(){
        
        var $selector = {
            body: $( "body" ),
            overlay: $( "#blackout" ),
            modal: $( "#trailerModal" ),
            showButton: $( "#showTrailer" ),
            hideButton: $( "#hideTrailer" ),
        };
        
        
        var player = {
            obj: null, 
            query : {
                theme: "dark",
                color: "white",
                controls: 1, 
                autoplay: 1,
                enablejsapi: 1,
                modestbranding: 0, 
                rel: 0,  
                showinfo: 0, 
                iv_load_policy: 3
            },
            visible: false
        };
        

        $selector.showButton.on( "click", showPlayer );
        $selector.hideButton.on( "click", hidePlayer );
        
    
        function setPlayer( id ){
            player.obj = new YT.Player( "trailer", {
                width: 480,
                height: 282,
                videoId: id,    
                playerVars: player.query
            });
            
          
            resizePlayer();
            
   
            $( window ).on( "resize orientationchange", function() {
                resizePlayer();
            });
        }
        
        function resizePlayer() {
            var viewport = {}, frame = {}, modal = {};

            viewport.width = $( window ).width();
            viewport.height = $( window ).height();

            frame.width = viewport.width;
            frame.height = frame.width / 1.6; 

            modal.top = ( ( viewport.height - frame.height ) / 2 ) + "px";
            modal.left = "0px";

            $selector.modal.css( modal );

            player.obj.setSize( frame.width, frame.height );
        }

   
        function showPlayer() {
            if ( !player.obj ) {
                setPlayer( $selector.showButton.data("youtube") );
            }
            
            $selector.body.addClass("modal_on");
            $selector.overlay.show();
            player.visible = true;
        };
        
     
        function hidePlayer (){
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass("modal_on");
            player.visible = false;
        };
        
    })();
    
})(jQuery);     