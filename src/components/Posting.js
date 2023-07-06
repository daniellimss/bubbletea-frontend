import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import "./Posting.css";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Rating from '@mui/material/Rating';
import axios from "axios";

const accessToken = localStorage.getItem('token');
/* console.log(accessToken); */
const loggedInUser = localStorage.getItem('email')
/* console.log(loggedInUser); */
const userID = localStorage.getItem('userID')
/* console.log(userID); */
const user = localStorage.getItem('user');

const Posting = () => {

	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState(false);
	const [authToken, setAuthToken] = useState("");
	const [userNickname, setUserNickname] = useState("");

	/*Posting by user to show bought drink */
	const [title, setTitle] = useState("");
	const [drinksName, setDrinksName] = useState("");
	const [sugarLevel, setSugarLevel] = useState("");
	const [shopLocation, setShopLocation] = useState("");
	const [price, setPrice] = useState("");
	const [rating, setRating] = useState("");
	const [content, setContent] = useState("");
	const [postedDate, setPostedDate] = useState("");


	//Logic to upload image lines 42-52 
	//and from lines 72 to 110 (for my own reference)
	const [photoUrl, setPhotoUrl] = useState("");
	//state to store uploaded file
	const [file, setFile] = useState("");

	//state for upload progress
	/* 	const [percent, setPercent] = useState(""); */

	//handle file upload event and update state
	const handleChange = (e) => {
		if (e.target.name === "file") {
			setFile(e.target.files[0]);
		} else if (e.target.name === "title") {
			setTitle(e.target.value);
		} else if (e.target.name === "drinksName") {
			setDrinksName(e.target.value);
		} else if (e.target.name === "sugarLevel") {
			setSugarLevel(e.target.value);
		} else if (e.target.name === "shopLocation") {
			setShopLocation(e.target.value);
		} else if (e.target.name === "price") {
			setPrice(e.target.value);
		} else if (e.target.name === "rating") {
			setRating(e.target.value);
		} else if (e.target.name === "content") {
			setContent(e.target.value);
		} else if (e.target.name === "postedDate") {
			setPostedDate(e.target.value);
		}
	}

	/* const handleUpload = () => {
	 if (!file) {
		 alert("Please upload an image first!");
	 }
	 const storageRef = ref(storage, `/files/${file.name}`) */

	//progress can be paused and resumed. It also shows progress updates.

	//Receives the storage reference and the file to upload

	/* const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const percent = Math.round(
				(snapshot.bytesTransferred /
					snapshot.totalBytes) * 100
			); */
	//update progress;
	/* setPercent(percent);
},
(err) => console.log(err),
() => {
	//download url:
	getDownloadURL(uploadTask.snapshot.ref)
		.then((url) => {
			console.log(url);
			setUrl(url); */

	/* useEffect(() => {
		const pushImgUrl = async () => {
		}
	}, []) */
	/* });
}
);
} */

	//Upload image to firebase storage first 
	const handleSubmit = async (e) => {
		e.preventDefault();
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = await uploadBytesResumable(storageRef, file);
		const photoUrl = await getDownloadURL(storageRef)
		console.log(photoUrl);
		setPhotoUrl(photoUrl);

		if (accessToken) {
			setAuthenticated(true);

			/*Actual posting here */
			const makePosting = async () => {
				const tokenAuth = 'Bearer ' + localStorage.getItem('token')
				const dataPosted = await axios.post("http://localhost:8000/postings/posting",
					{
						userId: userID,
						title: title,
						drinksName: drinksName,
						sugarLevel: sugarLevel,
						shopLocation: shopLocation,
						photoUrl: photoUrl,
						price: price,
						rating: rating,
						content: content,
						postedDate: postedDate
					},
					{
						headers: {
							Authorization: tokenAuth
						},
					}
				)
					.then((res) => {
						console.log("posting submitted successfully");
						setTitle("");
						setDrinksName("");
						setSugarLevel("");
						setShopLocation("");
						setPhotoUrl("");
						setPrice("");
						setRating("");
						setContent("");
						setPostedDate("");
					})
					.catch((err) => {
						console.log(err, "error in posting")
					});
			}
			makePosting();
		}
		navigate('/home');
	}


	return (
		<div>
			<div id="signup-box">
				<h1>Posting</h1>
				<h2>Ready to showoff your drink?</h2>
				<div className="left">
					<form onSubmit={handleSubmit}>
						<input type="text" name="userID" className="register-inputs" value={userID} onChange={handleChange} placeholder="userID" />
						<input type="text" name="title" className="register-inputs" value={title} onChange={handleChange} placeholder="title" />
						<input type="text" name="drinksName" className="register-inputs" value={drinksName} onChange={handleChange} placeholder="drinks name" />
						<input type="number" name="sugarLevel" className="register-inputs" value={sugarLevel} onChange={handleChange} placeholder="sugar level percent" />
						<input type="text" name="shopLocation" className="register-inputs" value={shopLocation} onChange={handleChange} placeholder="shop location" />
						<input type="file" accept="/image/*" name="file" onChange={handleChange} className="register-inputs" value={photoUrl} placeholder="file" />
						{/* <button onClick={handleUpload}>Upload to Firebase</button> */}
						{/* <p>{percent}</p> */}
						<input type="number" className="register-inputs" value={price} name="price" onChange={handleChange} placeholder="price to nearest dollar" />

						<Rating
							name="rating"
							value={rating}
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
						/>
						{/* <input type="number" className="register-inputs" value={rating} name="rating" onChange={handleChange} placeholder="1-5 star rating" /> */}
						<textarea type="text" className="register-inputs" value={content} name="content" onChange={handleChange} placeholder="your review" />

						{/* <input type="date" className="register-inputs" value={postedDate} name="today's date" onChange={handleChange} placeholder="today's date" /> */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker']}>
								{/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
								<DatePicker
									label="Date of posting"
									name="Date of posting"
									value={postedDate}
									onChange={(newValue) => setPostedDate(newValue)}
								/>
							</DemoContainer>
						</LocalizationProvider>

						<br />
						<button type="submit">Submit</button>
					</form>
				</div>

				{/* <img src={url} /> */}
			</div>
		</div>

	)
}

export default Posting;


