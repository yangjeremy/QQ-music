import { lazyLoad } from './lazyload.js'
export class Rank {
    constructor(el){
        this.$el = el;
        this.lanch()
    }
    lanch(){
        fetch('/json/rank.json').then(res => res.json())
            .then(json => json.data.topList).then(this.rendRank.bind(this))
    }
    rendRank(list) {
        this.$el.querySelector('.top-list').innerHTML = list.map(function (item) {
            return `
                <div class="top-item">
                    <a href="#">
                        <div class="item-img">
                            <img class="lazyLoad" data-src="${item.picUrl}" style="visibility:hidden" alt="pic">
                        </div>
                        <div class="top-info">
                            <h2>${item.topTitle}</h2>
                            ${this.listRend(item.songList)}
                        </div>
                    </a>
                </div>
            `
        }.bind(this)).join('')
        lazyLoad(this.$el.querySelectorAll('.lazyLoad'))
    }
    listRend(songList) {
        return songList.map(function (song, i) {
            return ` 
                    <p>${i + 1}<span>${song.songname}</span>-${song.singername}</p>
                    `
        }).join('')
    }
}


