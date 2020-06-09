!function ($) {
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;

    const $list = $('.lieb');
    $.ajax({
        url: 'http://localhost/js2002/xiangmu/php/listdata.php',

        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
                $strhtml += `
            <li>
            <a href="detail.html?sid=${value.sid}" target="_blank">
            <img class="lazy"
            src = "${value.url}" width="190" height="190" display="block"/>
            </a>
            <div class="zhushi" width="190" height="22" display="block" line-height="22" font-size="14" color="#000">   
            <a href="">${value.title}</a>
            </div>
            <span class="price" style="color: red;">￥${value.price}</span>
            </li>
            `
            

        });
        $strhtml += '</ul>';
        $list.html($strhtml);

        // 添加懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.list li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this)
        });
    })

    // 分页效果
    $('.page').pagination({
        pageCount: 3,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());
            $.ajax({
                url: 'http://localhost/js2002/xiangmu/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>';
                $.each(data, function (index, value) {
                        $strhtml += `
                <li>
                <a href="detail.html?sid=${value.sid}" target="_blank">
                <img class="lazy"
                src = "${value.url}" width="190" height="190" display="block"/>
                </a>
                <div class="zhushi" width="190" height="22" display="block" line-height="22" font-size="14" color="#000">   
                <a href="">${value.title}</a>
                </div>
                <span class="price" style="color: red;">￥${value.price}</span>
                </li>
                `
                    
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
                $('.list li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }

    });
}(jQuery)


