
function DeletePet({id, setShowModal}){

    function handleDelete(){
        if(window.confirm('Delete pet?')){
            fetch(`http://localhost:8000/api/pets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(setShowModal(false))
        }
    }

    return(
        <div>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeletePet;