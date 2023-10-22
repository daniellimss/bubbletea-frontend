import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';
import "./Social.css";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { autocompleteClasses } from "@mui/material";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormControlLabel from "@mui/material/FormControlLabel";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';




/* const accessToken = localStorage.getItem('token');
console.log(accessToken); */
const loggedInUser = localStorage.getItem('email')
/* console.log(loggedInUser); */
const userID = localStorage.getItem('userID')
/* console.log(userID); */
/* const user = localStorage.getItem('user');
console.log(user); */


const Social = () => {

	const [authenticated, setAuthenticated] = useState(false);
	const [authToken, setAuthToken] = useState("");
	const [userNickname, setUserNickname] = useState("");
	const [userAvatar, setUserAvatar] = useState("");
	const [postings, setPostings] = useState([]);
	const [likes, setLikes] = useState(false);
	const [postingId, setPostingId] = useState("");
	const [showBox, setShowBox] = useState(false);
	const [comments, setComments] = useState("");


	const navigate = useNavigate();

	useEffect(() => {
		//if (accessToken) {
		setAuthenticated(true);

		const getUser = async () => {

			/* const accessToken = localStorage.getItem('token'); */
			/* console.log(accessToken); */
			/* const loggedInUser = localStorage.getItem('email') */
			/* console.log(loggedInUser); */
			/* 		const userID = localStorage.getItem('userID') */
			/* console.log(userID); */
			/* const user = localStorage.getItem('user');
			console.log(user); */


			const tokenAuth = 'Bearer ' + localStorage.getItem('token')
			const dataUser = await axios.get(`http://localhost:8000/users/${userID}`, {
				headers: {
					Authorization: tokenAuth
				}
			}
			)
				.then(res => {
					console.log(res.data)
					console.log(res.data.nickname)
					setUserNickname(res.data.nickname)
					setUserAvatar(res.data.avatar)
				}).catch(err => console.log(err))
		}
		getUser();

		/*Get allpostings */
		const getAllPostings = async () => {
			const tokenAuth = 'Bearer ' + localStorage.getItem('token')
			const dataPostings = await axios.get(`http://localhost:8000/postings/all?recent=true`, {
				headers: {
					Authorization: tokenAuth
				}
			})
				.then(res => {
					console.log(res.data)//the entire data
					console.log(res.data.everything) //the actual listing
					setPostings(res.data.everything) //the actual listing

					//The postingId (in the map function below) is
					//actually derived by posting.id 
				}
				)
		}
		getAllPostings()



		//}
		/* else {
			navigate(-1)
		} */

	}, []);



	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	/* const handleChange = (event) => {
		if (event.target.name === "comments") {
			setComments(event.target.value)
		}
	} */

	//To get the postingId for the comment which 
	//a user wants to reply, we need to set up 
	//state for the postingId (empty) and capture
	//the postingId via the postingId button created below
	const handleReply = (e) => {
		if (e.target.name === "postingId") {
			setPostingId(e.target.value);
			setShowBox(true);
			console.log(postingId)
		}


		//Here we create the comments box if 
		//postingId is available (which we checked at earlier lines)
		if (postingId) {
			const createCommentsBox = () => {
				console.log("box created")
			}
			createCommentsBox()
		}
	}

	//Post new comment:
	/* const handleSubmit = async (e) => {
		e.preventDefault();
		const tokenAuth = 'Bearer ' + localStorage.getItem('token')
		const dataComments = await axios.post(`http://localhost:8000/${userID}/posting/comments`, {
			userId: userID,
			postingId: posting.Id,
			content: comments
		}, {
			headers: {
				Authorization: tokenAuth
			}
		})
	} */



	return (
		<div>
			<h1>Social</h1>
			{
				postings.map((posting) => {
					return (
						<div>
							<Box sx={{ flexGrow: 1 }} >
								<Grid container spacing={2} >
									<Grid item xs={12}>
										<Item className="container">
											<div className="dis-flex ">
												<div style={{ width: "150px" }}>
													<p><img src={posting.user.avatar} /></p>
													<p>{posting.user.nickname}</p></div>
												<div style={{ width: "600px" }}>
													<p className="posting-title">{posting.title}</p>
													<p>{posting.content}</p>
													<p>{posting.postedDate}</p>
													<p><img src={posting.photoUrl} /></p>
													<p>{posting.drinksName}</p>
													<p>{posting.shopLocation}</p>
													<p><Rating value={posting.rating} readOnly /></p>
													<p><FormControlLabel
														control={
															<Checkbox
																icon={<FavoriteBorderIcon />}
																checkedIcon={<FavoriteIcon sx={{ '.MuiSvgIcon-root': { color: "red" } }} />}
															/>
														}
														label="Like"
														value={likes}
													/></p>
												</div>
											</div>
											<Button variant="contained" value={posting.id} name="postingId" onClick={handleReply}>Reply</Button>

										</Item>
									</Grid>
								</Grid>
							</Box>
						</div>
					)

				})
			}
			{
				{ postingId } ?
					<div>
						My comments box
					</div> : ""
			}
			{/* {
				showCommentsBox ?
					<div>
						<form className="container" onSubmit={handleSubmit}>
							<input type="text" name="comments" required
								autoComplete="off" className="register-inputs" value={comments} onChange={handleChange} placeholder="comments" />
							<button type="submit" value={postings[0].id}>Submit</button>
						</form>
					</div>
					: ""
			} */}
		</div >
	)
}

export default Social;