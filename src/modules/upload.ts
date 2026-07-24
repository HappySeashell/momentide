atEvery.prototype.beginUpload = function (file: File): void {
  const imageUpload = (this.config && this.config.imageUpload) || {};
  const uploadApi = imageUpload.api || 'https://s.ee/api/v1/file/upload';
  const tokenHeader = imageUpload.tokenHeader || 'Authorization';
  function Show () {
    fadeIn('shade');
    fadeIn('shuoshuo-modal');
  }
  const currentUser = ArtitalkData.currentUser();
  if (currentUser) {
    // console.log(currentUser);
  } else {
    // document.getElementById('logw').innerHTML= "<center><pre><code>" + text15 + "</code></pre></center>";
    Show();
    return;
  }
  if (!/\.(jpg|gif|jpeg|ico|png|svg|mp4|mov)$/.test(file.name)) {
    alert('不支持的文件类型，支持的文件格式有jpg|gif|jpeg|ico|png|svg|mp4|mov');
    return;
  }
  let fileType = '';
  const sourceSize = Number((file.size / 1024).toFixed(0));
  const sourceSizeLimit = 1024 * 50;
  if (sourceSize > sourceSizeLimit) {
    alert('资源上传最大限制为50M');
    return;
  }
  if (/\.(jpg|gif|jpeg|ico|png|svg)$/.test(file.name)) {
    fileType = 'image';
  } else if (/\.(mp4|mov)$/.test(file.name)) {
    fileType = 'video';
  }
  function fadeIn (id: string): void {
    ArtitalkDom.show(id);
  }
  function fadeOut (id: string): void {
    ArtitalkDom.hide(id);
  }
  fadeIn('lazy');
  const data = new FormData();
  data.append('file', file);
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4 && this.status === 200) {
      const sourceUrl = eval('(' + this.responseText + ')') as ArtitalkUploadResponse;
      // let Md = "![]("+imgUrl.data.url+")";
      let sourceMd = '';
      // insertEmoji(imgMd);
      if (fileType === 'video') {
        sourceMd = '<video controls width="100%" height="auto"><source src="' + sourceUrl.data.url + '"></video>';
      } else if (fileType === 'image') {
        sourceMd = '![](' + sourceUrl.data.url + ')';
      }
      insertEmoji(sourceMd);
      requiredElement('pubShuo').click();
      fadeOut('lazy');
    } else if (this.readyState === 4 && this.status === 500) {
      fadeOut('lazy');
    }
  });
  xhr.open('POST', uploadApi);
  const imgToken = currentUser.attributes.imgToken;
  if (imgToken !== undefined) {
    xhr.setRequestHeader(tokenHeader, imgToken);
  }
  xhr.send(data);
};
