$(".book").click(function() {
    $(".popup").addClass("show");
});
$(".popup__bg").click(function () {
    $(".popup").removeClass("show"); 
});
$(".popup__close").click(function() { 
    $(".popup").removeClass("show");
});

