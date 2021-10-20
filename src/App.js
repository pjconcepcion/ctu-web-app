import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import Books from './components/Books';
import Return from './components/Return';

export default function App () {
    return (
        <Router>
            <Navigation />
            <Route path="/" exact component={Books}/>
            <Route path="/:id" component={Return}/>
        </Router>
    );
}