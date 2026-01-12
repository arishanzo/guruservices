import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';


import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute'

const Login = React.lazy(() => import("../auth/Login"));
const Daftar = React.lazy(() => import("../auth/Daftar"));

const Dashboard = React.lazy(() => import("../user/dashboard/Dashboard"));
const Profil = React.lazy(() => import("../user/account/profil"));
const RekeningIndex = React.lazy(() => import("../user/rekening/RekeningIndex"));
const Kelas = React.lazy(() => import("../user/kelas/Kelas"));
const KegiatanBelajar = React.lazy(() => import("../user/kegiatanbelajar/KegiatanBelajar"));
const AbsensiIndex = React.lazy(() => import("../user/absensi/AbsensiIndex"));
const JadwalIndex = React.lazy(() => import("../user/jadwal/JadwalIndex"));
const EmailVertif = React.lazy(() => import("../auth/EmailVertif"));

const Saldo = React.lazy(() => import("../user/saldo/Saldo"));
const LoadingGopintar = React.lazy(() => import("./LoadingGopintar"));

// import Login from '../auth/Login';
// import Daftar from '../auth/Daftar';
// import Dashboard from '../user/dashboard/Dashboard';
// import ProtectedRoute from './ProtectedRoute';
// import PublicRoute from './PublicRoute';
// import Profil from '../user/account/profil';
// import RekeningIndex from '../user/rekening/RekeningIndex';
// import Kelas from '../user/kelas/Kelas';
// import KegiatanBelajar from '../user/kegiatanbelajar/KegiatanBelajar';
// import AbsensiIndex from '../user/absensi/AbsensiIndex';
// import JadwalIndex from '../user/jadwal/JadwalIndex';
// import EmailVertif from '../auth/EmailVertif';
// import Saldo from '../user/saldo/Saldo';
// import LoadingGopintar from './LoadingGopintar';



const Routeer = () => {
 
    

    return(

<Routes>
 
  {/* Hanya untuk user belum login */}
  <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>
  <Route path="/daftar" element={<PublicRoute><Daftar /></PublicRoute>}/>
  <Route path="/lupapassword" element={<PublicRoute><EmailVertif /></PublicRoute>}/>
  
  {/* Hanya untuk user yang sudah login */}
  
  <Route path="/dashboard" element={<ProtectedRoute>
     <Suspense fallback={ <LoadingGopintar />}>
              <Dashboard />
            </Suspense>
    </ProtectedRoute>}/>

  <Route path="/profil" element={<ProtectedRoute>
    
    <Suspense fallback={ <LoadingGopintar />}>
              <Profil />
            </Suspense>
    </ProtectedRoute>}/>


  
  <Route path="/rekening" element={<ProtectedRoute>

     <Suspense fallback={ <LoadingGopintar />}>
              <RekeningIndex />
            </Suspense>
  </ProtectedRoute>}/>
  

  
  <Route path="/kelas" element={<ProtectedRoute>

     <Suspense fallback={ <LoadingGopintar />}>
              <Kelas />
            </Suspense>
  </ProtectedRoute>}/>

  
  <Route path="/kegiatanbelajar" element={<ProtectedRoute>

     <Suspense fallback={ <LoadingGopintar />}>
              <KegiatanBelajar />
            </Suspense>
  </ProtectedRoute>}/>

  <Route path='/absensi' element={<ProtectedRoute>
     <Suspense fallback={ <LoadingGopintar />}>
              <AbsensiIndex />
            </Suspense>
  </ProtectedRoute>}/>
  
  <Route path='/jadwal' element={<ProtectedRoute>

     <Suspense fallback={ <LoadingGopintar />}>
              <JadwalIndex />
            </Suspense>
  </ProtectedRoute>}/>
    <Route path='/saldo' element={<ProtectedRoute>  <Suspense fallback={ <LoadingGopintar />}>
              <Saldo />
            </Suspense> </ProtectedRoute>}/>



</Routes>
        
    );


}

export default Routeer;