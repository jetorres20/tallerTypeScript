import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import {dataStudent} from './dataStudent.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let infoNombre: HTMLElement = document.getElementById("nombre")!;
let infoCodigo: HTMLElement = document.getElementById("cod")!;
let infoCedula: HTMLElement = document.getElementById("ced")!;
let infoEdad: HTMLElement = document.getElementById("edad")!;
let infoDir: HTMLElement = document.getElementById("dir")!;
let infoTel: HTMLElement = document.getElementById("tel")!;
const min: HTMLInputElement = <HTMLInputElement>document.getElementById("min")!;
const max: HTMLInputElement = <HTMLInputElement>document.getElementById("max")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditos.onclick = () => applyFilterByCredits();
renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentInTable(student: Student): void {
    console.log('Desplegando informacion');
    infoNombre.innerText = student.nombre;
    infoCodigo.insertAdjacentHTML('afterend', `<td>${student.codigo}</td>`);
    infoCedula.insertAdjacentHTML('afterend', `<td>${student.cedula}</td>`);
    infoEdad.insertAdjacentHTML('afterend', `<td>${student.edad}</td>`);
    infoDir.insertAdjacentHTML('afterend', `<td>${student.direccion}</td>`);
    infoTel.insertAdjacentHTML('afterend', `<td>${student.telefono}</td>`);

}

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits(){
    clearCoursesInTable();
    let cursos : Course[] = searchCoursesByCredits(+max.value,+min.value,dataCourses);
    renderCoursesInTable(cursos);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCoursesByCredits(max:number, min:number, courses : Course[]){
    return courses.filter(course => course.credits<=max && course.credits >=min);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}