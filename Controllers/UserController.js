'use strict'

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const UserServiece = require("../Services/UserServiece");
const AccountServiece = require('../Services/AccountServiece');
const serverConfig = require('../Configs/serverConfig');

const UserController = {
    signUp: async (req, res) => {
        const params = req.body;

        const Schema = Joi.object({
            fisrtName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().integer().allow(null, 0).default(null),
            userName: Joi.string().required(),
            password: Joi.string().required(),
        });

        const { error , value } = Schema.validate(params);
        if (error) {
            return res.status(500).send(error);
        }

        const result = await UserServiece.addUser({fisrtName: value.fisrtName, lastName: value.lastName, age: value.age});
        if(!result){
            res.status(500).send({
                Message: 'SOS!'
            });
        }
        if(result){
            return res.status(200).send(result);
        }
    },
    login: async (req, res) => {

    },
};

module.exports = UserController;
