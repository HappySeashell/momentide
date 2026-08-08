function getUserBackgroundColor (userKey: unknown, color1: string, color2: string): string {
  const colors = [
    color1,
    color2,
    '#5b4b8a',
    '#266d7f',
    '#8a4f62',
    '#47715a',
    '#7b5a2e',
    '#3e6388',
    '#6b5a89',
    '#7c4f36'
  ];
  const key = String(userKey || 'artitalk');
  let hash = 0;

  for (let index = 0; index < key.length; index++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(index);
    hash |= 0;
  }

  return colors[(hash >>> 0) % colors.length];
}

function getUserBackgroundAttributes (userKey: unknown, color1: string, color2: string, userColor?: string): string {
  const backgroundColor = userColor || getUserBackgroundColor(userKey, color1, color2);
  return ' data-user-background style="--artitalk-user-background:' + backgroundColor + '"';
}

function isCurrentUserAuthor (currentUser: ArtitalkUser | null, authorId?: string, avatar?: string): boolean {
  if (!currentUser) return false;
  const currentUserId = currentUser.id || currentUser.attributes.objectId;
  const currentUserAvatar = currentUser.attributes.img || 'https://fastly.jsdelivr.net/gh/drew233/cdn/logol.png';
  return authorId === currentUserId || (!authorId && avatar === currentUserAvatar);
}

atEvery.prototype.seeContent = function (pageNum, option) {
  const root = this;
  let mid = '';

  let {
    lang,
    pageSize,
    motion,
    atEmoji,
    color1,
    color2,
    color3,
    atComment,
    turnstileSiteKey,
    onCommentsPublished
  } = root.config;
  lang = ArtitalkI18n.normalizeLanguage(lang);
  const { authorPrefix, authorSuffix, loadMore, preview, publish, loggedIn, confirm, signOut, username, password, login, cancel, postTalk, addMedia, uploadFailed, loginRequired, contentRequired, loginFailed, avatarUrl, confirmDelete, deleteSuccess, dragMediaHere, emoji, remove, emptyTalk, uploading, image, music, video, add, imageSizeError, musicSizeError, videoFormatError, imageFormatError, audioFormatError, videoSizeError, uploadInProgress, loading, usernameRequired, passwordRequired, editInstructions, save, comments, email, nickname, credentialsMismatch, loginRequestError, userNotFound, tooManyLoginAttempts, pin, unpin, pinned, verificationRequired } = ArtitalkI18n.getMessages(lang);
  color1 = typeof (color1) === 'undefined' || color1 === '' ? 'RGBA(255, 125, 73, 0.75)' : color1;
  color2 = typeof (color2) === 'undefined' || color2 === '' ? '#9BCD9B' : color2;
  color3 = typeof (color3) === 'undefined' || color3 === '' ? 'white' : color3;
  pageSize = typeof (pageSize) === 'undefined' ? '5' : pageSize;

  onCommentsPublished = typeof (onCommentsPublished) === 'function' ? onCommentsPublished : function () { };

  function fadeIn (id: string): void {
    ArtitalkDom.show(id);
  }
  function fadeOut (id: string): void {
    ArtitalkDom.hide(id);
  }
  // console.log(option);
  fadeIn('lazy');
  let shuoNum = 0;
  const pinnedTalkIds: string[] = [];
  ArtitalkData.queryTalks(Number(pageSize), pageNum).then(function (shuoContent) {
    mid = '';
    shuoContent.forEach(function (atContent) {
      shuoNum = shuoNum + 1;
      // OS icon judge
      const atOs = atContent.attributes.userOs;
      let osSvg = '';
      switch (atOs) {
        case 'windows':
          osSvg = '' + ArtitalkSvg.render('os-windows', { color: color3 }) + '' + ' ';
        case 'Android':
          osSvg = '' + ArtitalkSvg.render('os-android', { color: color3 }) + '' + ' ';
        case 'Linux':
          osSvg = '' + ArtitalkSvg.render('os-linux', { color: color3 }) + '' + ' ';
        case 'iOS':
          osSvg = '' + ArtitalkSvg.render('os-apple', { color: color3 }) + '' + ' ';
        case 'Max':
          osSvg = '' + ArtitalkSvg.render('os-apple', { color: color3 }) + '' + ' ';
        default:
          osSvg = '' + ArtitalkSvg.render('os-unknown', { color: color3 }) + '' + ' ';
      }
      // Avatar init
      let shuoAvatar = atContent.attributes.avatar;
      shuoAvatar = typeof (shuoAvatar) === 'undefined' ? 'https://fastly.jsdelivr.net/gh/drew233/cdn/logol.png' : shuoAvatar;
      const currentUser = ArtitalkData.currentUser();
      const hideIcon = currentUser ? '' : 'style="display: none"';
      // Time process
      const timeForm = atContent.createdAt;
      const nowDate = new Date(timeForm);
      function timeFormat (time: number): string | number {
        return time < 10 ? '0' + time : time;
      }
      const resDate = nowDate.getFullYear() + '-' + timeFormat(nowDate.getMonth() + 1) + '-' + timeFormat(nowDate.getDate());
      const resTime = timeFormat(nowDate.getHours()) + ':' + timeFormat(nowDate.getMinutes()) + ':' + timeFormat(nowDate.getSeconds());
      const atHour = nowDate.getHours();
      let timeSvg = '';
      switch (timeSvg as unknown) {
        case atHour >= 0 && atHour < 5:
          timeSvg = '' + ArtitalkSvg.render('time-pre-dawn', { color: color3 }) + '' + ' ';
        case atHour >= 5 && atHour < 6:
          timeSvg = '' + ArtitalkSvg.render('time-sunrise', { color: color3 }) + '' + ' ';
        case atHour >= 6 && atHour < 8:
          timeSvg = '' + ArtitalkSvg.render('time-early-morning', { color: color3 }) + '' + ' ';
        case atHour >= 8 && atHour < 11:
          timeSvg = '' + ArtitalkSvg.render('time-morning', { color: color3 }) + '' + ' ';
        case atHour >= 11 && atHour < 13:
          timeSvg = '' + ArtitalkSvg.render('time-noon', { color: color3 }) + '' + ' ';
        case atHour >= 13 && atHour < 17:
          timeSvg = '' + ArtitalkSvg.render('time-afternoon', { color: color3 }) + '' + ' ';
        case atHour >= 17 && atHour < 18:
          timeSvg = '' + ArtitalkSvg.render('time-evening', { color: color3 }) + '' + ' ';
        case atHour >= 18 && atHour < 21:
          timeSvg = '' + ArtitalkSvg.render('time-night', { color: color3 }) + '' + ' ';
      }
      // Content process
      let atCommentTrue = '';
      if (atComment === 0) {
        atCommentTrue = 'display: none';
      }
      const id = atContent.id;
      if (atContent.attributes.isPinned === true) pinnedTalkIds.push(id);
      const shuoshuoPerContent = ArtitalkSanitizer.sanitizeHtml(atContent.attributes.atContentHtml);
      const commentSvg = '' + ArtitalkSvg.render('comment', { color: color3 }) + '';
      const authorKey = atContent.attributes.authorId || atContent.attributes.authorName || shuoAvatar;
      const authorColor = atContent.attributes.authorColor || (currentUser && isCurrentUserAuthor(currentUser, atContent.attributes.authorId, shuoAvatar) ? currentUser.attributes.backgroundColor : '');
      const userBackgroundAttributes = getUserBackgroundAttributes(authorKey, color1, color2, authorColor);
      const contengMid = ArtitalkTemplates.render('talk', {
        id,
        avatar: shuoAvatar,
        userBackgroundAttributes,
        hideIcon,
        deleteSvg: ArtitalkSvg.render('delete', { color: color3, id }),
        content: shuoshuoPerContent,
        osSvg,
        os: atOs,
        timeSvg,
        date: resDate,
        time: resTime,
        commentDisplay: atCommentTrue,
        commentSvg,
        color3
      });
      mid += contengMid;
    });
    let originString = requiredElement('ccontent').innerHTML;
    originString = originString === '' ? ArtitalkTemplates.render('timeline', {}) : originString;
    originString = originString.replace(/(.*)<\/ul>/, '$1 ');
    originString += mid + '</ul>';
    // console.log(originString);
    if (shuoNum === 0 && pageNum === 0) {
      originString = ArtitalkTemplates.render('emptyTalk', {
        emptyTalk,
        timePlaceholderSvg: ArtitalkSvg.render('time-placeholder')
      });
    }
    requiredElement('ccontent').innerHTML = originString;
    pinnedTalkIds.forEach(function (id) {
      const talk = document.getElementById('atId' + id);
      const controls = document.getElementById('operate' + id);
      if (talk) talk.insertAdjacentHTML('afterbegin', ArtitalkTemplates.render('pinnedBadge', { label: pinned }));
      if (controls) controls.insertAdjacentHTML('afterbegin', ArtitalkTemplates.render('pinButton', { id, isPinned: true, label: unpin }));
    });
    if (ArtitalkData.currentUser()) {
      shuoContent.forEach(function (talk) {
        if (talk.attributes.isPinned === true) return;
        const controls = document.getElementById('operate' + talk.id);
        if (controls) controls.insertAdjacentHTML('afterbegin', ArtitalkTemplates.render('pinButton', { id: talk.id, isPinned: false, label: pin }));
      });
    }
    if (atComment !== 0) {
      shuoContent.forEach(function (count) {
        const id = count.id;
        ArtitalkData.queryComments(id).then(res => {
          const countId = 'coValue' + id;
          requiredElement(countId).innerHTML = String(res.length);
        });
      });
    }
    fadeOut('lazy');
    if (shuoNum !== 0) {
      fadeIn('readmore');
    } else if (pageNum !== 0) {
      requiredElement('readButton').innerHTML = ArtitalkTemplates.render('endOfList', {});
      requiredElement('readButton').style.opacity = '0.5';
    }
  });

  atEvery.prototype.atEdit = function (id) {
    function fadeIn (id: string): void {
      ArtitalkDom.show(id);
    }
    function fadeOut (id: string): void {
      ArtitalkDom.hide(id);
    }
    const currentuser = ArtitalkData.currentUser();
    if (!currentuser) return;
    fadeIn('lazy');
    ArtitalkData.queryTalkById(id).then(res => {
      res.forEach(function (atom) {
        const originString = ArtitalkTemplates.render('editTalk', { editInstructions, timePlaceholderSvg: ArtitalkSvg.render('time-placeholder') });
        requiredElement('ccontent').innerHTML = originString;
        const changeId = requiredElement('atSave');
        changeId.id = 'atEditsaveButton';
        requiredElement('atEditsaveButton').innerHTML = save;
        fadeOut('readmore');
        changeId.setAttribute('onclick', 'atEvery.prototype.atEditsave("' + id + '")');
        requiredElement('pubShuo').click();
        requiredElement<HTMLTextAreaElement>('neirong').value = atom.attributes.atContentMd || '';
        fadeOut('lazy');
      });
    });
  };

  atEvery.prototype.togglePin = function (id, isPinned) {
    if (!ArtitalkData.currentUser()) return;
    fadeIn('lazy');
    const talk = ArtitalkData.talkById(id);
    talk.set('isPinned', !isPinned);
    talk.save().then(function () {
      location.reload();
    }).catch(function () {
      fadeOut('lazy');
    });
  };

  atEvery.prototype.atEditsave = function (id) {
    fadeIn('lazy');
    const beginPreview = requiredElement('preview');
    beginPreview.onclick = function () {
      const preCon = requiredElement('preview');
      if (preCon.className.indexOf('preview_now') !== -1) {
        preCon.classList.remove('preview_now');
      } else {
        preCon.classList.add('preview_now');
      }
    };
    let shuoshuoContent = requiredElement<HTMLTextAreaElement>('neirong').value;
    const shuoshuoContentMd = shuoshuoContent;
    const atEditOver = ArtitalkData.talkById(id);
    atEditOver.set('atContentMd', shuoshuoContentMd);
    shuoshuoContent = ArtitalkI18n.translateEmojis(shuoshuoContent, atEmoji) || '';
    if (shuoshuoContent === '') {
      location.reload();
      return;
    }
    const shuoshuoContentHtml = ArtitalkSanitizer.markdownToHtml(shuoshuoContent);
    atEditOver.set('atContentHtml', shuoshuoContentHtml);
    atEditOver.save().then(function () {
      location.reload();
    });
  };

  atEvery.prototype.saveComment = function (id, option) {
    requiredElement('shuoshuo_input').style.display = 'none';
    function fadeIn (id: string): void {
      ArtitalkDom.show(id);
    }
    function fadeOut (id: string): void {
      ArtitalkDom.hide(id);
    }
    fadeIn('lazy');
    let comContent = requiredElement<HTMLTextAreaElement>('neirong').value;
    const atComment = ArtitalkData.commentById();
    comContent = ArtitalkI18n.translateEmojis(comContent, atEmoji) || '';
    const atCommentHtml = ArtitalkSanitizer.markdownToHtml(comContent);
    const currentUser = ArtitalkData.currentUser();
    const comEmail = requiredElement<HTMLInputElement>('email').value.trim().toLowerCase();
    let comNick = requiredElement<HTMLInputElement>('commentNick').value;
    const comEmailMd5 = md5(comEmail);
    if (!currentUser) {
      if (comNick === '' || comEmail === '') {
        const contentInput = requiredElement<HTMLTextAreaElement>('neirong');
        contentInput.value = '昵称，邮箱均为必填项\n' + contentInput.value;
        fadeOut('lazy');
        return;
      }
      const verificationToken = ArtitalkTurnstile.token();
      if (turnstileSiteKey && !verificationToken) {
        const contentInput = requiredElement<HTMLTextAreaElement>('neirong');
        contentInput.value = verificationRequired + '\n' + contentInput.value;
        fadeOut('lazy');
        return;
      }
      const randomId = window.crypto && typeof window.crypto.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2);
      atComment.set('_turnstileToken', verificationToken);
      atComment.set('_idempotencyKey', randomId);
      atComment.set('_honeypot', requiredElement<HTMLInputElement>('momentide-honeypot').value);
    }
    let atGravatar = 'https://cdn.staticdn.net/avatar/' + comEmailMd5 + '?d=mp&s=80';
    const nowDate = new Date();
    function timeFormat (time: number): string | number {
      return time < 10 ? '0' + time : time;
    }
    const resDate = nowDate.getFullYear() + '-' + timeFormat(nowDate.getMonth() + 1) + '-' + timeFormat(nowDate.getDate());
    const resTime = timeFormat(nowDate.getHours()) + ':' + timeFormat(nowDate.getMinutes()) + ':' + timeFormat(nowDate.getSeconds());
    const atHour = nowDate.getHours();
    let timeSvg = '';
    switch (timeSvg as unknown) {
      case atHour >= 0 && atHour < 5:
        timeSvg = '' + ArtitalkSvg.render('time-pre-dawn', { color: color3 }) + '' + ' ';
      case atHour >= 5 && atHour < 6:
        timeSvg = '' + ArtitalkSvg.render('time-sunrise', { color: color3 }) + '' + ' ';
      case atHour >= 6 && atHour < 8:
        timeSvg = '' + ArtitalkSvg.render('time-early-morning', { color: color3 }) + '' + ' ';
      case atHour >= 8 && atHour < 11:
        timeSvg = '' + ArtitalkSvg.render('time-morning', { color: color3 }) + '' + ' ';
      case atHour >= 11 && atHour < 13:
        timeSvg = '' + ArtitalkSvg.render('time-noon', { color: color3 }) + '' + ' ';
      case atHour >= 13 && atHour < 17:
        timeSvg = '' + ArtitalkSvg.render('time-afternoon', { color: color3 }) + '' + ' ';
      case atHour >= 17 && atHour < 18:
        timeSvg = '' + ArtitalkSvg.render('time-evening', { color: color3 }) + '' + ' ';
      case atHour >= 18 && atHour < 21:
        timeSvg = '' + ArtitalkSvg.render('time-night', { color: color3 }) + '' + ' ';
    }
    if (currentUser) {
      const adminAvatar = typeof (currentUser.attributes.img) === 'undefined' ? 'https://fastly.jsdelivr.net/gh/drew233/cdn/logol.png' : currentUser.attributes.img;
      atComment.set('adminAvatar', adminAvatar);
      atGravatar = adminAvatar;
      comNick = currentUser.attributes.username || '';
    }
    atComment.set('atId', id);
    atComment.set('commentContent', atCommentHtml);
    atComment.set('authorId', currentUser ? currentUser.id : comEmailMd5 || comNick);
    atComment.set('authorColor', currentUser ? currentUser.attributes.backgroundColor : '');
    if (!currentUser) {
      atComment.set('email', comEmailMd5);
    }
    atComment.set('nick', comNick);
    atComment.save().then(function (res) {
      const replySvg = ArtitalkTemplates.render('reply', {
        clickHandler: '',
        replySvg: ArtitalkSvg.render('reply', { color: color3 })
      });
      const originComment = requiredElement('ccontent').innerHTML;
      const userBackgroundAttributes = getUserBackgroundAttributes(currentUser ? currentUser.id : comEmailMd5 || comNick, color1, color2, currentUser ? currentUser.attributes.backgroundColor : '');
      const comList = ArtitalkTemplates.render('comment', {
        avatar: atGravatar,
        userBackgroundAttributes,
        content: atCommentHtml,
        nickname: comNick,
        timeSvg,
        date: resDate,
        time: resTime,
        replySvg
      });
      const positon = originComment.indexOf('</li>') + 5;
      const nowComment = originComment.slice(0, positon) + comList + originComment.slice(positon);
      requiredElement('ccontent').innerHTML = '';
      requiredElement<HTMLTextAreaElement>('neirong').value = '';
      requiredElement<HTMLInputElement>('email').value = '';
      requiredElement<HTMLInputElement>('commentNick').value = '';
      requiredElement('ccontent').innerHTML = nowComment;
      fadeOut('preview');
      fadeOut('lazy');
      ArtitalkTurnstile.reset();

      onCommentsPublished(comNick, comContent);
    }).catch(function (error: Error) {
      fadeOut('lazy');
      ArtitalkTurnstile.reset();
      requiredElement<HTMLTextAreaElement>('neirong').value = error.message + '\n' + comContent;
    });
  };
  atEvery.prototype.atReply = function () {
    requiredElement('pubComment').click();
  };
  atEvery.prototype.commentInit = function (id, option) {
    function fadeIn (id: string): void {
      ArtitalkDom.show(id);
    }
    function fadeOut (id: string): void {
      ArtitalkDom.hide(id);
    }
    requiredElement<HTMLTextAreaElement>('neirong').placeholder = '';
    const initButton = 'atCoInit' + id;
    const countId = 'coValue' + id;
    fadeOut(countId);
    requiredElement(initButton).setAttribute('onclick', 'location.reload()');
    fadeIn('commentNick'); fadeOut('atSave'); fadeIn('commentSave'); fadeIn('lazy'); fadeIn('pubComment'); fadeOut('readmore'); fadeOut('pubShuo'); fadeOut('switchUser');
    requiredElement('pubComment').title = comments;
    requiredElement('pubComment').style.display = 'inline';
    const nowButton = requiredElement('pubComment');
    nowButton.onclick = function () {
      if (requiredElement('shuoshuo_input').style.display === '') {
        fadeOut('shuoshuo_input');
      } else {
        fadeIn('shuoshuo_input');
      }
    };
    requiredElement<HTMLInputElement>('email').placeholder = email;
    requiredElement<HTMLInputElement>('commentNick').placeholder = nickname;
    const originalTalk = requiredElement('atId' + id);
    const originShuo = originalTalk.innerHTML;
    const userBackgroundAttributes = originalTalk.hasAttribute('data-user-background')
      ? ' data-user-background style="' + originalTalk.style.cssText + '"'
      : '';
    const originAvatar = requiredElement<HTMLImageElement>('atAvatar' + id).src;
    const originString = ArtitalkTemplates.render('focusedTalk', {
      avatar: originAvatar,
      userBackgroundAttributes,
      content: originShuo
    });
    requiredElement('ccontent').innerHTML = originString;
    let mid = '';
    const currentUser = ArtitalkData.currentUser();
    if (!currentUser && turnstileSiteKey) ArtitalkTurnstile.show('momentide-turnstile');
    ArtitalkData.queryComments(id).then(res => {
      res.forEach(function (comment) {
        const timeForm = comment.createdAt;
        function timeFormat (time: number): string | number {
          return time < 10 ? '0' + time : time;
        }
        const nowDate = new Date(timeForm);
        const resDate = nowDate.getFullYear() + '-' + timeFormat(nowDate.getMonth() + 1) + '-' + timeFormat(nowDate.getDate());
        const resTime = timeFormat(nowDate.getHours()) + ':' + timeFormat(nowDate.getMinutes()) + ':' + timeFormat(nowDate.getSeconds());
        const atHour = nowDate.getHours();
        let timeSvg = '';
        switch (timeSvg as unknown) {
          case atHour >= 0 && atHour < 5:
            timeSvg = '' + ArtitalkSvg.render('time-pre-dawn', { color: color3 }) + '' + ' ';
          case atHour >= 5 && atHour < 6:
            timeSvg = '' + ArtitalkSvg.render('time-sunrise', { color: color3 }) + '' + ' ';
          case atHour >= 6 && atHour < 8:
            timeSvg = '' + ArtitalkSvg.render('time-early-morning', { color: color3 }) + '' + ' ';
          case atHour >= 8 && atHour < 11:
            timeSvg = '' + ArtitalkSvg.render('time-morning', { color: color3 }) + '' + ' ';
          case atHour >= 11 && atHour < 13:
            timeSvg = '' + ArtitalkSvg.render('time-noon', { color: color3 }) + '' + ' ';
          case atHour >= 13 && atHour < 17:
            timeSvg = '' + ArtitalkSvg.render('time-afternoon', { color: color3 }) + '' + ' ';
          case atHour >= 17 && atHour < 18:
            timeSvg = '' + ArtitalkSvg.render('time-evening', { color: color3 }) + '' + ' ';
          case atHour >= 18 && atHour < 21:
            timeSvg = '' + ArtitalkSvg.render('time-night', { color: color3 }) + '' + ' ';
        }
        const comContent = ArtitalkSanitizer.sanitizeHtml(comment.attributes.commentContent);
        const commentNick = comment.attributes.nick;
        const comEmail = comment.attributes.email;
        const adminAvatar = comment.attributes.adminAvatar;
        let atGravatar = 'https://cdn.staticdn.net/avatar/' + comEmail + '?d=mp&s=80';
        if (typeof (adminAvatar) !== 'undefined') {
          atGravatar = adminAvatar;
        }
        const comAvatar = atGravatar;
        const commenterKey = comment.attributes.authorId || comEmail || commentNick || comAvatar;
        const commenterColor = comment.attributes.authorColor || (currentUser && isCurrentUserAuthor(currentUser, comment.attributes.authorId, comAvatar) ? currentUser.attributes.backgroundColor : '');
        const userBackgroundAttributes = getUserBackgroundAttributes(commenterKey, color1, color2, commenterColor);

        const replySvg = ArtitalkTemplates.render('reply', {
          clickHandler: ' onclick="atEvery.prototype.atReply()"',
          replySvg: ArtitalkSvg.render('reply', { color: color3 })
        });

        const comList = ArtitalkTemplates.render('comment', {
          avatar: comAvatar,
          userBackgroundAttributes,
          content: comContent,
          nickname: commentNick,
          timeSvg,
          date: resDate,
          time: resTime,
          replySvg
        });
        mid += comList;
      });
      let originString = requiredElement('ccontent').innerHTML;
      originString = originString.replace(/(.*)<\/ul>/, '$1 ');
      originString += mid + '</ul>';
      requiredElement('ccontent').innerHTML = originString;
    }).then(function () {
      fadeIn('email');
      if (currentUser) {
        fadeOut('commentNick');
        fadeOut('email');
      }
      fadeIn('email');
      fadeOut('lazy');
    });
    const saveComment = requiredElement('commentSave');
    saveComment.onclick = function () {
      atEvery.prototype.saveComment(id, option);
    };
  };
};
