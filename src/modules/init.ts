const requiredElement = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Artitalk element not found: ${id}`);
  return element as T;
};
atEvery.prototype._init = function () {
  const root = this;
  let {
    appId,
    appKey,
    lang,
    pageSize,
    atEmoji,
    bgImg,
    motion,
    cssUrl,
    shuoPla,
    avatarPla,
    serverURL,
    turnstileSiteKey,
    mediaUploadEnabled,
    color1,
    color2,
    color3,
    blackAndWhiteTheme,
    onLogin,
    onShuoPublished,
    onCommentsPublished
  } = root.config;
  lang = ArtitalkI18n.normalizeLanguage(lang);
  const { authorPrefix, authorSuffix, loadMore, preview, publish, loggedIn, confirm, signOut, username, password, login, cancel, postTalk, addMedia, uploadFailed, loginRequired, contentRequired, loginFailed, avatarUrl, confirmDelete, deleteSuccess, dragMediaHere, emoji, remove, emptyTalk, uploading, image, music, video, add, imageSizeError, musicSizeError, videoSizeError, imageFormatError, audioFormatError, videoFormatError, uploadInProgress, loading, usernameRequired, passwordRequired, editInstructions, save, comments, email, nickname, credentialsMismatch, loginRequestError, userNotFound, tooManyLoginAttempts, backgroundColor, colorSaved } = ArtitalkI18n.getMessages(lang);
  bgImg = typeof (bgImg) === 'undefined' || bgImg === '' ? 'https://fastly.jsdelivr.net/gh/drew233/cdn/20200409110727.webp' : bgImg;
  let atEmojiDefault = '';
  for (const key in atEmoji) {
    atEmojiDefault = atEmojiDefault + "<img alt='[" + key + "]' title='" + key + "' onclick='insertEmoji(\"[" + key + "]\")' class='atemoji gallery-group-img' src='" + atEmoji[key] + "'/>";
  }
  shuoPla = typeof (shuoPla) === 'undefined' ? '' : shuoPla;
  avatarPla = typeof (avatarPla) === 'undefined' ? '' : avatarPla;
  color1 = typeof (color1) === 'undefined' || color1 === '' ? 'RGBA(255, 125, 73, 0.75)' : color1;
  color2 = typeof (color2) === 'undefined' || color2 === '' ? '#9BCD9B' : color2;
  color3 = typeof (color3) === 'undefined' || color3 === '' ? 'white' : color3;
  pageSize = typeof (pageSize) === 'undefined' ? '5' : pageSize;

  blackAndWhiteTheme = typeof (blackAndWhiteTheme) === 'undefined' ? false : blackAndWhiteTheme;
  onLogin = typeof (onLogin) === 'function' ? onLogin : function () { };
  onShuoPublished = typeof (onShuoPublished) === 'function' ? onShuoPublished : function () { };
  onCommentsPublished = typeof (onCommentsPublished) === 'function' ? onCommentsPublished : function () { };
  mediaUploadEnabled = mediaUploadEnabled === true;
  ArtitalkTurnstile.configure(turnstileSiteKey);

  const apiUrl = '';
  try {
    ArtitalkData.init({
      appId: appId,
      appKey: appKey,
      serverURL: serverURL
    });
  } catch (error: unknown) {
    const err = String(error);
    console.error(err);
    if (err.indexOf('appId is not defined') != -1) {
      console.log('appId没找到');
    } else if (err.indexOf('appKey is not defined') != -1) {
      console.log('appKey没找到');
    }
  }
  // In & Out
  function fadeIn (id: string): void {
    ArtitalkDom.show(id);
  }
  function fadeOut (id: string): void {
    ArtitalkDom.hide(id);
  }
  function Show () {
    fadeIn('shade');
    fadeIn('shuoshuo-modal');
  }
  function Hide () {
    fadeOut('shade');
    fadeOut('shuoshuo-modal');
  }
  // Load externally compiled styles when a stylesheet URL is configured.
  if (cssUrl && !document.getElementById('add-Artitalk-Style')) {
    const atStyle = document.createElement('link');
    atStyle.rel = 'stylesheet';
    atStyle.href = cssUrl;
    atStyle.id = 'add-Artitalk-Style';
    document.head.appendChild(atStyle);
  }

  const atHtml = ArtitalkTemplates.render('main', {
    loadMore,
    shuoPla,
    bgImg,
    avatarUrl,
    publish,
    preview,
    emoji,
    publishSvg: ArtitalkSvg.render('publish'),
    postTalk,
    userSvg: ArtitalkSvg.render('user'),
    login,
    uploadSvg: ArtitalkSvg.render('upload'),
    uploadDisplay: mediaUploadEnabled ? 'inline' : 'none',
    add,
    version: atVersion
  });
  let motionHtml = ArtitalkTemplates.render('lazy', {
    sunSvg: ArtitalkSvg.render('loading-sun'),
    cloudSvg: ArtitalkSvg.render('loading-cloud'),
    loading
  });
  const atOpHtml = ArtitalkTemplates.render('operator', {
    username,
    password,
    login,
    cancel,
    backgroundColor,
    save,
    confirm,
    signOut,
    deleteSuccess,
    confirmDelete
  });
  var atOp = document.createElement('div');
  atOp.id = 'operare_artitalk';
  document.body.append(atOp);
  requiredElement('operare_artitalk').innerHTML = atOpHtml;
  motionHtml = motion === 0 ? '' : motionHtml;
  requiredElement('artitalk_main').classList.toggle('artitalk-black-and-white', blackAndWhiteTheme);
  requiredElement('artitalk_main').innerHTML = motionHtml + atHtml;
  // 开始加载说说
  root.seeContent(0, root.config);
  const rmButton = requiredElement('readmore');// readmore
  const pubButton = requiredElement('pubShuo');// publish shuo
  const switchLogin = requiredElement('switchUser');// login or exit
  const cancelLogin = requiredElement('celLogin');// cancel Login
  const loginButton = requiredElement('login');// Login
  const hideUser = requiredElement('hideuser');
  const userBackgroundColor = requiredElement<HTMLInputElement>('userBackgroundColor');
  const saveUserBackgroundColor = requiredElement<HTMLInputElement>('saveUserBackgroundColor');
  const userBackgroundColorStatus = requiredElement('userBackgroundColorStatus');
  const loadEmoji = requiredElement('loadEmoji');// Loading emoji
  const switchTb = requiredElement('switch_1');// Tieba emoji
  const switchBB = requiredElement('switch_2');// BiliBili emoji
  const switchQQ = requiredElement('switch_3');// QQ emoji
  const switchCustom = requiredElement('switch_4');// custom emoji
  const beginPreview = requiredElement('atPreview');// preview
  const clickPre = requiredElement('clickForPreview');// preview
  const saveContent = requiredElement('atSave');// savecontent
  const deleteSus = requiredElement('deleteSus');// Delete successful
  const uploadSource = requiredElement('uploadSource');// Upload image or video
  const realUpload = requiredElement<HTMLInputElement>('realUpload');
  realUpload.onchange = function () {
    const file = realUpload.files && realUpload.files[0];
    if (file) root.beginUpload(file);
  };
  let pNum = 0;
  rmButton.onclick = function () {
    pNum = pNum + 1;
    root.seeContent(pNum, root.config);
  };
  pubButton.onclick = function () {
    const currentUser = ArtitalkData.currentUser();
    if (currentUser) {
      if (requiredElement('shuoshuo_input').style.display === '') {
        fadeOut('shuoshuo_input');
      } else {
        fadeIn('shuoshuo_input');
      }
    } else {
      requiredElement('logw').innerHTML = ArtitalkTemplates.render('loginRequired', { message: loginRequired });
      Show();
    }
  };
  switchLogin.onclick = function () {
    requiredElement('logw').innerHTML = '';
    const currentUser = ArtitalkData.currentUser();
    fadeIn('shade');
    if (currentUser) {
      fadeIn('userinfo');
      requiredElement('status').innerHTML = loggedIn + ':\t' + currentUser.attributes.username;
      userBackgroundColor.value = currentUser.attributes.backgroundColor || getUserBackgroundColor(currentUser.id, color1, color2);
      userBackgroundColorStatus.innerHTML = '';
      fadeIn('tui');
    } else {
      fadeIn('tui');
      fadeIn('shuoshuo-modal');
      Show();
    }
  };
  cancelLogin.onclick = function () {
    Hide();
  };
  loginButton.onclick = function () {
    const passWord = requiredElement<HTMLInputElement>('pwd').value;
    requiredElement('logw').style.color = 'black';
    requiredElement('logw').innerHTML = 'loading...';
    if (passWord === '') {
      requiredElement('logw').style.color = 'red';
      requiredElement('logw').innerHTML = passwordRequired;
      return;
    }
    const userName = requiredElement<HTMLInputElement>('username').value;
    if (userName === '') {
      requiredElement('logw').style.color = 'red';
      requiredElement('logw').innerHTML = usernameRequired;
      return;
    }
    ArtitalkData.login(userName, passWord).then((user) => {
      requiredElement('ccontent').innerHTML = '';
      requiredElement<HTMLTextAreaElement>('neirong').value = '';
      fadeIn('lazy');
      root.seeContent(0, root.config);
      Hide();
      onLogin(userName);
    }, (error: { message: string }) => {
      let errLogin = error.message;
      requiredElement('logw').style.color = 'red';
      // console.log(errLogin);
      if (errLogin.indexOf('mismatch') != -1) {
        errLogin = credentialsMismatch;
      } else if (errLogin.indexOf('terminated') != -1) {
        errLogin = loginRequestError;
      } else if (errLogin.indexOf('Could not find user.') != -1) {
        errLogin = userNotFound;
      } else if (errLogin.indexOf('Please try later or reset your password.') != -1) {
        errLogin = tooManyLoginAttempts;
      }
      requiredElement('logw').innerHTML = errLogin;
    });
  };
  hideUser.onclick = function () {
    fadeOut('shade');
    fadeOut('userinfo');
  };
  saveUserBackgroundColor.onclick = function () {
    const selectedColor = userBackgroundColor.value;
    saveUserBackgroundColor.disabled = true;
    ArtitalkData.updateCurrentUser({ backgroundColor: selectedColor }).then(function () {
      userBackgroundColorStatus.innerHTML = colorSaved;
      requiredElement('ccontent').innerHTML = '';
      root.seeContent(0, root.config);
    }).catch(function (error: { message: string }) {
      userBackgroundColorStatus.innerHTML = error.message;
    }).then(function () {
      saveUserBackgroundColor.disabled = false;
    });
  };
  loadEmoji.onclick = function () {
    requiredElement('switch_1').classList.add('zuiliangdezai');
    requiredElement('switch_2').classList.remove('zuiliangdezai');
    requiredElement('switch_3').classList.remove('zuiliangdezai');
    requiredElement('switch_4').classList.remove('zuiliangdezai');
    if (requiredElement('shuoshuo_emojiswitch').style.display === 'none') {
      fadeIn('shuoshuo_emoji_Tieba');
      fadeIn('shuoshuo_emojiswitch');
      requiredElement('shuoshuo_emoji_BiliBili').innerHTML = atEmojiB;
      requiredElement('shuoshuo_emoji_Tieba').innerHTML = atEmojiT;
      requiredElement('shuoshuo_emoji_QQ').innerHTML = atEmojiQ;
      requiredElement('shuoshuo_emoji_custom').innerHTML = atEmojiDefault;
      requiredElement('shuoshuo_emojiswitch').classList.add('pingjun');
    } else {
      fadeOut('shuoshuo_emoji_Tieba');
      fadeOut('shuoshuo_emoji_BiliBili');
      fadeOut('shuoshuo_emoji_custom');
      fadeOut('shuoshuo_emoji_QQ');
      fadeOut('shuoshuo_emojiswitch');
      requiredElement('shuoshuo_emojiswitch').classList.remove('pingjun');
    }
  };
  switchTb.onclick = function () {
    switchTb.classList.add('zuiliangdezai');
    switchQQ.classList.remove('zuiliangdezai'); switchBB.classList.remove('zuiliangdezai'); switchCustom.classList.remove('zuiliangdezai');
    fadeIn('shuoshuo_emoji_Tieba');
    fadeOut('shuoshuo_emoji_QQ'); fadeOut('shuoshuo_emoji_BiliBili'); fadeOut('shuoshuo_emoji_custom');
  };
  switchQQ.onclick = function () {
    switchQQ.classList.add('zuiliangdezai');
    switchTb.classList.remove('zuiliangdezai'); switchBB.classList.remove('zuiliangdezai'); switchCustom.classList.remove('zuiliangdezai');
    fadeIn('shuoshuo_emoji_QQ');
    fadeOut('shuoshuo_emoji_Tieba'); fadeOut('shuoshuo_emoji_BiliBili'); fadeOut('shuoshuo_emoji_custom');
  };
  switchBB.onclick = function () {
    switchBB.classList.add('zuiliangdezai');
    switchQQ.classList.remove('zuiliangdezai'); switchTb.classList.remove('zuiliangdezai'); switchCustom.classList.remove('zuiliangdezai');
    fadeIn('shuoshuo_emoji_BiliBili');
    fadeOut('shuoshuo_emoji_QQ'); fadeOut('shuoshuo_emoji_Tieba'); fadeOut('shuoshuo_emoji_custom');
  };
  switchCustom.onclick = function () {
    switchCustom.classList.add('zuiliangdezai');
    switchQQ.classList.remove('zuiliangdezai'); switchBB.classList.remove('zuiliangdezai'); switchTb.classList.remove('zuiliangdezai');
    fadeIn('shuoshuo_emoji_custom');
    fadeOut('shuoshuo_emoji_QQ'); fadeOut('shuoshuo_emoji_BiliBili'); fadeOut('shuoshuo_emoji_Tieba');
  };
  beginPreview.onclick = function () {
    clickPre.click();
    const preCon = requiredElement('preview');
    if (preCon.className.indexOf('preview_now') !== -1) {
      preCon.classList.remove('preview_now');
    } else {
      preCon.classList.add('preview_now');
    }
  };
  saveContent.onclick = function save () {
    const currentUser = ArtitalkData.currentUser();
    if (!currentUser) {
      pubButton.click();
      return;
    }
    let shuoshuoContent = requiredElement<HTMLTextAreaElement>('neirong').value;
    if (shuoshuoContent === '') throw '说说内容不能为空';
    const atObject = ArtitalkData.createTalk();
    const shuoshuoContentMd = shuoshuoContent;
    atObject.set('atContentMd', shuoshuoContentMd);
    shuoshuoContent = ArtitalkI18n.translateEmojis(shuoshuoContent, atEmoji) || '';
    const shuoshuoContentHtml = ArtitalkSanitizer.markdownToHtml(shuoshuoContent);
    const atAvatar = typeof (currentUser.attributes.img) === 'undefined' ? 'https://fastly.jsdelivr.net/gh/drew233/cdn/logol.png' : currentUser.attributes.img;
    // alert(deFaultavatar);
    const userClient = new Client();
    // console.log("Engine ：" + client.engine.name + " " + client.engine.version);
    // console.log("Browser：" + client.browser.name + " " + client.browser.version);
    // console.log("System ：" + client.system.name + " " + client.system.version);
    const userOs = userClient.system.name;
    atObject.set('atContentHtml', shuoshuoContentHtml);
    atObject.set('userOs', userOs);
    atObject.set('avatar', atAvatar);
    atObject.set('authorId', currentUser.id);
    atObject.set('authorName', currentUser.attributes.username);
    atObject.set('authorColor', currentUser.attributes.backgroundColor || '');
    fadeIn('lazy');
    atObject.save().then(function (res) {
      requiredElement('ccontent').innerHTML = '';
      requiredElement<HTMLTextAreaElement>('neirong').value = '';
      fadeOut('preview');
      root.seeContent(0, root.config);
      fadeOut('shuoshuo_input');

      onShuoPublished(currentUser.attributes.username || '', shuoshuoContent);
    });
  };
  clickPre.onclick = function () {
    let unPre = requiredElement<HTMLTextAreaElement>('neirong').value;
    unPre = ArtitalkI18n.translateEmojis(unPre, atEmoji) || '';
    const finishPre = ArtitalkSanitizer.markdownToHtml(unPre);
    requiredElement('preview').innerHTML = finishPre;
  };
  deleteSus.onclick = function () {
    fadeOut('shanchu'); fadeOut('shade'); fadeIn('lazy');
    requiredElement('ccontent').innerHTML = '';
    root.seeContent(0, root.config);
  };
  uploadSource.onclick = function () {
    function Show () {
      fadeIn('shade');
      fadeIn('shuoshuo-modal');
    }
    const currentUser = ArtitalkData.currentUser();
    if (currentUser) {
      // console.log(currentUser);
    } else {
      requiredElement('logw').innerHTML = ArtitalkTemplates.render('loginRequired', { message: loginRequired });
      Show();
      return;
    }
    requiredElement('realUpload').click();
  };
  // function beginUpload(file){
  //     console.log(file.files);
  // }
  atEvery.prototype.delete = function (id) {
    function fadeOut (id: string): void {
      ArtitalkDom.hide(id);
    }
    function fadeIn (id: string): void {
      ArtitalkDom.show(id);
    }
    const currentUser = ArtitalkData.currentUser();
    if (currentUser) {
      fadeIn('shade'); fadeIn('shanchur');
      requiredElement('delete1').innerHTML = ArtitalkTemplates.render('deleteActions', { confirm, cancel });
    } else {
      const pubButton = requiredElement('pubShuo');
      pubButton.click();
      return;
    }
    const cancelDelete = requiredElement('cancelDelete');
    const rlyDelete = requiredElement('Delete');
    cancelDelete.onclick = function () {
      fadeOut('shade'); fadeOut('shanchur');
    };
    rlyDelete.onclick = function () {
      // console.log(id);
      cancelDelete.click();
      fadeIn('lazy');
      const deletes = ArtitalkData.talkById(id);
      deletes.destroy().then(function (success) {
        fadeIn('shade');
        fadeIn('shanchu');
      }, function (error) {
        console.log(error.rawMessage);
      });
    };
  };
};
