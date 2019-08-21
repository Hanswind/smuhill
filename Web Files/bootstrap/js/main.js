


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
/* 요소 선택 */

function select(num) {
    if (num == 1) {
        if ($("#s_all").attr("value") != "s") {
            $("#normal_elements, #template, #adv_elements, #adv_template, #download_elements").css("display", "block");
            $("#s_all").attr("value", "s");
            $("#s_bas").attr("value", "c");
            $("#s_down").attr("value", "c");
        }
    } else if (num == 2) {
        if ($("#s_bas").attr("value") != "s") {
            $("#normal_elements, #template, #adv_elements, #adv_template").css("display", "block");
            $("#download_elements").css("display", "none");
            $("#s_all").attr("value", "c");
            $("#s_bas").attr("value", "s");
            $("#s_down").attr("value", "c");
        }
    } else if (num == 3) {
        if ($("#s_down").attr("value") != "s") {
            $("#normal_elements, #template, #adv_elements, #adv_template").css("display", "none");
            $("#download_elements").css("display", "block");
            $("#s_all").attr("value", "c");
            $("#s_bas").attr("value", "c");
            $("#s_down").attr("value", "s");
        }
    }

    _select_("#s_all");
    _select_("#s_bas");
    _select_("#s_down");
}

function _select_(id) {
    if ($(id).attr("value") == "s") {
        $(id).css("top", 0);
        $(id).css("font-weight", "bold");
        $(id).css("background-color", "rgba(255,192,0)");
    }
    else {
        $(id).css("top", 5);
        $(id).css("font-weight", "normal");
        $(id).css("background-color", "rgba(255,192,0,0.2)");
    }
}




/* 기본요소 접기 */
function fold_normal(){
    if($("#normal_elements").attr("value") == "open"){
        $("#template").animate({height:0});
        $("#normal_elements").attr("value", "close");
        $("#fold1").css("display", "none");
        $("#fold2").css("display", "inline");
        $("#normal_elements").css("background-color", "#dddddd");
        $("#normal_elements").css("color", "#999");
    }
    else{
        $("#template").animate({height:430});
        $("#normal_elements").attr("value", "open")
        $("#fold1").css("display", "inline")
        $("#fold2").css("display", "none")
        $("#normal_elements").css("background-color", "#ffffff");
        $("#normal_elements").css("color", "#000");
    }
}

/* 고급요소 접기 */
function fold_adv(){
    if($("#adv_elements").attr("value") == "open"){
        $("#adv_template").animate({height:0});
        $("#adv_elements").attr("value", "close")
        $("#fold3").css("display", "none")
        $("#fold4").css("display", "inline")
        $("#adv_elements").css("background-color", "#dddddd");
        $("#adv_elements").css("color", "#999");
    }
    else{
        $("#adv_template").animate({height:330});
        $("#adv_elements").attr("value", "open")
        $("#fold3").css("display", "inline")
        $("#fold4").css("display", "none")
        $("#adv_elements").css("background-color", "#ffffff");
        $("#adv_elements").css("color", "#000");
    }
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


