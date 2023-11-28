import Signin from '../pages/Signin';

const AdminRoute = ({ children }) => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const userRoleCookie = cookies.find((cookie) =>
    cookie.startsWith('user_role=')
  );
  const userRole = userRoleCookie ? userRoleCookie.split('=')[1] : null;

  if (userRole === 'admin') {
    return <>{children}</>;
  } else {
    return <Signin />;
  }
};

export default AdminRoute;
