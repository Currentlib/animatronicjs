let animationNodes = getElementsByAttribute('animation');

function getElementsByAttribute(attr) {
    let matchElements = [];
    let allElements = document.getElementsByTagName('*');
    for (let i=0; i<allElements.length; i++) {
        if (allElements[i].getAttribute(attr) !== null) {
            matchElements.push(allElements[i]);
        };
    };
    matchElements = matchElements.map(function(item, i) {
        return {
            element: item,
            param: getParameters(item),
            type: item.getAttribute('animation'),
            duration: item.getAttribute('duration'),
            status: false
        }
    }, 0);
    return matchElements;
}

function stats() {
    console.log(animationNodes);
}

checking();
window.onscroll = checking;

function checking() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    animationNodes.reduce(function(prev, curr, i) {
        if (animationNodes[i].param.offsetTop < scrolled+document.documentElement.clientHeight && animationNodes[i].param.offsetTop+animationNodes[i].param.height > scrolled) {
            if (!animationNodes[i].status) {
                animate(animationNodes[i].element, animationNodes[i].type, animationNodes[i].duration, animationNodes[i].param);
            }
            animationNodes[i].status = true;
        }
        else {
            animationNodes[i].status = false;
        }
    }, 0);
}

function getParameters(elem) {
    let height = elem.clientHeight || elem.offsetHeight;
    let width = elem.clientWidth || elem.offsetWidth;
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docElem = document.documentElement;
    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    let clientTop = docElem.clientTop || body.clientTop || 0;
    let top  = box.top +  scrollTop - clientTop;
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;
    let left = box.left +  scrollLeft - clientLeft;
    return {
        height: Math.round(height),
        width: Math.round(width),
        offsetTop: Math.round(top),
        offsetLeft: Math.round(left)
    };
}

function animate(element, type, duration, param) {
    if (duration === null) {
        duration = '0.5s';
    }
    let durms = '';
    if (typeof(duration) !== 'number') {
        for (let i=0; i<duration.length-1; i++) {
            durms+=duration[i];
        }
        durms*=1000;
    }
    switch(type) {
        case 'opacity':
            element.style.opacity = 0;
            setTimeout(function() {
                element.style.transition = 'opacity ' + duration;
                element.style.opacity = 1;
                setTimeout(function() {
                    element.style.transition = '';
                }, durms);
            }, 50);
            break;
        case 'shake':
            element.style.transition = 'transform 0.05s';
            let start = Date.now();
            let shaked = false;
            let timer = setInterval(function() {
                let timePassed = Date.now() - start;
                if (timePassed >= durms) {
                    clearInterval(timer);
                    element.style.transform = 'translateX(' + 0 + 'px)';
                    return;
                }
                if (!shaked) {
                    shaked = true;
                    element.style.transform = 'translateX(' + -20 + 'px)';
                } else if (shaked) {
                    shaked = false;
                    element.style.transform = 'translateX(' + 20 + 'px)';
                }
            }, 50);
            break;
        case 'leftin':
            element.style.opacity = 0;
            element.style.transform = 'translateX(' + (-(param.width)-param.offsetLeft) + 'px)';
            setTimeout(function() {
                element.style.transition = 'transform ' + duration + ',' + 'opacity ' + duration;
                element.style.transform  = 'translateX(' + 0 + 'px)';
                element.style.opacity = 1;
                setTimeout(function() {
                    element.style.transition = '';
                }, durms);
            }, 50);
            break;
        case 'rotate':
            element.style.opacity = 0;
            setTimeout(function() {
                element.style.transition = 'transform ' + duration + ',' + 'opacity ' + duration;
                element.style.transform  = 'rotate(' + 360 + 'deg)';
                element.style.opacity = 1;
                setTimeout(function() {
                    element.style.transition = '';
                    element.style.transform  = 'rotate(' + 0 + 'deg)';
                }, durms);
            }, 50);
            break;
    }
}
