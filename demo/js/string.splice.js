'use strict'
String.prototype.splice=function(index,len,str){
	if(!String.prototype.substring&&Array.prototype.join&&Array.prototype.push){
		return console.error('"String.splice"缺少依赖方法：String.substring|Array.join|Array.push!');
	}
	var reArr=[];
	reArr.push(this.substring(0,index));
	if(str){						
		reArr.push(str);
		reArr.push(this.substring(index+len,this.length));
		
	}else{
		reArr.push(this.substring(index+len,this.length));
	}				
	return reArr.join('');
}
