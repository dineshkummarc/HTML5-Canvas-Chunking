// Author: Matthew Harrison-Jones

// Array Remove - By John Resig (MIT Licensed)
Array.remove = function (array, from, to) {

    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            break;
        }
    }
};

$(document).ready(function () {

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller
    // fixes from Paul Irish and Tino Zijdel

    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());

    /* FPS monitoring
     *
     * The higher the 'fpsFilter' value, the less the FPS will be affected by quick changes
     * Setting this to 1 will show you the FPS of the last sampled frame only
     */

    // stats.js r9 - http://github.com/mrdoob/stats.js
    var Stats=function(){var h,a,r=0,s=0,i=Date.now(),u=i,t=i,l=0,n=1E3,o=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,p=1E3,q=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();r=(r+1)%2;0==r?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
        "left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
        "30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);74>f.children.length;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
        "0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);74>g.children.length;)a=document.createElement("span"),
        a.style.width="1px",a.style.height=30*Math.random()+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{getDomElement:function(){return h},getFps:function(){return l},getFpsMin:function(){return n},getFpsMax:function(){return o},getMs:function(){return m},getMsMin:function(){return p},getMsMax:function(){return q},update:function(){i=Date.now();m=i-u;p=Math.min(p,m);q=Math.max(q,m);k.textContent=m+" MS ("+p+"-"+q+")";var a=Math.min(30,
        30-30*(m/200));g.appendChild(g.firstChild).style.height=a+"px";u=i;s++;if(i>t+1E3)l=Math.round(1E3*s/(i-t)),n=Math.min(n,l),o=Math.max(o,l),j.textContent=l+" FPS ("+n+"-"+o+")",a=Math.min(30,30-30*(l/100)),f.appendChild(f.firstChild).style.height=a+"px",t=i,s=0}}};

    var stats = new Stats();

    // Align top-left
    stats.getDomElement().style.position = 'absolute';
    stats.getDomElement().style.left = '0px';
    stats.getDomElement().style.top = '0px';

    document.body.appendChild(stats.getDomElement());

    setInterval(function () {

        stats.update();

    }, 1000 / 60);


    /**
     * Canvas settings
     */
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = 400;
    var canvasHeight = 300;

    canvas.attr("width", canvasWidth);
    canvas.attr("height", canvasHeight);

    /**
     * Content & Chunk settings
     */
    var contentWidth = 800, contentHeight = 600;
    var chunkSize = 50;

    /**
     * Movement settings
     */
    var canX, canY, mouseIsDown = 0, mouseDownX, mouseDownY, mouseUpX, mouseUpY;
    var rightKey = false, leftKey = false, upKey = false, downKey = false;
    var offsetX;
    var offsetY;

    /**
     * Adjustable options
     */
    var moveFriction = 1;
    var keyOffset = 20;
    var zoomMultiplier = 10;
    var zoomAmmount = 0.20;
    var zoom;
    var scale = 1;
    var originx = 0;
    var originy = 0;
    var debug = false;

    /**
     * Setup other settings
     */
    zoom_options();


    /**
     * Classes
     */
    var Chunk, Marker;

    /**
     * Chunk class
     * @param x
     * @param y
     */
    Chunk = function(x,y){
        this.settings = {x: x, y: y};
        this.markers = [];
        this.draw = function(){
            // Draw box
            context.beginPath();
            context.strokeRect(this.settings.x, this.settings.y, chunkSize, chunkSize);
            context.strokeStyle = "#CCC";
            context.closePath();
            //Draw markers
            if(this.markers.length > 0){
                for(var i=0;i<this.markers.length; i++){
                    var marker = this.markers[i];
                    context.save();
                    // Move to Chunk location
                    context.translate(this.settings.x, this.settings.y);
                    marker.draw();
                    context.restore();
                }
            }
        };
        this.checkEdge = function () {
            // Check Chunk is in canvas frame with 1 chunk excess.
            var addX = 0, addY = 0, minusX = 0, minusY = 0;

            if(originy < 0)addY = 0;
            else if(Math.abs(originy) > canvasHeight) addY = canvasHeight;
            else addY = Math.abs(originy);

            if(originx < 0)addX = 0;
            else if(Math.abs(originx) > canvasWidth) addX = canvasWidth;
            else addX = Math.abs(originx);

            if(originx > 0) minusX = 0;
            else if(originx < -canvasWidth) minusX = -canvasWidth;
            else if(originx > canvasWidth) minusX = canvasWidth;
            else minusX = originx;

            if(originy > 0) minusY = 0;
            else if(originy < -canvasHeight) minusY = -canvasHeight;
            else if(originy > canvasHeight) minusY = canvasHeight;
            else minusY = originy;

            return !(this.settings.y*zoom >= (canvasHeight+addY)+(chunkSize*zoom) || this.settings.x*zoom >= (canvasWidth+addX)+(chunkSize*zoom) || this.settings.y*zoom <= minusY - (chunkSize*zoom) || this.settings.x*zoom <= minusX - (chunkSize*zoom));
            //return true;
        }
    };

    /**
     * Marker class, both X & Y should be relative to chunk its in.
     * @param posX
     * @param posY
     */
    Marker = function(posX, posY){
        this.options = {color:"#88CCFF", size:10};
        this.posX = posX;
        this.posY = posY;
        this.draw = function(){
            context.fillStyle = this.options.color;
            context.beginPath();
            context.arc(this.posX, this.posY, this.options.size, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        };
    };

    var chunks = [];
    for (var x = 0; x < contentWidth; x+=chunkSize) {
        // ADD ROWS
        for (var y = 0; y < contentHeight; y+=chunkSize) {
            // ADD COLS
            chunks.push(new Chunk(x,y));
        }
    }

    //Insert Markers Manually
    var markerCount = 20;
    for(var i=0; i<=markerCount; i++){
        var chunkNumber = bitwiseRound(Math.random()*chunks.length);
        var x = bitwiseRound(Math.random()*chunkSize);
        var y = bitwiseRound(Math.random()*chunkSize);
        chunks[chunkNumber].markers.push(new Marker(x, y));
    }

    // Output chunk count
    if(debug) console.log(chunks.length);

    /**
     * Draws everything together.
     */
    function draw() {
        context.save();
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.restore();

        if (rightKey) {
            offsetX = keyOffset;
        }
        if (leftKey) {
            offsetX = -keyOffset;
        }
        if (upKey) {
            offsetY = -keyOffset;
        }
        if(downKey){
            offsetY = keyOffset;
        }

        context.save();
        context.translate(
            originx,
            originy
        );
        context.scale(zoom,zoom);
        context.translate(
            -( (canvasWidth/2) / scale + originx - (canvasWidth/2)/ ( scale * zoom ) ),
            -( (canvasHeight/2) / scale + originy - (canvasHeight/2) / ( scale * zoom ) )
        );
        if(mouseIsDown || rightKey || leftKey || upKey || downKey){

            for(var i=0;i<chunks.length;i++){
                var chunk = chunks[i];
                chunk.settings.x += bitwiseRound((offsetX / moveFriction)/zoom);
                chunk.settings.y += bitwiseRound((offsetY / moveFriction)/zoom);
                if(chunk.checkEdge()) chunk.draw();
            }
            offsetX = 0;
            offsetY = 0;
        }else{
            for(var i=0;i<chunks.length;i++){
                var chunk = chunks[i];
                if(chunk.checkEdge()) chunk.draw();
            }
        }
        context.restore();
        showPos();
    }

    /**
     * Generate a random number between 2 numbers.
     * @param from
     * @param to
     */
    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    /**
     * When the mouse press is up, store the values of x & y of the action.
     * @param e
     */
    function mouseUp(e) {
        if (!e) var e = event;
        mouseIsDown = 0;
        mouseUpX = e.pageX - document.getElementById("myCanvas").offsetLeft;
        mouseUpY = e.pageY - document.getElementById("myCanvas").offsetTop;
        mouseXY(e);
    }

    /**
     * If mouse press is down, make store x & y of press.
     * @param e
     */
    function mouseDown(e) {
        if (!e) var e = event;
        mouseIsDown = 1;
        mouseDownX = e.pageX - document.getElementById("myCanvas").offsetLeft;
        mouseDownY = e.pageY - document.getElementById("myCanvas").offsetTop;
        mouseXY(e);
    }

    /**
     * If the mouse moves, get the offset of the mouse movement.
     * @param e
     */
    function mouseXY(e) {
        if (!e) var e = event;
        canX = e.pageX - document.getElementById("myCanvas").offsetLeft;
        canY = e.pageY - document.getElementById("myCanvas").offsetTop;
        if(mouseIsDown){
            offsetX = canX - mouseDownX;
            offsetY = canY - mouseDownY;
            mouseDownX = e.pageX - document.getElementById("myCanvas").offsetLeft;
            mouseDownY = e.pageY - document.getElementById("myCanvas").offsetTop;
        }
        showPos();
    }

    /**
     * Mark the key pressed true.
     * @param evt
     */
    function onKeyDown(evt) {
        evt.preventDefault();
        if (evt.keyCode == 39) rightKey = true;
        else if (evt.keyCode == 37) leftKey = true;
        if (evt.keyCode == 38) upKey = true;
        else if (evt.keyCode == 40) downKey = true;
    }

    /**
     * Mark the key released false.
     * @param evt
     */
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightKey = false;
        else if (evt.keyCode == 37) leftKey = false;
        if (evt.keyCode == 38) upKey = false;
        else if (evt.keyCode == 40) downKey = false;
    }

    function zoom_in() {
        zoomMultiplier++;
        zoom_options();
    }
    function zoom_out() {
        if(zoom > zoomAmmount && zoomMultiplier > 0){
            zoomMultiplier--;
            zoom_options();
        }
    }
    function zoom_normal(){
        zoomMultiplier = 10;
        originx = 0;
        originy = 0;
        scale = 1;
        zoom_options();
    }
    function zoom_options(){
        //Update Zoom
        zoom = zoomMultiplier/10;
        originx = (canvasWidth/2) / scale + originx - (canvasWidth/2)/ ( scale * zoom );
        originy = (canvasHeight/2) / scale + originy - (canvasHeight/2) / ( scale * zoom );
        scale *= zoom;
        if(debug){
            console.log("Zoom: "+zoom);
            console.log("originx: "+originx);
            console.log("originy: "+originy);
            console.log("Scale: "+scale);
        }
    }

    /**
     * If debug mode is on show the x & y of the mouse and an indicator showing where it is.
     */
    function showPos() {
        if(debug){
            // large, centered, bright green text
            context.font="14pt Helvetica";
            context.textAlign="left";
            context.fillStyle="rgba(0,0,0, 0.2)";
            var str = canX + ", " + canY;
            if (mouseIsDown) str = str + " down";
            if (!mouseIsDown) str = str + " up";
            // draw text at center, max length to fit on canvas
            context.fillText(str, 20, canvasHeight-20);
            // plot cursor
            context.fillStyle="green";
            context.fillRect(canX -5,canY -5, 10,10);
        }
    }

    /**
     * Floors a number with better performance the Math.Floor().
     * @param number
     */
    function bitwiseRound(number){
        var rounded = ~~ (0.5 + number);
        return rounded;
    }

    $(document).ready(function () {
        document.getElementById("myCanvas").addEventListener("mousedown", mouseDown, false);
        document.getElementById("myCanvas").addEventListener("mousemove", mouseXY, false);
        document.body.addEventListener("mouseup", mouseUp, false);
        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);
        $(".zoom_in").on("click", zoom_in);
        $(".zoom_out").on("click", zoom_out);
        $(".zoom_normal").on("click", zoom_normal);
    });

    $(window).resize(draw);

    function startRender() {
        requestAnimationFrame(startRender);
        draw();
    }

    startRender();


});



