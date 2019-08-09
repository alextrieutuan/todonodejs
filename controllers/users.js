import UserModel from '../models/user';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';

exports.login = function (req, res) {
    UserModel.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) return res.send(err);
        if (!user) {
            let err = new Error('User not found');
            return res.status(404).send(err);
        }

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result === true) {
                return res.json(user);
            } else {
                let err = new Error('Password is incorrect');
                return res.status(404).send(err);
            }
        });
    })
};

exports.register = function (req, res) {
    var newUser = new UserModel(req.body);
    newUser.save(function (err, user) {
        if (err) return res.send(err);

        if (!user) {
            let err = new Error('Cant not create user');
            return res.send('500', err);
        }
        return res.json(user);
    });
}