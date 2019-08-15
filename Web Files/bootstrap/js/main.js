
$(".templete2").click(function(){
    var $element=$('<div class="templete2-body"><div class="uparrow">&#8593</div><div class="templete2-text">text</div><div class="templete2-buttonbox"><button class="templete2-button btn1">+</button><button class="templete2-button btn2">+</button><button class="templete2-button btn3">+</button></div><div class="downarrow">&#8595</div></div>');
    $(".svg-foreign").append($element);
    $element.draggable();
    
});



/* 오른쪽 레이아웃 접기*/
function fold_layout(){
    if(document.getElementById("fold_button").value == ">>"){
        document.getElementById("fold_button").value='<<';
        $(function(){
            $("#right_section").animate({width:20});
            $("#fold_button").animate({right:0});

            if (matchMedia("screen and (min-width:768px)").matches) {
                var nextWidth = $(".section2").width()+350;
                $(".section2").animate({
                    width:nextWidth
                }, { complete:function(){ $(".section2").width("calc(100% - 350px)"); } });
            }
            else{}
        });
    }

    else if(document.getElementById("fold_button").value == "<<"){
        document.getElementById("fold_button").value=">>";
        $(function(){
            $("#right_section").animate({width:400});
            $("#fold_button").animate({right:350});
            if (matchMedia("screen and (min-width:768px)").matches) {
                var nextWidth = $(".section2").width()-350;
                $(".section2").animate({
                    width:nextWidth
                }, { complete:function(){ $(".section2").width("calc(100% - 700px)"); } });
            }
        });
    }
    else{}
}






/* drag and drop */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


