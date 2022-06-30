
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
				<p>${park.name}</p>
				<p>${park.fullName}</P>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();