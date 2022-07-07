async function getParks(){
	let parkCode = document.getElementById("parkCode").innerText;
	
	try {
		let res = await fetch("/api/parks/details/" + parkCode);
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

let images = [];
let count = 0;

async function renderParks(){
	let parks = await getParks();
	let html = '';
	
	parks.forEach(park => {
		let activities = [];
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
				`<p><b>${fee.title}</b> - $${fee.cost}<br> 
					${fee.description}</p>`;
			fees += feeHtml;
		})
		park.topics.forEach(topic => {
			topics.push(`<span class="btn btn-dark">${topic.name}</span>`)
		})
		park.operatingHours.forEach(item => {
			let itemHtml =
			`<h3>${item.name}</h3>
			<p>Sunday - ${item.standardHours.sunday}<br>
			Monday - ${item.standardHours.monday}<br>
			Tuesday - ${item.standardHours.tuesday}<br>
			Wednesday - ${item.standardHours.wednesday}<br>
			Thursday - ${item.standardHours.thursday}<br>
			Friday - ${item.standardHours.friday}<br>
			Saturday - ${item.standardHours.saturday}</p>
			<span class="description">***<i>${item.description}</i><span>
			<p></p>`;
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
						<button class="btn btn-secondary" onclick="history.back()">Go Back</button>
						<a class="btn btn-secondary" href="/">Home</a>
					</div>
				</div>
				<div class="imgDiv">
					<button class="btn btn-secondary" onclick="imgLeft()">Prev</button>
					<div id="rotateImg">
						<img id="detailsImg" src="${park.images[count].url}"/>
					</div>
					<button class="btn btn-secondary" onclick="imgRight()">Next</button>
				</div>
				<div class="listDetails">
					<div class="detailDiv">
						<h3>Park Details:</h3>
						<p>${park.description}</p>
					</div>
					<div class="detailDiv">
						<h3>Activities:</h3>
						<p>${strActivities}</p>
					</div>
					<div class="detailDiv">
						<h3>Topics:</h3>
						<p>${strTopics}</p>
					</div>
					<div class="detailDiv">
						<h3>Entrance Fees:</h3>
						<div class="pDiv">
							${fees}
						</div>
					</div>
					<div class="detailDiv">
						<h3>Operating Hours:</h3>
						<div class="pDiv">
							${hours}
						</div>
					</div>
					<div class="detailDiv">
						<h3>Addresses:  </h3>
						<div class="pDiv">
							${addresses}
						</div>
					</div>
					<div class="detailDiv">
						<h3>Information:</h3>
						<div class="pDiv">
							<div>
								<a class="link btn btn-outline-primary" href="${park.url}">Website</a><br>
								<a class="link btn btn-outline-dark"" href="${park.directionsUrl}">Directions</a><br>
							</div>
							<p>Phone Number: ${park.contacts.phoneNumbers[0].phoneNumber}<br>
							Email Address: ${park.contacts.emailAddresses[0].emailAddress}</p>
						</div>
					</div>
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();


function imgRight(){
	if(count === images.length - 1){
		count = 0;
	} else {
		count++;	
	}
	
	console.log(count);
	document.getElementById("detailsImg").src = images[count];
}

function imgLeft(){
	if(count === 0){
		count = images.length - 1;
	} else {
		count--;
	}
	
	console.log(count);
	document.getElementById("detailsImg").src = images[count];
}