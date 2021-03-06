let animationNodes = getElementsByAttribute();

onloadHide();
window.onload = checking;
window.onscroll = checking;

function getElementsByAttribute() {
    let matchElements = [];
    let allElements = document.getElementsByTagName('*');
    for (let i=0; i<allElements.length; i++) {
        if (allElements[i].getAttribute('panima') !== null) {
            matchElements.push(allElements[i]);
        };
    };
    matchElements = matchElements.map(function(item, i) {
        let split = (item.getAttribute('panima')).split(' ');
        return {
            element: item,
            param: getParameters(item),
            type: split[0] || 'leftin',
            duration: split[1] || '0.5s',
            timing: split[2] || 'linear',
            status: false
        }
    }, 0);
    return matchElements;
}

function stats() {
    console.log(animationNodes);
}

function onloadHide() {
    animationNodes.map(function(item, i) {
        startPos(animationNodes[i].element, animationNodes[i].type, animationNodes[i].param);
    }, 0);
}

function checking() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    animationNodes.reduce(function(prev, curr, i) {
        if (animationNodes[i].param.offsetTop < scrolled+document.documentElement.clientHeight && animationNodes[i].param.offsetTop+animationNodes[i].param.height > scrolled) {
            if (!animationNodes[i].status) {
                animate(animationNodes[i].element, animationNodes[i].type, animationNodes[i].duration, animationNodes[i].param, animationNodes[i].status, animationNodes[i].timing);
                animationNodes[i].status = true;
            }
        }
        else {
            startPos(animationNodes[i].element, animationNodes[i].type, animationNodes[i].param);
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
