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
  var atHtml = "<div id='artitalk_part1'><div id=\"shuoshuo_content\"><div id=\"ccontent\"></div><div id='readButton' style=''><center><button id=\"readmore\" class=\"at_button\" style=\"margin-bottom: 15px;display: none\">" + loadMore + '</button></center></div></div><div id="shuoshuo_input" class="shuoshuo_active" style="display: none;"><div id="shuoshuo_edit"><textarea class="shuoshuo_text" oninput="preview()" id="neirong" placeholder="' + shuoPla + '"style="background-image: url(' + bgImg + ");z-index: 0\"></textarea><span id=\"drag_area\" class=\"z-index: -1;\"></span></div><div id=\"shuoshuo_parttwo\" class=\"shuoshuo_parttwo\"><div id=\"shuoshuo_emoji_Tieba\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_BiliBili\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_QQ\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emoji_custom\" class=\"shuoshuo_emoji\" style='display: none'></div><div id=\"shuoshuo_emojiswitch\" class=\"shuoshuo_emojiswitch\" style='display: none'><div id=\"switch_1\" class=\"shuoshuo_emoji_part zuiliangdezai\">Tieba</div><div id=\"switch_2\" class=\"shuoshuo_emoji_part\">BiliBili</div><div id=\"switch_3\" class=\"shuoshuo_emoji_part\">QQ</div><div id=\"switch_4\" class=\"shuoshuo_emoji_part\">Custom</div></div><div id=\"preview\" class=\"preview_now\"></div></div><div class=\"shuoshuo_submit\"><div class=\"shuoshuo_row\"><input class=\"artitalk_child shuoshuo_inputs\" style='display: none' id=\"email\" value=\"\"  placeholder=\" " + avatarUrl + '"><input class="artitalk_child shuoshuo_inputs" style="display: none" id="commentNick" value="" placeholder="' + avatarUrl + "\"><div class=\"artitalk_child\"><button class=\"at_button\" id='atSave' style=\"float: right;\">" + publish + "</button><button class=\"at_button\" id='commentSave' style=\"display:none;float: right;\">" + publish + "</button><button class=\"at_button\" id='atPreview' style=\"float: right;\">" + preview + "</button><button class=\"at_button\" id='loadEmoji' style=\"float: right;\">" + emoji + '</button></div></div></div></div></div><div class="power"><div style="font-size: 25px;display: none; cursor: pointer" id="pubComment">' + ArtitalkSvg.render('publish') + '</div><div style="font-size: 25px;display: inline; cursor: pointer" id="pubShuo"title="' + postTalk + '">' + ArtitalkSvg.render('publish') + '</div><div style="font-size: 25px;display: inline; cursor: pointer" id="switchUser" title="' + login + '">' + ArtitalkSvg.render('user') + '</div><div style="font-size: 25px;display: inline; cursor: pointer" id="uploadSource" title="" + add + "">' + ArtitalkSvg.render('upload') + '</div><br>Powered By <a href="https://artitalk-docs.hclonely.com/" target="_blank">Artitalk</a><br>' + atVersion + "</div><input type='file' id='realUpload' onchange='atEvery.prototype.beginUpload(this.files[0])' style=\"width: 0;height: 0;display: none\"></input></div>";
  var motionHtml = "<div id='lazy'><div class=\"preloader\" style=\"opacity: 1; \">" + ArtitalkSvg.render('loading-sun') + "" + ArtitalkSvg.render('loading-cloud') + "<div class=\"rain\"><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span><span class=\"drop\"></span></div><div class=\"artitalk_loading_text\" id=\"loading_txt\">" + loading + '</div></div></div>';
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
    clickPre.click();
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
