export const msg = (text,time)=>{
    let s=time||3000;
    const oDiv=document.createElement('div');
    oDiv.className='v_msg v_msg_show';
    oDiv.innerText=text;
    document.body.appendChild(oDiv);
    setTimeout(function(){
        oDiv.className='v_msg v_msg_hide';
        oDiv.addEventListener('animationend',function(){
            document.body.removeChild(oDiv)
        })
    },s)
}


export const loading={
    node:null,
    open(){
        if(this.node){
            this.node.style.display='block'
        }else{
            const oDiv=document.createElement('div');
            oDiv.className='loading';
            oDiv.innerHTML='<img src="img/loading_2.png" alt="">';
            oDiv.style.display='block'
            this.node=oDiv;
            document.body.appendChild(oDiv);
        }
    },
    close(){
        this.node.style.display='none'
    }
}