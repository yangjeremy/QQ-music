export class Tabs {
    constructor(e){
        this.target = e.el
        this.init()
        this.fixed()
    }
    init(){
        this.target.addEventListener('click', function (e) {
            let target = e.target;
            if (target.dataset.roll !== "tab") return;
            Array.from(target.parentElement.children).forEach(tab => {
                tab.classList.remove('active')
            })
            target.classList.add('active');
            var $content = document.querySelectorAll('.tab-content');
            Array.from($content).forEach(content => {
                content.classList.add('hide')
            })
            document.querySelector(target.dataset.view).classList.remove('hide')
            // lazyLoad(document.querySelectorAll('.top-list .item-img .lazyLoad'))
            window.dispatchEvent(new Event('scroll'))
        })
    }
    fixed(){
        window.onscroll = function () {
            if(pageYOffset > 44){
               this.target.classList.add('fixed')
            }else if(pageYOffset <= 44){
               this.target.classList.remove('fixed')
            }
        }.bind(this)
    }
}