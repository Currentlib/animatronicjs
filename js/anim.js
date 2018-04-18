function startPos(element, type, param) {
    switch(type) {
        case 'opacity':
            element.style.transition = '';
            element.style.opacity = 0;
            break;
        case 'leftin':
            element.style.transition = '';
            element.style.opacity = 0;
            element.style.transform = 'translateX(' + (-(param.width)-param.offsetLeft) + 'px)';
            break;
        case 'rotate':
            element.style.transition = '';
            element.style.opacity = 0;
            element.style.transform  = 'rotate(' + 0 + 'deg)';
            break;
    }
}


function animate(element, type, duration, param, status, timing) {
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
    if (!status) {
        switch(type) {
            case 'opacity':
                element.style.transition = 'opacity ' + duration;
                element.style.opacity = 1;
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
                        element.style.transform = 'translateX(' + -5 + 'px)';
                    } else if (shaked) {
                        shaked = false;
                        element.style.transform = 'translateX(' + 5 + 'px)';
                    }
                }, 50);
                break;
            case 'leftin':
                    element.style.transition = 'transform ' + duration + ',' + 'opacity ' + duration;
                    element.style.transform  = 'translateX(' + 0 + 'px)';
                    element.style.opacity = 1;
                break;
            case 'rotate':
                    element.style.transition = 'transform ' + duration + ',' + 'opacity ' + duration;
                    element.style.transform  = 'rotate(' + 360 + 'deg)';
                    element.style.opacity = 1;
                break;
            default: console.log('error: bad anim name');
        }
        element.style.transitionTimingFunction = timing;
    }
}
