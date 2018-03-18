(function(){
    fetch('/json/_rec.json').then(res =>res.json())
        .then(render)
    fetch('/json/rank.json').then(res => res.json())
        .then(json => json.data.topList).then(rendRank)
    
    let tabs = new Tabs({
        el: document.querySelector('.navbar')
    }) 
    
    let search = new Search(document.querySelector('.search-view'))
        

    function render(json){
        renderSliders(json.data.slider)
        renderRadios(json.data.radioList)
        renderSongs(json.data.songList)
        lazyLoad(document.querySelectorAll('.lazyLoad'))
    }

    function renderSliders(sliders){
        sliders = sliders.map(sli =>{
            return { link: sli.linkUrl, img: sli.picUrl}
        })
        new Slider({
            el: document.querySelector('#slider'),
            sliders  
        })
       }

    function renderRadios(radioLists){
       document.querySelector('.radios .list').innerHTML = radioLists.map(radio =>`
            <div class="item">
                <div class="item_media">
                    <img class='lazyLoad' data-src=${radio.picUrl} alt="pic">
                    <span class="icon"></span>
                </div>
                <div class="item_info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </div>
        `).join('')
    }

    function renderSongs(songLists){
        document.querySelector('.song .list').innerHTML = songLists.map(radio =>`
            <div class="item">
                <div class="item_media">
                    <img class='lazyLoad' data-src=${radio.picUrl} alt="pic">
                    <span class="icon"></span>
                </div>
                <div class="item_info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </div>
        `).join('')
        
    }


    function rendRank(list){

        document.querySelector('.top-list').innerHTML = list.map(function(item){
            return `
                <div class="top-item">
                    <a href="#">
                        <div class="item-img">
                            <img class="lazyLoad" data-src="${item.picUrl}" alt="pic">
                        </div>
                        <div class="top-info">
                            <h2>${item.topTitle}</h2>
                            ${listRend(item.songList)}
                        </div>
                    </a>
                </div>
            `
        }).join('')
        
        function listRend(songList){
            return  songList.map(function(song,i){
                return ` 
                        <p>${i+ 1}<span>${song.songname}</span>-${song.singername}</p>
                        `
            }).join('')
            
        }
        lazyLoad(document.querySelectorAll('.top-list .item-img .lazyLoad'))
    }




  // let slider = new Slider({
    //     el:document.querySelector('#slider'),
    //     sliders:[
    //         { link: '#1', img:'imgs/chunge.jpg'},
    //         { link: '#2', img:'imgs/leigui.jpg'},
    //         { link: '#3', img:'imgs/lihong.jpg'},
    //         { link: '#4', img:'imgs/chunge.jpg'},
    //         { link: '#5', img:'imgs/yuquan.jpg'},
    //     ]
    // });
   
})()