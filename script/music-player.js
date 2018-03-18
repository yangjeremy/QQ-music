
import { progressBar } from "./progress_bar.js";
import { lyricsPLayer } from "./lyrics_player.js";

export class MusicPLayer {
    constructor(el){
        this.$el = el;
        this.$el.addEventListener('click',this)
        this.creatAudio();
        this.progress = new progressBar(document.querySelector('.progress'));
        this.lyrice = new lyricsPLayer(document.querySelector('.lyricwrap'));
        document.querySelector('.down-qq').addEventListener('click',()=>this.show())
    }

 
    creatAudio(){
        this.$audio = document.createElement('audio');
        this.$audio.loop = true;
        document.body.appendChild(this.$audio)
    }

    handleEvent(event){
        let target = event.target;
        switch (true) {
            case target.matches('.play-icon'):
                this.onPlay(event)
                break;
            case target.matches('.pause-icon'):
                this.onPause(event)
                break;
            case target.matches('.left-icon a'):
                this.hide()
                break;
        }
    }

    startplay(options){
       if(!options) return;
        this.$el.querySelector('.song-info h1').innerText = decodeURIComponent(options.songname);
        this.$el.querySelector('.song-info p').innerText = decodeURIComponent(options.artist);
        this.progress.reset(options.duration);

        let url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`
        this.$el.querySelector('.song-img img').src = url;
        this.$el.querySelector('.bg-image').style.backgroundImage = `url(${url})`
        
        if(options.songid){
            this.songmid = options.songmid;
            this.songid = options.songid;
            this.$audio.src = `http://isure.stream.qqmusic.qq.com/C100${this.songmid}.m4a?fromtag=32`;
            fetch(`https://qq-music-api.now.sh/lyrics?id=${this.songid}`)
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrice.reset(text))
                
        }
        this.show()
        if (this.$el.querySelector('.pause-icon')) this.$el.querySelector('.pause-icon').className = 'play-icon';
    }


    onPlay(event){
        event.target.classList.remove('play-icon')
        event.target.classList.add('pause-icon')
        this.$audio.play()
        this.progress.start()
        this.lyrice.start()
    }
    
    onPause(event){
        event.target.classList.remove('pause-icon')
        event.target.classList.add('play-icon')
        this.$audio.pause()
        this.progress.pause()
        this.lyrice.pause()
    }

    show(){
        this.$el.classList.add('onshow');
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

    }
    hide(){
        this.$el.classList.remove('onshow');
        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
    }
}