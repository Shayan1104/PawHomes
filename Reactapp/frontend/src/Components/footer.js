import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaTiktok } from 'react-icons/fa';
import logo from '../Images/Pawhome.png'
function Footer(){
    return(
        <footer>
        <div style={{backgroundColor:'#1c1c3d',display:'flex',justifyContent:'space-between'}}>
        <div style={{margin:'10px'}}>
            <img
              src={logo}
              width="200px"
              height="75px"
              style={{padding:'5px',margin:'10px'}}
            ></img><br></br>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white',fontSize:'30px',padding:'20px'}}>
          <FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white',fontSize:'30px'}}>
          <FaInstagram />
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white',fontSize:'30px',padding:'20px'}}>
          <FaTiktok/></a>
        </a>
        </div>  
        <div style={{display:'flex', color:'white'}}>
            <ul style={{listStyle:'none'}}><b>Petcare</b>
                <li>Dog Care</li>
                <li>Cat Care</li>
                <li>Other Pet Care</li>
            </ul>
            <ul style={{listStyle:'none'}}><b>Pet Health</b>
                <li>Cat Health</li>
                <li>Dog Health</li>
                <li>Others Pet Health</li>
                <li>Ask a Doctor</li>
            </ul>
            <ul style={{listStyle:'none'}}><b>Pet Behavior<br></br>& Training</b>
                <li>Cat Behavior<br></br>& Training</li>
                <li>Dog Behavior<br></br> & Training</li>
                <li>Small Pet Behavior<br></br> & Training</li>
            </ul>
            <ul style={{listStyle:'none'}}><b>Pet Adoption<br></br>& Breeds</b>
                <li>Breeds Guide</li>
                <li>Cat Adoption<br></br>& Breeds</li>
                <li>Dog Adoption<br></br> & Breeds</li>
                <li>Small Pet Breeds</li>
            </ul>
        </div>
        </div>
        </footer>
    );
};
export default Footer;