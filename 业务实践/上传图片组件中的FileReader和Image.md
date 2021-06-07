#### FileReader

`FileReader` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

其中File对象可以是来自用户在一个Input元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象,也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象,还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果。



使用：

```js
function onFileInputChange(event) {
  let file = event.target.files[0];
  let r = new FileReader();
  r.onload = (e) => {
    console.log(e.target.result);
  }
  r.readAsText(file);
}
```

以上代码中` r.onload`事件在读取操作完成时候触发，比如可以在上传图片的例子中获取图片的宽高大小等等。

`r.readAsText(file);`开始读取指定 Blob 中的内容，完成后，result 属性中将包含一个字符串以表示所读取的文件内容；

还有其他方法：`r.readAsDataURL(file);`以 `Base64`表示所读取的文件内容。



#### Image

`Image()`函数用来创建一个新的 `HTMLImageElement`实例；

它的功能等价于`document.creatElement('img')`;

参数：`Image(width,height)`都是可选参数。表示图片的宽和高。

```javascript
function upload(e) {
  if (!e.target.value) {
  	return;
  }
  let file = e.target.files[0];
  let r = new FileReader();
  r.readAsDataURL(file);
  r.onload = (res) => {
    var image = new Image();
    image.src = res.target.result;
    image.onload = (imgEvent) => {
      if (imgEvent.target.width > 100 || imgEvent.target.height > 100) {
      alert(`图片大小应小于100*100现在为${imgEvent.target.width}*${imgEvent.target.height}`);
      return;
  		}
      if (file.size / 1024 > 50) {
        alert(`图片大小应小于50k 实际上传大小为${file.size / 1024}`);
        return;
      }
      document.querySelector('.uploadIcon').innerHTML = `<img style="width: 100%; height: 100%" src=${res.target.result}>`;
      // 使用 formData 进行上传
  	}
  }
}
```

其中可通过`imgEvent.target.height` `imgEvent.target.width` 获取图片宽高进行处理，`file.size`获取的是图片大小，单位是字节，需要处理成 K 或者 M。

之后就可以进行 formData 上传啦，或者使用 base64的上传方式直接将 `r.readAsDataURL(file)`转换后的 base64字符串直接提交。 



> 参考：
>
>  https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#properties
>