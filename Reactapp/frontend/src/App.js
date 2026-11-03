import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Components/signup_form/signup';
import Login from './Components/login_form/login';
import AdminHome from '../src/Components/Admin/AdminHome';
import Home from './pages/home';
import ShelterRegistration from './Components/Shelters/ShelterRegistration';
import PetArticle from './Components/petArticles/PetArticle';
import PetAdoptionForm from './Components/Shelters/AdoptForm';
import Profile from './Components/Profile';
// import PetsList from './Components/Pets';
import Shelters from './Components/Shelters/Shelters';
import AdminArticle from '../src/Components/Admin/ManageArticles';
import AdminRoute from './Components/AdminRoutes';
import AdminPanel from './Components/Admin/Pages/adminPanel';
import RegisteredShelters from './Components/Shelters/registeredShelters';
import ShelterRequests from './Components/Shelters/shelterRequests';
import ShelterHome from './Components/Shelters/shelterHome';
import ShelterPanel from './Components/Shelters/shelterPanel';
import AddPet from './Components/Shelters/addPets';
import PetsList from './Components/cards';
import PetsProfile from './Components/petprofile';
import ListofPets from './Components/ListofPets';
import RequestsStatus from './pages/RequestsStatus';
function App() {
  return (
    <>
      <Routes>
        {/* Public Routes - Everyone can access */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/petProfile/:id" element={<PetsProfile />} />
        <Route path="/PetArticle" element={<PetArticle />} />
        <Route path="/Shelters" element={<Shelters />} />
        <Route path="/PetsList" element={<PetsList />} />
        <Route path="/ListofPets" element={<ListofPets />} />
        {/* Action-Restricted Routes */}
        <Route path="/ShelterRegistration" element={<ShelterRegistration />} />
        <Route path="/PetAdoptionForm/:id" element={<PetAdoptionForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/requests-status' element={<RequestsStatus />} />
       {/*shelter Routes */}
       <Route path="/ShelterHome" element={<ShelterHome/>} />
       <Route path='/ShelterPanel' element={<ShelterPanel/>} />
       <Route path='/listedPets' element={<PetsList />} />
       <Route path='/AddPet' element={<AddPet />} />
        {/* Admin-Specific Routes */}
        <Route
          path="/AdminHome"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
         path="/AdminPanel/shelterRequests" 
         element={<ShelterRequests />} />
        <Route
          path="/adminPanel"
          element={
            <AdminRoute>
              <AdminPanel/>
            </AdminRoute>
          }
        />
        
        <Route 
         path='/RegisteredShelters'
         element={
          <AdminRoute>
            <AdminPanel />
            <RegisteredShelters />
          </AdminRoute>
         }
        />
        <Route 
         path='/SheltersRequest'
         element={
          <AdminRoute>
            <AdminPanel />
            <ShelterRequests />
          </AdminRoute>
         }
        />
        <Route 
         path='/listedPets'
         element={
          <AdminRoute>
            <AdminPanel />
            <PetsList />
          </AdminRoute>
         }
        />
        <Route
          path="/AdminArticles"
          element={
            <AdminRoute>
              <AdminArticle />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
