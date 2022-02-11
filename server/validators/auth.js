const{check}=require('express-validator')

exports.userSignupValidator=[
    check('name')
    .not().isEmpty().withMessage('Name is required'),

    check('email')
    .not().isEmpty().withMessage('email is required'),

    check('password')
    .isLength({
        min:6
    })
    .withMessage('Passwords must be at least 6 characters long'),
    
];
exports.userSigninValidator=[
    

    check('email')
    .not().isEmpty().withMessage('email is required'),

    check('password')
    .isLength({
        min:6
    })
    .withMessage('Passwords must be at least 6 characters long'),
    
];