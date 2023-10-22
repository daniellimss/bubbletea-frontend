import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';

import "./Login.css";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ConnectingAirportsOutlined } from "@mui/icons-material";


/* export const UserContext = createContext(""); */

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [userID, setUserID] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await axios.post(`http://localhost:8000/users/login`, { email, password });

		if (data.data.token) {
			setAuthenticated(true);
			localStorage.setItem('email', email)

			console.log("log in success")
			localStorage.setItem('token', data.data.token)
			console.log(data.data.token)


			/*The following authToken code set is to derive
			the userID from the token authenticated after 
			user has logged in, so that developer will know 
			who the logged user is */
			const authToken = data.data.token;
			// Split the token into header, payload, and signature
			const [header, payload, signature] = authToken.split('.');

			// Decode the payload
			const decodedPayload = JSON.parse(atob(payload));

			// Extract the userID
			const userID = decodedPayload.userID;
			/* const userDetails = decodedPayload.userDetails; */

			// Use the userID as needed
			console.log(userID);
			/* console.log(userDetails); */
			localStorage.setItem('userID', userID);
			console.log(localStorage.getItem('token'));

			navigate("/home")
		};


	};

	const handleChange = (e) => {
		if (e.target.id === 'password') {
			setPassword(e.target.value);
		} else if (e.target.id === 'email') {
			setEmail(e.target.value);
		}
	}

	//test call the protected route:
	/* const testAuth = async () => {
		const tokenAuth = 'Bearer' + localStorage.getItem('token')
		const data = await axios.get('http://localhost:8000/users/jwtTest', {
			headers: {
				Authorization: tokenAuth */

	/* {
		email: localStorage.getItem('email'),
		password: localStorage.getItem('password')
	} */
	/* }
})
console.log(data)
} */

	/* const handleRegister = () => {
		navigate("/signup")
	} */

	return (
		<div className="login">
			{/* 			<UserContext.Provider value={userID}> */}
			<img src="./bubbletealogo-edited-ps.png" className="logo" alt="logo" />
			<div className="login-block">
				<h1 className="login-title">Login</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						id="email"
						placeholder="Enter your email"
						onChange={handleChange}
					></input>
					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						onChange={handleChange}
					></input>
					<button type="submit" className="submit-btn" id="submit-btn">Submit</button>
				</form>
				<p>Not a user? Click below to register!</p>
				<button className="submit-btn" onClick={() => navigate("/signup")}>Register</button>
			</div>
			{/* 			</UserContext.Provider> */}



			{/* {authenticated ? <button onClick={testAuth}>test auth</button> : ''} */}
			{/* </Box>
					</Box>
				</Container> */}

			{/* <div className="logo"></div>
			<div className="login-block">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						id="email"
						placeholder="Enter your email"
						onChange={handleChange}
					></input>
					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						onChange={handleChange}
					></input>

				</form>
				<input type="submit" className="submit-btn"></input>
				<p>Not registered?</p>
				<button className="submit-btn">Register</button>
			</div> */}



		</div>
	);
}
export default Login;