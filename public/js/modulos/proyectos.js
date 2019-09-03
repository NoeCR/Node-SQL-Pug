import Swal from 'sweetalert2';
import axios from 'axios';


const btnEliminar = document.querySelector('#eliminar-proyecto');
if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // Enviar petición con axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: { urlProyecto } })
                    .then((res) => {
                        console.log(res);
                        Swal.fire(
                            'Deleted!',
                            res.data,
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    })
                    .catch(err => {
                        Swal.fire({
                            type: 'error',
                            title: err,
                            text: 'No se pudo liminar el proyecto'
                        })
                    })
                return;
            }
        })
    });
}

export default btnEliminar;