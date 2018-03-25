# vue-rem
    插件说明:
本插件的主要目的在于将设计稿尺寸完美的在设备上复现.  
使我们在开发时只用关注于设计稿,不用对不同的屏幕尺寸的设备做过多的关注.  
和阿里的lib-flexible有类似之处,不过简化和新增了一些在vue上能直接使用的接口

    安装: 
npm install vue-rem -S

    使用: 
```
import rem from 'vue-rem'
Vue.use(rem, {
    design: 750,
    size: 100,
    minWidth:700
})
```


    参数说明:
design表示设计尺寸,size表示的是缩放比例尺,比如size = 100时表示 实际使用尺寸缩小100倍,比如设计尺寸的750px,  
这个时候如果设计稿上的一个区域的宽度为375px我们就写成3.75rem.  
minWidth表示浏览器最小的宽度尺寸.当窗口小于该尺寸时,不再缩放.  
#注意:如参数为空,默认design为750,size为100,minWidth为300.  

    属性和方法说明:
在vue生命中期中的任何位置均可调用以下属性或方法  
this.$size.set()立即重新设置rem  
this.$size.px(x)将x(x表示rem尺寸)转化为px尺寸,方便有些组件没有对rem兼容,我们手动转化尺寸再传入  
this.$size.dpr获取当前设备的dpr,此时我们可以根据设备的dpr来选择不同分辨率的图片  
this.$size.rem获取当前设备的根font-size  

    一个简单的例子:
```如某个组件是这样的  
<template lang='pug'>  
    div.back helloworld  
</template>  

<script>  
export default {  
    name: 'home',  
    data(){  
      return {  
          size:this.$size  
      }  
    },  
    watch:{  
        size:{  
            handler(x){  
                console.log(x.rem)  
            },  
            deep:true  
        }  
    }  
   }  

</script>  

<style lang='css' scoped>  
.back{  
    width: 2rem;  
    height: 2rem;  
    background: black  
}  
</style>  

此时我们调整浏览器的窗口会实时得到最新的根font-size.  
因此该插件能实时根据当前窗口的大小或方向实时更新根部的font-size
```


