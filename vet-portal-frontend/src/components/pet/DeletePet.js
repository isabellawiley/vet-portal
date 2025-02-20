
function DeletePet({id, setShowModal, pets, setPets}){

    function handleDelete(){
        if(window.confirm('Delete pet?')){
            fetch(`${process.env.REACT_APP_API_URL}/api/pets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(data => {
                const updatedPets = pets.filter(pet => {
                    return pet.id !== id;
                })
                setPets(updatedPets);
                setShowModal(false)
            })
        }
    }

    return(
        <div>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeletePet;