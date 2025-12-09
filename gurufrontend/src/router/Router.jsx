import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Daftar from '../auth/Daftar';
import Dashboard from '../user/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Profil from '../user/account/profil';
import RekeningIndex from '../user/rekening/RekeningIndex';
import Kelas from '../user/kelas/Kelas';
import KegiatanBelajar from '../user/kegiatanbelajar/KegiatanBelajar';
import AbsensiIndex from '../user/absensi/AbsensiIndex';
import JadwalIndex from '../user/jadwal/JadwalIndex';
import EmailVertif from '../auth/EmailVertif';
import Saldo from '../user/saldo/Saldo';



const Routeer = () => {
 
    

    return(

<Routes>
 
  {/* Hanya untuk user belum login */}
  <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>
  <Route path="/daftar" element={<PublicRoute><Daftar /></PublicRoute>}/>
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
  <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>


  
  <Route path="/rekening" element={<ProtectedRoute><RekeningIndex /></ProtectedRoute>}/>
  

  
  <Route path="/kelas" element={<ProtectedRoute><Kelas /></ProtectedRoute>}/>

  
  <Route path="/kegiatanbelajar" element={<ProtectedRoute><KegiatanBelajar /></ProtectedRoute>}/>

  <Route path='/absensi' element={<ProtectedRoute><AbsensiIndex /></ProtectedRoute>}/>
  
  <Route path='/jadwal' element={<ProtectedRoute><JadwalIndex /></ProtectedRoute>}/>
    <Route path='/saldo' element={<ProtectedRoute>  <Saldo /> </ProtectedRoute>}/>



</Routes>
        
    );


}

export default Routeer;