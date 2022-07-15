let id = document.getElementById("id").innerText;
async function getCampgrounds(){
	
	
	try {
		let res = await fetch("/api/campgrounds/details/" + id);
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

let photo = [];
let count = 0;

async function renderCampgrounds(){
	let campgrounds = await getCampgrounds();
	let html = '';
	for (let campground of campgrounds) {
		if(campground.id === id){
			let fees = "";
			let hours = "";
			let addresses = "";
			let images = campground.images;
			let image = "";	
	
			if (images.length>=1){
				image = images[0].url;
				console.log(image)
			}else{
				image = "https://vipvoice.files.wordpress.com/2021/06/arrowhead.jpg";
			}
			
			campground.images.forEach(image => {
				photo.push(image.url);
			})	
			
			campground.fees.forEach(fee => {
				let feeHtml = 
					`<p><b>${fee.title}</b> - $${fee.cost} <br>
					${fee.description}<br></p>`;
				fees += feeHtml;
			})	
	
			campground.operatingHours.forEach(item => {
				let itemHtml =			
				`Sunday - ${item.standardHours.sunday}<br>
				Monday - ${item.standardHours.monday}<br>
				Tuesday - ${item.standardHours.tuesday}<br>
				Wednesday - ${item.standardHours.wednesday}<br>
				Thursday - ${item.standardHours.thursday}<br>
				Friday - ${item.standardHours.friday}<br>
				Saturday - ${item.standardHours.saturday}<br>
				<br>
				<i>*** ${item.description}</i>`;
				hours += itemHtml;
			})
			
			let campsites = 
				`Total Sites: ${campground.campsites.totalSites}</br>
				Group Sites: ${campground.campsites.group}</br>
				Tent Only: ${campground.campsites.tentOnly}</br>
				Electrical Hookups: ${campground.campsites.electricalHookups}</br>
				RV: ${campground.campsites.rvOnly}</br>
				Boat Access: ${campground.campsites.walkBoatTo}</br>`
			
			campground.addresses.forEach(address => {
				let adrHtml =
				`<h5>${address.type}</h5>
				<p>${address.line1} ${address.line2}, ${address.city}, ${address.stateCode}, ${address.postalCode}</p>`;
				addresses += adrHtml;
			})
			
			let amenities = 
				`Toilets - <i>${campground.amenities.toilets}</i><br>
				Internet Connectivity - <i>${campground.amenities.internetConnectivity}</i><br>
				Showers - <i>${campground.amenities.showers}</i><br>
				Potable Water - <i>${campground.amenities.potableWater}</i><br>
				Firewood for Sale - <i>${campground.amenities.firewoodForSale}</i><br>`
						
			
			let htmlSegment = 
				`<div class="campgroundDetails">
					<div class="listHeader">
						<h1 class="listTitle">${campground.name}</h1>	
						<div>
							<button class="btn btn-secondary" onclick="history.back()">Go Back</button>
							<a class="btn btn-secondary" href="/">Home</a>
						</div>									
					</div>
					<div class="imgDiv">
						<button class="btn btn-secondary" onclick="imgLeft()"><</button>
						<div id="rotateImg">					
							<img id="detailsImg" src="${campground.images[0].url}"/>
						</div>
						<button class="btn btn-secondary" onclick="imgRight()">></button>
					</div>
					<div class="listDetails">
						<div class="detailDiv">							
							<h5>Overview: </h5>							
							<p>${campground.description}</p>
						</div>
						<div class="detailDiv">
							<h5>Operating Hours: </h5>			
							<div class="pDiv">
								<p>${hours}</p>
							</div>
						</div>						
						<div class="detailDiv">							
							<h5>Reservation:</h5>							
							<div>
								<p>${campground.reservationInfo}
								<a class="btn btn-outline-primary" href="https://www.recreation.gov/camping/campgrounds/275085">Reserve</a>
								<a class="btn btn-outline-dark" href="https://www.nps.gov/laro/planyourvisit/cg-regulations.htm">Regulations</a>
								</p>
							</div>
						</div>
						<div class="detailDiv">							
							<h5>Campsites:</h5>					
							<div>
								<p>${campsites}</p>
							</div>
						</div>
						<div class="detailDiv">							
							<h5>Fee:</h5>					
							<div>
								${fees}
							</div>
						</div>
						<div class="detailDiv">				
							<h5>Amenities:</h5>
							<div>
								<p>${amenities}</p>
							</div>
						</div>						
						<div class="detailDiv">							
							<h5>Addresses: </h5>
							<div class="pDiv">
								${addresses}
							</div>
						</div>
						<div class="detailDiv">
							<h5>Information:</h5>
							<div class="pDiv">
								<div>
									<a class="btn btn-outline-success" href="${campground.url}">Website</a><br>
									<a class="btn btn-outline-warning mt-2" href="${campground.directionsUrl}">Directions</a><br>
								</div>
								<br>
								<p>Phone Number: ${campground.contacts.phoneNumbers[0].phoneNumber}<br>
								Email Address: ${campground.contacts.emailAddresses[0].emailAddress}</p>
							</div>
						</div>						
					</div>
				</div>`;
			html = htmlSegment;
		}
	}
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();

function imgRight(){
	if(count === photo.length - 1){
		count = 0;
	} else {
		count++;	
	}
	
	console.log(count);
	document.getElementById("detailsImg").src = photo[count];
}

function imgLeft(){
	if(count === 0){
		count = photo.length - 1;
	} else {
		count--;
	}
	
	console.log(count);
	document.getElementById("detailsImg").src = photo[count];
}