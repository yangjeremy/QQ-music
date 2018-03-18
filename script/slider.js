import Swiper from 'swiper'
import '../scss/swiper.css'
export class Slider {
    constructor(options = {}){
        this.$option = options;
        this.$el = options.el;
        this.render()
        this.index = 0
    }
    render(){
        this.$wrap = this.$el
        let shtml = this.$option.sliders.map(slider => `
                <div class="swiper-slide">
                    <a class="js-no-follow" href="${slider.link}">
                    <img class="goods-main-photo fadeIn" src="${slider.img}" alt="slider">
                    </a>
                </div>
        `).join('') 
        let html = ` <div class="swiper-wrapper">
                        ${shtml} 
                     </div>
                     <div class="swiper-pagination"></div>
                   `
        this.$wrap.innerHTML = html
        this.start()
    }
    start(){
        new Swiper(this.$el, {
            loop: true,
            pagination: {
                el: '.swiper-pagination'
            },
            // autoplay: true
        })
    }
}