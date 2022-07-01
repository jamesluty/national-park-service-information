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
		let amenities = [];
		
		let strAmenities = amenities.toString().replaceAll(",", ", ");
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
								<h5>Direction: </h5>
							</td>
							<td>
								<p class="p-3">${campground.directionsOverview}</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Fee: </h5>
							</td>
							<td>
								<p class="p-3">$${campground.fees[0].cost}</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Amenities: </h5>
							</td>
							<td>
								<p class="p-3">${campground.fees[0].description}</p>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Hours: </h5>
							</td>
							<td>
								<p class="p-3">Wednesday: ${campground.operatingHours[0].standardHours.wednesday}<br>
								Thursday: ${campground.operatingHours[0].standardHours.thursday}</p>
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