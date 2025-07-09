export const withAuth = (gssp) => {
  return async (context) => {
    const token = context.req.cookies['auth-token'];
    
    if (!token || !token.startsWith('mock-jwt-token-')) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (gssp) {
      return await gssp(context);
    }

    return { props: {} };
  };
};