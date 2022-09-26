'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const isSet = require("isset");
const firestore = firebase.firestore();


const addStudent = async (req, res, next) => {
    try {
        var firstname = req.body.firstName
    var alfa = /^[a-zA-Z()]+$/
    var lastname = req.body.lastName
    var age = req.body.age
    var stemp = /^[0-9]*\.?[0-9]*$/

    if(!isSet(firstname)){
        res.send({data: "pls enter firstname",status: false,responsecode: 0})
        return;
    }
    if( firstname == ' ' ||  !firstname.match(alfa)  ){
        res.send({data: "pls enter valid firstname",status: false,responsecode: 0})
        return;
    }
   
    if(!isSet(lastname)){
        res.end(JSON.stringify({data: "pls enter lastname",status: false,responsecode: 0}))
        return;
    }
    if( lastname == ' ' ||  !lastname.match(alfa))
    {
        res.send(JSON.stringify({data: "pls enter valid lastname",status: false,responsecode: 0}))
        return;
    }
    if(!isSet(age)){
        res.send(JSON.stringify({data: "pls enter age ",status: false,responsecode: 0}))
        return
    }
    if(age>100 || age == ' ' ||  !age.match(stemp))
    {
        res.send(JSON.stringify({data: "pls enter valid age",status: false,responsecode: 0}))
        return;
    }
    const phone_no = req.body.phoneNumber
    var temp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if (!isSet(phone_no)) {
        res.send({ "message": "pls enter phoneNumber", status: false, responsecode: 0 })
    }
    if (phone_no == ' ' || !phone_no.match(temp)) {
            res.send({ "message": "pls enter valid phoneNumber", status: false, responsecode: 0 })
            return;
    }

        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send({ status: true, responsecode: 1, "message": "data successfully inserted.", data: req.body });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send({status: false, responsecode: 0,"msg":'No student record found'});
        }else {
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().class,
                    doc.data().age,
                    doc.data().phoneNumber
                );
                studentsArray.push(student);
            });
            res.send({ status: true, responsecode: 1, "message": "data successfully show.", data:studentsArray});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send({ status: true, responsecode: 1, "message": "data successfully show.", data:data.data()})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;

        // var firstname = req.body.firstname
        // var alfa = /^[a-zA-Z()]+$/
        // var lastname = req.body.lastname
        // var age = req.body.age
        // var stemp = /^[0-9]*\.?[0-9]*$/

        var firstname = req.body.firstName
    var alfa = /^[a-zA-Z()]+$/
    var lastname = req.body.lastName
    var age = req.body.age
    var stemp = /^[0-9]*\.?[0-9]*$/
    
        if(!isSet(firstname)){
            res.send({data: "pls enter firstname",status: false,responsecode: 0})
            return;
        }
        if( firstname == ' ' ||  !firstname.match(alfa)  ){
            res.send({data: "pls enter valid firstname",status: false,responsecode: 0})
            return;
        }
       
        if(!isSet(lastname)){
            res.end(JSON.stringify({data: "pls enter lastname",status: false,responsecode: 0}))
            return;
        }
        if( lastname == ' ' ||  !lastname.match(alfa))
        {
            res.send(JSON.stringify({data: "pls enter valid lastname",status: false,responsecode: 0}))
            return;
        }
        if(!isSet(age)){
            res.send(JSON.stringify({data: "pls enter salary ",status: false,responsecode: 0}))
            return
        }
        if(age>100 || age == ' ' ||  !age.match(stemp))
        {
            res.send(JSON.stringify({data: "pls enter valid salary",status: false,responsecode: 0}))
            return;
        }
        const phone_no = req.body.phoneNumber
        var temp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        if (!isSet(phone_no)) {
            res.send({ "message": "pls enter phoneNumber", status: false, responsecode: 0 })
        }
        if (phone_no == ' ' || !phone_no.match(temp)) {
                res.send({ "message": "pls enter valid phoneNumber", status: false, responsecode: 0 })
                return;
        }
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send({ status: true, responsecode: 1, "message": 'Student record updated successfuly', data:data})        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        // if( id == ' ' )
        // {
        //     res.send(JSON.stringify({data: "pls enter id",status: false,responsecode: 0}))
        //     return;
        // }
        await firestore.collection('students').doc(id).delete();
        res.send({
            "status": true,
            "responsecode": 1,
            "message": "Workout deleted Successfully."
    });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}