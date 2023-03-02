/* Tạo lớp cha Person và 3 lớp con gồm: Student, Employ, Customer */

export class Person {
    constructor(id, category, fullName, address, email) {
        this.id = id
        this.category = category;
        this.fullName = fullName;
        this.address = address;
        this.email = email;
    }
}

export class Student extends Person {
    constructor(id, category, fullName, address, email, math, physics, chemistry) {
        super(id, category, fullName, address, email);
        this.math = Number(math);
        this.physics = Number(physics);
        this.chemistry = Number(chemistry);
    }

    averageGrade() {
        let grade = (this.math + this.physics + this.chemistry) / 3;
        return grade.toFixed(2);
    }
}

export class Employee extends Person {
    constructor(id, category, fullName, address, email, days, baseSalary) {
        super(id, category, fullName, address, email);
        this.days = Number(days);
        this.baseSalary = Number(baseSalary);
    }

    totalSalary() {
        let salary = this.days * this.baseSalary;
        return salary.toLocaleString();
    }
}

export class Customer extends Person {
    constructor(id, category, fullName, address, email, company, invoice, comment) {
        super(id, category, fullName, address, email);
        this.company = company;
        this.invoice = Number(invoice).toLocaleString();
        this.comment = comment;
    }
}