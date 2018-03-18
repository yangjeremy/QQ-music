
export class lyricsPLayer {
    constructor(el) {
        this.$el = el;
        this.$el.innerHTML = '<div class="lyric-content"></div>';
        this.$lines = this.$el.querySelector('.lyric-content');
        this.text = '';
        this.index = 0;
        this.lyrics = [];
        this.initTime = 0;
        this.reset();
        // this.start();
        
        this.line_height = 42;

    }
    start() {
        this.interval = setInterval(this.update.bind(this),1000);
    }
    pause() {
        clearInterval(this.interval);
    }
    update() {
        this.initTime = Math.floor(document.querySelector('audio').currentTime);
        if(this.index === this.lyrics.length -1 ) return this.restart();
        for(let i = this.index + 1; i < this.lyrics.length ;i++ ){
            let seconds = this.getSenconds(this.lyrics[i]);
            if(
                this.initTime === seconds &&
                (!this.lyrics[i+1] || this.initTime < this.getSenconds(this.lyrics[i+1]))
            ){
                // console.log(2)
                this.$lines.children[this.index].classList.remove('onactive');
                this.$lines.children[i].classList.add('onactive')
                this.index = i;
                break;
            }
        }
        // this.$lines.style.transform = `translateY(-${50 * this.index}px)`
        if(this.index > 2){
            let y = -(this.index -2) * this.line_height;
            this.$lines.style.transform = `translateY(${y}px)`
            // console.log(this.$lines.style.transform)
        }
    }
    restart() {
        this.reset();
        this.start();
    }
    getSenconds(line){
        return +line.replace(/^\[(\d{2})\:(\d{2})\..*/,(match,p1,p2) => {
            return (+p1)*60 +(+p2)
        })
    }
    render() {
      let html =  this.lyrics.map((line,index) => {
            return `
                <p>${line.slice(10)}</p>
            `
        }).join('')
      this.$lines.innerHTML = html 
    }
    reset(text) {
        this.pause();
        this.index = 0;
        this.initTime = 0;
        if (text) {
            this.text = this.formaText(text) || '';
            this.lyrics = this.text.match(/^\[\d{2}\:\d{2}\.\d{2}\].+$/gm) || [];
            if(this.lyrics.length){
                this.render()
            }
        }
    }
    formaText(text) {
        let div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;//转化为可用格式
    }
}

