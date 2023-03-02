import { Person, Student, Employee, Customer } from "./Person.js";
import { getPersonAPI } from "./personAPI.js";
import { alertFail, alertSuccess, warningDelete } from "./sweetAlert.js";

getPerson();

async function getPerson(searchVal) {
    try {
        const response = await getPersonAPI(searchVal);
        console.log(response);
        const person = response.data.map(person => {
            return new Person(
                person.recNum,
                person.fullName,
                person.address,
                person.email
            );
        });
        console.log(person);
        renderPerson(person);
    } catch (error) {
        console.log(error);
        alertFail("Lấy dữ liệu người dùng thất bại");
    }
}

async function getStudent() {
    try {
        const response = await getPersonAPI("Học viên");
        console.log(response);
        const student = response.data.map(student => {
            return new Student(
                student.recNum,
                student.fullName,
                student.address,
                student.email,
                student.math,
                student.physics,
                student.chemistry
            );
        });
        console.log(student);
        renderStudent(student);
    } catch (error) {
        console.log(error);
        alertFail("Lấy dữ liệu học viên thất bại");
    }
}

async function getEmployee() {
    try {
        const response = await getPersonAPI("Giảng viên");
        console.log(response);
        const employee = response.data.map(employee => {
            return new Employee(
                employee.recNum,
                employee.fullName,
                employee.address,
                employee.email,
                employee.days,
                employee.baseSalary
            );
        });
        console.log(employee);
        renderEmployee(employee);
    } catch (error) {
        console.log(error);
        alertFail("Lấy dữ liệu giảng viên thất bại");
    }
}

async function getCustomer() {
    try {
        const response = await getPersonAPI("Khách hàng");
        console.log(response);
        const customer = response.data.map(customer => {
            return new Customer(
                customer.recNum,
                customer.fullName,
                customer.address,
                customer.email,
                customer.company,
                customer.invoice,
                customer.comment
            )
        });
        console.log(customer);
        renderCustomer(customer);
    } catch (error) {
        console.log(error);
        alertFail("Lấy dữ liệu khách hàng thất bại");
    }
}


// Hiển thị danh sách chung
function renderPerson(person) {
    let html = person.reduce((result, person) => {
        return (result +
            `
            <tr>
                <td class="text-center">${person.recNum}</td>
                <td class="text-center">${person.fullName}</td>
                <td class="text-center">${person.address}</td>
                <td class="text-center">${person.email}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="selectPerson(${person.recNum})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="deletePerson(${person.recNum})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}

// Hiển thị danh sách học viên
function renderStudent(student) {
    let html = student.reduce((result, student) => {
        return (result +
            `
            <tr>
                <td class="text-center">${student.recNum}</td>
                <td class="text-center">${student.fullName}</td>
                <td class="text-center">${student.address}</td>
                <td class="text-center">${student.email}</td>
                <td class="text-center">${student.math}</td>
                <td class="text-center">${student.physics}</td>
                <td class="text-center">${student.chemistry}</td>
                <td class="text-center">${student.averageGrade()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="selectPerson(${student.recNum})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="deletePerson(${student.recNum})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}

// Hiển thị danh sách giảng viên
function renderEmployee(employee) {
    let html = employee.reduce((result, employee) => {
        return (result +
            `
            <tr>
                <td class="text-center">${employee.recNum}</td>
                <td class="text-center">${employee.fullName}</td>
                <td class="text-center">${employee.address}</td>
                <td class="text-center">${employee.email}</td>
                <td class="text-center">${employee.totalSalary()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="selectPerson(${employee.recNum})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="deletePerson(${employee.recNum})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}

// Hiển thị danh sách khách hàng
function renderCustomer(customer) {
    let html = customer.reduce((result, customer) => {
        return (result +
            `
            <tr>
                <td class="text-center">${customer.recNum}</td>
                <td class="text-center">${customer.fullName}</td>
                <td class="text-center">${customer.address}</td>
                <td class="text-center">${customer.email}</td>
                <td class="text-center">${customer.company}</td>
                <td class="text-center">${customer.invoice}</td>
                <td class="text-center">${customer.comment}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="selectPerson(${customer.recNum})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="deletePerson(${customer.recNum})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}


/* DOM */
getEle("#categoryList").addEventListener("change", () => {
    let categoryList = getEle("#categoryList").value;
    switch (categoryList) {
        case "student":
            displayStudent();
            getStudent();
            break;
        case "employee":
            displayEmployee();
            getEmployee();
            break;
        case "customer":
            displayCustomer();
            getCustomer();
            break;
        default:
            displayPerson();
            getPerson();
            break;
    }
});

getEle("#userType").addEventListener("change", () => {
    let userType = getEle("#userType").value;
    switch (userType) {
        case "student":
            getEle(".student-info").classList.remove("d-none");
            getEle(".employee-info").classList.add("d-none");
            getEle(".company-info").classList.add("d-none");
            break;
        case "employee":
            getEle(".student-info").classList.add("d-none");
            getEle(".employee-info").classList.remove("d-none");
            getEle(".company-info").classList.add("d-none");
            break;
        case "customer":
            getEle(".student-info").classList.add("d-none");
            getEle(".employee-info").classList.add("d-none");
            getEle(".company-info").classList.remove("d-none");
            break;
        default:
            getEle(".student-info").classList.add("d-none");
            getEle(".employee-info").classList.add("d-none");
            getEle(".company-info").classList.add("d-none");
            break;
    }
});

getEle("#btnOpenModal").addEventListener("click", () => {
    getEle("#btnUpdate").style.display = "none";
    getEle("#btnAdd").style.display = "inline-block";
})


/* HELPERS */
function getEle(selector) {
    return document.querySelector(selector);
}

function displayPerson() {
    getEle("#thMath").classList.add("d-none");
    getEle("#thPhysics").classList.add("d-none");
    getEle("#thChemistry").classList.add("d-none");
    getEle("#thAverageGrade").classList.add("d-none");
    getEle("#thTotalSalary").classList.add("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayStudent() {
    getEle("#thMath").classList.remove("d-none");
    getEle("#thPhysics").classList.remove("d-none");
    getEle("#thChemistry").classList.remove("d-none");
    getEle("#thAverageGrade").classList.remove("d-none");
    getEle("#thTotalSalary").classList.add("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayEmployee() {
    getEle("#thMath").classList.add("d-none");
    getEle("#thPhysics").classList.add("d-none");
    getEle("#thChemistry").classList.add("d-none");
    getEle("#thAverageGrade").classList.add("d-none");
    getEle("#thTotalSalary").classList.remove("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayCustomer() {
    getEle("#thMath").classList.add("d-none");
    getEle("#thPhysics").classList.add("d-none");
    getEle("#thChemistry").classList.add("d-none");
    getEle("#thAverageGrade").classList.add("d-none");
    getEle("#thTotalSalary").classList.add("d-none");
    getEle("#thCompany").classList.remove("d-none");
    getEle("#thInvoice").classList.remove("d-none");
    getEle("#thComment").classList.remove("d-none");
}