import React from 'react'
import Layout from '../../Layout/Layout';
import { Accordion } from 'react-bootstrap';
import Dog from '../../Images/Dog.jpg'
import AboutUs from '../aboutus';
const Shelters = () => {
    
  return (
    <Layout>
        <h3 style={{padding:'20px'}}>Following are Some shelters</h3>
        <Accordion defaultActiveKey="0" style={{ margin: '20px auto', maxWidth: '900px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>
        <Accordion.Item eventKey="0">
        <Accordion.Header style={{ fontWeight: 'bold', fontSize: '18px' }}>Shelter #1</Accordion.Header>
         <h3 style={{ padding: '20px', margin: '0', textAlign: 'center', fontSize: '22px', color: '#444' }}>The Crazy Cats</h3>
    <Accordion.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1, fontSize: '16px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
        Hey everyone! The Crazy Cats is our non-profit cat shelter. We’re the largest cat shelter in Pakistan, and we’ve saved over 300 cats in just two years. We’re dedicated to rescuing and rehabilitating cats who have been abandoned, abused, or neglected from different areas of Pakistan.
        <br /><br />
        We’re currently home to 230 cats, some of whom have special needs such as paralysis, blindness, chronic kidney disease, and FIP. These cats have been through so much and they deserve the best care possible. We understand the importance of providing a special diet to our sick cats, and we work hard to make sure each cat receives the appropriate care and attention.
        <br /><br />
        These cats are more than just animals to us, they’re family. We’re working hard to make sure that they receive the love and care that they deserve. Adoption rates and awareness towards animal rights are very low in Pakistan, and we’re working hard to change that. We want to make sure that every cat has a loving home and that people understand the importance of treating animals with kindness and respect.
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img
          src={Dog}
          alt="Shelter"
          style={{
            width: '100%',
            maxWidth: '450px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </Accordion.Body>
    </Accordion.Item>
     </Accordion>
       <Accordion style={{ margin: '20px auto', maxWidth: '900px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>
       <Accordion.Item eventKey="1">
        <Accordion.Header style={{ fontWeight: 'bold', fontSize: '18px' }}>Shelter #2</Accordion.Header>
         <h3 style={{ padding: '20px', margin: '0', textAlign: 'center', fontSize: '22px', color: '#444' }}>The Crazy Cats</h3>
    <Accordion.Body style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1, fontSize: '16px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
        Hey everyone! The Crazy Cats is our non-profit cat shelter. We’re the largest cat shelter in Pakistan, and we’ve saved over 300 cats in just two years. We’re dedicated to rescuing and rehabilitating cats who have been abandoned, abused, or neglected from different areas of Pakistan.
        <br /><br />
        We’re currently home to 230 cats, some of whom have special needs such as paralysis, blindness, chronic kidney disease, and FIP. These cats have been through so much and they deserve the best care possible. We understand the importance of providing a special diet to our sick cats, and we work hard to make sure each cat receives the appropriate care and attention.
        <br /><br />
        These cats are more than just animals to us, they’re family. We’re working hard to make sure that they receive the love and care that they deserve. Adoption rates and awareness towards animal rights are very low in Pakistan, and we’re working hard to change that. We want to make sure that every cat has a loving home and that people understand the importance of treating animals with kindness and respect.
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img
          src={Dog}
          alt="Shelter"
          style={{
            width: '100%',
            maxWidth: '450px',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </Accordion.Body>
    </Accordion.Item>
      </Accordion>
      <AboutUs />
    </Layout>
  )
}

export default Shelters
