// import icon from '../public/linkedin-icon.png';

function Footer(){

    return(
        <div className="footer">
            <div className="footer-info">
                <div className="footer-column">
                    <img className="location" src='/location-icon.png' alt='location'/>
                    <p>123 Willow Brook Dr, Duloc</p>
                </div>
                <div className="footer-column">
                    <img className="phone" src='/phone-icon.png' alt='phone'/>
                    <p>555-555-5555</p>
                </div>
                <div className="footer-column">
                    <img className="clock" src='clock-icon.png' alt='clock'/>
                    <p>9am-6pm, Sunday-Saturday</p>
                </div>
            </div>
            <div className="icon-container">
                <a href='https://www.linkedin.com/in/isabella-wiley/'>
                    <img className="icon" src='/linkedin-icon.png' alt='linkedin'/>
                </a>
            </div>
        </div>
    )
}

export default Footer;

//Phone icon by Icons8
//Place Marker icon by Icons8
//Clock icon by Icons8