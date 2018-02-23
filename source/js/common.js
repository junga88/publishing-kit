console.log('hi~');

/*
<div html-include="../layout/header.html"></div>
*/
$("[html-include]").each(function(){
    var _this = this;
    $.ajax({
        method:"GET",
        url:this.getAttribute("html-include")
    })
    .then(function(template){
        var $template = $(template);
        $(_this).replaceWith($template);
    })
    .catch(function(e){
        console.error("템플릿을 찾을수 없습니다.",e)
    })
})