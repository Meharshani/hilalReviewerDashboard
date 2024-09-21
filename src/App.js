import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Forgot from './page/forgot/Forgot';
import Otp from './page/Otp-verification/Otp-verification';
import New_passwpord from './page/new-password/new-passwpord';
import Editpage from './page/EditPage/Editpage';
import Settings from './page/Setting/Setting2';
import Changepassword from './page/ChangePassword/Changepassword';
import Detailpage from './page/Detailpage/Detailpage';
import { AuthProvider } from '././RouteCounter/AuthContext'; // Make sure to adjust the path as needed
import PrivateRoute from '././RouteCounter/PrivateRoute'; // Make sure to adjust the path as needed

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/new-password" element={<New_passwpord />} />
          <Route path="/settings/editpage" element={<PrivateRoute><Editpage /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

          <Route path="/settings/changepassword" element={<PrivateRoute><Changepassword /></PrivateRoute>} />
          <Route path="/home/detailpage" element={<PrivateRoute><Detailpage /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Login />} />
    //     <Route exact path="/home" element={<Home />} />
    //     <Route exact path="/home/detailpage" element={<Detailpage />} />

    //     <Route exact path="/forgot" element={<Forgot />} />
    //     <Route exact path="/otp" element={<Otp />} />
    //     <Route exact path="/new_passwpord" element={<New_passwpord />} />
    //     <Route path="/settings" element={<Settings />} />
    //     <Route path="/settings/editpage" element={<Editpage />} />
    //     <Route path="/settings/changepassword" element={<Changepassword />} />
    //   </Routes>
    // </Router>
  );
};

export default App;