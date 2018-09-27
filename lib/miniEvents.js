// mini事件系统
function isArray( arr ){
    return Object.prototype.toString.call( arr ) === '[object Array]' ;
}
function isFunction( func ){
    return !!( func && Object.prototype.toString.call( func ) === '[object Function]' ) ;
}

let miniEvents = () =>( {
    queue:null ,
    on:function(evt,func){
        if(this.queue == null){
            this.queue = {};
        }
        if(!isArray(this.queue[evt])){
            this.queue[evt] = [];
        }
        this.queue[evt].push(func);
    },
    fire:function(evt,args){
        var self = this,
            args = args !== undefined?args:self;

        if(this.queue == null)return false;
        if(!isArray(this.queue[evt]))return false;
        for ( var i = 0,len=this.queue[evt].length; i < len; i++ ) {
            var func = this.queue[evt][ i ] ;
            isFunction(func) && func.call(self,args) ;
        }
        return true;
    },
    set:function(key,value){
        if(this[key]!==undefined){
            this[key] = value;
        }
        this.fire("setValue");
    },
    get:function(key){
        if(this[key]!==undefined){
            return this[key];
        }else{
            return null;
        }
        this.fire("getValue");
    }
} )


export default miniEvents
