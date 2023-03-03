import { Person, Student, Employee, Customer } from "./Person.js";
import { getPersonAPI, deletePersonAPI, createPersonAPI } from "./personAPI.js";
import { alertFail, alertSuccess, warningDelete } from "./sweetAlert.js";



// Hiển thị danh sách tất cả user
getPerson();


// Thêm mới user vào server
getEle("#btnAdd").addEventListener("click", () => {
    const person = {
        category: getEle("#userType").value,
        fullName: getEle("#fullName").value,
        email: getEle("#email").value,
        address: getEle("#address").value
    };

    const student = {
        ...person,
        math: getEle("#math").value,
        physics: getEle("#physics").value,
        chemistry: getEle("#chemistry").value
    }

    const employee = {
        ...person,
        days: getEle("#days").value,
        baseSalary: getEle("#baseSalary").value
    }

    const customer = {
        ...person,
        company: getEle("#company").value,
        invoice: getEle("#invoice").value,
        comment: getEle("#comment").value
    }

    let userType = getEle("#userType").value;
    switch (userType) {
        case "Học sinh":
            try {
                createPersonAPI(student);
                alertSuccess("Thêm dữ liệu học sinh thành công");
            } catch (error) {
                console.log(error);
                alertFail("Thêm dữ liệu học sinh thất bại");
            }
            break;
        case "Nhân viên":
            try {
                createPersonAPI(employee);
                alertSuccess("Thêm dữ liệu nhân viên thành công");
            } catch (error) {
                console.log(error);
                alertFail("Thêm dữ liệu nhân viên thất bại");
            }
            break;
        case "Khách hàng":
            try {
                createPersonAPI(customer);
                alertSuccess("Thêm dữ liệu khách hàng thành công");
            } catch (error) {
                console.log(error);
                alertFail("Thêm dữ liệu khách hàng thất bại");
            }
            break;
        default:
            alertFail("Phải điền đầy đủ thông tin người dùng");
            break;
    }
})


// Lấy data của tất cả user từ server
async function getPerson(searchVal) {
    try {
        const response = await getPersonAPI(searchVal);
        console.log(response);
        const person = response.data.map(person => {
            return new Person(
                person.id,
                person.category,
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


// Lấy data của user Học sinh
async function getStudent() {
    try {
        const response = await getPersonAPI("Học sinh");
        console.log(response);
        const student = response.data.map(student => {
            return new Student(
                student.id,
                student.category,
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
        alertFail("Lấy dữ liệu Học sinh thất bại");
    }
}


// Lấy data của user Nhân viên
async function getEmployee() {
    try {
        const response = await getPersonAPI("Nhân viên");
        console.log(response);
        const employee = response.data.map(employee => {
            return new Employee(
                employee.id,
                employee.category,
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
        alertFail("Lấy dữ liệu Nhân viên thất bại");
    }
}


// Lấy data của user khách hàng
async function getCustomer() {
    try {
        const response = await getPersonAPI("Khách hàng");
        console.log(response);
        const customer = response.data.map(customer => {
            return new Customer(
                customer.id,
                customer.category,
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


// Xóa data của 1 user bất kì khỏi server
window.deletePerson = async function deletePerson(personID) {
    try {
        const { isConfirmed: result } = await warningDelete();
        console.log(result);
        if (result) {
            await deletePersonAPI(personID);

            await getPerson();

            alertSuccess("Xóa dữ liệu người dùng thành công");
        }
    } catch (error) {
        console.log(error);
        alertFail("Xóa dữ liệu người dùng thất bại");
    }
}


// Xóa data của user Học sinh
window.deleteStudent = async function deleteStudent(studentID) {
    try {
        const { isConfirmed: result } = await warningDelete();
        console.log(result);
        if (result) {
            await deletePersonAPI(studentID, "Học sinh");

            await getStudent();

            alertSuccess("Xóa dữ liệu học sinh thành công");
        }
    } catch (error) {
        console.log(error);
        alertFail("Xóa dữ liệu học sinh thất bại");
    }
}


// Xóa data của user Nhân viên
window.deleteEmployee = async function deleteEmployee(employeeID) {
    try {
        const { isConfirmed: result } = await warningDelete();
        console.log(result);
        if (result) {
            await deletePersonAPI(employeeID, "Nhân viên");

            await getEmployee();

            alertSuccess("Xóa dữ liệu nhân viên thành công");
        }
    } catch (error) {
        console.log(error);
        alertFail("Xóa dữ liệu nhân viên thất bại");
    }
}


// Xóa data của user khách hàng
window.deleteCustomer = async function deleteCustomer(customerID) {
    try {
        const { isConfirmed: result } = await warningDelete();
        console.log(result);
        if (result) {
            await deletePersonAPI(customerID, "Khách hàng");

            await getCustomer();

            alertSuccess("Xóa dữ liệu khách hàng thành công");
        }
    } catch (error) {
        console.log(error);
        alertFail("Xóa dữ liệu khách hàng thất bại");
    }
}



// Hiển thị danh sách chung
function renderPerson(person) {
    let html = person.reduce((result, person) => {
        return (result +
            `
            <tr>
                <td class="text-center">${person.id}</td>
                <td class="text-center">${person.category}</td>
                <td class="text-center">${person.fullName}</td>
                <td class="text-center">${person.address}</td>
                <td class="text-center">${person.email}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="window.selectPerson(${person.id})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deletePerson(${person.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}

// Hiển thị danh sách Học sinh
function renderStudent(student) {
    let html = student.reduce((result, student) => {
        return (result +
            `
            <tr>
                <td class="text-center">${student.id}</td>
                <td class="text-center">${student.category}</td>
                <td class="text-center">${student.fullName}</td>
                <td class="text-center">${student.address}</td>
                <td class="text-center">${student.email}</td>
                <td class="text-center">${student.math}</td>
                <td class="text-center">${student.physics}</td>
                <td class="text-center">${student.chemistry}</td>
                <td class="text-center">${student.averageGrade()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="window.selectPerson(${student.id})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteStudent(${student.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}

// Hiển thị danh sách Nhân viên
function renderEmployee(employee) {
    let html = employee.reduce((result, employee) => {
        return (result +
            `
            <tr>
                <td class="text-center">${employee.id}</td>
                <td class="text-center">${employee.category}</td>
                <td class="text-center">${employee.fullName}</td>
                <td class="text-center">${employee.address}</td>
                <td class="text-center">${employee.email}</td>
                <td class="text-center">${employee.totalSalary()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="window.selectPerson(${employee.id})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteEmployee(${employee.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
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
                <td class="text-center">${customer.id}</td>
                <td class="text-center">${customer.category}</td>
                <td class="text-center">${customer.fullName}</td>
                <td class="text-center">${customer.address}</td>
                <td class="text-center">${customer.email}</td>
                <td class="text-center">${customer.company}</td>
                <td class="text-center">${customer.invoice}</td>
                <td class="text-center">${customer.comment}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" onclick="window.selectPerson(${customer.id})">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteCustomer(${customer.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}


/* DOM */
getEle("#categoryList").addEventListener("change", (event) => {
    console.log(event);
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
        case "Học sinh":
            getEle(".student-info").classList.remove("d-none");
            getEle(".employee-info").classList.add("d-none");
            getEle(".company-info").classList.add("d-none");
            break;
        case "Nhân viên":
            getEle(".student-info").classList.add("d-none");
            getEle(".employee-info").classList.remove("d-none");
            getEle(".company-info").classList.add("d-none");
            break;
        case "Khách hàng":
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

getEle("#btnClose").addEventListener("click", () => {
    resetForm("#personForm");
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

function resetForm(formID) {
    getEle(formID).reset();
    getEle("#notiFullName").innerHTML = '';
    getEle("#notiEmail").innerHTML = '';
    getEle("#notiAddres").innerHTML = '';
    getEle("#notiMath").innerHTML = '';
    getEle("#notiPhysics").innerHTML = '';
    getEle("#notiChemistry").innerHTML = '';
    getEle("#notiDays").innerHTML = '';
    getEle("#notiBaseSalary").innerHTML = '';
    getEle("#notiCompany").innerHTML = '';
    getEle("#notiInvoice").innerHTML = '';
    getEle("#notiComment").innerHTML = '';
}