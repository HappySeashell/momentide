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
    color1,
    color2,
    color3,
    blackAndWhiteTheme,
    onLogin,
    onShuoPublished,
    onCommentsPublished
  } = root.config;
  lang = ArtitalkI18n.normalizeLanguage(lang);
  const { authorPrefix, authorSuffix, loadMore, preview, publish, loggedIn, confirm, signOut, username, password, login, cancel, postTalk, addMedia, uploadFailed, loginRequired, contentRequired, loginFailed, avatarUrl, confirmDelete, deleteSuccess, dragMediaHere, emoji, remove, emptyTalk, uploading, image, music, video, add, imageSizeError, musicSizeError, videoSizeError, imageFormatError, audioFormatError, videoFormatError, uploadInProgress, loading, usernameRequired, passwordRequired, editInstructions, save, comments, email, nickname, credentialsMismatch, loginRequestError, userNotFound, tooManyLoginAttempts } = ArtitalkI18n.getMessages(lang);
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

  blackAndWhiteTheme = typeof (blackAndWhiteTheme) === 'undefined' || blackAndWhiteTheme === '' ? false : blackAndWhiteTheme;
  onLogin = typeof (onLogin) === 'function' ? onLogin : function () { };
  onShuoPublished = typeof (onShuoPublished) === 'function' ? onShuoPublished : function () { };
  onCommentsPublished = typeof (onCommentsPublished) === 'function' ? onCommentsPublished : function () { };

  const apiUrl = '';
  try {
    ArtitalkData.init({
      appId: appId,
      appKey: appKey,
      serverURL: serverURL
    });
  } catch (error) {
    const err = error.toString();
    console.error(err);
    if (err.indexOf('appId is not defined') != -1) {
      console.log('appId没找到');
    } else if (err.indexOf('appKey is not defined') != -1) {
      console.log('appKey没找到');
    }
  }
  // In & Out
  function fadeIn (id) {
    ArtitalkDom.show(id);
  }
  function fadeOut (id) {
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
  // Insert css
  let atCss = '';

  // If the black and white theme is enabled while the cssUrl is not defined, its style will be loaded after
  //  the default atStyle, which makes it possible to preserve original settings.
  // If the black and white theme is enabled yet the cssUrl is set, its style will be loaded before
  //  the customized style, ensuring the user defined style will be accepted.
  const blackAndWhiteStyle = '#artitalk_main{margin-top:5vh}#artitalk_main .cbp_tmtimeline>li .cbp_tmlabel{font-size:large;font-weight:400;color:#3d3d3d;background:#fff!important;box-shadow:0 1px 12px rgb(0 0 0 / 30%);border-radius:12px}#artitalk_main p.shuoshuo_time{font-size:small;border-top:1px dashed}p.shuoshuo_time span:first-child{font-size:medium}p.shuoshuo_time span:nth-child(3)>span>span{vertical-align:inherit;color:#3d3d3d!important}#artitalk_main .cbp_tmtimeline>li .cbp_tmlabel:after,#artitalk_main span.cbp_tmlabel>p:nth-child(4){display:none}#artitalk_main span.cbp_tmlabel>p{margin-bottom:5px}#artitalk_main .delete_right{right:2rem}#artitalk_main .shuoshuo_author_img img{border:none;box-shadow:0 0 6px rgb(0 0 0 / 30%)}#artitalk_main svg{width:1.5rem;height:1.5rem}#artitalk_main svg>path{fill:#3d3d3d}#artitalk_main .shuoshuo_text{background-image:url(https://fastly.jsdelivr.net/gh/drew233/cdn/20200409110727.webp)!important;background-repeat:no-repeat;background-size:contain;color:#3d3d3d;box-shadow:0 0 12px rgb(0 0 0 / 30%);border:none;font-size:large;border-radius:12px}#artitalk_main .shuoshuo_inputs{color:#3d3d3d;box-shadow:0 0 12px rgb(0 0 0 / 30%);border:none;font-size:medium;border-radius:8px}#artitalk_main .at_button,#operare_artitalk .at_button{background-color:#fff;border:none;color:#3d3d3d;font-size:medium;font-weight:500;border-radius:8px;outline:0;box-shadow:0 0 8px rgb(0 0 0 / 30%)}#artitalk_main .at_button:hover,#operare_artitalk .at_button:hover{background-color:#fff}#artitalk_main .shuoshuo_emoji{border:none;padding:1rem;border-radius:12px 12px 0 0;box-shadow:0 -2px 4px rgb(0 0 0 / 30%);margin-top:2rem}#artitalk_main div#shuoshuo_emojiswitch{border:none;box-shadow:0 0 4px rgb(0 0 0 / 30%);border-radius:0 0 12px 12px}#artitalk_main .shuoshuo_emoji_part{font-size:medium;border-radius:inherit}#artitalk_main .shuoshuo_emoji_part:hover{background-color:#3d3d3daa}#artitalk_main .zuiliangdezai{background-color:#3d3d3d}#artitalk_main .shuoshuo_row{margin-top:2rem}#artitalk_main #preview{font-size:large;margin:2rem 0;padding:1rem 2rem;border-radius:12px;box-shadow:0 0 16px rgb(0 0 0 / 30%)}#artitalk_main .power a{font-size:1.5rem;font-weight:500;color:#3d3d3d;margin-left:.5rem}#artitalk_main .power>div{margin:0 .5rem;width:4rem;height:4rem;padding:8px;background-size:80%;background-repeat:no-repeat;background-position:center}#artitalk_main .power>div>svg{opacity:0}#pubComment,#pubShuo{background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01LjMyNDk3IDQzLjQ5OTZMMTMuODEgNDMuNDk5OEw0NC45MjI3IDEyLjM4NzFMMzYuNDM3NCAzLjkwMTg2TDUuMzI0NzEgMzUuMDE0Nkw1LjMyNDk3IDQzLjQ5OTZaIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNy45NTIxIDEyLjM4NzJMMzYuNDM3NCAyMC44NzI1IiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+")}#switchUser{background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yNCA0NEMzNS4wNDU3IDQ0IDQ0IDM1LjA0NTcgNDQgMjRDNDQgMTIuOTU0MyAzNS4wNDU3IDQgMjQgNEMxMi45NTQzIDQgNCAxMi45NTQzIDQgMjRDNCAzNS4wNDU3IDEyLjk1NDMgNDQgMjQgNDRaIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMSAzMUMzMSAzMSAyOSAzNSAyNCAzNUMxOSAzNSAxNyAzMSAxNyAzMSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMSAxOFYyMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNyAxOFYyMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==")}#uploadSource{background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMS42Nzc3IDIwLjI3MUM3LjI3NDc2IDIxLjMxODEgNCAyNS4yNzY2IDQgMzBDNCAzNS41MjI4IDguNDc3MTUgNDAgMTQgNDBDMTQuOTQ3NCA0MCAxNS44NjQgMzkuODY4MyAxNi43MzI1IDM5LjYyMjEiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMzYuMDU0NyAyMC4yNzFDNDAuNDU3NyAyMS4zMTgxIDQzLjczMjQgMjUuMjc2NiA0My43MzI0IDMwQzQzLjczMjQgMzUuNTIyOCAzOS4yNTUzIDQwIDMzLjczMjQgNDBDMzIuNzg1IDQwIDMxLjg2ODQgMzkuODY4MyAzMC45OTk5IDM5LjYyMjEiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMzYgMjBDMzYgMTMuMzcyNiAzMC42Mjc0IDggMjQgOEMxNy4zNzI2IDggMTIgMTMuMzcyNiAxMiAyMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNy4wNjU0IDI3Ljg4MTJMMjMuOTk5OSAyMC45MjM4TDMxLjEzMTggMjguMDAwMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNCAzOC4wMDAxVjI0LjQ2MTkiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=")}#operare_artitalk .c2{opacity:1}';

  if (!document.getElementById('add-Artitalk_Style')) {
    if (cssUrl === '' || typeof (cssUrl) === 'undefined') {
      atCss = 'div#artitalk_main {    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);  }  #artitalk_main .shuoshuo_row {  width: 100%;  margin-top: 10px;  display: flex;  }  #artitalk_main .artitalk_child {  width: 100%;  }  #artitalk_main #shuoshuo_content {  padding: 10px;  /* min-height: 500px; */  }  #artitalk_main body.theme-dark .cbp_tmtimeline::before {  background: RGBA(255, 255, 255, 0.06);  }  #artitalk_main ul.cbp_tmtimeline {  padding: 0;  }  #artitalk_main .cbp_tmtimeline {  margin: 30px 0 0 0;  padding: 0;  list-style: none;  display: inline;  position: relative;  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmtime {  display: block;  /* width: 29%; */  /* padding-right: 110px; */  max-width: 70px;  position: absolute;  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmtime span {  display: block;  text-align: right;  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmtime span:first-child {  font-size: 0.9em;  color: #bdd0db;  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmtime span:last-child {  font-size: 1.2em;  color: #9bcd9b;  }  #artitalk_main .cbp_tmtimeline>li:nth-child(odd) .cbp_tmtime span:last-child {  color: RGBA(255, 125, 73, 0.75);  }  #artitalk_main div.cbp_tmlabel>p {  margin-bottom: 0;  }  #artitalk_main div class.cdp_tmlabel>li .cbp_tmlabel {  margin-bottom: 0;  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmlabel {  margin: 0 0 45px 65px;  z-index: 1;  background: ' + color2 + ';  color: ' + color3 + ' ;  padding: 0.8em 1.2em 0.4em 1.2em;  /* font-size: 1.2em; */  font-weight: 300;  line-height: 1.4;  position: relative;  border-radius: 5px;  transition: all 0.3s ease 0s;  box-shadow: 0 1px 2px rgba(0,0,0,0.15); display: block;  }  #artitalk_main .cbp_tmlabel:hover {  /* transform: scale(1.05); */  transform: translateY(-3px);  z-index: 1;  box-shadow: 0 15px 32px rgba(0,0,0,0.15) ;  }  #artitalk_main .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel {    background: ' + color1 + ';  }  #artitalk_main .cbp_tmtimeline>li .cbp_tmlabel:after {  right: 100%;  border: solid transparent;  z-index: -1;  content: " ";  height: 0;  width: 0;  position: absolute;  pointer-events: none;  border-right-color: ' + color2 + ';  border-width: 10px;  top: 4px;  }  #artitalk_main .cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {    border-right-color: ' + color1 + ';  }  #artitalk_main p.shuoshuo_time {  margin-top: 10px;  border-top: 1px dashed #fff;  padding-top: 5px;  font-size: 12px;  }  @media screen and (max-width: 65.375em) {  #artitalk_main .cbp_tmtimeline>li .cbp_tmtime span:last-child {    font-size: 1.2em;  }  }  #artitalk_main .shuoshuo_author_img img {  border: 1px solid #ddd;  padding: 2px;  float: left;  border-radius: 64px;  transition: all 1s;  }  #artitalk_main .artitalk_avatar {  border-radius: 100% ;  -moz-border-radius: 100% ;  box-shadow: inset 0 -1px 0 3333sf;  -webkit-box-shadow: inset 0 -1px 0 3333sf;  -webkit-transition: 0.4s;  -webkit-transition: -webkit-transform 0.4s ease-out;  transition: transform 0.4s ease-out;  -moz-transition: -moz-transform 0.4s ease-out;  }  #artitalk_main .artitalk_avatar:hover {  -webkit-transform: rotateZ(360deg);  -moz-transform: rotateZ(360deg);  -o-transform: rotateZ(360deg);  -ms-transform: rotateZ(360deg);  transform: rotateZ(360deg);  }  #artitalk_main .shuoshuo_text {  width: 100%;  height: 130px;  padding: 8px 16px;  background-repeat: no-repeat;  background-position: right;  transition: all 0.35s ease-in-out 0s;  outline-style: none;  border: 1px solid #ccc;  border-radius: 6px;  resize: none;  background-color: transparent;  color: #999;  }  #artitalk_main .shuoshuo_inputs {  outline-style: none;  border: 1px solid #ccc;  padding: 8px 16px;  width: 40%;  font-size: 12px;  background-color: transparent;  color: #999;  }  #operare_artitalk .at_button,  #artitalk_main .at_button {    background-color: ' + color1 + ';  /* Green */  border: none;  margin-left: 5px;  color: ' + color3 + ';  padding: 8px 16px;  text-align: center;  text-decoration: none;  height: auto;  line-height: 20px;  display: inline-block;  font-size: 12px;  border-radius: 12px;  /* circle */  outline: none;  cursor: pointer;  }  #operare_artitalk .at_button:hover,  #artitalk_main .at_button:hover {      background-color: ' + color2 + ';  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.24), 0 8px 16px 0 rgba(0,0,0,0.19);  }  #artitalk_main #article-container ul p {  margin: 0 0 1rem;  }  #artitalk_main .power {  text-align: right;  color: #999;  margin-top: 10px;  font-size: 0.75em;  padding: 0.5em 0;  }  #artitalk_main .power a {  font-size: 0.75em;  position: relative;  cursor: pointer;  color: #1abc9c;  text-decoration: none;  display: inline-block;  }  #artitalk_main .shuoshuo_row .col.col-80 {  width: 80%;  float: left;  }  #artitalk_main .shuoshuo_row .col.col-20 {  width: 20%;  float: right;  text-align: right;  }  #artitalk_main #preview {  width: 100%;  float: left;  margin: 0.5rem 0 0;  padding: 7px;  box-shadow: 0 0 1px #f0f0f0;  }  #artitalk_main #lazy {  background: #fff;  bottom: 0;  left: 0;  position: fixed;  right: 0;  top: 0;  z-index: 9999;  }  #artitalk_main .preloader {  position: absolute;  margin-left: -55px;  margin-top: -100px;  height: 110px;  width: 110px;  left: 50%;  top: 50%;  }  #artitalk_main .preloader>svg>g>path {  stroke: #9ea1a4;  stroke-width: 0.25;  }  #artitalk_main .preloader>svg>path {  stroke: #9ea1a4;  stroke-width: 0.25;  }  #artitalk_main #cloud {  position: relative;  z-index: 2;  }  #artitalk_main #cloud path {  fill: #efefef;  }  #artitalk_main #sun {  margin-left: -10px;  margin-top: 6px;  opacity: 0;  width: 60px;  height: 60px;  position: absolute;  left: 45px;  top: 15px;  z-index: 1;  animation-name: rotate;  animation-duration: 16000ms;  animation-iteration-count: infinite;  animation-timing-function: linear;  }  #artitalk_main #sun path {  stroke-width: 0.18;  fill: #9ea1a4;  }  #artitalk_main .rain {  position: absolute;  width: 70px;  height: 70px;  margin-top: -32px;  margin-left: 19px;  }  #artitalk_main .drop {  opacity: 1;  background: #9ea1a4;  display: block;  float: left;  width: 3px;  height: 10px;  margin-left: 4px;  border-radius: 0px 0px 6px 6px;  animation-name: drop;  animation-duration: 350ms;  animation-iteration-count: infinite;  }  #artitalk_main .drop:nth-child(1) {  animation-delay: -130ms;  }  #artitalk_main .drop:nth-child(2) {  animation-delay: -240ms;  }  #artitalk_main .drop:nth-child(3) {  animation-delay: -390ms;  }  #artitalk_main .drop:nth-child(4) {  animation-delay: -525ms;  }  #artitalk_main .drop:nth-child(5) {  animation-delay: -640ms;  }  #artitalk_main .drop:nth-child(6) {  animation-delay: -790ms;  }  #artitalk_main .drop:nth-child(7) {  animation-delay: -900ms;  }  #artitalk_main .drop:nth-child(8) {  animation-delay: -1050ms;  }  #artitalk_main .drop:nth-child(9) {  animation-delay: -1130ms;  }  #artitalk_main .drop:nth-child(10) {  animation-delay: -1300ms;  }  #artitalk_main .artitalk_loading_text {  font-family: Helvetica, " Helvetica Neue ", sans-serif;  letter-spacing: 1px;  text-align: center;  margin-left: -43px;  font-weight: bold;  margin-top: 20px;  font-size: 11px;  color: #a0a0a0;  width: 200px;  }  #artitalk_main .shuoshuoimg {  cursor: pointer;  transition: all 1s;  z-index: 2;  }  #artitalk_main .shuoshuoimg:hover {  transform: scale(3.5);  }  #artitalk_main .hide,  #operare_artitalk .hide {  display: none;  }  #operare_artitalk .c1 {  position: fixed;  top: 0;  bottom: 0;  left: 0;right: 0;  background: rgba(0,0,0,0.5);  z-index: 2;  }  #operare_artitalk .c2 {  background-color: #fff;  position: fixed;  width: 400px;  height: auto;  top: 50%;  left: 50%;  z-index: 3; margin-top: -150px;  margin-left: -200px;  box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);  opacity: 0.85;  border: 0;  border-radius: 10px;  }  #operare_artitalk .shuoshuo_input_log {  outline-style: none;  margin-top: 10px;  border: 1px solid #ccc;  border-radius: 6px;  padding: 8px 16px;  font-size: 12px;  background-color: transparent;  color: #999;  }  #artitalk_main .delete_right {  cursor: pointer;  width: 12px;  height: 12px;  position: absolute;  right: 12px;  }  #artitalk_main svg {  display: inline;  }  #artitalk_main .cbp_tmlabel>p,  #artitalk_main h1,  #artitalk_main h2,  #artitalk_main h3,  #artitalk_main h4,  #artitalk_main h5,  #artitalk_main h6,  #artitalk_main em {  word-wrap: break-word;  word-break: break-all;  }  #artitalk_main .shuoshuo_emoji {  border: 1px solid #ccc;  border-radius: 6px 6px 0 0;  height: 120px;  overflow: auto;  margin-top: 10px;  border-bottom: none;  }  #artitalk_main .atemoji {  max-height: 28px;  width: 28px;  display: inline;  vertical-align: middle;  }  #artitalk_main .shuoshuo_emoji>.atemoji {  cursor: pointer;  margin: 0 0 0 10px;  display: inline;  }  #artitalk_main i>.atemoji {  cursor: pointer;  margin: 0 0 0 10px;  }  #artitalk_main .shuoshuo_emoji>a {  display: inline;  }  #artitalk_main #preview>p>.atemoji {  display: inline;  }  #artitalk_main .shuoshuo_emoji>.atemoji:hover {  transform: scale(1.5);  }  #artitalk_main div#shuoshuo_emojiswitch {  height: 40px;  width: auto;  border-radius: 0 0 6px 6px;  border-collapse: collapse;  border: 1px solid #ccc;  border-top: none;  }  #artitalk_main .shuoshuo_emoji_part {  width: 25%;  cursor: pointer;  align-content: center;  text-align: center;  line-height: 40px;  }  #artitalk_main .shuoshuo_emoji_part:hover {  background-color: #ccc;  color: #fff;  }  #artitalk_main .zuiliangdezai {  background-color: #ccc;  color: #fff;  }  #artitalk_main .pingjun {  display: flex;  }  #artitalk_main #article-container img {  margin: 0 0 0 0;  }  #artitalk_main .preview_now {  display: none;  }  #artitalk_main div#loading_txt {  font-size: 20px;  }  #artitalk_main audio {  display: block;  width: 100%;  outline: none;  opacity: 0.8;  }  #artitalk_main video {  z-index: 0;  }p.shuoshuo_time>span>a:hover {color: red;}p.shuoshuo_time>span>a {color: black;text-decoration: none;}  #artitalk_main textarea#neirong:focus {  background-position-y: 150px;  transition: all 0.35s ease-in-out 0s;  }  #artitalk_main img.atemoji {  max-height: 28px;  width: 28px;  display: inline;  vertical-align: middle;  }  #artitalk_main span.cbp_tmlabel>p {  overflow: unset;  }  #artitalk_main ul#maina>li {  list-style: none;  }  #artitalk_main div#artitalk_main {  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);  }  #artitalk_main .c2>center>p {  margin-top: 10px;  margin-bottom: 10px;  }  @-moz-keyframes rotate {  0% {    transform: rotateZ(0deg);  }  100% {    transform: rotateZ(360deg);  }  }  @-webkit-keyframes rotate {  0% {    transform: rotateZ(0deg);  }  100% {    transform: rotateZ(360deg);  }  }  @-o-keyframes rotate {  0% {    transform: rotateZ(0deg);  }  100% {    transform: rotateZ(360deg);  }  }  @keyframes rotate {  0% {    transform: rotateZ(0deg);  }  100% {    transform: rotateZ(360deg);  }  }  @-moz-keyframes drop {  50% {    height: 45px;    opacity: 0;  }  51% {    opacity: 0;  }  100% {    height: 1px;    opacity: 0;  }  }  @-webkit-keyframes drop {  50% {    height: 45px;    opacity: 0;  }  51% {    opacity: 0;  }  100% {    height: 1px;    opacity: 0;  }  }  @-o-keyframes drop {  50% {    height: 45px;    opacity: 0;  }  51% {    opacity: 0;  }  100% {    height: 1px;    opacity: 0;  }  }  @keyframes drop {  50% {    height: 45px;    opacity: 0;  }  51% {    opacity: 0;  }  100% {    height: 1px;    opacity: 0;  }  }';
      const atStyle = document.createElement('style');
      atStyle.type = 'text/css';
      atStyle.innerHTML = atCss;
      atStyle.id = 'add-Artitalk-Style';
      document.head.appendChild(atStyle);

      if (blackAndWhiteTheme) {
        const blackAndWhiteStyleElement = document.createElement('style');
        blackAndWhiteStyleElement.innerHTML = blackAndWhiteStyle;
        document.head.appendChild(blackAndWhiteStyleElement);
      }
    } else {
      if (blackAndWhiteTheme) {
        const blackAndWhiteStyleElement = document.createElement('style');
        blackAndWhiteStyleElement.innerHTML = blackAndWhiteStyle;
        document.head.appendChild(blackAndWhiteStyleElement);
      }

      const atStyle = document.createElement('link');
      atStyle.rel = 'stylesheet';
      atStyle.href = cssUrl;
      atStyle.id = 'add-Artitalk-Style';
      document.head.appendChild(atStyle);
    }
  }
  // Insert html part
  var atHtml = "<div id='artitalk_part1'><div id=\"shuoshuo_content\"><div id=\"ccontent\"></div><div id='readButton' style=''><center><button id=\"readmore\" class=\"at_button\" style=\"margin-bottom: 15px;display: none\">" + loadMore + '</button></center></div></div><div id="shuoshuo_input" class="shuoshuo_active" style="display: none;"><div id="shuoshuo_edit"><textarea class="shuoshuo_text" oninput="preview()" id="neirong" placeholder="' + shuoPla + '"style="background-image: url(' + bgImg + ");z-index: 0\"></textarea><span id=\"drag_area\" class=\"z-index: -1;\"></span></div><div id=\"shuoshuo_parttwo\" class=\"shuoshuo_parttwo\"><div id=\"shuoshuo_emoji_Tieba\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_BiliBili\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_QQ\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_custom\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emojiswitch\" class=\"shuoshuo_emojiswitch\" style='display: none'><div id=\"switch_1\" class=\"shuoshuo_emoji_part zuiliangdezai\">Tieba</div><div id=\"switch_2\" class=\"shuoshuo_emoji_part\">BiliBili</div><div id=\"switch_3\" class=\"shuoshuo_emoji_part\">QQ</div><div id=\"switch_4\" class=\"shuoshuo_emoji_part\">Custom</div></div><div id=\"preview\" class=\"preview_now\"></div></div><div class=\"shuoshuo_submit\"><div class=\"shuoshuo_row\"><input class=\"artitalk_child shuoshuo_inputs\" style='display: none' id=\"email\" value=\"\"  placeholder=\" " + avatarUrl + '"><input class="artitalk_child shuoshuo_inputs" style="display: none" id="commentNick" value="" placeholder="' + avatarUrl + "\"><div class=\"artitalk_child\"><button class=\"at_button\" id='atSave' style=\"float: right;\">" + publish + "</button><button class=\"at_button\" id='commentSave' style=\"display:none;float: right;\">" + publish + "</button><button class=\"at_button\" id='atPreview' style=\"float: right;\">" + preview + "</button><button class=\"at_button\" id='loadEmoji' style=\"float: right;\">" + emoji + '</button></div></div></div></div></div><div class="power"><div style="font-size: 25px;display: none; cursor: pointer" id="pubComment"><svg t="1591347684072" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9731" width="30" height="30" style=""><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m0 953.62C268.49 953.62 70.38 755.51 70.38 512S268.49 70.38 512 70.38 953.62 268.49 953.62 512 755.51 953.62 512 953.62z" p-id="9732" fill="#707070"></path><path d="M771.1 726.4H514.8c-15.57 0-28.23 12.66-28.23 28.23s12.66 28.23 28.23 28.23h256.3c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.23-28.23-28.23zM771.1 654.55H587.92c-15.56 0-28.23 12.66-28.23 28.23S572.35 711 587.92 711H771.1c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.22-28.23-28.22zM771.1 582.69H654.22c-15.57 0-28.23 12.66-28.23 28.23s12.66 28.23 28.23 28.23H771.1c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.23-28.23-28.23zM809.25 361.96c0-14.79-5.74-28.68-16.17-39.1L657.66 187.45c-10.43-10.43-24.32-16.17-39.1-16.17s-28.67 5.74-39.1 16.17L207.23 559.67c-5.06 5.06-7.88 12.06-7.72 19.21l3.61 172.49a26.32 26.32 0 0 0 25.8 25.83l172.6 3.81c0.22 0.01 0.44 0.01 0.67 0.01 6.95 0 13.76-2.82 18.66-7.73l372.22-372.22c10.43-10.43 16.18-24.32 16.18-39.11z m-53.5 1.79L391.5 727.99l-136.14-3-2.85-135.96 364.25-364.26c0.99-0.98 2.59-0.98 3.58-0.01l135.4 135.41c0.99 0.99 0.99 2.59 0.01 3.58z" p-id="9733" fill="#707070"></path></svg></div><div style="font-size: 25px;display: inline; cursor: pointer" id="pubShuo"title="' + postTalk + '"><svg t="1591347684072"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9731" width="30" height="30"  style="display: inline"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m0 953.62C268.49 953.62 70.38 755.51 70.38 512S268.49 70.38 512 70.38 953.62 268.49 953.62 512 755.51 953.62 512 953.62z" p-id="9732" fill="#707070"></path><path d="M771.1 726.4H514.8c-15.57 0-28.23 12.66-28.23 28.23s12.66 28.23 28.23 28.23h256.3c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.23-28.23-28.23zM771.1 654.55H587.92c-15.56 0-28.23 12.66-28.23 28.23S572.35 711 587.92 711H771.1c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.22-28.23-28.22zM771.1 582.69H654.22c-15.57 0-28.23 12.66-28.23 28.23s12.66 28.23 28.23 28.23H771.1c15.57 0 28.23-12.66 28.23-28.23s-12.67-28.23-28.23-28.23zM809.25 361.96c0-14.79-5.74-28.68-16.17-39.1L657.66 187.45c-10.43-10.43-24.32-16.17-39.1-16.17s-28.67 5.74-39.1 16.17L207.23 559.67c-5.06 5.06-7.88 12.06-7.72 19.21l3.61 172.49a26.32 26.32 0 0 0 25.8 25.83l172.6 3.81c0.22 0.01 0.44 0.01 0.67 0.01 6.95 0 13.76-2.82 18.66-7.73l372.22-372.22c10.43-10.43 16.18-24.32 16.18-39.11z m-53.5 1.79L391.5 727.99l-136.14-3-2.85-135.96 364.25-364.26c0.99-0.98 2.59-0.98 3.58-0.01l135.4 135.41c0.99 0.99 0.99 2.59 0.01 3.58z" p-id="9733" fill="#707070"></path></svg></div><div style="font-size: 25px;display: inline; cursor: pointer" id="switchUser" title="' + login + '"><svg t="1591347848063"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12288" width="30" height="30"  style="display: inline"><path d="M515.541449 7.082899c-280.359429 0-508.458551 228.120391-508.458551 508.458551s228.120391 508.458551 508.458551 508.458551 508.458551-228.120391 508.458551-508.458551S795.900879 7.082899 515.541449 7.082899zM515.541449 981.864196c-257.132626 0-466.301477-209.190121-466.301477-466.322747 0-257.132626 209.168851-466.322747 466.301477-466.322747s466.301477 209.190121 466.301477 466.322747S772.674075 981.864196 515.541449 981.864196zM614.574414 524.177056 614.574414 524.177056c47.751075-31.96876 79.230625-86.398604 79.230625-148.187857 0-98.437405-79.804915-178.24232-178.24232-178.24232-98.437405 0-178.24232 79.804915-178.24232 178.24232 0 61.810523 31.479551 116.219097 79.251895 148.187857-100.266622 39.519598-171.244501 137.170014-171.244501 251.453545 0 0.23397 0 0.446669 0.02127 0.659369 0 0.04254-0.02127 0.10635-0.02127 0.14889 0 15.612155 12.65563 28.246516 28.267786 28.246516 15.590885 0 21.886796-12.63436 21.886796-28.246516 0-0.340319-0.08508-0.659369-0.10635-1.020958 0.10635-118.005774 102.159649-219.995264 220.207964-219.995264 118.112124 0 220.207964 102.095839 220.207964 220.207964 0 0.14889-1.467628 29.054774 21.971875 29.054774 15.505806 0 28.076356-12.57055 28.076356-28.055086 0-0.06381-0.02127-0.12762-0.02127-0.2127 0-0.25524 0.02127-0.510479 0.02127-0.786989C785.797645 661.34707 714.798496 563.696654 614.574414 524.177056zM515.541449 510.734437c-74.402343 0-134.723968-60.321625-134.723968-134.723968 0-74.423613 60.321625-134.723968 134.723968-134.723968 74.423613 0 134.723968 60.321625 134.723968 134.723968S589.943792 510.734437 515.541449 510.734437z" p-id="12289" fill="#707070"></path></svg></div><div style="font-size: 25px;display: inline; cursor: pointer" id="uploadSource" title="" + add + ""><svg t="1606385459524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2943" width="30" height="30" style="display: inline"><path d="M275.815618 476.43815a20.004001 20.004001 0 0 1-14.139971-34.143972l251.284545-251.295976 249.387023 249.387023a20.004001 20.004001 0 0 1-28.291373 28.291373L512.960192 247.580948 289.955589 470.585551a19.946847 19.946847 0 0 1-14.139971 5.852599z" p-id="2944" fill="#707070"></path><path d="M512.011431 854.730956a20.004001 20.004001 0 0 1-20.004001-20.004001V225.279344a20.004001 20.004001 0 1 1 40.008002 0v609.390456a20.004001 20.004001 0 0 1-20.004001 20.061156z" p-id="2945" fill="#707070"></path><path d="M512.011431 1023.999097a510.467814 510.467814 0 1 1 199.297004-40.24805 508.810339 508.810339 0 0 1-199.297004 40.24805z m0-983.991095a470.459811 470.459811 0 1 0 183.659591 37.081703A469.030954 469.030954 0 0 0 512.011431 40.008002z" p-id="2946" fill="#707070"></path></svg></div><br>Powered By <a href="https://artitalk-docs.hclonely.com/" target="_blank">Artitalk</a><br>' + atVersion + "</div><input type='file' id='realUpload' onchange='atEvery.prototype.beginUpload(this.files[0])' style=\"width: 0;height: 0;display: none\"></input></div>";
  var motionHtml = "<div id='lazy'><div class=\"preloader\" style=\"opacity: 1; \"><svg version=\"1.1\" id=\"sun\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"y=\"0px\" width=\"10px\" height=\"10px\" viewBox=\"0 0 10 10\" enable-background=\"new 0 0 10 10\" xml:space=\"preserve\"style=\"opacity: 1; margin-left: 0px; margin-top: 0px;\"><g><path fill=\"none\"d=\"M6.942,3.876c-0.4-0.692-1.146-1.123-1.946-1.123c-0.392,0-0.779,0.104-1.121,0.301c-1.072,0.619-1.44,1.994-0.821,3.067C3.454,6.815,4.2,7.245,5,7.245c0.392,0,0.779-0.104,1.121-0.301C6.64,6.644,7.013,6.159,7.167,5.581C7.321,5,7.243,4.396,6.942,3.876z M6.88,5.505C6.745,6.007,6.423,6.427,5.973,6.688C5.676,6.858,5.34,6.948,5,6.948c-0.695,0-1.343-0.373-1.69-0.975C2.774,5.043,3.093,3.849,4.024,3.312C4.32,3.14,4.656,3.05,4.996,3.05c0.695,0,1.342,0.374,1.69,0.975C6.946,4.476,7.015,5,6.88,5.505z\"></path><path fill=\"none\"d=\"M8.759,2.828C8.718,2.757,8.626,2.732,8.556,2.774L7.345,3.473c-0.07,0.041-0.094,0.132-0.053,0.202C7.319,3.723,7.368,3.75,7.419,3.75c0.025,0,0.053-0.007,0.074-0.02l1.211-0.699C8.774,2.989,8.8,2.899,8.759,2.828z\"></path><path fill=\"none\"d=\"M1.238,7.171c0.027,0.047,0.077,0.074,0.128,0.074c0.025,0,0.051-0.008,0.074-0.02l1.211-0.699c0.071-0.041,0.095-0.133,0.054-0.203S2.574,6.228,2.503,6.269l-1.21,0.699C1.221,7.009,1.197,7.101,1.238,7.171z\"></path><path fill=\"none\"d=\"M6.396,2.726c0.052,0,0.102-0.026,0.13-0.075l0.349-0.605C6.915,1.976,6.89,1.885,6.819,1.844c-0.07-0.042-0.162-0.017-0.202,0.054L6.269,2.503C6.228,2.574,6.251,2.666,6.322,2.706C6.346,2.719,6.371,2.726,6.396,2.726z\"></path><path fill=\"none\"d=\"M3.472,7.347L3.123,7.952c-0.041,0.07-0.017,0.162,0.054,0.203C3.2,8.169,3.226,8.175,3.25,8.175c0.052,0,0.102-0.027,0.129-0.074l0.349-0.605c0.041-0.07,0.017-0.16-0.054-0.203C3.603,7.251,3.513,7.276,3.472,7.347z\"></path><path fill=\"none\"d=\"M3.601,2.726c0.025,0,0.051-0.007,0.074-0.02C3.746,2.666,3.77,2.574,3.729,2.503l-0.35-0.604C3.338,1.828,3.248,1.804,3.177,1.844C3.106,1.886,3.082,1.976,3.123,2.047l0.35,0.604C3.5,2.7,3.549,2.726,3.601,2.726z\"></path><path fill=\"none\"d=\"M6.321,7.292c-0.07,0.043-0.094,0.133-0.054,0.203l0.351,0.605c0.026,0.047,0.076,0.074,0.127,0.074c0.025,0,0.051-0.006,0.074-0.02c0.072-0.041,0.096-0.133,0.055-0.203l-0.35-0.605C6.483,7.276,6.393,7.253,6.321,7.292z\"></path><path fill=\"none\"d=\"M2.202,5.146c0.082,0,0.149-0.065,0.149-0.147S2.284,4.851,2.202,4.851H1.503c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147H2.202z\"></path><path fill=\"none\"d=\"M8.493,4.851H7.794c-0.082,0-0.148,0.066-0.148,0.148s0.066,0.147,0.148,0.147l0,0h0.699c0.082,0,0.148-0.065,0.148-0.147S8.575,4.851,8.493,4.851L8.493,4.851z\"></path><path fill=\"none\"d=\"M5.146,2.203V0.805c0-0.082-0.066-0.148-0.148-0.148c-0.082,0-0.148,0.066-0.148,0.148v1.398c0,0.082,0.066,0.149,0.148,0.149C5.08,2.352,5.146,2.285,5.146,2.203z\"></path><path fill=\"none\"d=\"M4.85,7.796v1.396c0,0.082,0.066,0.15,0.148,0.15c0.082,0,0.148-0.068,0.148-0.15V7.796c0-0.082-0.066-0.148-0.148-0.148C4.917,7.647,4.85,7.714,4.85,7.796z\"></path><path fill=\"none\"d=\"M2.651,3.473L1.44,2.774C1.369,2.732,1.279,2.757,1.238,2.828C1.197,2.899,1.221,2.989,1.292,3.031l1.21,0.699c0.023,0.013,0.049,0.02,0.074,0.02c0.051,0,0.101-0.026,0.129-0.075C2.747,3.604,2.722,3.514,2.651,3.473z\"></path><path fill=\"none\"d=\"M8.704,6.968L7.493,6.269c-0.07-0.041-0.162-0.016-0.201,0.055c-0.041,0.07-0.018,0.162,0.053,0.203l1.211,0.699c0.023,0.012,0.049,0.02,0.074,0.02c0.051,0,0.102-0.027,0.129-0.074C8.8,7.101,8.776,7.009,8.704,6.968z\"</path></g></svg><svg version=\"1.1\" id=\"cloud\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"x=\"0px\" y=\"0px\" width=\"110px\" height=\"110px\" viewBox=\"0 0 10 10\" enable-background=\"new 0 0 10 10\"xml:space=\"preserve\"><path fill=\"none\"d=\"M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z\"></path></svg><div class=\"rain\"><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span></div><div class=\"artitalk_loading_text\" id=\"loading_txt\">" + loading + '</div></div></div>';
  var atOpHtml = "<div id=\"shade\" class=\"c1\" style='display: none'></div><div id=\"shuoshuo-modal\" class=\"c2\" style='display: none' ><center><p>" + username + '：<input type="text" class="shuoshuo_input_log" id="username"/></p><p>' + password + '：<input type="password" class="shuoshuo_input_log"  id="pwd"/></p><p><input type="button" value="' + login + "\" class=\"at_button\" id='login'>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"" + cancel + "\"  class=\"at_button\" id = 'celLogin'></p></center><center><div id=\"logw\" style='color: red'></div></center></div><div id=\"userinfo\" class=\"c2\" style='display: none'><center><p><div id=\"status\"></div></p><p><input type=\"button\" class=\"at_button\" value=\"" + confirm + '" id="hideuser">&nbsp;&nbsp;&nbsp;&nbsp;<input id="tui" type="button" value="' + signOut + "\" class=\"at_button\" style=\"display: none;\" onclick=\"Logout();\"></p></center></div><div id=\"shanchu\" class=\"c2\" style='display: none'><center><p>" + deleteSuccess + '</p><p><input type="button" class="at_button" value="' + confirm + "\" id=\"deleteSus\"></p><center></div><div id=\"shanchur\" class=\"c2\" style='display: none'><center><p>" + confirmDelete + "</p><p><div id=\"delete1\"></div></p><center></div><div id='clickForPreview'></div>";
  var atOp = document.createElement('div');
  atOp.id = 'operare_artitalk';
  document.body.append(atOp);
  document.getElementById('operare_artitalk').innerHTML = atOpHtml;
  motionHtml = motion === 0 ? '' : motionHtml;
  atHtml = motionHtml + atHtml;
  document.getElementById('artitalk_main').innerHTML = atHtml;
  // 开始加载说说
  root.seeContent(0, root.config);
  const rmButton = document.getElementById('readmore');// readmore
  const pubButton = document.getElementById('pubShuo');// publish shuo
  const switchLogin = document.getElementById('switchUser');// login or exit
  const cancelLogin = document.getElementById('celLogin');// cancel Login
  const loginButton = document.getElementById('login');// Login
  const hideUser = document.getElementById('hideuser');
  const loadEmoji = document.getElementById('loadEmoji');// Loading emoji
  const switchTb = document.getElementById('switch_1');// Tieba emoji
  const switchBB = document.getElementById('switch_2');// BiliBili emoji
  const switchQQ = document.getElementById('switch_3');// QQ emoji
  const switchCustom = document.getElementById('switch_4');// custom emoji
  const beginPreview = document.getElementById('atPreview');// preview
  const clickPre = document.getElementById('clickForPreview');// preview
  const saveContent = document.getElementById('atSave');// savecontent
  const deleteSus = document.getElementById('deleteSus');// Delete successful
  const uploadSource = document.getElementById('uploadSource');// Upload image or video
  const realUpload = document.getElementById('realUpload');
  realUpload.onchange = function () {
    root.beginUpload(this.files[0]);
  };
  let pNum = 0;
  rmButton.onclick = function () {
    pNum = pNum + 1;
    root.seeContent(pNum, root.config);
  };
  pubButton.onclick = function () {
    const currentUser = ArtitalkData.currentUser();
    if (currentUser) {
      if (document.getElementById('shuoshuo_input').style.display === '') {
        fadeOut('shuoshuo_input');
      } else {
        fadeIn('shuoshuo_input');
      }
    } else {
      document.getElementById('logw').innerHTML = '<center><pre><code>' + loginRequired + '</code></pre></center>';
      Show();
    }
  };
  switchLogin.onclick = function () {
    document.getElementById('logw').innerHTML = '';
    const currentUser = ArtitalkData.currentUser();
    fadeIn('shade');
    if (currentUser) {
      fadeIn('userinfo');
      document.getElementById('status').innerHTML = loggedIn + ':\t' + currentUser.attributes.username;
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
    const passWord = document.getElementById('pwd').value;
    document.getElementById('logw').style.color = 'black';
    document.getElementById('logw').innerHTML = 'loading...';
    if (passWord === '') {
      document.getElementById('logw').style.color = 'red';
      document.getElementById('logw').innerHTML = passwordRequired;
      return;
    }
    const userName = document.getElementById('username').value;
    if (userName === '') {
      document.getElementById('logw').style.color = 'red';
      document.getElementById('logw').innerHTML = usernameRequired;
      return;
    }
    ArtitalkData.login(userName, passWord).then((user) => {
      document.getElementById('ccontent').innerHTML = '';
      document.getElementById('neirong').value = '';
      fadeIn('lazy');
      root.seeContent(0, root.config);
      Hide();
      onLogin(userName);
    }, (error) => {
      let errLogin = error.message;
      document.getElementById('logw').style.color = 'red';
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
      document.getElementById('logw').innerHTML = errLogin;
    });
  };
  hideUser.onclick = function () {
    fadeOut('shade');
    fadeOut('userinfo');
  };
  loadEmoji.onclick = function () {
    document.getElementById('switch_1').classList.add('zuiliangdezai');
    document.getElementById('switch_2').classList.remove('zuiliangdezai');
    document.getElementById('switch_3').classList.remove('zuiliangdezai');
    document.getElementById('switch_4').classList.remove('zuiliangdezai');
    if (document.getElementById('shuoshuo_emojiswitch').style.display === 'none') {
      fadeIn('shuoshuo_emoji_Tieba');
      fadeIn('shuoshuo_emojiswitch');
      document.getElementById('shuoshuo_emoji_BiliBili').innerHTML = atEmojiB;
      document.getElementById('shuoshuo_emoji_Tieba').innerHTML = atEmojiT;
      document.getElementById('shuoshuo_emoji_QQ').innerHTML = atEmojiQ;
      document.getElementById('shuoshuo_emoji_custom').innerHTML = atEmojiDefault;
      document.getElementById('shuoshuo_emojiswitch').classList.add('pingjun');
    } else {
      fadeOut('shuoshuo_emoji_Tieba');
      fadeOut('shuoshuo_emoji_BiliBili');
      fadeOut('shuoshuo_emoji_custom');
      fadeOut('shuoshuo_emoji_QQ');
      fadeOut('shuoshuo_emojiswitch');
      document.getElementById('shuoshuo_emojiswitch').classList.remove('pingjun');
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
    const preCon = document.getElementById('preview');
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
    }
    let shuoshuoContent = document.getElementById('neirong').value;
    if (shuoshuoContent === '') throw '说说内容不能为空';
    const atObject = ArtitalkData.createTalk();
    const shuoshuoContentMd = shuoshuoContent;
    atObject.set('atContentMd', shuoshuoContentMd);
    shuoshuoContent = ArtitalkI18n.translateEmojis(shuoshuoContent, atEmoji);
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
    fadeIn('lazy');
    atObject.save().then(function (res) {
      document.getElementById('ccontent').innerHTML = '';
      document.getElementById('neirong').value = '';
      fadeOut('preview');
      root.seeContent(0, root.config);
      fadeOut('shuoshuo_input');

      onShuoPublished(currentUser.attributes.username, shuoshuoContent);
    });
  };
  clickPre.onclick = function () {
    let unPre = document.getElementById('neirong').value;
    unPre = ArtitalkI18n.translateEmojis(unPre, atEmoji);
    const finishPre = ArtitalkSanitizer.markdownToHtml(unPre);
    document.getElementById('preview').innerHTML = finishPre;
  };
  deleteSus.onclick = function () {
    fadeOut('shanchu'); fadeOut('shade'); fadeIn('lazy');
    document.getElementById('ccontent').innerHTML = '';
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
      document.getElementById('logw').innerHTML = '<center><pre><code>' + loginRequired + '</code></pre></center>';
      Show();
      return;
    }
    document.getElementById('realUpload').click();
  };
  // function beginUpload(file){
  //     console.log(file.files);
  // }
  atEvery.prototype.delete = function (id) {
    function fadeOut (id) {
      ArtitalkDom.hide(id);
    }
    function fadeIn (id) {
      ArtitalkDom.show(id);
    }
    const currentUser = ArtitalkData.currentUser();
    if (currentUser) {
      fadeIn('shade'); fadeIn('shanchur');
      document.getElementById('delete1').innerHTML = '<input type="button" class="at_button" value="' + confirm + '" id="Delete"><input type="button" class="at_button" value="' + cancel + '" id="cancelDelete">';
    } else {
      const pubButton = document.getElementById('pubShuo');
      pubButton.click();
      return;
    }
    const cancelDelete = document.getElementById('cancelDelete');
    const rlyDelete = document.getElementById('Delete');
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
