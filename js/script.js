const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item'),
      svg = document.querySelectorAll(".hamburger > line"),
      descr = document.querySelectorAll('.videos__item-descr'),
      views = document.querySelectorAll('.videos__item-views'),
      nightMode = document.querySelector('.header__item-descr'),
      logo = document.querySelector('.logo > img');
      

let player, 
     night = false;

function bindSlideToggle(trigger, boxBody, content, openClass){
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };

    const box = document.querySelector(boxBody),
          boxContent = document.querySelector(content);

    button.element.addEventListener('click', () =>{
      if(button.active === false){
        button.active = true;
        box.style.height = boxContent.clientHeight + 'px'; 
        box.classList.add(openClass); // Active class for menu
      } else{
        button.active = false;
        box.style.height = 0 + 'px'; 
        box.classList.remove(openClass);
      }
        
    });

};

function switchMode(){
    if(night === false){
        document.body.classList.add('night');
        night = true;
        svg.forEach( item => {
            item.style.stroke = "#fff";
        });
        descr.forEach( item => {
            item.style.color = "#fff";
        });
        views.forEach( item => {
            item.style.color = "#fff";
        });

        nightMode.style.color = "#fff";

        logo.src = "/logo/youtube_night.svg";
    } else{
        document.body.classList.remove('night');
        night = false;
        svg.forEach( item => {
            item.style.stroke = "#000";
        });
        descr.forEach( item => {
            item.style.color = "#000";
        });
        views.forEach( item => {
            item.style.color = "#000";
        });

        nightMode.style.color = "#000";

        logo.src = "/logo/youtube.svg";

    }

};

switcher.addEventListener('change', switchMode);

bindSlideToggle('.hamburger','[data-slide="nav"]','.header__menu','slide-active');


const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
       '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
       '#1 Верстка реального заказа landing page | Марафон верстки | Артем Исламов'],
    ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
  ];
  
  
  
more.addEventListener('click', () => {
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for(let i = 0; i<data[0].length; i++){
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', data[3][i]);
        card.innerHTML = `
            <img src="${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                ${data[1][i]}
            </div>
            <div class="videos__item-views">
                ${data[2][i]}
            </div>
        `

        videosWrapper.appendChild(card);
        setTimeout(() =>{
            card.classList.remove('videos__item-active');
        },10);
        
    }
});




