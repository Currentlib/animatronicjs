let Nodes = getElementsByAttribute('animation');
let animationNodes = Nodes.map(function(item) {
    return {
        element: item,
        offsetTop: getOffsetTop(item),
        height: getHeight(item),
        type: item.getAttribute('animation'),
        duration: item.getAttribute('duration'),
        status: false
    };
});

function stats() {
    console.log(animationNodes);
}

checking();
window.onscroll = checking;

function checking() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    animationNodes.reduce(function(prev, curr, i) {
        if (animationNodes[i].offsetTop < scrolled+document.documentElement.clientHeight && animationNodes[i].offsetTop+animationNodes[i].height > scrolled) {
            if (!animationNodes[i].status) {
                animate(animationNodes[i].element, animationNodes[i].type, animationNodes[i].duration);
            }
            animationNodes[i].status = true;
        }
        else {
            animationNodes[i].status = false;
        }
    }, 0);
}

function animate(element, type, duration) {
    if (duration === null) {
        duration = '0.5s';
    }
    switch(type) {
        case 'opacity':
            element.style.opacity = 0;
            setTimeout(function() {
                element.style.transition = 'opacity ' + duration;
                element.style.opacity = 1;
                setTimeout(function() {
                    element.style.transition = '';
                }, 500);
            }, 50);
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
                } else if (shaked) {
                    shaked = false;
                    element.style.left = '10px';
                }
            }, 50);
            break;
        case 'leftin':
            element.style.opacity = 0;
            let startpos = -getWidth(element);
            let startoff = getOffsetLeft(element);
            element.style.transform = 'translateX(' + (startpos-startoff) + 'px)';
            let offset = -(startpos-startoff);
            setTimeout(function() {
                element.style.transition = 'transform ' + duration + ',' + 'opacity ' + duration;
                element.style.transform  = 'translateX(' + 0 + 'px)';
                element.style.opacity = 1;
                setTimeout(function() {
                    element.style.transition = '';
                }, 500);
            }, 50);
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
