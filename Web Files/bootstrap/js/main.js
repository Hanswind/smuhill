

/* 오른쪽 레이아웃 접기*/
function fold_layout(){
    if(document.getElementById("fold_button").value == ">>"){
        document.getElementById("fold_button").value='<<';
        $(function(){
            $("#right_section").animate({width:20});
            $("#fold_button").animate({right:0});
            $(".section3_tag").hide();

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
            $(".section3_tag").show();
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
/*section3 태그*/
const attrBtn=document.querySelector(".section3-attribute");
const prevBtn=document.querySelector(".section3-preview");
const attrWindow=document.querySelector(".attribute");
const prevWindow=document.querySelector(".preview");

function openAttr(){
    if(prevBtn.classList.contains("section3-clicked")){
        prevBtn.classList.remove("section3-clicked");
    }
    attrWindow.style.display="inline-block";
    prevWindow.style.display="none";
    attrBtn.classList.add("section3-clicked");
}
function openPrev(){
    if(attrBtn.classList.contains("section3-clicked")){
        attrBtn.classList.remove("section3-clicked");
    }
    attrWindow.style.display="none";
    prevWindow.style.display="inline-block";
    prevBtn.classList.add("section3-clicked");  
}
attrBtn.addEventListener("click",openAttr);
prevBtn.addEventListener("click",openPrev);

/* 플로우차트 줌인아웃 */
function zoomin(){
    var zoom = $(".chatbot_Flow").css("zoom")*1.1;
    if(zoom < 2.45) {
        $(".chatbot_Flow").css("zoom", zoom * 1.1)
    }
}
function zoomout(){
    var zoom = $(".chatbot_Flow").css("zoom");
    if(zoom > 0.55){
        $(".chatbot_Flow").css("zoom", zoom * 0.9)
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
const templete1=document.querySelector(".templete1");
const chart=document.querySelector(".chatbot_Flow");
console.log(chart);
