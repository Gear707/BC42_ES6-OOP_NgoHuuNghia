/* Tạo lớp cha Person và 3 lớp con gồm: Student, Employ, Customer */

export class Person {
    constructor(recNum, fullName, address, email) {
        this.recNum = recNum;
        this.fullName = fullName;
        this.address = address;
        this.email = email;
    }
}

export class Student extends Person {
    constructor(recNum, fullName, address, email, math, physics, chemistry) {
        super(recNum, fullName, address, email);
        this.math = Number(math);
        this.physics = Number(physics);
        this.chemistry = Number(chemistry);
    }

    averageGrade() {
        let grade = (this.math + this.physics + this.chemistry) / 3;
        console.log(grade);
        return grade.toFixed(2);
    }
}

export class Employee extends Person {
    constructor(recNum, fullName, address, email, days, baseSalary) {
        super(recNum, fullName, address, email);
        this.days = Number(days);
        this.baseSalary = Number(baseSalary);
    }

    totalSalary() {
        let salary = this.days * this.baseSalary;
        return salary.toLocaleString();
    }
}

export class Customer extends Person {
    constructor(recNum, fullName, address, email, company, invoice, comment) {
        super(recNum, fullName, address, email);
        this.company = company;
        this.invoice = Number(invoice).toLocaleString();
        this.comment = comment;
    }
}