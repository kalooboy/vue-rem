/*
setRem函数的主要功能是动态执行设置根目录的fontSize这样就相当于动态设置了REM
design表示设计尺寸,size表示的是缩放比例尺,比如size = 100时表示 实际使用尺寸缩小100倍,比如设计尺寸的750px,这个时候我们就写成7.5rem
minWidth表示浏览器最小的宽度尺寸.当窗口小于该尺寸时,不再缩放,
三个输入项均为纯数字结构
该模块导出的函数执行完后,将会产生如下输出项:
#1对根字体大小尺寸设置,便于后面全部使用rem
#2对body设置了dpr属性,我们可以根据这个尺寸来选择不同的图片质量应对不同的高清或普通屏幕的显示效果
#3对网页的最小尺寸进行了约束,小于该尺寸时,dom元素不再根据窗口大小自适应
####注意该模块仅能在body元素加载后插入,否则将报错
import rem from 'vue-rem'
Vue.use(rem, {
    design: 750,
    size: 100,
    minWidth:700
})
this.$size.set()立即重新设置rem
this.$size.px(x)将x转化为px尺寸,方便有些组件没有对rem兼容
this.$size.dpr获取当前设备的dpr
this.$size.rem获取当前设备的根font-size
*/


class setRem{
  constructor(design, size, minWidth) {
    this.design = design || 750
    this.size = size || 100
    this.minWidth = minWidth || 300
  }
  set () {
    document.getElementsByTagName('body')[0].style.minWidth = this.minWidth + 'px'
    const dpr = window.devicePixelRatio; //读取设备的dpr用于后面的css尺寸缩放为物理尺寸
    localStorage.dpr = dpr
    this.dpr = dpr //将获得的设备dpr缓存到localStorage和对象身上
    let elements = document.getElementsByTagName("meta");
    for (let i = 0; elements[i]; i++) {
      //找到带了viewport的meta头去设置缩放比例
      let element = elements[i];
      if (element.name == "viewport") {
        element.content = `width=device-width, initial-scale=${1 / dpr}, user-scalable=no`;
        document.getElementsByTagName("body")[0].dataset.dpr = Math.round(dpr); //该句将给body一个data-dpr属性用来表示这个页面最接近的dpr是多少,当我们在css中引用资图片的时候就可以根据data-dpr的值不同取不同的图片,以达到良好的页面呈现效果
      }
    }
    let rem2px = window.innerWidth * this.size / this.design;
    //将css尺寸先除以缩放比例乘以使用比例,然后除以设计尺寸.得到我们设计稿1px比size的比例尺
    if (window.innerWidth > this.minWidth) {
      document.getElementsByTagName("html")[0].style.fontSize =
        rem2px + "px";
      this.rem = rem2px
    } else {
      document.getElementsByTagName("html")[0].style.fontSize =
        this.minWidth / this.design * this.size + "px";
      this.rem = this.minWidth / this.design * this.size
    //该句在当物理尺寸小于所设置的最低尺寸时,屏幕不再缩小
    }
  };
  init() {
    this.set()
    window.onresize = this.set.bind(this)
    window.onpageshow = this.set.bind(this)
    window.onload = this.set.bind(this)
    window.onorientationchange = this.set.bind(this)
  }
  px(rem) {
    rem = rem || 1
    return this.rem * rem
  }
}
var vueRem = {
  install(Vue, options) {
    var rule = new setRem(options.design, options.size, options.minWidth)
    rule.init()
    Vue.prototype.$size = rule
  }
}
export default vueRem