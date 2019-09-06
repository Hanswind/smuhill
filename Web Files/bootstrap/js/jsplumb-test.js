var numberOfTemplete1=0;
var numberOfTemplete2=0;
var numberOfTemplete2Txt=0;
var numberOfTemplete3=0;
jsPlumb.ready(function () {
    jsPlumb.draggable($(".img"));
    var instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer' },
        PaintStyle: { stroke: '#666' },
        EndpointHoverStyle: { fill: "orange" },
        HoverPaintStyle: { stroke: "orange" },
        EndpointStyle: { width: 20, height: 16, stroke: '#666' },
        Endpoint: "Rectangle",
        Anchors: ["TopCenter", "TopCenter"],
        Container: "svg-foreign",
        MaxConnections: 1,
        ConnectionsDetachable: false,
    });
    

    instance.batch(function () {
        var color1 = "#eee";
        var exampleEndpoint1 = {
            endpoint: ["Dot", { radius: 8 }],
            paintStyle: { fill: color1 },
            isSource: false,
            scope: "green",
            connectorStyle: { stroke: color1, strokeWidth: 4 },
            connector: ["Bezier", { curviness: 63 } ],
            maxConnections: 3,
            isTarget: true,

        };
        var color2 = "rgb(255,192,0)";
        var exampleEndpoint2 = {
            endpoint: ["Dot", { radius: 8}],
            paintStyle: { fill: color2 },
            isSource: true,
            scope: "green",
            connectorStyle: { stroke: color2, strokeWidth: 3 },
            connector: ["Bezier", { curviness: 63 } ],
            maxConnections: 1,
            isTarget: false,
        };



        var startpoint = {
            isSource: true,
            isTarget: false,
            maxConnections: 1,
            anchor: "BottomCenter"
          };
        jsPlumb.addEndpoint($(".entry"),{anchor:"Bottom"},exampleEndpoint2);
        jsPlumb.draggable($(".entry"));
        $(".templete1").click(function(){
            addTemplete1();
        });
        $(".templete2").click(function(){
            addTemplete2();
        });
        $(".templete3").click(function(){
            addTemplete3();
        });

        /*drag and drop*/
        var dragged;
        const chart=document.querySelector(".chatbot_Flow");
        const templete1=document.querySelector(".templete1");
        const templete2=document.querySelector(".templete2");
        const templete3=document.querySelector(".templete3");
        templete1.addEventListener("dragstart",function(event){
            dragged=event.target.id;
        });
        templete2.addEventListener("dragstart",function(event){
            console.log("start");
            dragged=event.target.id;
        });
        templete3.addEventListener("dragstart",function(event){
            dragged=event.target.id;
        });
        chart.addEventListener("dragover",function(event){
            event.preventDefault(); 
        });
        chart.addEventListener("dragenter",function(){
        })
        chart.addEventListener("drop",function(event){
            event.preventDefault();
            if(dragged==="text"){
                addTemplete1();
            }else if(dragged==="list"){
                addTemplete2();
            }else if(dragged==="image"){
                addTemplete3();
            }
        });


        function addTemplete1(id){  //텍스트 div
            if(typeof id==="undefined"){
                numberOfTemplete1++;
                id="templete1_"+numberOfTemplete1;
            }
            var $element=$('<div class="templete1-body window" id="'+id+'" draggable="true"><div class="text_name"><div class="name_content"  contenteditable="true" onclick="$(this).focus();" max="15">텍스트'+numberOfTemplete1+'</div></div><div class="text_content" contenteditable="true" onclick="$(this).focus();" data-text="챗봇에 보여질 텍스트 내용을 작성하세요!"></div></div>');
            $(".svg-foreign").append($element);
            jsPlumb.draggable($("#"+id));
            jsPlumb.addEndpoint($("#"+id),{anchor:"TopCenter"},exampleEndpoint1);
            jsPlumb.addEndpoint($("#"+id),{anchor:"BottomCenter"},exampleEndpoint2);
        };
        function addTemplete2(id){
            if(typeof id==="undefined"){
                numberOfTemplete2++;
                id="templete2_"+numberOfTemplete2;
            }
            var $element=$('<div class="templete2_1" id="'+id+'"><div class="templete2-head">list'+numberOfTemplete2+'</div><div class="templete2-box"><div class="templete2-button" id="templete2-button">+</div></div></div>');
            $(".svg-foreign").append($element);
            
            $("#templete2-button").click(function(){
                numberOfTemplete2Txt++;
                id="templete2-text"+numberOfTemplete2Txt;
                var $element=$('<div class="templete2-button" id="'+id+'">text</div>');
                $element.prependTo($(".templete2-box"));
                jsPlumb.addEndpoint($("#"+id),{anchor:"BottomCenter"},exampleEndpoint2)
        
            });
            jsPlumb.draggable($("#"+id));
            jsPlumb.addEndpoint($("#"+id),{anchor:"TopCenter"},exampleEndpoint1);
            jsPlumb.addEndpoint($("#"+id),{anchor:"BottomCenter"},exampleEndpoint2)
        };
        jsPlumb.draggable($(".templete2_1"));
        num=0;
        $("#templete2-button").click(function(){
            num++;
            id="templete2-text"+num;
            $element=$('<div class="templete2-button" id="'+id+'">text</div>')
            $element.prependTo($(".templete2-box"));
            jsPlumb.addEndpoint($(".templete2-button"),{anchor:"BottomCenter"},exampleEndpoint2) 
            
        });





        function addTemplete3(id) {
            if (typeof id === "undefined") {
                numberOfTemplete3++;
                id = "templete3_" + numberOfTemplete3;
            }
            var $element = $('<div class="img" id="' + id + '"><div class="img-head">img'+numberOfTemplete3+'</div><div class="upload-button img-button"><img class="profile-pic" src="file://null"/></div><input class="file-upload" type="file" accept="image/*"/></div>');
            $(".svg-foreign").append($element);
            jsPlumb.draggable($("#" + id));
            jsPlumb.addEndpoint($("#" + id), { anchor: "TopCenter" }, exampleEndpoint1);
            jsPlumb.addEndpoint($("#" + id), { anchor: "BottomCenter" }, exampleEndpoint2);
            /*이미지업로드*/
            $(document).ready(function () {
                var readURL = function (input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            $('.profile-pic').attr('src', e.target.result);
                            $('.profile-pic').css("display", "inline-block");
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }
                $(".file-upload").on('change', function () {
                    readURL(this);
                });

                $(".upload-button").on('click', function () {
                    $(".file-upload").click();
                });
            });
        };
    });

    
    jsPlumb.fire("jsPlumbDemoLoaded", instance);
    
});