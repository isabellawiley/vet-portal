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
            <button className="edit-owner card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? 'modal show' : 'modal'}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h3 className="modal-title">Edit Owner Information</h3>
                    <form>
                        <div className="row-container">
                            <div className="row left">
                                <div className="col">
                                    <label>First Name: </label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type='string' name='fname' value={ownerForm.fname}/>
                                </div>
                            </div>
                            <div className="row right">
                                <div className="col">
                                    <label>Last Name: </label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type='string' name='lname' value={ownerForm.lname} />
                                </div>
                            </div>
                        </div>
                        <div className="row-container">
                            <div className="row left">
                                <div className="col">
                                    <label>Email: </label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type='email' name='email' value={ownerForm.email} />                                
                                </div>
                            </div>
                        </div>
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