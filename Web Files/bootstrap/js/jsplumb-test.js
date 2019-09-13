var numberOfElements=1;
var numberOfTemplete1 = 0;
var numberOfTemplete2 = 0;
var numberOfTemplete2Btn=0;
var numberOfTemplete2Txt = 0;
var numberOfTemplete3 = 0;
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
        Container: "parent",
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
        var color2 = "rgb(70,70,70)";
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
        jsPlumb.addEndpoint($(".entry"), { anchor: "Bottom" }, exampleEndpoint2);
        jsPlumb.draggable($(".entry"));
        $(".templete1").click(function () {
            addTemplete1();
        });
        $(".templete2").click(function () {
            addTemplete2();
        });
        $(".templete3").click(function () {
            addTemplete3();
        });
        $('#saveButton').click(function(){
            saveFlowchart();
        });

        /*drag and drop*/
        var dragged;
        const chart = document.querySelector(".chatbot_Flow");
        const templete1 = document.querySelector(".templete1");
        const templete2 = document.querySelector(".templete2");
        const templete3 = document.querySelector(".templete3");
        templete1.addEventListener("dragstart", function (event) {
            dragged = event.target.id;
        });
        templete2.addEventListener("dragstart", function (event) {
            console.log("start");
            dragged = event.target.id;
        });
        templete3.addEventListener("dragstart", function (event) {
            dragged = event.target.id;
        });
        chart.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        chart.addEventListener("dragenter", function () {
        })
        chart.addEventListener("drop", function (event) {
            event.preventDefault();
            if (dragged === "text") {
                addTemplete1();
            } else if (dragged === "list") {
                addTemplete2();
            } else if (dragged === "image") {
                addTemplete3();
            }
        });

        function addTemplete1(id) {  //텍스트 div
            if (typeof id === "undefined") {
                numberOfElements++;
                numberOfTemplete1++;
                id = "templete1_" + numberOfTemplete1;

            }
            var $element=$('<div class=" templete1-body window" id="'+id+'" draggable="true"><div class="text_name"><div class="name_content"  contenteditable="true" onclick="$(this).focus();" >텍스트'+numberOfTemplete1+'</div></div><div class="text_content" contenteditable="true" onclick="$(this).focus();" data-text="챗봇에 보여질 텍스트 내용을 작성하세요!"></div></div>');
            $(".svg-foreign").append($element);
            jsPlumb.draggable($("#" + id));
            jsPlumb.addEndpoint($("#" + id), { anchor: "TopCenter" }, exampleEndpoint1);
            jsPlumb.addEndpoint($("#" + id), { anchor: "BottomCenter" }, exampleEndpoint2);
            
        };
        function addTemplete2(id) {
            if (typeof id === "undefined") {
                numberOfElements++;
                numberOfTemplete2++;
                id = "templete2_" + numberOfTemplete2;
                numberOfTemplete2Btn++
                BtnId="templete2Btn_"+numberOfTemplete2Btn;
            }
            var $element = $('<div class="window templete2_1" id="' + id + '"><div class="list_name"><div class="name_content" contenteditable="true" onclick="$(this).focus();">리스트' + numberOfTemplete2 + '</div></div><div class="text_content" contenteditable="true"  onclick="$(this).focus();" data-text="챗봇에 보여질 텍스트 내용을 작성하세요!"></div><div class="templete2-box"><div class="templete2-button" id="'+BtnId+'">+</div></div></div>');
            $(".svg-foreign").append($element);
            jsPlumb.addEndpoint($("#" + id), { anchor: "TopCenter" }, exampleEndpoint1);
            ($("#" + id)).draggable({
                step: function () {
                    jsPlumb.repaintEverything();
                },
                drag:function(){
                    jsPlumb.repaintEverything();
                },
                stop:function(){
                    jsPlumb.repaintEverything();
                }
            });

            $(".templete2-button").click(function () {
                numberOfElements++;
                numberOfTemplete2Txt++;
                id = "templete2-text" + numberOfTemplete2Txt;
                var $element = $('<div class="window templete2-button text_content" id="' + id + '" contenteditable="true" onclick="$(this).focus();" data-text="버튼명작성"></div>');
                $element.prependTo($(this).parent());
                jsPlumb.addEndpoint($("#" + id), { anchor: "BottomCenter" }, exampleEndpoint2)
                jsPlumb.repaintEverything();
            }); 
           
        };






        function addTemplete3(id) {
            if (typeof id === "undefined") {
                numberOfElements++;
                numberOfTemplete3++;
                id = "templete3_" + numberOfTemplete3;
            }
            var $element = $('<div class="window img" id="' + id + '"><div class="name_content img_name">img' + numberOfTemplete3 + '</div><div class="upload-button img-button" id="upload-button'+numberOfTemplete3+'"><img class="profile-pic" id="profile-pic'+numberOfTemplete3+'" src="file://null"/></div><input class="file-upload" type="file" accept="image/*"/></div>');
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
        function saveFlowchart(){
            var nodes = []
            $(".window").each(function (idx, elem) {
            var $elem = $(elem);
            var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
            console.log('endpoints of '+$elem.attr('id'));
            console.log(endpoints);
            console.log("밑");
            console.log($('#'+$elem.attr('id')+'> .text_content').html());    // 해당 요소의 value 값 불러오는 방법(div 기준으로 개행)
                nodes.push({
                    blockId: $elem.attr('id'),
                    nodetype: $elem.attr('data-nodetype'),
                    positionX: parseInt($elem.css("left"), 10),
                    positionY: parseInt($elem.css("top"), 10),
                    values: $('#'+$elem.attr('id')+'> .text_content').html(),
                    selection: $('#'+$elem.attr('id')).text()
                });
            });
            var connections = [];
            $.each(jsPlumb.getAllConnections(), function (idx, connection) {
                connections.push({
                    connectionId: connection.id,
                    pageSourceId: connection.sourceId,
                    pageTargetId: connection.targetId
                });
            });
            var flowChart = {};
            flowChart.nodes = nodes;
            flowChart.connections = connections;
            flowChart.numberOfElements = numberOfElements;
            var flowChartJson = JSON.stringify(flowChart);
            var connectionList = jsPlumb.getAllConnections();          
            $('#textarea').val(flowChartJson);
        }
        
    });


    jsPlumb.fire("jsPlumbDemoLoaded", instance);




});