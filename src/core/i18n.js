const ArtitalkI18n = (function () {
  const textKeys = ['text0', 'text00', 'text1', 'text2', 'text3', 'text4', 'text5', 'text6', 'text7', 'text8', 'text9', 'text10', 'text11', 'text12', 'text14', 'text15', 'text16', 'text17', 'text18', 'text19', 'text20', 'text21', 'text22', 'text23', 'text24', 'text25', 'text26', 'text27', 'text28', 'text29', 'text30', 'text31', 'text32', 'text33', 'text34', 'text35', 'textup', 'loadingTxT', 'text36', 'text37', 'text38', 'text39', 'text40', 'text41', 'text42', 'text43', 'text44', 'text45', 'text46'];
  const translations = {
    zh: ['由', '发表', '加载更多...', '预览', '发布', '已登录', '确定', '退出登录', '用户', '密码', '登录', '取消', '发布说说', '添加图片，视频，音乐', '(上传失败，若非网络原因，请联系Artitalk开发人员)', '请先登录', '内容不能为空', '登陆失败，请检查用户名及密码是否正确', '头像url', '确定删除本条说说吗？', '删除成功', '请拖拽图片到此处', '表情', '删除', '如果你看到这条说说，恭喜你已经配置成功并且可以正常使用了。当你发布一个说说之后，我将会自动消失。快去探索Artitalk吧<br>觉得本项目不错的话可以推荐给你的好友或者去GitHub点一个star，感谢支持', '上传中', '图片', '音乐', '视频', '添加', '上传的图片最大支持5M，请压缩后或换一个继续上传', '上传的音乐最大支持10M，请压缩后或换一个继续上传', '上传的视频最大支持30M，请压缩后或换一个继续上传', '图片格式错误，请不要上传其他类型的文件', '音频格式错误，请不要上传其他类型的文件', '视频格式错误，请不要上传其他类型的文件', '上传ing', '加载中', '用户名不能为空', '密码不能为空', '请在下方输入框进行修改然后点击保存即可', '保存', '评论', '邮箱', '昵称', '用户名与密码不匹配', '登陆失败，常见错误有<br><li>网络错误</li><li>域名不在leancloud的域名白名单中被限制登录</li><li>当前页面使用了其他leancloud应用导致登录到了其他应用所以失败</li>', '未找到此用户', '尝试错误密码次数过多，请稍后再试'],
    en: ['Published by', '', 'load more...', 'Preview', 'Publish', 'logged', 'Ok', 'Sign out', 'Username', 'Password', 'Log in', 'Cancel', 'Post talk', 'Add pictures, videos, music', '(Upload failed, if not for network reasons, please contact Artitalk developers)', 'Please log in first', 'Content can not be blank', 'Login failed, please check if the username and password are correct', 'Avatar url', 'Are you sure you want to devare this article?', 'Successfully devared', 'Please drag and drop pictures here', 'emoji', 'Devare', 'If you see this, congratulations, you have successfully configured and can be used normally. When you post one shuoshuo, I will disappear automatically. Quickly explore Artitalk.<br>If you think this project is good, you can recommend it to your friends or go to GitHub to order a star.', 'uploading', 'image', 'music', 'video', 'Add', 'The uploaded image supports a maximum of 5M, please compress or change another one to continue uploading', 'The uploaded music supports a maximum of 10M, please compress or change another one to continue uploading', 'The uploaded video supports a maximum of 30M, please compress or change another one to continue uploading', 'Picture format error, please do not upload other types of files', 'The audio format is wrong, please do not upload other types of files', 'Video format error, please do not upload other types of files', 'Uploading', 'Loading', 'Username can not be empty', 'Password can not be empty', 'Please modify it in the input box below and click save', 'save', 'comments', 'Mailbox', 'Nickname', 'The username and password mismatch.', 'Request has been terminated Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.c', 'Could not find user.', 'You have entered incorrect passwords for too many times. Please try later or reset your password.'],
    es: ['Publicado por', '', 'Carga más...', 'Avance', 'Lanzamiento', 'Registrado', 'Determinar', 'Desconectar', 'Usuario', 'Contraseña', 'Iniciar sesión', 'Cancelar', 'Publicar charla', 'Agrega fotos, videos, música', '(Carga fallida, si no es por razones de red, comuníquese con los desarrolladores de Artitalk)', 'Por favor ingresa primero', 'El contenido no puede estar en blanco', 'Error de inicio de sesión, compruebe si el nombre de usuario y la contraseña son correctos', 'URL del avatar', '¿Estás seguro de que deseas eliminar este artículo?', 'Eliminado con éxito', 'Arrastra y suelta fotos aquí', 'expresión', 'Eliminar', 'Si ve este artículo, felicidades, se ha configurado correctamente y se puede usar normalmente. Cuando publiques un comentario, desapareceré automáticamente. Explore rápidamente Artitalk. <br> Bienvenido al grupo QQ de Artitalk: 1104585229 <br> Si cree que este proyecto es bueno, puede recomendarlo a sus amigos o ir a GitHub para pedir una estrella, gracias por su apoyo.', 'cargando', 'imagen', 'música', 'vídeo', 'Añadir', 'La imagen cargada admite un máximo de 5 M, comprima o cambie otra para continuar cargando', 'La música cargada admite un máximo de 10 M, comprime o cambia otra para continuar cargando', 'El video subido admite un máximo de 30 M, comprima o cambie otro para continuar subiendo', 'Error de formato de imagen, no suba otros tipos de archivos', 'El formato de audio es incorrecto, no suba otros tipos de archivos', 'Error de formato de video, no suba otros tipos de archivos', 'Cargando', 'Cargando', 'El nombre de usuario no puede estar vacío', 'la contraseña no puede estar en blanco', 'Por favor, introduzca las modificaciones en el cuadro de abajo y haga clic en guardar', 'guardar', 'comentarios', 'Buzón', 'Apodo', 'El nombre de usuario y la contraseña no coinciden.', 'La solicitud ha sido cancelada Posibles causas: la red está fuera de línea, Access-Control-Allow-Origin no permite Origin, la página se está descargando, etc.c', 'No se pudo encontrar el usuario.', 'Ha introducido contraseñas incorrectas demasiadas veces. Inténtelo más tarde o restablezca su contraseña.']
  };

  function normalizeLanguage (language) {
    return typeof language === 'string' && translations[language] ? language : 'zh';
  }

  function getMessages (language, moduleName) {
    const messages = {};
    const values = translations[normalizeLanguage(language)];
    textKeys.forEach(function (key, index) {
      messages[key] = values[index];
    });

    if (moduleName === 'content') {
      if (messages.text24.indexOf('<br>Welcome') === -1 && messages.text24.indexOf('QQ交流群') === -1) {
        messages.text24 = messages.text24.replace('<br>If you think', '<br>Welcome to Artitalk’s QQ group: 1104585229<br>If you think').replace('<br>觉得本项目', '<br>欢迎加入Artitalk的QQ交流群：1104585229<br>觉得本项目');
      }
      if (normalizeLanguage(language) === 'zh') messages.text44 = messages.text44.replace(/<li>/g, "<li style='text-align:left;'>");
    }

    return messages;
  }

  function translateEmojis (content, customEmojis) {
    if (typeof content === 'undefined') return;
    const emojiSets = [atEmojiQQ, atEmojiTB, atEmojiBB, customEmojis || {}];
    emojiSets.forEach(function (emojiSet) {
      for (const key in emojiSet) {
        const token = '[' + key + ']';
        const image = "<img class='atemoji gallery-group-img' src='" + emojiSet[key] + "'/>";
        while (content.indexOf(token) !== -1) content = content.replace(token, image);
      }
    });
    return content;
  }

  return { normalizeLanguage: normalizeLanguage, getMessages: getMessages, translateEmojis: translateEmojis };
}());
