import React, {useContext} from "react";
import {Route, Redirect} from "react-router";
import {AuthContextUsers} from "../../util/AuthUsers";

const PrivateRouteUsers = ({component: RouteComponent, data, ...rest}) => {
	const {currentUser} = useContext(AuthContextUsers);


	return (
		<Route
			{...rest}
			render={routeProps =>
				!!currentUser ? (
					<RouteComponent {...data} {...routeProps}/>
				) : (
					<Redirect data={data} to={"/login_users"}/>
				)}
		/>
	)
}

export default PrivateRouteUsers;
