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
			let phoneNumber = "";
			let emailAddress = "";
			let hours = "";
			let reservationUrl = "";
			let regulationsurl = "";
			let reservationInfo = "";
			let addresses = "";
			let url = "";
			let directionsUrl = "";
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
			
			
			if(campground.contacts.phoneNumbers.length>=1){
				phoneNumber = campground.contacts.phoneNumbers[0].phoneNumber;
			}else{
				phoneNumber = "<i>Not Available</i>";
			}
			
			
			if(campground.contacts.emailAddresses.length>=1){
				emailAddress = campground.contacts.emailAddresses[0].emailAddress;
			}else{
				emailAddress = "<i>Not Available</i>";
			}
			
			
			if (campground.fees.length>=1){
				campground.fees.forEach(fee => {
					let feeHtml = 
						`<p><b>${fee.title}</b> - $${fee.cost} <br>
						${fee.description}<br></p>`;
					fees += feeHtml;
				})				
			}else{
				fees = "<i>Not Available</i>";
			}
	
	
			if (campground.operatingHours.length>=1){
				campground.operatingHours.forEach(item => {
					let itemHtml =			
					`<h5>${item.name}</h5>
					<p class="margin-zero">Sunday - ${item.standardHours.sunday}<br>
					Monday - ${item.standardHours.monday}<br>
					Tuesday - ${item.standardHours.tuesday}<br>
					Wednesday - ${item.standardHours.wednesday}<br>
					Thursday - ${item.standardHours.thursday}<br>
					Friday - ${item.standardHours.friday}<br>
					Saturday - ${item.standardHours.saturday}</p>
					<p class="margin-desc"><i>*** ${item.description}</i></p>`;
					hours += itemHtml;
				})				
			}else{
				hours = "<i>Not Available</i>";
			}
			

			if (campground.reservationUrl.length>=1){
				reservationUrl = `<a class="btn btn-outline-primary" href="${campground.reservationUrl}">Reservation</a><br>`
			}else{
				reservationUrl = "<i>Not Available</i>";
			}	
			
			if (campground.regulationsurl.length>=1){
				regulationsurl = `<a class="btn btn-outline-dark" href="${campground.regulationsurl}">Regulations</a><br>`
			}
			if (campground.reservationInfo.length>=1){
				reservationInfo = "*** " + campground.reservationInfo;
			}
			
			let campsites = 
				`Total Sites: ${campground.campsites.totalSites}</br>
				Group Sites: ${campground.campsites.group}</br>
				Tent Only: ${campground.campsites.tentOnly}</br>
				Electrical Hookups: ${campground.campsites.electricalHookups}</br>
				RV: ${campground.campsites.rvOnly}</br>
				Boat Access: ${campground.campsites.walkBoatTo}</br>`
							

			let amenities = 
				`Toilets - <i>${campground.amenities.toilets}</i><br>
				Internet Connectivity - <i>${campground.amenities.internetConnectivity}</i><br>
				Showers - <i>${campground.amenities.showers}</i><br>
				Potable Water - <i>${campground.amenities.potableWater}</i><br>
				Firewood for Sale - <i>${campground.amenities.firewoodForSale}</i><br>`
				
							
			if (campground.addresses.length>0){
				campground.addresses.forEach(address => {
					if (address.line1.length>=1){
						let adrHtml =
						`<h5>${address.type}</h5>
						<p>${address.line1} ${address.line2}, ${address.city}, ${address.stateCode}, ${address.postalCode}</p>`;
						addresses += adrHtml;
					} else{
						let adrHtml =
						`<h5>${address.type}</h5>
						<p>${address.city}, ${address.stateCode}, ${address.postalCode}</p>`;
						addresses += adrHtml;
					}
					
				})
			}else{
				addresses = "<i>Not Available</i>";
			}


			
			if (campground.url.length>=1){
				url = `<a class="btn btn-outline-success" href="${campground.url}">Website</a>`
			}	
			
			if (campground.directionsUrl.length>=1){
				directionsUrl = `<a class="btn btn-outline-warning" href="${campground.directionsUrl}">Directions</a>`
			}	
			
			let htmlSegment = 
				`<div class="campgroundDetails">
					<div class="listHeader">
						<h1 class="detailsTitle">${campground.name}</h1>	
						<div>
							<button class="btn btn-secondary" onclick="history.back()">Go Back</button>
							<a class="btn btn-secondary" href="/">Home</a>
						</div>									
					</div>
					<div class="imgDiv">
						<button class="btn btn-secondary" onclick="imgLeft()"><</button>
						<div id="rotateImg">					
							<img id="detailsImg" src="${image}"/>
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
								${hours}
							</div>
						</div>						
						<div class="detailDiv">							
							<h5>Reservation:</h5>							
							<div>
								<div class="d-flex align-items-center mb-2">
									${reservationUrl}&nbsp${regulationsurl}
								</div>
								<p><i> ${reservationInfo}</i></p>
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
							<h5>Address: </h5>
							<div class="pDiv">
								${addresses}
							</div>
						</div>
						<div class="detailDiv">
							<h5>Information:</h5>
							<div>
								<div class="d-flex align-items-center mt-2 mb-2">
									${url}&nbsp${directionsUrl}
								</div>	
								<p><b>Phone Number:</b> ${phoneNumber}<br>
								<b>Email Address:</b> ${emailAddress}</p>
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