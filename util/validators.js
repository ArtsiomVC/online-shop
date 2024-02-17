const { body } = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
  body('email').trim().isEmail().withMessage('Введите корректный email').custom(async (value) => {
    try {
      const user = await User.findOne({ email: value })
      if (user) {
        return Promise.reject('Пользователь с таким email уже существует')
      }
    } catch (e) {
      console.log(e)
    }
  }).normalizeEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').trim().isLength({ min: 6, max: 56 }).isAlphanumeric(),
  body('confirm').trim().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Пароли должны совпадать')
    }
    return true;
  }),
  body('name').trim().isLength({ min: 3 }).withMessage('Имя должно быть минимум 3 символа'),
];

exports.loginValidators = [
  body('email').trim().isEmail().withMessage('Введите корректный email').normalizeEmail(),
  body('password').trim(),
];

exports.courseValidators = [
  body('title').trim().isLength({ min: 3 }).withMessage('Минимальная длина названия 3 символа'),
  body('price').isNumeric().withMessage('Введите корректную цену'),
  body('img','Введите корректную URL картинки').isURL(),
]
