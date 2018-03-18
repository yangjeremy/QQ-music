class Slider {
    constructor(options = {}){
        this.$option = options;
        this.$el = options.el;
        this.render()
        this.interval = options.interval || 4000
        this.start()
        this.index = 0
    }
    render(){
        this.$wrap = this.$el.firstElementChild;
        this.length = this.$option.sliders.length;
        this.$wrap.style.width = `${this.length * 100}%`;
        this.$wrap.innerHTML = this.$option.sliders.map(slider => `
            <div class="qq-slider-item">
                    <a href="${slider.link}">
                    <img src="${slider.img}" alt="slider">
                    </a>
            </div>
        `).join('')//注意掌握map和foreach的区别
    }

    start(){
        setInterval(this.next.bind(this),this.interval)
    }

    next(){
        this.index++
        if(this.index===this.length){
            this.$wrap.style.transform = `translate(0)`
            this.index = 0
            return
        }
        let left = `-${this.index * 100 / this.length}%`
        this.$wrap.style.transform =`translate(${left})`
    }

}