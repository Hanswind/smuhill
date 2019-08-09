var i=1;
$(".templete1").click(function(){
    var $element=$('<div class="templete1-body"><div class="templete1-uparrow">&#8593</div><div class="templete1-text" >text</div><div class="templete1-downarrow">&#8595</div></div>')
    $(".svg-foreign").append($element);
    $element.css({
        "margin":"20px"
    });
    $element.draggable();
    i++;
});
$(".entry").draggable();

$(".templete2").click(function(){
    var $element=$('<div class="templete2-body"><div class="uparrow">&#8593</div><div class="templete2-text">text</div><div class="templete2-buttonbox"><button class="templete2-button btn1">+</button><button class="templete2-button btn2">+</button><button class="templete2-button btn3">+</button></div><div class="downarrow">&#8595</div></div>');
    $(".svg-foreign").append($element);
    $element.css({
        "margin":"20px"
    });
    $element.draggable();
    
});
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

const jsPlumbOptions = {
    Connector: ['Straight'],
    Container: "connections",
    PaintStyle: {
      strokeWidth: 2,
      stroke: '#eee',
      outlineWidth: 2,
    },
    Endpoint: [ "Dot", { radius: 1 } ],
    ConnectionOverlays: [
      ['Arrow', {
        location: 1,
        visible: true,
        width: 15,
        length: 15,
        foldback: 1,
      }],
    ],
  };
  
  const jsPlumbInstance = jsPlumb.getInstance(jsPlumbOptions);
  
  jsPlumbInstance.makeSource('source', {
    anchor: "Right"
  });
  jsPlumbInstance.makeTarget("target", {
    anchor: "Left"
  });
