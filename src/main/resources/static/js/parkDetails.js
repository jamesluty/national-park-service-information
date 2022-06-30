/**
 * 
 */
async function getParks(){
	let state = document.getElementById("parkCode").innerText;
	
	try {
		let res = await fetch("/api/parks/" + state.substring(0,2));
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
		park.activities.forEach(activity => {
			activities.push(activity.name);
		})
		let strActivities = activities.toString().replaceAll(",", ", ");
		let htmlSegment = 
			`<div class="park">
				<img class="listImg" src="${park.images[0].url}"/>
				<div class="listDetails">
					<div class="listHeader">
						<h1 class="listTitle">${park.name}</h1>
						<div>
							<a class="btn btn-dark" href="/parks/details/${park.parkCode}">View details</a>
						</div>						
					</div>
					<p>${park.description}</p>
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();