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
		let phoneNumber = "";
		let emailAddress = "";
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
		if(park.contacts.phoneNumbers.length>0){
			phoneNumber = park.contacts.phoneNumbers[0].phoneNumber;
		} else {
			phoneNumber = "<i>Not Available</i>"
		}
		if(park.contacts.emailAddresses.length>0){
			emailAddress = park.contacts.emailAddresses[0].emailAddress;
		} else {
			emailAddress = "<i>Not Available</i>"
		}
		park.operatingHours.forEach(item => {
			let itemHtml =
			`<h5>${item.name}</h5>
			<p>Sunday - ${item.standardHours.sunday}<br>
			Monday - ${item.standardHours.monday}<br>
			Tuesday - ${item.standardHours.tuesday}<br>
			Wednesday - ${item.standardHours.wednesday}<br>
			Thursday - ${item.standardHours.thursday}<br>
			Friday - ${item.standardHours.friday}<br>
			Saturday - ${item.standardHours.saturday}</p>
			<span class="description">*** <i>${item.description}</i><span>
			<p></p>`;
			hours += itemHtml;
		})
		park.addresses.forEach(address => {
			let adrHtml =
			`<h5>${address.type}</h5>
				<p>${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}`;
			addresses += adrHtml;
		})
		let strActivities = activities.toString().replaceAll(",", " ");
		let strTopics = topics.toString().replaceAll(",", " ");
		let htmlSegment = 
			`<div class="parkDetails">						
				<div class="listHeader">
					<h1 class="detailsTitle">${park.fullName}</h1>
					<div>
						<button class="btn btn-secondary" onclick="history.back()">Go Back</button>
						<a class="btn btn-secondary" href="/">Home</a>
					</div>
				</div>
				<div class="imgDiv">
					<button class="btn btn-secondary" onclick="imgLeft()"><</button>
					<div id="rotateImg">
						<img id="detailsImg" src="${park.images[count].url}"/>
					</div>
					<button class="btn btn-secondary" onclick="imgRight()">></button>
				</div>
				<div class="listDetails">
					<div class="detailDiv">
						<h5>Park Details:</h5>
						<p>${park.description}</p>
					</div>
					<div class="detailDiv">
						<h5>Activities:</h5>
						<p>${strActivities}</p>
					</div>
					<div class="detailDiv">
						<h5>Topics:</h5>
						<p>${strTopics}</p>
					</div>
					<div class="detailDiv">
						<h5>Entrance Fees:</h5>
						<div class="pDiv">
							${fees}
						</div>
					</div>
					<div class="detailDiv">
						<h5>Operating Hours:</h5>
						<div class="pDiv">
							${hours}
						</div>
					</div>
					<div class="detailDiv">
						<h5>Addresses:  </h5>
						<div class="pDiv">
							${addresses}
						</div>
					</div>
					<div class="detailDiv">
						<h5>Information:</h5>
						<div class="pDiv">
							<div class=siteDiv>
								<a class="link btn btn-outline-success" href="${park.url}">Website</a><br>
								<a class="link btn btn-outline-warning" href="${park.directionsUrl}">Directions</a><br>
							</div>
							<p><b>Phone Number:</b> ${phoneNumber}<br>
							<b>Email Address:</b> ${emailAddress}</p>
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
	if(images.length>0){
		if(count === images.length - 1){
			count = 0;
		} else {
			count++;	
		}
		
		document.getElementById("detailsImg").src = images[count];
	}
}

function imgLeft(){
	if(images.length>0){
		if(count === 0){
			count = images.length - 1;
		} else {
			count--;
		}
		
		document.getElementById("detailsImg").src = images[count];
	}
}