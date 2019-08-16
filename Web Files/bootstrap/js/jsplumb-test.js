var numberOfTemplete1=0;
var numberOfTemplete2=0;
jsPlumb.ready(function () {
    jsPlumb.draggable($(".templete2_1"));
    $("#templete2_1").click(function(){
        var $element=$('<div class="templete2-button" id="templete2_">text</div>');
        $element.insertAfter($(".templete2-head"));

    });

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
        var color1 = "#ff0000";
        var exampleEndpoint1 = {
            endpoint: ["Dot", { radius: 11 }],
            paintStyle: { fill: color1 },
            isSource: false,
            scope: "green",
            connectorStyle: { stroke: color1, strokeWidth: 6 },
            connector: ["Bezier", { curviness: 63 } ],
            maxConnections: 3,
            isTarget: true,
        };
        var color2 = "#316b31";
        var exampleEndpoint2 = {
            endpoint: ["Dot", { radius: 11 }],
            paintStyle: { fill: color2 },
            isSource: true,
            scope: "green",
            connectorStyle: { stroke: color2, strokeWidth: 6 },
            connector: ["Bezier", { curviness: 63 } ],
            maxConnections: 3,
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

        function addTemplete1(id){
            if(typeof id==="undefined"){
                numberOfTemplete1++;
                id="templete1_"+numberOfTemplete1;
            }
            var $element=$('<div class="templete1-body window" id="'+id+'"><div class="templete1-uparrow">&#8593</div><div class="templete1-text" >text'+numberOfTemplete1+'</div><div class="templete1-downarrow" id="source">&#8595</div></div>');
            $(".svg-foreign").append($element);
            jsPlumb.addEndpoint($("#"+id),{anchor:"TopCenter"},exampleEndpoint1);
            jsPlumb.addEndpoint($("#"+id),{anchor:"BottomCenter"},exampleEndpoint2);
            jsPlumb.draggable($("#"+id));
        };
    });
    
    jsPlumb.fire("jsPlumbDemoLoaded", instance);
    
});