


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
    ev.dataTransfer.setData("templete1-body", ev.target.class);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("templete1-body");
    ev.target.appendChild(document.getElementById(data));
}


