(($)=>{

 class Pofo {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();

      this.quick();
      this.gotop();
    }
    header(){
      let t = false; 
      let t2 = false;

      //모바일 메뉴 버튼 이벤트
      $('.mobile-btn').on({
          click: function(){
              $(this).toggleClass('on');
              $('#nav').stop().slideToggle(300);
          }
      });
      //기본값 
      $('.sub').stop().slideUp(0); 
      //반응형 
      $(window).resize(function(){ 
        resizeNav();            
      });
      
      //반응형 네비게이션 
      function resizeNav(){
          if( $(window).width()<=1024 ){
                $('.mobile-btn').removeClass('on');
                $('#nav').stop().hide();
                t2=false;
                if(t===false){
                  t=true;
                  $('.sub').stop().fadeOut(0);
                  $('.main-btn').off('mouseenter');   
                  $('.main-btn').bind({
                      click: function(event){
                        $(this).next().stop().slideToggle(300); 
                      }
                  });
                }
          }
          else {
              $('.mobile-btn').removeClass('on');
              $('#nav').stop().show();
              t=false; 
              if(t2===false){                 
                 t2=true;
                $('.main-btn').off('click');
                $('.main-btn').on('mouseenter');
                $('.sub').stop().slideUp(0); 

                $('.main-btn').on({
                    mouseenter: function(){
                      $('.sub').fadeOut(0); 
                      $(this).next().fadeIn(300); 
                    }
                });

                $('#nav').on({
                    mouseleave: function(){
                      $('.sub').fadeOut(300); 
                    }
                });

                //서브서브메뉴      
                $('.sub-btn').on({
                    mouseenter: function(){
                      $('.sub-sub').fadeOut(0); 
                      $(this).next().fadeIn(300); 
                    }
                });
                $('.col24').on({
                    mouseleave: function(){
                      $('.sub-sub').fadeOut(300); 
                    }
                });
              }
          }
      }

      resizeNav(); 

      let result = '';
      let newTop = $(window).scrollTop();
      let oldTop = newTop;               

      $(window).scroll(()=>{

          newTop = $(window).scrollTop();
            result = oldTop-newTop > 0 ? 'UP' : 'DOWN';
            if(result==='UP')  {
              $('#header').removeClass('hide');
              $('#header').addClass('show');              
            }

            if(result==='DOWN'){
              $('#header').removeClass('show'); 
              $('#header').addClass('hide');
            }

            if($(window).scrollTop()===0){
              $('#header').removeClass('show'); 
            }

          oldTop = newTop;

      });
      




     
    }
    section1(){
        let cnt=0;
        let n = $('#section1 .slide').length-3;
        let setId = 0;
        let setId2 = 0;
        let touchStart = null;
        let touchEnd = null;
        let result = '';
        let dragStart = null;
        let dragEnd = null;
        let mouseDown = false;

        let winW = $(window).width();


                   $(window).resize(function(){
                        winW = $(window).width();
                        return winW;                   
                   });

                  function mainSlide(){
                      // console.log( winW );
                      // console.log( -winW*cnt );
                      $('#section1 .slide-wrap').stop().animate({left:-winW*cnt}, 600,'easeOutExpo',function(){
                        cnt>n?cnt=0:cnt;
                        cnt<0?cnt=n:cnt;
                        $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
                      });
                  }
                  function nextCount(){
                    cnt++;
                    mainSlide();
                  }        
                  function prevCount(){
                    cnt--;
                    mainSlide();
                  }

                  function autoTimer(){
                    setId = setInterval(nextCount, 3000);
                  }
                  autoTimer();
                 function timerfn(){
                    let tCnt=0;
                    clearInterval(setId); 
                    clearInterval(setId2); 
                    setId2 = setInterval(function(){
                       tCnt++;
                       
                       if(tCnt>=3){
                          clearInterval(setId);  
                          clearInterval(setId2);                  
                          autoTimer();
                        }
                    }, 1000);
                 }
                    $('#section1 .slide-container').on({
                      mousedown: function(event){ //이벤트                        

                        timerfn();


                        touchStart = event.clientX;
                        dragStart = event.clientX-$('#section1 .slide-wrap').offset().left-winW;
                        mouseDown = true;
                      },
                      mouseup: function(event){
                        touchEnd = event.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                        if(result==='NEXT'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount(); 
                          }                  
                        }
                        if(result==='PREV'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount(); 
                          }
                        }
                        mouseDown = false;

                      },
                      mouseleave: function(event){ 
                        if(!mouseDown){return;} 
                        touchEnd = event.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                        if(result==='NEXT'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount(); 
                          }                  
                        }
                        if(result==='PREV'){
                          if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount(); 
                          }
                        }
                        mouseDown = false;

                      },
                      mousemove: function(event){
                        if(!mouseDown){return;} 
                        dragEnd = event.clientX;
                        $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); 
                      }
                  });
                  $('#section1 .slide-container').on({
                    touchstart: function(event){                
                      timerfn();
                      touchStart = event.originalEvent.changedTouches[0].clientX;
                      //drag
                      dragStart = event.originalEvent.changedTouches[0].clientX;-$('#section1 .slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                      mouseDown = true;
                    },
                    touchend: function(event){
                      touchEnd = event.originalEvent.changedTouches[0].clientX;;
                      result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                      if(result==='NEXT'){
                        if(!$('#section1 .slide-wrap').is(':animated')){
                          nextCount(); 
                        }                  
                      }
                      if(result==='PREV'){
                        if(!$('#section1 .slide-wrap').is(':animated')){
                          prevCount(); 
                        }
                      }
                      mouseDown = false;

                    },
                    touchmove: function(event){
                      if(!mouseDown){return;} 
                      dragEnd = event.originalEvent.changedTouches[0].clientX;;
                      $('#section1 .slide-wrap').css({left: dragEnd-dragStart });
                    }
                });


    }
    section2(){

      const sec2Top = $('#section2').offset().top-$(window).height();

            $(window).scroll(function(){
                if( $(window).scrollTop() > sec2Top ){
                  $('#section2').addClass('sec2Ani');
                  return;
                }

                if($(window).scrollTop()===0){
                  $('#section2').removeClass('sec2Ani');
                  return;
                }
            });

    }
    section3(){
  
      const sec3Top = $('#section3').offset().top-$(window).height();
      
            $(window).scroll(()=>{
                if($(window).scrollTop() > sec3Top){
                  $('#section3').addClass('sec3Ani');
                  return; 
                }
                
                if($(window).scrollTop() === 0){
                  $('#section3').removeClass('sec3Ani');
                  return;
                }
            });
    }
    section4(){      
      let idx = 0;
      
      let winW = $(window).width();
      let cols = 4;
      let imgW = winW/cols;
      let imgH = imgW*0.8125;

      let n = $('#section4 .gallery-list').length;
      let h = $('#section4 .gallery-list.hide').length;
      let rows = Math.ceil((n-h)/cols);

      let sec4Top = $('#section4').offset().top-$(window).height();
      let scr = false;
      const galleryList = $('#section4 .gallery-list');

          $(window).scroll(function(){
            if($(window).scrollTop() === 0 ){
                scr=false; 
                $('#section4').removeClass('sec4Ani');
            }
            if($(window).scrollTop() >= sec4Top ){
                if(scr===false){
                    scr=true;
                    $('#section4').addClass('sec4Ani');
                }
            }

          });




          setTimeout(galleryMain, 100);

          //반응형 윈도우 리사이즈 
          $(window).resize(function(){              
              galleryMain();
          });

          $('#section4 .gallery-btn').each(function(index){
              $(this).on({
                click: function(e){
                  e.preventDefault();
                  idx = index; 
                  galleryMain();
                  $('#section4 .gallery-btn').removeClass('on');
                  $(this).addClass('on');
                  $('#section4').removeClass('sec4Ani');
                }           
              });
          });

          // 갤러리 이미지 재배치 함수
          function galleryMain(){

            winW = $(window).width();
            if(winW>=1280){
                cols = 4;
            }
            else if(winW>=1024){
                cols = 3;
            }
            else if(winW>=600){
                cols = 2;
            }
            else { 
                cols = 1;
            }
            imgW = winW/cols;
            imgH = imgW*0.8125;

            galleryList.removeClass('zoomin');
            galleryList.stop().animate({width:imgW,height:imgH}).removeClass('hide');
            $('.gallery-list .img-wrap').css({width:imgW});

            if(idx===0){
                switch(cols){
                  case 4: 
                      galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                      galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                      galleryList.eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
        
                      galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                      galleryList.eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                      galleryList.eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);
                      break;
                  case 3:
                      galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                      galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                      galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);      
                      galleryList.eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                      galleryList.eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);

                      galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                      break;
                  case 2:
                      galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
        
                      galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
        
                      galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
        
                      galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                      galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);                    
                      break;
                  default :
                      galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                      galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                      galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                      galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                      galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                      galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                      galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
                      galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);
                }
            }
            else if(idx===1){

              galleryList.eq(0).hide().addClass('hide');
              galleryList.eq(2).hide().addClass('hide');
              galleryList.eq(3).hide().addClass('hide');
              galleryList.eq(4).hide().addClass('hide');
              galleryList.eq(6).hide().addClass('hide');

              switch(cols){
                case 4:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    break;
                case 3:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    break;
                case 2:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                default:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
              }  


            }
            else if(idx===2){ 

              galleryList.eq(3).hide().addClass('hide');
              galleryList.eq(7).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           
                    galleryList.eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
      
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                case 3:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           

                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                    break;
                case 2:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                    galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);           
                    galleryList.eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                    break;
                default:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);           
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                    galleryList.eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
              }  

            }
            else if(idx===3){

              galleryList.eq(1).hide().addClass('hide');
              galleryList.eq(3).hide().addClass('hide');
              galleryList.eq(6).hide().addClass('hide');
              galleryList.eq(7).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                    break;
                case 3:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                case 2:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                default:
                    galleryList.eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);            
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
              }  

            }
            else if(idx===4){ 

              galleryList.eq(0).hide().addClass('hide');
              galleryList.eq(1).hide().addClass('hide');
              galleryList.eq(2).hide().addClass('hide');
              galleryList.eq(3).hide().addClass('hide');
              galleryList.eq(5).hide().addClass('hide');
              galleryList.eq(6).hide().addClass('hide');

              
              switch(cols){
                case 4:
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                case 3:
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                case 2:
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    break;
                default:
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
              }  

            }
            else if(idx===5){

              galleryList.eq(0).hide().addClass('hide');
              galleryList.eq(2).hide().addClass('hide');
              galleryList.eq(6).hide().addClass('hide');
              
              switch(cols){
                case 4:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
      
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    break;
                case 3:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                    galleryList.eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);

                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                    break;
                case 2:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);

                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);

                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    break;
                default:
                    galleryList.eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                    galleryList.eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                    galleryList.eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                    galleryList.eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                    galleryList.eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
              }  

            }
            h = $('#section4 .gallery-list.hide').length;
            rows = Math.ceil((n-h)/cols);
            $('#section4 .galley-wrap').stop().animate({height: imgH*rows }, 300); 

            galleryList.addClass('zoomin');

          } 

    }
    section5(){
      const svgObj = $('#section5 .ring-front circle');
      let   svgArr = []; 
      let   perSize  = [];
      let   piece  = [];
      let   per    = [.9, .75, .9, .62];
      let   second = 3;
      let   sum = [0,0,0,0];  
      let   setId = [0,0,0,0];
      let sec5Top = $('#section5').offset().top-$(window).height();
      let t = false;

      $(window).scroll(function(){
          if($(window).scrollTop()===0){
            t=false;
            $('#section5').removeClass('sec5Ani');
          }
          if($(window).scrollTop()>sec5Top){
            if(t===false){
              t=true;
              $('#section5').addClass('sec5Ani');
              svgAnimation();
            }           
          }
      });


      // SVG 애니메이션
      function svgAnimation(){
        sum = [0,0,0,0]; 

        $.each(svgObj, function(idx, obj){
            svgArr[idx] = obj.getTotalLength();

            $(obj).css({ strokeDasharray: svgArr[idx] });
            $(obj).css({ strokeDashoffset: svgArr[idx] });

            perSize[idx] =  svgArr[idx] * per[idx]; 
            piece[idx] =  (perSize[idx]/second)/100;

            function sumfn(){
                sum[idx] += piece[idx];
                if(sum[idx] > perSize[idx]){
                    clearInterval(setId[idx]);
                }
                else{
                  $(obj).css({ strokeDashoffset: svgArr[idx]-sum[idx] }); //(1-0.9)
                  $('#section5 .count-num').eq(idx).html( Math.ceil(sum[idx]/svgArr[idx]*100) + '%'  );  //현재누적합/전체길이
                }
            }

            setId[idx] = setInterval(sumfn, 10); 
  
        });
  
      }

    }
    section6(){
      let winH = $(window).height();
      let sec6Top = $('#section6').offset().top-winH;
      let t = false;

      $(window).scroll(function(){
          if($(window).scrollTop()===0){
            t = false;
            $('#section6').removeClass('sec6Ani');
          }
          
          if($(window).scrollTop()>sec6Top){
            if(t===false){
              t = true;
              $('#section6').addClass('sec6Ani');
            }
          }
      });

    }
    section7(){
      let winH = $(window).height();
      let sec7Top = $('#section7').offset().top-winH;

          $(window).scroll(function(){
            if($(window).scrollTop()===0){
              $('#section7').removeClass('sec7Ani');
            }        
            if($(window).scrollTop()>sec7Top){
              $('#section7').addClass('sec7Ani');
            } 
          });
    }
    section8(){
      let winH = $(window).height();
      let sec8Top = $('#section8').offset().top-winH;

          $(window).scroll(function(){
            if($(window).scrollTop()===0){
              $('#section8').removeClass('sec8Ani');
            }        
            if($(window).scrollTop()>sec8Top){
              $('#section8').addClass('sec8Ani');
            } 
          });
    }
    section9(){
      let winH = $(window).height();
      let sec9Top = $('#section9').offset().top-winH;

          $(window).scroll(function(){
            if($(window).scrollTop()===0){
              $('#section9').removeClass('sec9Ani');
            }        
            if($(window).scrollTop()>sec9Top){
              $('#section9').addClass('sec9Ani');
            } 
          });
    }
    section10(){
      let irumValue = '';
      let emailValue = '';
      let toDay = '';

      $('.submit-btn').on({
        click: function(e){
            e.preventDefault();
            irumValue = $('#irum').val();
            emailValue = $('#emial').val();
            toDay = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
            
            // console.log( toDay );
            if(irumValue==='' || emailValue==='') {
              alert('입력상자를 채우세요');
              return;
            }  
            $.ajax({
              url:'./mysql/insert_response_JSON.php',
              method:'POST',
              data : { 
                irum : irumValue,
                email : emailValue,  
                date : toDay
              },
              success: function(res){
                $('#irum').val('');
                $('#emial').val('');
                $('#irum').focus();

                let txt = '';
                txt = '';

                txt += '<table class="table">';
                txt += ' <thead>';
                txt += '   <tr>';
                txt += '     <th scope="col">IDX</th>';
                txt += '     <th scope="col">NAME</th>';
                txt += '     <th scope="col">EMAIL</th>';
                txt += '     <th scope="col">JOIN</th>';
                txt += '   </tr>';
                txt += ' </thead>';
                txt += ' <tbody>';                                          
                $.each(JSON.parse(res), function(idx, item){
                    //console.log('json : ', idx, item );
                    txt += '   <tr>';
                    txt += '     <td>'+item.번호+'</td>';
                    txt += '     <td>'+item.이름+'</td>';
                    txt += '     <td>'+item.이메일+'</td>';
                    txt += '     <td>'+item.가입일자+'</td>';
                    txt += '   </tr>';
                });
                txt +='  </tbody>';
                txt +='</table>';
                $('#response').append( txt );
                
              },
              error: function(error){
              console.log('AJAX 실패! ', error);
              }
            });

        }
      });

    }

    quick(){

      let quickTop = ($(window).height()-$('#quickBox').height())/2-300;
          // console.log( quickTop );
  
      $(window).scroll(function(){
          $('#quickBox').stop().animate({top: quickTop+$(window).scrollTop() }, 300, 'easeOutExpo');
      });
    
    }
    gotop(){
  
      $(window).scroll(function(){
          if($(window).scrollTop()>100){
             $('#goTopBox').stop().fadeIn(1000); 
          }
          else{
            $('#goTopBox').stop().fadeOut(1000);
          }
      });
      $('.gotop-btn').on({
        click: function(){
            $('html, body').stop().animate({scrollTop: 0 }, 600);
        }
      });
  
    }

 }
 const newPofo = new Pofo();
 newPofo.init();


})(jQuery);