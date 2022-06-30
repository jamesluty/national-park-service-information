
async function getParks(){
	let state = document.getElementById("state").innerText
	
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
		let htmlSegment = 
			`<div class="park">
				<img class="listImg" src="${park.images[0].url}"/>
				<div class="listDetails">
					<h1 class="listTitle">${park.name}</h1>
					<p>${park.description}</p>
					<div class="btnDiv">
						<a class="btn btn-dark" href="/parks/details/${park.states}">View details</a>
					</div>						
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();