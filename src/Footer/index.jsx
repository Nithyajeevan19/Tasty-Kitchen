import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faXTwitter, faInstagram ,faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import './index.css'

function Footer(){
    return (
        <>
            <div className="footer-container">
                <div className='footer-logo-name-container'>
                    <img src="https://res.cloudinary.com/dhgkvhtol/image/upload/v1752899106/Frame_275_si9ytr.png" className="footer-logo-img"/>
                    <h1 className="footer-main-heading">Tasty Kitchens</h1>
                </div>
                <p className="footer-des">The only thing we are serious about is food. Contact us on</p>
                <div className='social-media-icons-container'>
                    <FontAwesomeIcon icon={faInstagram}  className='social-media-icon'/>
                    <FontAwesomeIcon icon={faXTwitter} className='social-media-icon'/>
                    <FontAwesomeIcon icon={faFacebook} className='social-media-icon'/>
                    <FontAwesomeIcon icon={faWhatsapp} className='social-media-icon'/>
                </div>
            </div>
            
        </>
    )

}

export default Footer