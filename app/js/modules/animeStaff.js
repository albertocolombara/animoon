import { apiUrl } from "../main.js";

const secAniStaff = document.querySelector('.anime__info-staff');
const listaStaff = document.querySelector('.listar-staff');

export function acessarStaff(idAnime) {
    secAniStaff.style.display = "initial";
    listaStaff.innerHTML = "";
    secAniStaff.innerHTML = "";

    const staffHeading = document.createElement('h3');
    staffHeading.innerText = "Staff";
    secAniStaff.appendChild(staffHeading);

    fetch(`${apiUrl}/${idAnime}/staff?sort=id&page[limit]=4`)
        .then(response => response.json())
        .then(staff => {
            if (staff.data.length > 0) {
                if (Array.isArray(staff.data)) {
                    staff.data.forEach((staff) => {
                        const staffRoles = staff.attributes.role;
                        fetch(`https://kitsu.io/api/edge/media-staff/${staff.id}/person`)
                        .then(response => response.json())
                        .then(staffPerson => {
                            const divStaff = document.createElement('div');
                            const nameStaff = document.createElement('h4');
                            const roleStaff = document.createElement('span');
    
                            nameStaff.textContent = staffPerson.data.attributes.name;
                            roleStaff.textContent = staffRoles;
                            divStaff.classList.add('listar-staff-item');

                            divStaff.appendChild(nameStaff);
                            divStaff.appendChild(roleStaff);
                            listaStaff.appendChild(divStaff);
                            secAniStaff.appendChild(listaStaff);
                        })
                    })
                }
            } else {
                const semStaff = document.createElement('span');
                semStaff.textContent = "Membros da Staff não encontrados :(";
                semStaff.style.color = "color: #e2e4ffea;"
                semStaff.style.fontSize = "12px";
                secAniStaff.appendChild(semStaff);
            } 

        })
} 