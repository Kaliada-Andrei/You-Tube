const switcher = document.querySelector('#cbx'),
      more = document.querySelector('.more'),
      modal = document.querySelector('.modal'),
      videos = document.querySelectorAll('.videos__item'),
      svg = document.querySelectorAll(".hamburger > line"),
      videosDescr = document.querySelectorAll('.videos__item-descr'),
      views = document.querySelectorAll('.videos__item-views'),
      nightMode = document.querySelector('.header__item-descr'),
      logo = document.querySelector('.logo > img'),
      searchInf = document.querySelector('.search'),
      searchInput =  document.querySelector('.search__input');
const videosWrapper = document.querySelector('.videos__wrapper');
      


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
        videosDescr.forEach( item => {
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
        videosDescr.forEach( item => {
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


// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//        '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
//        '#1 Верстка реального заказа landing page | Марафон верстки | Артем Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
//   ];
  
  
  
// more.addEventListener('click', () => {
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove();

//     for(let i = 0; i<data[0].length; i++){
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url', data[3][i]);
//         card.innerHTML = `
//             <img src="${data[0][i]}" alt="thumb">
//             <div class="videos__item-descr">
//                 ${data[1][i]}
//             </div>
//             <div class="videos__item-views">
//                 ${data[2][i]}
//             </div>
//         `

//         videosWrapper.appendChild(card);
//         setTimeout(()=> {
//             card.classList.remove('videos__item-active');
//         },10);

//         if( night === true){
//             card.querySelector(".videos__item-descr").style.color = "#fff";
//             card.querySelector(".videos__item-views").style.color = "#fff";
//         } 

//         bindNewModal(card);

//     }

//     sliseTitle(".videos__item-descr", 100);
   
    
// });



function start(){
    gapi.client.init({
        'apiKey': 'AIzaSyA8Lt66YF-fjXn53xOE4HdG3Bkjo-sBu28',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then( function(){
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '10',
            "playlistId": "FL7-YMmnc0ppcWmio8t1WdcA"
        });
    }).then(function(response){
        console.log(response.result);
        
        response.result.items.forEach( item => {
        let card = document.createElement('a');

        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', item.contentDetails.videoId);
        card.innerHTML = `
            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
            <div class="videos__item-descr">
                ${item.snippet.title}
            </div>
            <div class="videos__item-views">
                2.7 тыс просмотр
            </div>
        `

        videosWrapper.appendChild(card);
        setTimeout(()=> {
            card.classList.remove('videos__item-active');
        },10);

        if( night === true){
            card.querySelector(".videos__item-descr").style.color = "#fff";
            card.querySelector(".videos__item-views").style.color = "#fff";
        } 

        });

        sliseTitle(".videos__item-descr",100);
        bindModal(document.querySelectorAll('.videos__item'));

    }).catch( e => {
        console.log(e);
    });
};


more.addEventListener('click', () =>{
    more.remove();
    gapi.load('client',start);
});


function search(target){
    gapi.client.init({
        'apiKey': 'AIzaSyA8Lt66YF-fjXn53xOE4HdG3Bkjo-sBu28',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(function(){
        return gapi.client.youtube.search.list({
            'maxResults':'50',
            'part':'snippet',
            'q': `${target}`,
            'type':''
        });
    }).then(function(response){
        console.log(response.result);
        while( videosWrapper.innerHTML != ''){
            videosWrapper.innerHTML = '';
        }
        
        response.result.items.forEach( item => {
            let card = document.createElement('a');
    
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.id.videoId);
            card.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                    2.7 тыс просмотр
                </div>
            `
    
            videosWrapper.appendChild(card);
            setTimeout(()=> {
                card.classList.remove('videos__item-active');
            },10);
    
            if( night === true){
                card.querySelector(".videos__item-descr").style.color = "#fff";
                card.querySelector(".videos__item-views").style.color = "#fff";
            } 
    
            });
    
            sliseTitle(".videos__item-descr",100);
            bindModal(document.querySelectorAll('.videos__item'));
    }).catch( e =>{
        console.log(e);
    })
}

searchInf.addEventListener('submit', (e) =>{
    e.preventDefault();
    gapi.load('client', () =>{
        search(searchInput.value);
    });
});




function sliseTitle(selector, count){
    document.querySelectorAll(selector).forEach( item => {
        let  text = item.textContent;
        text.trim();

        if(text.length < count){
            return;
        }else{
            let str = text.slice(0, count + 1) + '...';
            item.textContent = str;
        }
    });
};




function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
    player.stopVideo();
}

function bindModal(cards){
    cards.forEach( item => {
        item.addEventListener('click',(e) => {
            e.preventDefault();
            const id = item.getAttribute('data-url');
            loadVideo(id);
            openModal();
        });
    });

}



function bindNewModal(cards){
    cards.addEventListener('click',(e) => {
        e.preventDefault();
        const id = cards.getAttribute('data-url');
        loadVideo(id);
        openModal();
    });
}

modal.addEventListener('click', (e)=> {
    if( !e.target.classList.contains('modal__body')){
        closeModal();
    }
});



document.addEventListener('keydown', (e)=>{ 
    if (e.keyCode === 27) { 
        closeModal(); 
    } 
});


function creatVideo(){
    var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


      setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
      });

     },1500);

     
};

creatVideo();


function loadVideo(id){
    player.loadVideoById({'videoId' : `${id}`});
}





