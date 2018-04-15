let yellow = document.getElementById('yellow');
let animationNodes = getElementsByAttribute('animation');
let animationNodesRanges = animationNodes.map(function(item) {
    return getOffsetTop(item);
});
let animationNodesHeights = animationNodes.map(function(item) {
    return getHeight(item);
});
let animationNodesTypes = animationNodes.map(function(item) {
    return item.getAttribute('animation');
});
let animationNodesStatus = animationNodes.map(function(item) {
    return false;
})
let animateNow;
let offSet = 0;

function stats() {
    console.log(animationNodes);
    console.log(animationNodesRanges);
    console.log(animationNodesHeights);
    console.log(animationNodesTypes);
    console.log(animationNodesStatus);
}

window.onload = checking;
window.onscroll = checking;

function checking() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    document.getElementById('counter').innerHTML = scrolled + 'px';

    animationNodesRanges.reduce(function(prev, curr, i) {
        if (animationNodesRanges[i] < scrolled+document.documentElement.clientHeight-offSet && animationNodesRanges[i]+animationNodesHeights[i] > scrolled+offSet) {
            if (!animationNodesStatus[i]) {
                animate(animationNodes[i], animationNodesTypes[i]);
            }
            animationNodesStatus[i] = true;
        }
        else {
            deanimate(animationNodes[i], animationNodesTypes[i]);
            animationNodesStatus[i] = false;
        }
    }, 0);
}

function animate(element, type) {
    switch(type) {
        case 'opacity':
            element.style.transition = 'opacity 2s';
            element.style.opacity = 1;
            console.log(getOffsetLeft(element));
            break;
        case 'shake':
            element.style.transition = 'left 0.05s';
            let start = Date.now();
            let shaked = false;
            let timer = setInterval(function() {
                let timePassed = Date.now() - start;
                if (timePassed >= 500) {
                    clearInterval(timer);
                    return;
                }
                if (!shaked) {
                    shaked = true;
                    element.style.left = '100px';
//                    console.log('shake1');
                } else if (shaked) {
                    shaked = false;
                    element.style.left = '10px';
//                    console.log('shake2');
                }
            }, 50);
            break;
        case 'leftin':
            let startpos = -getWidth(element);
            console.log('startpos: ' + startpos);
            let startoff = getOffsetLeft(element);
            console.log('startoff: ' + startoff);
            element.style.transform = 'translateX(' + (startpos-startoff) + 'px)';
            let offset = startpos-startoff;
            console.log('offset: ' + offset);
            let timer2 = setInterval(function() {
                let offsetPassed = getOffsetLeft(element) - startoff;
                if (offsetPassed >= startoff) {
                    element.style.transform  = 'translateX(' + 0 + 'px)';
                    setTimeout(function() {
                        element.style.transition = '';
                    }, 100);
                    clearInterval(timer2);
                    return;
                }
                element.style.transform  = 'translateX(' + offset + 'px)';
                element.style.transition = 'transform 0.2s';
                console.log(offset);
                offset+=200;
            }, 20)
    }
}

function deanimate(element, type) {
    switch(type) {
        case 'opacity':
            element.style.transition = '';
            element.style.opacity = 0;
            break;
    }
}

function getElementsByAttribute(attr) {
    let matchElements = [];
    let allElements = document.getElementsByTagName('*');
    for (let i=0; i<allElements.length; i++) {
        if (allElements[i].getAttribute(attr) !== null) {
            matchElements.push(allElements[i]);
        }
    }
    return matchElements;
}

function getHeight(elem) {
    return elem.clientHeight || elem.offsetHeight;
}

function getWidth(elem) {
    return elem.clientWidth || elem.offsetWidth;
}

function getOffsetTop(elem) {
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var top  = box.top +  scrollTop - clientTop;
    return Math.round(top);
}

function getOffsetLeft(elem) {
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var left = box.left +  scrollLeft - clientLeft;
    return Math.round(left);
}
