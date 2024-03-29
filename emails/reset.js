const keys = require('../keys');

module.exports = function(email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Восстановление пароля',
    html: `
      <h1>Вы забыли пароль?</h1>
      <p>Ели нет, то проигнорируйте данное письмо</p>
      <p>Иначе нажмите на ссылку</p>
       <p><a href='${keys.BASE_URL}/auth/password/${token}'>Восстановить пароль</a></p>
      <hr />
      <a href='${keys.BASE_URL}'>Магазин курсов</a>      
    `,
  };
};
