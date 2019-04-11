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

        logo.src = "../logo/youtube_night.svg";
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




