import { apiUrl } from "../main_original.js";

export function acessarStaff(idAnime) {
    const secAniStaff = document.querySelector('.listar-staff');
    secAniStaff.innerHTML = " ";


    fetch(`${apiUrl}/${idAnime}/staff?sort=id&page[limit]=4`)
        .then(response => response.json())
        .then(staff => {
            console.log(staff)
            if (Array.isArray(staff.data)) {
                staff.data.forEach((staff) => {
                    const staffRoles = staff.attributes.role;
                    fetch(`https://kitsu.io/api/edge/media-staff/${staff.id}/person`)
                    .then(response => response.json())
                    .then(staffPerson => {
                        console.log(staffPerson.data.attributes);
                        const divStaff = document.createElement('div');
                        const nameStaff = document.createElement('h4');
                        const roleStaff = document.createElement('span');
                        nameStaff.textContent = staffPerson.data.attributes.name;
                        roleStaff.textContent = staffRoles;

                        divStaff.appendChild(nameStaff);
                        divStaff.appendChild(roleStaff);
                        secAniStaff.appendChild(divStaff);
                    })
                })
            }
        })
} 