



















/* HELPERS */
function getEle(selector){
    return document.querySelector(selector);
}

/* DOM */
getEle("#btnAll").addEventListener("click", () => {
    getEle("#math").classList.add("d-none");
    getEle("#physics").classList.add("d-none");
    getEle("#chemistry").classList.add("d-none");
    getEle("#averageGrade").classList.add("d-none");
    getEle("#workingDays").classList.add("d-none");
    getEle("#totalWage").classList.add("d-none");
    getEle("#companyName").classList.add("d-none");
    getEle("#bill").classList.add("d-none");
    getEle("#comment").classList.add("d-none");
});

getEle("#btnStudent").addEventListener("click", () => {
    getEle("#math").classList.remove("d-none");
    getEle("#physics").classList.remove("d-none");
    getEle("#chemistry").classList.remove("d-none");
    getEle("#averageGrade").classList.remove("d-none");
    getEle("#workingDays").classList.add("d-none");
    getEle("#totalWage").classList.add("d-none");
    getEle("#companyName").classList.add("d-none");
    getEle("#bill").classList.add("d-none");
    getEle("#comment").classList.add("d-none");
});

getEle("#btnEmployee").addEventListener("click", () => {
    getEle("#math").classList.add("d-none");
    getEle("#physics").classList.add("d-none");
    getEle("#chemistry").classList.add("d-none");
    getEle("#averageGrade").classList.add("d-none");
    getEle("#workingDays").classList.remove("d-none");
    getEle("#totalWage").classList.remove("d-none");
    getEle("#companyName").classList.add("d-none");
    getEle("#bill").classList.add("d-none");
    getEle("#comment").classList.add("d-none");
});

getEle("#btnCustomer").addEventListener("click", () => {
    getEle("#math").classList.add("d-none");
    getEle("#physics").classList.add("d-none");
    getEle("#chemistry").classList.add("d-none");
    getEle("#averageGrade").classList.add("d-none");
    getEle("#workingDays").classList.add("d-none");
    getEle("#totalWage").classList.add("d-none");
    getEle("#companyName").classList.remove("d-none");
    getEle("#bill").classList.remove("d-none");
    getEle("#comment").classList.remove("d-none");
});