var i=1;
$(".templete1").click(function(){
    var $element=$('<div class="form1 outer seq'+i+'" xmlns="http://www.w3.org/1999/xhtml"/>').text("폼1");
    $(".svg-foreign").append($element);
    $element.css({
        "margin":"20px"
    })
    $element.draggable();
    i++;
});
$(".templete2").click(function(){
    var $element=$('<div class="form1 outer" xmlns="http://www.w3.org/1999/xhtml"/>').text("폼2");
    $(".svg-foreign").append($element)
    $element.css({
        "margin":"20px"
    })
    $element.draggable();
});