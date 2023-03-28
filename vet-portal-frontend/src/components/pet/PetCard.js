import '../../styling/pets.css'
import EditPetModal from './EditPetModal';

function PetCard({pet, pets, setPets}) {
    const {name, species, breed, age, image} = pet;
    // console.log('image:',image)

    return(
        <div className="pet-card">
            {/* {(image=="") ? <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftlcpethaven.com%2Ftlc-tour%2Fblack-paw-print-vector%2F&psig=AOvVaw3JmPjCVS3QCXLIcVO5MPCq&ust=1677654789233000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCND4haHVt_0CFQAAAAAdAAAAABAF" alt='pet'/> :
            <img src={image} alt='pet'/>} */}
            {/* <img src={(image=="" || image==null) ? "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" : image} alt="pet"/> */}
            <div className='meta'>
                {image ? 
                <div className='pet-photo' style={{backgroundImage: `url(${image})`}} ></div>
                :
                <div className='pet-photo' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)'}}></div>
                }
            </div>
            <div className='pet-details'>
                <h1>{name}</h1>
                <p><strong>Species: </strong>{species}</p>
                <p><strong>Breed: </strong>{breed}</p>
                <p><strong>Age: </strong>{age}</p>
                <EditPetModal pet={pet} pets={pets} setPets={setPets}/>
            </div>
        </div>
    )
}

export default PetCard;

// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fanimal-icon-png&psig=AOvVaw2IP3HUazbskQg8YCH8PGhm&ust=1677654650598000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJCVh9_Ut_0CFQAAAAAdAAAAABAE

//https://www.google.com/url?sa=i&url=https%3A%2F%2Ftlcpethaven.com%2Ftlc-tour%2Fblack-paw-print-vector%2F&psig=AOvVaw3JmPjCVS3QCXLIcVO5MPCq&ust=1677654789233000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCND4haHVt_0CFQAAAAAdAAAAABAF