//mouse input
let Mouse = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

// return the angle of the vector in radians
Mouse.prototype.getDirection = function () {
    return Math.atan2(this.y, this.x);
};

// get the magnitude of the vector
Mouse.prototype.getMagnitude = function () {
    // use pythagoras theorem to work out the magnitude of the vector
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Mouse.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
};

let cursorPostionX = 0;
let cursorPostionY = 0;
let circlePostionX = 0;
let circlePostionY = 0;

function cursorEdit() {

    // CURSEUR

    if (window.matchMedia("(min-width: 768px)").matches) {

        let mousePosX = cursorPostionX,
            mousePosY = cursorPostionY,
            mouseCircle = document.querySelector("#mouse-circle"),
            pointerMouseCircle = document.querySelector("#pointer-circle");

        document.onmousemove = (e) => {

            mousePosX = e.clientX;
            mousePosY = e.clientY;

        };

        let delay = 6,

            revisedMousePosX = circlePostionX,
            revisedMousePosY = circlePostionY;

        function delayMouseFollow() {

            requestAnimationFrame(delayMouseFollow);

            revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
            revisedMousePosY += (mousePosY - revisedMousePosY) / delay;
            cursorPostionX = mousePosX;
            cursorPostionY = mousePosY;
            circlePostionX = revisedMousePosX;
            circlePostionY = revisedMousePosY;
            mouseCircle.style.top = revisedMousePosY + "px";
            mouseCircle.style.left = revisedMousePosX + "px";
            pointerMouseCircle.style.top = mousePosY + "px";
            pointerMouseCircle.style.left = mousePosX + "px";

        }

        delayMouseFollow();

    };

}

function resetMousePointer() {

    setTimeout(() => {

        mouseCircle = document.querySelector("#mouse-circle"),
            pointerMouseCircle = document.querySelector("#pointer-circle");
        mouseCircle.style.width = "32px";
        mouseCircle.style.height = "32px";
        mouseCircle.style.margin = "-23px 0px 0px -22px";
        pointerMouseCircle.style.width = "5px";
        pointerMouseCircle.style.height = "5px";
        pointerMouseCircle.style.margin = "0px 0px 0px 0px";
        pointerMouseCircle.style.border = "3px solid #ffffff";
        mouseCircle.style.border = "3px solid #ffffff";

    }, 500);

}

mouseCircle = document.querySelector("#mouse-circle");