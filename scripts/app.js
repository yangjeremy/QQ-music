(function () {
    let slider = new Slider({
        el: document.querySelector("#slider"),
        slides: [
            {link:'#1',image:'images/JJLIN.jpg'},
            {link:'#1',image:'images/QQFEICHE.jpg'},
            {link:'#1',image:'images/WUYUETIAN.jpg'},
            {link:'#1',image:'images/YINYuanrenwu.jpg'},
            {link:'#1',image:'images/YUQUAN.jpg'},

        ]
    })
    window.slider = slider;
})()