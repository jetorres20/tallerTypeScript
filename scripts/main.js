import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var infoNombre = document.getElementById("nombre");
var infoCodigo = document.getElementById("cod");
var infoCedula = document.getElementById("ced");
var infoEdad = document.getElementById("edad");
var infoDir = document.getElementById("dir");
var infoTel = document.getElementById("tel");
var min = document.getElementById("min");
var max = document.getElementById("max");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditos.onclick = function () { return applyFilterByCredits(); };
renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando informacion');
    infoNombre.innerText = student.nombre;
    infoCodigo.insertAdjacentHTML('afterend', "<td>" + student.codigo + "</td>");
    infoCedula.insertAdjacentHTML('afterend', "<td>" + student.cedula + "</td>");
    infoEdad.insertAdjacentHTML('afterend', "<td>" + student.edad + "</td>");
    infoDir.insertAdjacentHTML('afterend', "<td>" + student.direccion + "</td>");
    infoTel.insertAdjacentHTML('afterend', "<td>" + student.telefono + "</td>");
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    clearCoursesInTable();
    var cursos = searchCoursesByCredits(+max.value, +min.value, dataCourses);
    renderCoursesInTable(cursos);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCoursesByCredits(max, min, courses) {
    return courses.filter(function (course) { return course.credits <= max && course.credits >= min; });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
