let list = ['cn', 'jp'];
let lang = getQueryString('lang') || '';
let useEN = !lang || lang == 'en' || !list.includes(lang);
$('.tsd-comment-tags').each((i, v) => {
    let html = $(v).html();
    if ($(v).find(`dt:contains('lang-')`).length) {
        html = html.split(`<dt>lang-`)
        let result = html[0];
        if (!useEN) {
            html.forEach(item => {
                if (item.includes(`${lang}</dt>`)) {
                    item = item.replace(`${lang}</dt>`, '');
                    let comment = item.split('<dt>param</dt>')[0]
                    $(v).siblings('.lead').html($(comment).find('p'))
                    result = $(item)
                }
            })
        }
        $(v).html(result);
        if (!useEN) {
            $(v).find('dd:first').remove();
        }
    }
})
//移除main.js中的事件监听
$(window).off()

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}