export function lazyLoad(imgNodes) {
    let imgs = Array.from(imgNodes)

    if (!IntersectionObserver){
        // 新API是一个观察器有兼容问题
        let observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    loadImg(entry.target, () => {
                        observer.unobserve(entry.target)
                    })
                }
            })
        }, { threshold: 0.01 })

        imgs.forEach(img => observer.observe(img))

    }else{
        let onscroll = throttle(function onscroll() {
            if (imgs.length === 0)
                return window.removeEventListener('scroll', onscroll)
            imgs = imgs.filter(img => img.classList.contains('lazyLoad'))
            imgs.forEach(img => {
                if (viewPort(img)) {
                    loadImg(img)
                }
            })
        }, 500)

        window.addEventListener('scroll', onscroll)
        window.dispatchEvent(new Event('scroll'))
        // underscore.js节流库

        function throttle(fn, wait) {//节流函数
            let prev, timer
            return function func() {
                let curr = Date.now();
                let diff = curr - prev;
                if (!prev || diff > wait) {
                    fn()
                    prev = curr
                } else if (diff < wait) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        fn()
                    }, wait - diff);
                }
            }
        }

        function viewPort(img) {
            let viewHeight = document.documentElement.clientHeight;
            let viewWidth = document.documentElement.clientWidth;
            let { left, top, bottom, right } = img.getBoundingClientRect()
            return (
                (top > 0 && top < viewHeight || bottom > 0 && bottom < viewHeight) &&
                (left > 0 && left < viewWidth || right > 0 && right < viewWidth)
            )
        }

    }

    function loadImg(img, callBack) {
        let images = new Image()
        images.src = img.dataset.src
        images.onload = function(){
            img.src = images.src
            img.style = 'visibility: visible'
            img.classList.remove('lazyLoad')
        } 
        if(typeof callBack === "function")callBack()
    }
}
