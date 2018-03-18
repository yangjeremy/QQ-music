import { lazyLoad } from './lazyload.js'
import { Slider } from './slider.js'

export class Recommond {
    constructor(el) {
        this.$el = el;//.rec-view
        this.lanch()
    }
    lanch(){
        fetch('/json/_rec.json').then(res => res.json())
            .then(this.render.bind(this))
    }
    render(json){
        this.renderSliders(json.data.slider)
        this.renderRadios(json.data.radioList)
        this.renderSongs(json.data.songList)
        lazyLoad(document.querySelectorAll('.lazyLoad'))
    }
    haha(){
        console.log(2)
    }
    renderSliders(sliders) {
        sliders = sliders.map(sli => {
            return { link: sli.linkUrl, img: sli.picUrl }
        })
        new Slider({
            el: document.querySelector('#slider'),
            sliders
        })
    }
    renderRadios(radioLists) {
        this.$el.querySelector('.radios .list').innerHTML = radioLists.map(radio => `
            <div class="item">
                <div class="item_media">
                    <img class='lazyLoad' data-src=${radio.picUrl} style="visibility:hidden" alt="pic">
                    <span class="icon"></span>
                </div>
                <div class="item_info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </div>
        `).join('')
    }
    renderSongs(songLists) {
        this.$el.querySelector('.song .list').innerHTML = songLists.map(radio => `
            <div class="item">
                <div class="item_media">
                    <img class='lazyLoad' data-src=${radio.picUrl} style="visibility:hidden" alt="pic">
                    <span class="icon"></span>
                </div>
                <div class="item_info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </div>
        `).join('')
    }
}

