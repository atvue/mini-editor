# mini-editor

开发：

`cd mini-editor`

执行：`yarn link `

执行：`yarn build`，会自动监听并转译`src`目录中的es6文件

------

其他项目中（example `demo`）使用`mini-editor`：

- `cd demo`

- `yarn link mini-editor`

- `项目源文件`引入`mini-editor`，`import MiniEditor from 'mini-editor'`





一个例子🌰：

```javascript
import MiniEditor from 'mini-editor'
let me = new MiniEditor( document.querySelector('#richEle') , {
        placeholder: '请输入姓名' ,
    } )
// 监听输入事件
me.on( 'input' , this.changeValue )
// 设置富文本的值
me.content( value )
// 只读模式
me.disable( true )
```

> placeholder样式设置,参考[Placeholder support for contentEditable elements, without JavaScript](https://codepen.io/flesler/pen/AEIFc)。第三点，chrome的br问题，插件已经支持自动检测清理br
