import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import "../App.css"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';

const Navbar = () => {
	const navigate = useNavigate();
	/* const context = useContext(UserContext); */
	const handleLogout = () => {
		localStorage.clear()
		navigate('/')
	}
	return (
		<div>
			<nav className="container">
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
							>
								<MenuIcon />
							</IconButton>

							<Typography variant="h6" component="div" sx={{ flexGrow: 1, }}>
								<Link to="/home">Home</Link>
							</Typography>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								<Link to="/profile">Profile</Link>
							</Typography>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								<Link to="/posting">Posting</Link>
							</Typography>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								<Link to="/social">Social</Link>
							</Typography>
							<Button color="inherit" onClick={handleLogout}>Logout</Button>
						</Toolbar>
					</AppBar>
				</Box>
			</nav>

		</div>
	);
}

export default Navbar;



