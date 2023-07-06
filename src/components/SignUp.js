import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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

import "./SignUp.css"



const SignUp = () => {

	const navigate = useNavigate();

	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");




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

		await axios.post("http://localhost:8000/users/newUser", {
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
		navigate("/home");
	}



	return (
		<div>
			<div id="signup-box">
				<img src="./bubbletealogo-edited-ps.png" className="logo" alt="logo" />
				<div className="left">
					<h1>Sign up</h1>
					<form onSubmit={handleSubmit}>
						<input type="text" name="nickname" required
							autoComplete="off" className="register-inputs" value={nickname} onChange={handleChange} placeholder="Nickname" />
						<input type="text" name="email" required
							autoComplete="off" className="register-inputs" value={email} onChange={handleChange} placeholder="E-mail" />
						<input type="password" name="password" required
							autoComplete="off" className="register-inputs" value={password} onChange={handleChange} placeholder="Password" />
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

				{/* <div className="right">
					<span className="loginwith">Sign in with<br />social network</span>

					<button className="social-signin facebook">Log in with facebook</button>
					<button className="social-signin twitter">Log in with Twitter</button>
					<button className="social-signin google">Log in with Google+</button>
				</div>
				<div className="or">OR</div> */}
			</div>


		</div>
	)
}

export default SignUp;