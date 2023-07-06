import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';
import "./Profile.css"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const accessToken = localStorage.getItem('token');
/* console.log(accessToken); */
const loggedInUser = localStorage.getItem('email')
/* console.log(loggedInUser); */
const userID = localStorage.getItem('userID')
/* console.log(userID); */
const user = localStorage.getItem('user');
console.log(user);


const Profile = () => {

	const navigate = useNavigate();

	const [userNickname, setUserNickname] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userAvatar, setUserAvatar] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userDob, setUserDob] = useState("");
	const [userGender, setUserGender] = useState("");
	const [callForm, setCallForm] = useState(false);

	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");

	useEffect(() => {
		const getUser = async () => {
			const tokenAuth = 'Bearer ' + localStorage.getItem('token')
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
					setUserEmail(res.data.email)
					setUserAvatar(res.data.avatar)
					setUserPassword(res.data.password)
					setUserDob(res.data.dob)
					if (res.data.gender) {
						setUserGender("male")
					} else {
						setUserGender("female")
					}

				}).catch(err => console.log(err))
		}
		getUser();
	})

	const callUpdateForm = (e) => {
		setCallForm(true)
	}

	const handleChange = (e) => {
		if (e.target.name === 'nickname') {
			setNickname(e.target.value);
		} else if (e.target.name === 'email') {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "avatar") {
			setAvatar(e.target.value);
		} else if (e.target.name === "dob") {
			setDob(e.target.value);
		} else if (e.target.value === "female") {
			setGender(false);
		} else if (e.target.value === "male") {
			setGender(true);
		}
	}

	const handleSubmit = async () => {

		await axios.put(`http://localhost:8000/users/${userID}`, {
			nickname: nickname,
			email: email,
			password: password,
			avatar: avatar,
			dob: dob,
			gender: gender
		})
			.then(res => {
				console.log("successfully logged in")//if signup is ok
			}).catch(err => console.log(err))
		console.log(nickname, email, password, avatar, dob, gender)
		navigate("/");
	}



	return (
		<div>

			<h1>Profile Page</h1>
			<p className="welcome">{`You are authenticated, welcome ${userNickname} ! `}</p>
			<img src={userAvatar} />
			<br />
			{/* <button onClick={handleChange}>Update Profile</button> */}
			<div>
				<h2>This is your profile:</h2>
				<Container maxWidth="sm">
					<Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} >
						<Grid container spacing={2}>
							<Grid item xs={4}>
								Nickname:
							</Grid>
							<Grid item xs={8}>
								{userNickname}
							</Grid>
							<Grid item xs={4}>
								Email:
							</Grid>
							<Grid item xs={8}>
								{userEmail}
							</Grid>
							<Grid item xs={4}>
								Password:
							</Grid>
							<Grid item xs={8}>
								Password is protected. Rest easy tonight!
							</Grid>
							<Grid item xs={4}>
								Avatar:
							</Grid>
							<Grid item xs={8}>
								<img src={userAvatar} />
							</Grid>
							<Grid item xs={4}>
								Date of birth:
							</Grid>
							<Grid item xs={8}>
								{userDob}
							</Grid>
							<Grid item xs={4}>
								Gender:
							</Grid>
							<Grid item xs={8}>
								{userGender}
							</Grid>
						</Grid>
					</Box>
				</Container>
				<br />
				<button onClick={callUpdateForm}>Update</button>

				{
					callForm ?
						<div id="signup-box">
							<img src="./bubbletealogo-edited-ps.png" className="logo" alt="logo" />
							<div className="left">
								<form onSubmit={handleSubmit}>
									<input type="text" name="nickname" required
										autoComplete="off" className="register-inputs" value={nickname} onChange={handleChange} placeholder="Nickname" />
									<input type="text" name="email" required
										autoComplete="off" className="register-inputs" value={email} onChange={handleChange} placeholder="E-mail" />
									{/* <input type="password" name="password" required
										autoComplete="off" className="register-inputs" value={password} onChange={handleChange} placeholder="Password" /> */}
									<Box sx={{ minWidth: 120 }}>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">Avatar</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												name="avatar"
												value={avatar}
												label="avatar"
												onChange={handleChange}
											>
												<MenuItem value={"https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAboy01.png?alt=media&token=d48c7389-f88b-4be1-b17e-33971a1b6484"}><img src="https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAboy01.png?alt=media&token=d48c7389-f88b-4be1-b17e-33971a1b6484" /></MenuItem>
												<MenuItem value={"https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAboy02.png?alt=media&token=67f03abd-bbd2-4d11-bd19-4ef73b619a7e"}><img src="https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAboy02.png?alt=media&token=67f03abd-bbd2-4d11-bd19-4ef73b619a7e" /></MenuItem>
												<MenuItem value={"https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAgirl01.png?alt=media&token=58ca9749-b191-4188-9316-597e3785bb5f"}><img src="https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAgirl01.png?alt=media&token=58ca9749-b191-4188-9316-597e3785bb5f" /></MenuItem>
												<MenuItem value={"https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAgirl03.png?alt=media&token=107811da-cbc0-4dd5-a8bb-514dd8661cc1"}><img src="https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetAgirl03.png?alt=media&token=107811da-cbc0-4dd5-a8bb-514dd8661cc1" /></MenuItem>
												<MenuItem value={"https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetBgirl02.png?alt=media&token=4896a635-22f2-4c25-a67c-2e66b2c65d35"}><img src="https://firebasestorage.googleapis.com/v0/b/bubbletea-3e3a7.appspot.com/o/avatar%2FsetBgirl02.png?alt=media&token=4896a635-22f2-4c25-a67c-2e66b2c65d35" /></MenuItem>
											</Select>
										</FormControl>
									</Box>
									<br />
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DatePicker']}>
											{/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
											<DatePicker
												label="Date of birth"
												name="dob"
												value={dob}
												onChange={(newValue) => setDob(newValue)}
											/>
										</DemoContainer>
									</LocalizationProvider>
									<br />
									<FormControl>
										<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
										<RadioGroup
											aria-labelledby="demo-radio-buttons-group-label"
											defaultValue="false"


										/* 	name="radio-buttons-group" */
										/* value={gender} */
										>
											<FormControlLabel name="gender" value="female" control={<Radio onChange={(newValue) => setGender(false)} />} label="Female" />
											<FormControlLabel name="gender" value="male" control={<Radio onChange={(newValue) => setGender(true)} />} label="Male" />
										</RadioGroup>
									</FormControl>

									<br />
									<button type="submit" name="signup_submit" value="Sign me up">Submit</button>

								</form>
							</div>
						</div>
						: ""

				}


			</div >
		</div >
	)
}

export default Profile;
