import React, {useContext} from "react";
import {Route, Redirect} from "react-router";
import {AuthContext} from "../../util/Auth";

const PrivateRoute = ({component: RouteComponent, data, ...rest}) => {
	const {currentUser} = useContext(AuthContext);


	return (
		<Route
			{...rest}
			render={routeProps =>
				!!currentUser ? (
					<RouteComponent {...data} {...routeProps}/>
				) : (
					<Redirect data={data} to={"/login"}/>
				)}
		/>
	)
}

export default PrivateRoute
