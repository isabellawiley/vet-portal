import image1 from '../images/vet-portal-img.jpg';
import image2 from '../images/vet-portal-img2.jpg';
import allServices from '../assets/servicesData.json';
import { Outlet } from 'react-router-dom';

function Home({}){

    function reveal(){
        let reveals = document.querySelectorAll(".reveal");

        for(let i=0; i< reveals.length; i++){
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 50;

            if(elementTop < windowHeight - elementVisible){
                reveals[i].classList.add("active");
            }
            else{
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    return(
        <div>
            <div className='background'>
                <h1>Welcome!</h1>
            </div>
            <div className='blurb reveal'>
                <div className='blurb-text'>
                    <h2 className='blurb-title'>Our Mission</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className='blurb-image'>
                    <img src={image1} alt='vet'/>
                </div>
            </div>
            <div className='contact reveal'>
                <div className='blurb-text'>
                    <h2 className='blurb-title'>Contact Us</h2>
                    <p>555 Joe Momma's House</p>
                    <p>555-555-5555</p>
                    <p>Monday-Saturday 9am-6pm</p>
                </div>
                <div className='blurb-image'>
                    <img src={image2} alt='vet2'/>
                </div>
            </div>
            <div className='services reveal'>
                <h2 className='blurb-title'>Our Services</h2>
                <div className='service-cards'>
                    {allServices.map((service) => {
                        return(
                            <div key={service.id} className='flip-card'>
                                <div className='flip-card-inner'>
                                    <div className='flip-card-front' >
                                        <div className='flip-card-front-container'>
                                            <img className='flip-card-img' src={service.image} alt='cat'/>
                                            <h3 className='flip-card-title'>{service.title}</h3>
                                        </div>
                                    </div>
                                    <div className='flip-card-back'>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Home;