import getEle from "./helpers.js";
import { Person, Student, Employee, Customer } from "./Person.js";
import { getPersonAPI, deletePersonAPI, createPersonAPI, getPersonAPIByID, updatePersonAPI } from "./personAPI.js";
import { alertFail, alertSuccess, warningDelete } from "./sweetAlert.js";
import { validateCustomer, validateEmployee, validatePerson, validateStudent } from "./validation.js";

// Hiển thị danh sách tất cả user
getPerson();


// Thêm mới user vào server
getEle("#btnAdd").addEventListener("click", () => {
    const person = {
        category: getEle("#categoryForm").value,
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

    let categoryForm = getEle("#categoryForm").value;
    let isValidPerson = validatePerson();
    let isValidStudent = validateStudent();
    let isValidEmployee = validateEmployee();
    let isValidCustomer = validateCustomer();

    if (!isValidPerson) return;

    switch (categoryForm) {
        case "Học sinh":
            try {
                if (!isValidStudent) return; 
                createPersonAPI(student);
                alertSuccess("Thêm dữ liệu học sinh thành công");
            } catch (error) {
                console.log(error);
                alertFail("Thêm dữ liệu học sinh thất bại");
            }
            break;
        case "Nhân viên":
            try {
                if (!isValidEmployee) return;
                createPersonAPI(employee);
                alertSuccess("Thêm dữ liệu nhân viên thành công");
            } catch (error) {
                console.log(error);
                alertFail("Thêm dữ liệu nhân viên thất bại");
            }
            break;
        case "Khách hàng":
            try {
                if (!isValidCustomer) return;
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

    resetForm("#personForm");
})


// Hiển thị chi tiết 1 người dùng bất kì lên form
window.selectPerson = async function selectPerson(personID) {
    getEle("#btnAdd").style.display = "none";
    getEle("#btnUpdate").style.display = "inline-block";

    try {
        const { data: person } = await getPersonAPIByID(personID);
        console.log(person);

        let type = person.category;
        switch (type) {
            case "Học sinh": // loại người dùng là học sinh
                getEle("#categoryForm").value = type;
                getEle("#fullName").value = person.fullName;
                getEle("#email").value = person.email;
                getEle("#address").value = person.address;
                getEle("#math").value = person.math;
                getEle("#physics").value = person.physics;
                getEle("#chemistry").value = person.chemistry;
                displayStudentForm();
                break;
            case "Nhân viên": // loại người dùng là nhân viên
                getEle("#categoryForm").value = type;
                getEle("#fullName").value = person.fullName;
                getEle("#email").value = person.email;
                getEle("#address").value = person.address;
                getEle("#days").value = person.days;
                getEle("#baseSalary").value = person.baseSalary;
                displayEmployeeForm();
                break;
            case "Khách hàng": // loại người dùng là khách hàng
                getEle("#categoryForm").value = type;
                getEle("#fullName").value = person.fullName;
                getEle("#email").value = person.email;
                getEle("#address").value = person.address;
                getEle("#company").value = person.company;
                getEle("#invoice").value = person.invoice;
                getEle("#comment").value = person.comment;
                displayCustomerForm();
                break;
        }

        getEle("#btnUpdate").setAttribute("onclick", `window.updatePerson(${person.id})`);
    } catch (error) {
        console.log(error);
        alertFail("Lấy dữ liệu bằng ID thất bại")
    }
}


// Lắng nghe sự kiện của các button con (Sửa) trong table cha (academyTable)
getEle("#academyTable").addEventListener("click", event => {
    console.log(event.target);
    // Kiểm tra element vừa phát sinh ra sự kiện có thuộc tính data-id hay không. Nếu có thì lấy ra giá trị của thuộc tính đó
    const id = event.target.getAttribute("data-id");
    console.log(id);
    // Sau khi có id gọi tới hàm selectPerson
    if (!id) return;
    selectPerson(id);
})


// Cập nhật thông tin user
window.updatePerson = function updatePerson(personID) {
    const person = {
        category: getEle("#categoryForm").value,
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

    let categoryForm = getEle("#categoryForm").value;
    switch (categoryForm) {
        case "Học sinh":
            try {
                updatePersonAPI(personID, student);
                alertSuccess("Cập nhật dữ liệu học sinh thành công");
            } catch (error) {
                console.log(error);
                alertFail("Cập nhật dữ liệu học sinh thất bại");
            }
            break;
        case "Nhân viên":
            try {
                updatePersonAPI(personID, employee);
                alertSuccess("Cập nhật dữ liệu nhân viên thành công");
            } catch (error) {
                console.log(error);
                alertFail("Cập nhật dữ liệu nhân viên thất bại");
            }
            break;
        case "Khách hàng":
            try {
                updatePersonAPI(personID, customer);
                alertSuccess("Cập nhật dữ liệu khách hàng thành công");
            } catch (error) {
                console.log(error);
                alertFail("Cập nhật dữ liệu khách hàng thất bại");
            }
            break;
        default:
            try {
                updatePersonAPI(personID, person);
                alertSuccess("Cập nhật dữ liệu người dùng thành công");
            } catch (error) {
                console.log(error);
                alertFail("Phải điền đầy đủ thông tin người dùng");
            }
            break;
    }

    resetForm("#personForm");
}


// Lấy data của tất cả user từ server
async function getPerson(value) {
    try {
        const response = await getPersonAPI(value);
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
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${person.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
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
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${student.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
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
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${employee.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
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
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${customer.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteCustomer(${customer.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#userList").innerHTML = html;
}


/* DOM */
getEle("#categoryTable").addEventListener("change", () => {
    let categoryTable = getEle("#categoryTable").value;
    switch (categoryTable) {
        case "student":
            getStudent();
            displayStudentTable();
            break;
        case "employee":
            displayEmployeeTable();
            getEmployee();
            break;
        case "customer":
            displayCustomerTable();
            getCustomer();
            break;
        default:
            displayPersonTable();
            getPerson();
            break;
    }
});

getEle("#categoryForm").addEventListener("change", () => {
    let categoryForm = getEle("#categoryForm").value;
    switch (categoryForm) {
        case "Học sinh":
            displayStudentForm();
            break;
        case "Nhân viên":
            displayEmployeeForm();
            break;
        case "Khách hàng":
            displayCustomerForm();
            break;
        default:
            displayPersonForm();
            break;
    }
});

getEle("#btnOpenModal").addEventListener("click", () => {
    getEle("#btnUpdate").style.display = "none";
    getEle("#btnAdd").style.display = "inline-block";
})

getEle("#btnClose").addEventListener("click", () => {
    resetForm("#personForm");
    displayPersonForm();
})


function displayPersonTable() {
    getEle("#thMath").classList.add("d-none");
    getEle("#thPhysics").classList.add("d-none");
    getEle("#thChemistry").classList.add("d-none");
    getEle("#thAverageGrade").classList.add("d-none");
    getEle("#thTotalSalary").classList.add("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayStudentTable() {
    getEle("#thMath").classList.remove("d-none");
    getEle("#thPhysics").classList.remove("d-none");
    getEle("#thChemistry").classList.remove("d-none");
    getEle("#thAverageGrade").classList.remove("d-none");
    getEle("#thTotalSalary").classList.add("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayEmployeeTable() {
    getEle("#thMath").classList.add("d-none");
    getEle("#thPhysics").classList.add("d-none");
    getEle("#thChemistry").classList.add("d-none");
    getEle("#thAverageGrade").classList.add("d-none");
    getEle("#thTotalSalary").classList.remove("d-none");
    getEle("#thCompany").classList.add("d-none");
    getEle("#thInvoice").classList.add("d-none");
    getEle("#thComment").classList.add("d-none");
}

function displayCustomerTable() {
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

function displayPersonForm() {
    getEle(".student-info").classList.add("d-none");
    getEle(".employee-info").classList.add("d-none");
    getEle(".company-info").classList.add("d-none");
}

function displayStudentForm() {
    getEle(".student-info").classList.remove("d-none");
    getEle(".employee-info").classList.add("d-none");
    getEle(".company-info").classList.add("d-none");
}

function displayEmployeeForm() {
    getEle(".student-info").classList.add("d-none");
    getEle(".employee-info").classList.remove("d-none");
    getEle(".company-info").classList.add("d-none");
}

function displayCustomerForm() {
    getEle(".student-info").classList.add("d-none");
    getEle(".employee-info").classList.add("d-none");
    getEle(".company-info").classList.remove("d-none");
}