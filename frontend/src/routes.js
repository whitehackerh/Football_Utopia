import React from 'react';

const Home = React.lazy(() => import('./components/pages/home/Home'));

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
]

export default routes;