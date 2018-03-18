import { Recommond } from './_recommod.js'
import { Rank } from './_rank.js'
import { Tabs } from "./tab.js";
import { MusicPLayer } from "./music-player.js";
import { Search } from "./search.js";
import '../scss/app.scss'
(function(){

    
    let recommond = new Recommond(document.querySelector('.rec-view'))
    let rank = new Rank(document.querySelector('.rank-view '))
    let tabs = new Tabs({
        el: document.querySelector('.navbar')
    }) 
    
    let search = new Search(document.querySelector('.search-view'))
    
    let musicPlayer= new MusicPLayer(document.querySelector('.music-player'))


    function onHashChange() {
        let hash = location.hash;
        if (/^#player\?.+/.test(hash)){
            let matches = hash.slice(hash.indexOf('?')+1).match(/(\w+)=([^&]+)/g)
            let options = matches.reduce((res,cur) => {
                let arr = cur.split('=');
                res[arr[0]] = arr[1];
                return res
            },{})
            musicPlayer.startplay(options)
        }
    }
    window.addEventListener('hashchange',onHashChange);




   



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