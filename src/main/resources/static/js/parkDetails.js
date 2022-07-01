/**
 * 
 */
async function getParks(){
	let parkCode = document.getElementById("parkCode").innerText;
	
	try {
		let res = await fetch("/api/parks/details/" + parkCode);
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

async function renderParks(){
	let parks = await getParks();
	let html = '';
	
	parks.forEach(park => {
		let activities = [];
		let images = [];
		let fees = "";
		let topics = [];
		let hours = "";
		let addresses = "";
		park.images.forEach(image => {
			images.push(image.url);
		})
		park.activities.forEach(activity => {
			activities.push(`<span class="btn btn-dark">${activity.name}</span>`);
		})
		park.entranceFees.forEach(fee => {
			let feeHtml = 
				`<p>${fee.title} - $${fee.cost}</p>`;
			fees += feeHtml;
		})
		park.topics.forEach(topic => {
			topics.push(`<span class="btn btn-dark">${topic.name}</span>`)
		})
		park.operatingHours.forEach(item => {
			let itemHtml =
			`<h3>${item.name}</h3>
			<p>Sunday - ${item.standardHours.sunday}</p>
			<p>Monday - ${item.standardHours.monday}</p>
			<p>Tuesday - ${item.standardHours.tuesday}</p>
			<p>Wednesday - ${item.standardHours.wednesday}</p>
			<p>Thursday - ${item.standardHours.thursday}</p>
			<p>Friday - ${item.standardHours.friday}</p>
			<p>Saturday - ${item.standardHours.saturday}</p>`;
			hours += itemHtml;
		})
		park.addresses.forEach(address => {
			let adrHtml =
			`<h3>${address.type}</h3>
			<p>${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}`;
			addresses += adrHtml;
		})
		let strActivities = activities.toString().replaceAll(",", " ");
		let strTopics = topics.toString().replaceAll(",", " ");
		let htmlSegment = 
			`<div class="parkDetails">						
				<div class="listHeader">
					<h1 class="listTitle">${park.fullName}</h1>
					<div>
						<button class="btn btn-dark" onclick="history.back()">Go Back</button>
					</div>
				</div>
				<div class="imgDiv">
					<img class="detailsImg" src="${park.images[0].url}"/>
				</div>
				<div class="listDetails">
					<h2>Park Details:</h2>
					<p>${park.description}</p>
					<h2>Activities:</h2>
					<p>${strActivities}</p>
					<h2>Topics:</h2>
					<p>${strTopics}</p>
					<h2>Entrance Fees:</h2>
					<p>${fees}</p>
					<h2>Operating Hours</h2>
					<p>${hours}</p>
					<h2>Addresses:</h2>
					<p>${addresses}</p>
					<h2>Park Information:</h2>
					<p>Website: <a href="${park.url}">${park.url}</a><br>
					Directions: <a href="${park.directionsURL}">Click for Directions</a><br>
					Phone Number: ${park.contacts.phoneNumbers[0].phoneNumber}<br>
					Email Address: ${park.contacts.emailAddresses[0].emailAddress}</p>
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();