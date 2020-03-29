var currentpos = "#top";

// smooth scroll
$(document).ready(function () {
    $("a").click(function (event) {
        event.preventDefault();
        currentpos = $(this).attr("href");
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    });
});

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});

function doneResizing(){
    $("html, body").animate({ scrollTop: $(currentpos).offset().top }, 100);
}