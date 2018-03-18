class Search{
    constructor(el){
        this.$el = el;
        this.$input = this.$el.querySelector('input[type=text]');
        this.$input.addEventListener('keyup',this.onInput.bind(this));
        this.keyword = '';
        this.page = 1;
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll',this.onscroll) 
        this.onSearch = false
    }
    onScroll(){
        if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight -100) {
            if(this.onSearch) return
            this.page += 1
            this.search(this.keyword)
        }
    }


    onInput(event){
        let keyword = event.currentTarget.value;
        if(!keyword) return this.reset()
        this.$el.querySelector('.hot-search').classList.add('hide')
        this.$el.querySelector('.search-result').classList.remove('hide')
        if(event.key!== 'Enter') return;
        this.search(keyword)
    }
    reset(){
        this.keyword = '';
        this.page = 1;
        // console.log(this.$el.querySelector('.search-result-list').innerHTML)
        this.$el.querySelector('.search-result-list').innerHTML= ''
        this.$el.querySelector('.hot-search').classList.remove('hide')
        this.$el.querySelector('.search-result').classList.add('hide')

    }
    search(keyword){
        if (this.onSearch) return
        this.onSearch = true
        this.keyword =  keyword;
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
        .then(res =>res.json())
        .then(json => {
            if (json.message === 'no results' ||'query error') {
                console.log(0)
                return
            }else{
                return json.data.song.list
            }
            })
        .then(songs => this.append(songs))
        .then(() => this.onSearch = false)
    }
    append(songs){
        let html = songs.map(song => `
            <li class="resuilt-item">
                <span class="music-icon"></span>
                <h6>${song.songname}</h6>
                <p>${song.singer.map(er => er.name).join(' ')}</p>
            </li>
        `).join('')
        this.$el.querySelector('.search-result-list').insertAdjacentHTML('beforeend',html)//新认识接口
    }

}