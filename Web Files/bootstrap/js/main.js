
$(".form1")
    .draggable({
        containment:"parent",
        scroll:true,
        scrollSensitivity:100,
        snap: ".outer",
        snapMode: "outer",
        snapTolerance:10,
        zIndex:10
    });
