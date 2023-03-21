// Input validation
import getEle from "./helpers.js";

const VALID_STRING = "Thông tin không hợp lệ";
const NUMBER_ONLY_STRING = "Chỉ được phép nhập số ở đây";
const NUMBER_FORMAT = /^[0-9]*$/;  // numbers only
const CHARACTER_FORMAT = /^[a-zA-Z ]*$/;  // alphabet & spaces only

function validatePerson() {
    let isValid = true;

    // kiểm tra loại người dùng
    let category = getEle("#categoryForm").selectedIndex;
    if (category === 0) {
        isValid = false;
        getEle("#notiCategoryForm").innerHTML = "Vui lòng chọn loại người dùng";
    }
    else {
        getEle("#notiCategoryForm").innerHTML = '';
    }

    // kiểm tra họ tên
    let fullName = getEle("#fullName").value;
    if (!fullName) {
        isValid = false;
        getEle("#notiFullName").innerHTML = VALID_STRING;
    }
    else if (!fullName.match(CHARACTER_FORMAT)) {
        isValid = false;
        getEle("#notiFullName").innerHTML = VALID_STRING;
    }
    else {
        getEle("#notiFullName").innerHTML = '';
    }

    // kiểm tra email
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = getEle("#email").value;
    if (!email) {
        isValid = false;
        getEle("#notiEmail").innerHTML = VALID_STRING;
    }
    else if (!email.match(mailFormat)) {
        isValid = false;
        getEle("#notiEmail").innerHTML = 'Email không hợp lệ';
    }
    else {
        getEle("#notiEmail").innerHTML = '';
    }

    // kiểm tra địa chỉ
    let address = getEle("#address").value;
    if (!address) {
        isValid = false;
        getEle("#notiAddres").innerHTML = VALID_STRING;
    }
    else {
        getEle("#notiAddres").innerHTML = '';
    }

    return isValid;
}

function validateStudent() {
    let isValid = true;
    const GRADE_RANGE = "Điểm phải nằm trong phạm vi từ 0 ~ 10";

    // kiểm tra điểm toán
    let math = getEle("#math").value;
    if (!math) {
        isValid = false;
        getEle("#notiMath").innerHTML = VALID_STRING;
    }
    // else if (!math.match(NUMBER_FORMAT)) {
    //     isValid = false;
    //     getEle("#notiMath").innerHTML = NUMBER_ONLY_STRING;
    // }
    else if (Number(math) > 10 || Number(math) < 0) {
        isValid = false;
        getEle("#notiMath").innerHTML = GRADE_RANGE;
    }
    else {
        getEle("#notiMath").innerHTML = '';
    }

    // kiểm tra điểm lý
    let physics = getEle("#physics").value;
    if (!physics) {
        isValid = false;
        getEle("#notiPhysics").innerHTML = VALID_STRING;
    }
    // else if (!physics.match(NUMBER_FORMAT)) {
    //     isValid = false;
    //     getEle("#notiPhysics").innerHTML = NUMBER_ONLY_STRING;
    // }
    else if (Number(physics) > 10 || Number(physics) < 0) {
        isValid = false;
        getEle("#notiPhysics").innerHTML = GRADE_RANGE;
    }
    else {
        getEle("#notiPhysics").innerHTML = '';
    }

    // kiểm tra điểm hóa
    let chemistry = getEle("#chemistry").value;
    if (!chemistry) {
        isValid = false;
        getEle("#notiChemistry").innerHTML = VALID_STRING;
    }
    // else if (!chemistry.match(NUMBER_FORMAT)) {
    //     isValid = false;
    //     getEle("#notiChemistry").innerHTML = NUMBER_ONLY_STRING;
    // }
    else if (Number(chemistry) > 10 || Number(chemistry) < 0) {
        isValid = false;
        getEle("#notiChemistry").innerHTML = GRADE_RANGE;
    }
    else {
        getEle("#notiChemistry").innerHTML = '';
    }

    return isValid;
}

function validateEmployee() {
    let isValid = true;

    // kiểm tra số ngày làm việc
    let days = getEle('#days').value;

    if (!days) {
        isValid = false;
        getEle('#notiDays').innerHTML = VALID_STRING;
    }
    else {
        getEle('#notiDays').innerHTML = '';
    }

    // kiểm tra lương ngày
    let baseSalary = getEle('#baseSalary').value;

    if (!baseSalary.trim()) {
        isValid = false;
        getEle('#notiBaseSalary').innerHTML = VALID_STRING;
    }
    else if (!baseSalary.match(NUMBER_FORMAT)) {
        isValid = false;
        getEle('#notiBaseSalary').innerHTML = NUMBER_ONLY_STRING;
    }
    else {
        getEle('#notiBaseSalary').innerHTML = '';
    }

    return isValid;
}

function validateCustomer() {
    let isValid = true;

    // kiểm tra tên công ty
    let company = getEle('#company').value;

    if (!company) {
        isValid = false;
        getEle('#notiCompany').innerHTML = VALID_STRING;
    }
    else {
        getEle('#notiCompany').innerHTML = '';
    }

    // kiểm tra trị giá hóa đơn
    let invoice = getEle('#invoice').value;

    if (!invoice.trim()) {
        isValid = false;
        getEle('#notiInvoice').innerHTML = VALID_STRING;
    }
    else if (!invoice.match(NUMBER_FORMAT)) {
        isValid = false;
        getEle('#notiInvoice').innerHTML = NUMBER_ONLY_STRING;
    }
    else {
        getEle('#notiInvoice').innerHTML = '';
    }

    // kiểm tra đánh giá
    let comment = getEle('#comment').value;

    if (!comment) {
        isValid = false;
        getEle('#notiComment').innerHTML = VALID_STRING;
    }
    else {
        getEle('#notiComment').innerHTML = '';
    }

    return isValid;
}

export { validatePerson, validateStudent, validateEmployee, validateCustomer };