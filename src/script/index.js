// 轮播图
    class Lunbo {
        constructor() {
            this.lunbo = $(".lbt");
            this.picul = $(".lbt ul");
            this.picli = this.picul.children(); 
            this.btnli = $('.lbt ol li');
            this.index = 0;
            this.timer = null;
        }
        init(){
            let _this = this;
            this.btnli.on('click',function(){
                _this.index = $(this).index();
                _this.tabswitch();
            });
            // 自动轮播
            _this.timer = setInterval(function(){
                _this.index++;
                if(_this.index === _this.picli.length){
                    _this.index = 0;
                }
                _this.tabswitch();
            },2000);
            _this.lunbo.hover(function(){
                clearInterval(_this.timer);
            });
        }
        tabswitch(){
            this.btnli.eq(this.index).addClass('active').siblings('ol li').removeClass('active');
            this.picli.eq(this.index).animate({opacity:1}).siblings('ul li').animate({
                opacity:0
            });
        }
    }
    new Lunbo().init();


// 头部首页等介绍
    !function($){
        const $navtwo_ml = $('#navtwo ul li');
        const $ycny = $('#ycny .ycwp');
        $navtwo_ml.on('mouseover',function(){
            $ycny.eq($(this).index()).show().siblings().hide();
        });
        $navtwo_ml.on('mouseout',function(){
            $ycny.eq($(this).index()).hide();
        });
        $ycny.on('mouseover',function(){
            $(this).show();
        });
        $ycny.on('mouseout',function(){
            $(this).hide();
        });
    }(jQuery)


    // 左侧导航介绍
    !function(){
        const llcd = $('.llcd ul li');
        const lrcd = $('.lrcd');
        llcd.hover(
            function(){
                lrcd.show();
            },
            function(){
               lrcd.hide();
            }
        );
        lrcd.hover(
            function(){
                lrcd.show();
            },
            function(){
               lrcd.hide();
            }
        )
    }(jQuery)




// 数据渲染
    !function($){
        let array_default = [];
        let array = [];
        let prev = null;
        let next = null; 

        const $list = $('.xqb');
        $.ajax({
            url: 'http://localhost/js2002/xiangmu/php/alldata.php',
            dataType:'json'
        }).done(function (data){
            let $strhtml = '<ul>';
            $.each(data,function (index,value){
                $strhtml +=`
                    <li>
                    <a href="list.html?sid=${value.sid}" target="_blank">
                    <img class="lazy"
                    data-original = "${value.url}"
                    width="160" height="160"/>
                    </a>
                    <div class="zhushi">
                    <a href="">${value.title}</a>
                    
                    <span>￥${value.price}</span>
                    </div>
                    </li>
                `;
            });
            $strhtml += '</ul>';
            $list.html($strhtml);

            // 添加懒加载
            $(function(){
                $("img.lazy").lazyload({ effect: "fadeIn"});
            });

            array_default = [];
            array = [];
            prev =  null;
            next = null;
            $('.list li').each(function (index,element){
                array[index] = $(this);
                array_default[index] = $(this)
            });
        });
    }(jQuery)