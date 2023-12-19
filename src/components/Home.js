import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import "./Home.css"

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormControlLabel from "@mui/material/FormControlLabel";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

import { UserContext } from "./Login";

/* import jwt from 'jsonwebtoken'; */

/* const accessToken = localStorage.getItem('token');
console.log(accessToken); */
const loggedInUser = localStorage.getItem('email')
console.log(loggedInUser);
/* const userID = localStorage.getItem('userID')
console.log(userID); */
const user = localStorage.getItem('user');
console.log(user);

const Home = () => {
	/* 	const userID = useContext(UserContext); */

	const [authenticated, setAuthenticated] = useState(false);
	/* 	const [authToken, setAuthToken] = useState(null); */
	const [userNickname, setUserNickname] = useState("");
	const [userAvatar, setUserAvatar] = useState("");
	const [postings, setPostings] = useState([]);
	const [likes, setLikes] = useState(false);

	const navigate = useNavigate();

	//pagination-in-progress:
	/* const [page, setPage] = React.useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	} */

	//Check authentication
	useEffect(() => {
		console.log("testing")
		const localToken = localStorage.getItem('token');
		console.log(localToken);
		const userID = localStorage.getItem('userID')
		console.log(userID);
		if (localToken) {
			setAuthenticated(true);
			console.log("You're authenticated")

			const testAuth = async () => {
				const tokenAuth = 'Bearer ' + localToken /* localStorage.getItem('token') */
				const data = await axios.get(`http://localhost:8000/users/jwtTest`, {
					headers: {
						Authorization: tokenAuth
					}
				})
				console.log(data.data)
				console.log(tokenAuth)
			}
			testAuth();

			/* Get users */
			const getUser = async () => {
				/* const user_ID = localStorage.getItem('user_ID') */
				const tokenAuth = 'Bearer ' + localToken /*localStorage.getItem('token')*/
				console.log("looking for user", userID)
				const dataUser = await axios.get(`http://localhost:8000/users/${userID}`, {
					headers: {
						Authorization: tokenAuth
					}
				}
				)
					.then(res => {
						console.log(res.data)//full user data here
						console.log(res.data.nickname)
						setUserNickname(res.data.nickname)
						setUserAvatar(res.data.avatar)
					}).catch(err => console.log(err))

			}
			getUser();


			/*Get all 4-star postings */
			const getPostings = async () => {
				const tokenAuth = 'Bearer ' + localToken/* localStorage.getItem('token') */
				const dataPostings = await axios.get(`http://localhost:8000/postings/all?recent=true&rating=4`, {
					headers: {
						Authorization: tokenAuth
					}
				})
					.then(res => {
						console.log(res.data)//the entire data
						console.log(res.data.everything) //the actual listing
						setPostings(res.data.everything) //the actual listing
					}
					)
			}
			getPostings()
		}

		else {
			navigate("/")
		}
	}, [navigate]);

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));



	return (
		<div>
			{/* <h1>Home Component</h1>
			<h2>{`Hello again`}</h2> */}
			<div className="home">
				<p className="welcome">{`You are authenticated, welcome ${userNickname} ! `}</p>
				<img src={userAvatar} />
				<div ><p className="welcome">Here are the listings :</p>
					<br />
					{/* {
						postings.map((posting) => {
							return 
							<ul className="listStyle">
								<li>{posting.user.nickname}</li>
								<li><img src={posting.user.avatar} /></li>
								<li>{posting.title}</li>
								<li>{posting.drinksName}</li>
								<li>{posting.sugarLevel}% percent sugar</li>
								<li>{posting.shopLocation}</li>
								<li><img src={posting.photoUrl} /></li>
							</ul>
						})
					} */}


					{/*Using MUI Box and Grid: */}
					{/* <Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={2}>
							{
								postings.map((posting) => {
									return (
										<>
											<Grid item xs={4}>
												<Item>
													<ul className="listStyle">
														<li>{posting.user.nickname}</li>
														<li><img src={posting.user.avatar} /></li>
													</ul>
												</Item>
											</Grid>
											<Grid item xs={8}>
												<Item>
													<ul className="listStyle">
														<li>{posting.title}</li>
														<li>{posting.drinksName}</li>
														<li>{posting.sugarLevel}% percent sugar</li>
														<li>{posting.shopLocation}</li>
														<li><img src={posting.photoUrl} /></li>
													</ul>
												</Item>
											</Grid>
										</>
									)
								})
							}
						</Grid>
					</Box> */}


					<Box sx={{ flexGrow: 1 }}  >
						<Grid container spacing={2} >
							{
								postings.map((posting) => {
									return (
										<>
											{/* <Grid item xs={4}>
												<Item>
													<ul className="listStyle">
														<li>{posting.user.nickname}</li>
														<li><img src={posting.user.avatar} /></li>
													</ul>
												</Item>
											</Grid> */}
											<Grid item xs={12} >
												<Card sx={{ maxWidth: 500 }} style={{ border: "2px solid blue" }} className="centralDiv">
													<CardHeader

														avatar={
															<Avatar sx={{ width: 100, height: 100 }}>
																<img src={posting.user.avatar} />
															</Avatar>
														}
														action={
															<IconButton aria-label="settings">
																<MoreVertIcon />
															</IconButton>
														}

														title={posting.title}
														subheader={posting.user.nickname}
													/>
													<img src={posting.photoUrl} />
													<CardContent>
														<Typography variant="body2" color="text.secondary">
															{/* This impressive paella is a perfect party dish and a fun meal to cook
															together with your guests. Add 1 cup of frozen peas along with the mussels,
															if you like. */}
															{posting.postedDate}
														</Typography>
														<Typography>
															{posting.shopLocation}
														</Typography>
														<Typography>
															{posting.content}
														</Typography>
														<Typography>
															{/* {posting.rating} stars */}
															<Rating value={posting.rating} readOnly />
														</Typography>
													</CardContent>
													<CardActions /* disableSpacing */>
														{/* <IconButton aria-label="add to favorites" onClick={() => setLikes(true)}>
															<FavoriteIcon />
														</IconButton> */}
														<FormControlLabel
															control={
																<Checkbox
																	icon={<FavoriteBorderIcon />}
																	checkedIcon={<FavoriteIcon sx={{ '.MuiSvgIcon-root': { color: "red" } }} />}

																/>
															}
															label="Like"
															value={likes}
														/>

														<IconButton aria-label="share">
															<ShareIcon />
														</IconButton>
													</CardActions>
												</Card>
											</Grid>
										</>
									)
								})
							}
						</Grid>
					</Box>

					<br />

					{/* <Stack spacing={2} className="marginTest">
						<Typography>Page: {page}</Typography>
						<Pagination count={10} page={page} onChange={handleChange} />
					</Stack> */}

				</div>
			</div>

		</div>
	)
}
export default Home;