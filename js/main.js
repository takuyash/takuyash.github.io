window.onload = function() {  var content = '';　//作成するDOM  var count = 0;  //1行に入れる要素数をカウント  var firstFlag = true;  works.forEach(function(v) {    //0の時に改行して新しい行追加    if (firstFlag ==true) {      content = content + '<div class="row">';    }    content = content + '<div class="col-md-4 col-sm-6 portfolio-item">' +              ' <a href= ' + v.images[0] + ' data-lightbox= ' + v.id + ' data-title= ' +              v.id + ' class="portfolio-link" data-toggle="modal">' +              ' <div class="portfolio-hover"> </div>' + '<img src= ' + v.images[0] +              ' class="img-responsive" alt="">' + '</a>';    //画像数だけループする    var imgCount=0;    v.images.forEach(function(img) {      if(imgCount!=0){        content = content + '<a href= ' + img + ' data-lightbox= ' + v.id +        　　　　   ' data-title= ' + v.id +                  ' class="portfolio-link" data-toggle="modal"></a>';      }      imgCount = imgCount + 1;    });    if(v.url ==''){      content = content + '<div class="portfolio-caption">' + '<h4>' + v.title + '</h4>';    }else{      content = content + '<div class="portfolio-caption">' + '<h4><a href=' + v.url +'>'+ v.title + '</a></h4>';    }    //説明の作成    content = content + '<div class="accordion">' +              '<div class="accordion-title">[説明]<p class="accordion_icon"><span></span><span></span></p>' +              '</div>' + '<div class = "accordion-content">' + v.description + '</div>' +              '</div>';    //使用技術の作成    content = content + '<div class="accordion">' +      '<div class="accordion-title">[使用技術]<p class="accordion_icon"><span></span><span></span></p></div>' +      '<div class = "accordion-content">' + v.technology + '</div>' + '</div>';    content = content + '</div>' + '</div>';    //1行に3つ要素を入れたら改行する    //0~2まで。    if (count == 2) {      count = 0;      //rowの分のdivを閉じる      content = content + '</div>';         firstFlag = true;     }else{      firstFlag = false;      count = count + 1;    }    //最後の要素の時もdivを閉じる    if( works.slice(-1)[0].id == v.id){      content = content + '</div>';     }    });  var insertContent = document.getElementById('insert-content');  insertContent.innerHTML = content;   $(function() {    $(".accordion .accordion-content").css("display", "none");    $(".accordion .accordion-title").click(function() {      $(this).toggleClass("open").next().slideToggle("nomal");      if ($(this).children(".accordion_icon").hasClass('active')) {        // activeを削除        $(this).children(".accordion_icon").removeClass('active');      } else {        // activeを追加        $(this).children(".accordion_icon").addClass('active');      }    });  });};