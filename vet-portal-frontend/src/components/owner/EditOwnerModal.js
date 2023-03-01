import { useState } from "react";

function EditOwnerModal({owner}){
    const {id, fname, lname, email, password} = owner;
    const [showModal, setShowModal] = useState(false);
    const [ownerForm, setOwnerForm] = useState({
        fname: fname,
        lname: lname,
        email: email
    })
    console.log('before:', ownerForm)

    function handleSubmit(event) {
        event.preventDefault();
        console.log(ownerForm)

        fetch(`http://localhost:8000/api/owners/${id}`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: ownerForm.fname,
                lname: ownerForm.lname,
                email: ownerForm.email,
                password: password
            })
        })
        .then(res => res.json())
        .then(owner => {
            console.log(owner)
            setShowModal(false)
            setOwnerForm({
                fname: owner.fname,
                lname: owner.lname,
                email: owner.email
            })
        })
    }

    function handleChange(event){
        const {value, name} = event.target;
        console.log('name: ', name, 'value:', value)
        setOwnerForm(prev => ({
            ...prev, [name]: value
        }))
    }

    return(
        <div>
            <button className="card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? 'modal show' : 'modal'}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h1>Edit Owner Information</h1>
                    <form>
                        <label>First Name: </label>
                        <input onChange={handleChange} type='string' name='fname' value={ownerForm.fname}/>
                        <label>Last Name: </label>
                        <input onChange={handleChange} type='string' name='lname' value={ownerForm.lname} />
                        <label>Email: </label>
                        <input onChange={handleChange} type='email' name='email' value={ownerForm.email} />
                    </form>
                    <div className="button-container">
                        <button className="edit card-button" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOwnerModal;