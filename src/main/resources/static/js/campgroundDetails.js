async function getCampgrounds(){
	let id = document.getElementById("id").innerText;
	
	try {
		let res = await fetch("/api/campgrounds/details/" + id);
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

async function renderCampgrounds(){
	let campgrounds = await getCampgrounds();
	let html = '';
	for (let campground of campgrounds) {
		
//	campgrounds.forEach(campground => {
		let fees = "";
		let hours = "";
		let addresses = "";		
		
		campground.fees.forEach(fee => {
			let feeHtml = 
				`<p>${fee.title} - $${fee.cost} <br>
				${fee.description}</p>`;
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
		
		campground.addresses.forEach(address => {
			let adrHtml =
			`<h5>${address.type}</h5>
			${address.line1} ${address.line2}, ${address.city}, ${address.stateCode}, ${address.postalCode}`;
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
				<img class="detailImg" src="${campground.images[0].url}"/>
				<div class="listDetails">
					<div class="listHeader">
						<h1 class="listTitle">${campground.name}</h1>					
					</div>
					<table>
						<tr>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<td>
								<h5>Overview: </h5>
							</td>
							<td>							
								${campground.description}
							</td>
						</tr>
						<tr>
							<td>
								<h5>Operating Hours: </h5>
							</td>
							<td>
								<p class="mt-4 mb-4">${hours}</p>
							</td>
						</tr>						
						<tr>
							<td>
								<h5>Reservation: </h5>
							</td>
							<td>
								<p>${campground.reservationInfo}
								<a class="btn btn-outline-primary" href="https://www.recreation.gov/camping/campgrounds/275085">Reserve</a>
								<a class="btn btn-outline-dark" href="https://www.nps.gov/laro/planyourvisit/cg-regulations.htm">Regulations</a>
								</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Fee: </h5>
							</td>
							<td>
								<p>${fees}</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Amenities: </h5>
							</td>
							<td>
								<p>${amenities}</p>
							</td>
						</tr>						
						<tr>
							<td>
								<h5>Addresses: </h5>
							</td>
							<td>
								<p>${addresses}</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Information: </h5>
							</td>
							<td>
								<a class="btn btn-outline-success"https://www.recreation.gov/camping/campgrounds/246855">Website</a><br>
								<a class="btn btn-outline-warning mt-2"https://www.nps.gov/laro/planyourvisit/maps.htm">Directions</a><br>
								<i>*** ${campground.directionsOverview}</i>
								<br>
								<br>
								Phone Number: ${campground.contacts.phoneNumbers[0].phoneNumber}<br>
								Email Address: ${campground.contacts.emailAddresses[0].emailAddress}</p>
							</td>
						</tr>						

					</table>
				</div>
			</div>`;
		html = htmlSegment;
		break;

	}
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();