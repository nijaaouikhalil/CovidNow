import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const navigate = useNavigate();

  useEffect(()=> {
    if (!user_info) navigate('login')
    else {
      switch (user_info.roles) {
        case "ROLE_ADMIN":
          navigate('/admin/dashboard');
          break;
        case "ROLE_DOCTOR":
          navigate('/doctor/dashboard');
          break;
        case "ROLE_HEALTH_OFFICIAL":
          navigate('/healthoff/dashboard');
          break;
        case "ROLE_IMMIGRATION_OFFICER":
          navigate('/immi/dashboard');
          break;
        case "ROLE_USER":
          navigate('/patient/dashboard');
          break;
        default: break;
      }
    }// eslint-disable-next-line
  }, []);

  return (null);
}

export default HomeScreen;