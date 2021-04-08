import './App.css';
import MyTextField from "./Components/form/TextField";
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Combinator from "./Components/Pages/Combinator";
import Login from "./Components/Auth/Login";
import AdminTable from "./Components/Pages/Admin";
import {
	HashRouter as Router,
	Route,
} from "react-router-dom";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import {AuthProvider} from "./util/Auth"
import {AuthProviderUsers} from "./util/AuthUsers"
import Scatters from "./Components/Pages/Scatters";
import firebase from "./util/Firebase";
import {Button} from "@material-ui/core";
import PrivateRouteUsers from "./Components/Auth/PrivateRouteUsers";
import LoginUsers from "./Components/Auth/LoginUsers";
import ChooseOption from "./Components/Auth/ChooseOption";
import MyResult from "./Components/Pages/MyResult";

const App = () => {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<AuthProviderUsers>
						<Router>
							<PrivateRouteUsers data={{
								page_for: "user"
							}} exact path={"/users"} component={Combinator}/>
							<PrivateRouteUsers exact path={"/find"} component={MyResult}/>

							<PrivateRouteUsers exact path={"/choose_option"} component={ChooseOption}/>
							<Route exact path={"/login_users"} component={LoginUsers}/>
						</Router>
					</AuthProviderUsers>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;