$(function(){
  var imgs = {
    'es': "https://www.tp-link.com/assets/diff/en/widgets/customer-feedback-survey/customer-feedback-survey-es.png",
    'tw': "https://www.tp-link.com/assets/diff/en/widgets/customer-feedback-survey/customer-feedback-survey-tw.png"
  };
  var website = location.hostname;
  var appFolder = location.pathname.split('/')[1];
  var img = "https://www.tp-link.com/assets/diff/en/widgets/customer-feedback-survey/customer-feedback-survey.png";
  img = imgs[appFolder] ? imgs[appFolder] : img;
  var link = "https://www.tp-link.com/"+appFolder+"/survey/2022-customer-feedback-online-survey/?utm_source="+website+"&utm_medium=floatingwindow";
  link = appFolder == 'us' ? 'https://www.tp-link.com/us/survey/2022-us-customers-online-survey/' : link;
  var gaCategoryLink = "Widgets_2022-customer-feedback-survey";
  var gaCategoryClose = "Widgets_2022-customer-feedback-survey-Close";
  var cookieName = "tp_popup-right-middle";
  var cookieExpired = Math.floor((24 - (new Date()).getHours())*1000/24)/1000;
  var percent = appFolder == 'tw' ? 276/308 : 310/436;

  $("head").append('<style>.widget-sticker-right-middle{font-size:16px;position:fixed;top:50%;right:10px;width:50%;max-width:270px;z-index:99;}.widget-sticker-right-middle .img{background-position:50% 0;background-repeat:no-repeat;background-size:100%;}.widget-sticker-right-middle .img:hover{background-position:50% 100%;}.widget-sticker-right-middle .close{cursor: pointer;position: absolute;top: -1em;right:0;width: 2em;height: 2em;border-radius: 50%;overflow: hidden;background: #fff url(/assets/images/icon/close-black.png) 50% 50% no-repeat;background-size:90%;}@media (max-width:736px){.widget-sticker-right-middle .img{background-position:50% 100%;}.widget-sticker-right-middle .close{right:0;}}</style>');
  var $popUp = $('<div class="widget-sticker-right-middle"><a target="_blank" class="ga-click" data-vars-event-category="'+gaCategoryLink+'" href="'+link+'"><div class="img" style="background-image:url('+img+');padding-top:'+(percent*50)+'%;"></div></a><b class="close ga-click" data-vars-event-category="'+gaCategoryClose+'"></b></div>').appendTo($("body"));
  $popUp.on("click", ".close", function(){
    $popUp.remove();
    typeof tp !== 'undefined' && tp.setCookie(cookieName, '1', '/'+location.pathname.split('/')[1], cookieExpired);
  }).on("click", "a", function(){
    typeof tp !== 'undefined' && tp.setCookie(cookieName, '1', '/'+location.pathname.split('/')[1], cookieExpired);
  })
})