const allpath = require('../path')
const fs = require('fs')
const util = require('util')
const Joi = require('joi')
const validations = require('../validation/validation')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


const User=[
    {
    method: 'GET',
    path: allpath.users,
    handler: async (request, h) => {
        const empDetails = await readFile('./users.json' , 'utf8')
        return h.response(JSON.parse(empDetails))
    }
},
{
    method: 'POST',
    path: allpath.addUser,
    config:{
        validate:{
            payload: validations.empValidation,
            options:{
                abortEarly: false
      }
    } },

    handler: async (request, h ) => {
        const empDetail = request.payload;
        let empDetails = await readFile('./users.json', 'utf8')
        empDetails = JSON.parse(empDetails)
        empDetails.push(empDetail)
        await writeFile ('./users.json', JSON.stringify(empDetails, null), 'utf8')
        return h.response(empDetails)
   }

},
    {
        method: 'PUT',
        path: allpath.updateUser + '/{id}',
        config:{
            validate:{
                payload: validations.updvalidation,
                options:{
                    abortEarly: false
          }
        } },
        handler: async (request, h ) =>{
            const  updusers = request.payload
            const id = request.params.id
            let empDetails = await readFile('./users.json', 'utf8')
            empDetails = JSON.parse(empDetails)
            empDetails.forEach((empDetail) => {
                if(empDetail == id) {
                    empDetail.employee_name = updusers.employee_name
                    empDetail.employee_salary = updusers.employee_salary
                    empDetail.employee_age = updusers.employee_age
                }
            })
            await writeFile ('./users.json', JSON.stringify(empDetails, null), 'utf8')
            return h.response(empDetails)
    
        }
    
    },
    {
        method: 'DELETE',
        path : allpath.deleteUser + '/{id}',
        handler: async (request, h) => {
            const  updusers = request.payload
            const id = request.params.id
            let empDetails = await readFile('./users.json', 'utf8')
            empDetails = JSON.parse(empDetails)
            empDetails = empDetails.filter(empDetail => empDetail.id != id)
            await writeFile ('./users.json', JSON.stringify(empDetails, null), 'utf8')
            return h.response(empDetails)
        }
        },

]

module.exports = User;