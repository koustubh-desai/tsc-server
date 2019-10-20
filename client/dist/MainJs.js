(function(window,$){
    const doc = $(document);
    const btn = $('<button id="jojo">Hi</button>')
    doc.on('click',(e)=>{
        switch(e.target.id){
            case 'jojo':
                $.ajax({
                    url:'/json/1/nana/Jim',
                    method:'GET',
                    data:{kaka:'mama',lala:'baba'},
                    success:function(e){console.log("WOKKAY",e)}
                });
                console.log('Ajax sent')
                break;
            
        }
    })
    $(document).ready(function(e){
        $('#main').append(btn);
    })
})(window,jQuery);