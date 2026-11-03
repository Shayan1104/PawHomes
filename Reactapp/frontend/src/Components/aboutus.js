import Dog from '../Images/Cat1.jpg'
import { Button } from 'react-bootstrap';
function AboutUs(){
    return(
             <div style={{display:'flex', justifyContent:'space-between',padding:'30px',fontSize:'20px'}}>
               <div>
                 <h1>PawHomes: More Than<br></br>Just An Adoption Site</h1>
                 <p>At PetPlace, we’re more than just a pet adoption service<br></br>we're a team of animal lovers dedicated
                     to creating lasting bonds.<br></br> With years of experience in pet care and welfare,
                     we understand the<br></br> unique personalities and needs of each animal in our care.</p>
                     <Button variant="danger" className="fw-bold">
                      Learn About Us →
                     </Button>
               </div>
               <div>
                <img
                  src={Dog}
                  style={{width:'450px', height:'400px',borderRadius:'10px'}}
                ></img>
               </div>
             </div>


    );
};
export default AboutUs;