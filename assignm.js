let express = require("express");
let bodyparser = require("body-parser");
let app = express();
app.use(bodyparser.json()); 
let employees=[];
let emp1={id:101,name:"Vikram",age:26,salary:24000,desg:"Developer"};
let emp2={id:100,name:"Lita",age:27,salary:28000,desg:"ITofficer"};
let emp3={id:102,name:"Neetu",age:28,salary:34000,desg:"Inspector"};
employees.push(emp1);
employees.push(emp2);
employees.push(emp3);

app.get("/",(request,response)=>{
response.send("Welcome to Employee rest api with get method");
})


//http://localhost:3000/getEmployees
app.get("/getEmployees", (request, response) => {
    
        response.json(employees);
    })


//http://localhost:3000/searchEmployeeByQueryparam?id=101
app.get("/searchEmployeeByQueryparam", (request, response) => {
    let eid = request.query.id;
    let result = employees.find(c => c.id == eid);
    if (result != undefined) {
        response.json(result);
    }
    else {
        response.send("record not found");
    }
})

//search employee using path param
//http://localhost:3000/searchEmployeeByPathparam/101
app.get("/SearchEmployeeByPathParam/:id", (request, response) => {
    let cid = request.params.id;
    let result = employees.find(c => c.id == cid);
    if (result != undefined) {
        response.json(result);
    }
    else {
        response.send("record not found");
    }
})

//create or store employees details in array
//http://localhost:3000/storeEmployee
app.post("/storeEmployee",(request,response)=>{
let employee =request.body;

let result=employees.find(c=>c.id==employee.id);
if(result==undefined)
{employees.push(employee); //added in employees array
    response.send("employee details stored susccessfully");
}
else{
    response.send("Record didn't stored,employee id must be unique");
}
})

//update age
//http://localhost:3000/updateEmployeeAge
app.patch("/updateEmployeeAge",(request,response)=>{
    let employee=request.body;
    let index=employees.findIndex(c=>c.id==employee.id);
    if(index<0){
    response.send("No employee present with id as "+employee.id);
    }
    else{
        employees[index].age=employee.age;
        response.send("age updated");
    }
})

//update name
//http://localhost:3000/updateEmployeeName
app.patch("/updateEmployeeName",(request,response)=>{
    let Employee=request.body;
    let index=employees.findIndex(c=>c.id==Employee.id);
    if(index<0){
    response.send("No employee present with id as "+Employee.id);
    }
    else{
        employees[index].name=Employee.name;
        response.send("name updated");
    }
})

//update name and age
//http://localhost:3000/updateEmployee
app.put("/updateEmployee",(request,response)=>{
    let Emp=request.body;
    let index=employees.findIndex(c=>c.id==Emp.id);
    if(index<0){
    response.send("No employee present with id as "+Emp.id);
    }
    else{
        employees[index].name=Emp.name;
        employees[index].age=Emp.age;
        response.send("name and age updated");
    }
})
//http://localhost:3000/deleteEmployeebyid/100
app.delete("/deleteEmployeebyid/:id",(request,response)=>{
    let eid=request.params.id;
    let index=employees.findIndex(c=>c.id==eid);
    if(index<0){
    response.send("No employee present with id as "+eid);
    }
    else{
        employees.splice(index,1);
        response.send("employees details updated");
    }
})
app.listen(3000,()=>console.log("Server is running on port number 30000"));