const { id } = require('@hapi/joi/lib/base');
const { object } = require('joi');
const Joi = require('joi')
const alphabet = /^[a-z A-Z]*$/;



const idValidation = Joi.number()
.greater(0)
.error(() => {
    return{ 
        message: 'Its an error'
}})
.required();
const nameValidation = Joi.string()
.pattern((new RegExp(alphabet)))
.message('Kindly enter the name with only alphabet').required();
const salaryValidation = Joi.number()
.greater(15000)
.required();
const ageValidation = Joi.number()
.greater(18).less(60)
.required()


const empValidation = Joi.array().items(
    Joi.object({
        id: idValidation,
        employee_name: nameValidation,
        employee_salary:salaryValidation,
        employee_age:ageValidation
    })
)

const updvalidation = Joi.array().items(
    Joi.object({
        employee_name: nameValidation,
        employee_salary: salaryValidation,
        employee_age: ageValidation
    })
)



module.exports = {idValidation,nameValidation,salaryValidation,ageValidation,empValidation,updvalidation};