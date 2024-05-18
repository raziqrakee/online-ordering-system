export default function (context) {
    const { app, route } = context;
    const token = app.$cookies.get('token');
  
    if (!token && route.path !== '/register' && route.path !== '/reset-password') {
        return context.redirect('/login');
      }
      
  }