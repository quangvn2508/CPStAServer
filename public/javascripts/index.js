index = function() {
    var currentpos = "#top", resizeId;

    /**
     * Smooth scroll to element on click
     */
    $(document).ready(function () {
        $("a").click(function (event) {
            event.preventDefault();
            currentpos = $(this).attr("href");
            $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
        });
    });
    
    /**
     * If not resize for 0.5s then call doneResizing to re-locate the correctly
     */
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });
    
    /**
     * Relocate view to element if mis-align when resize window
     */
    function doneResizing(){
        $("html, body").animate({ scrollTop: $(currentpos).offset().top }, 100);
    }
}();

