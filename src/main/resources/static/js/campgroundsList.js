
async function getCampgrounds(){
	let state = document.getElementById("state").innerText
	
	try {
		let res = await fetch("/api/campgrounds/" + state.substring(0,2));
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

async function renderCampgrounds(){
	let campgrounds = await getCampgrounds();
	let html = '';
	campgrounds.forEach(campground => {
		let images = campground.images;
		let image = "";
		if (images[0]){
			image = images[0].url;
			console.log(image)
		}
		let htmlSegment = 
			`<div class="campground">
				<img class="listImg" src="${image}" alt="No Image Available"/>
				<div class="listDetails">
					<div class="listHeader">			
						<h2 class="listTitle">${campground.name}</h2>
						<div class="btnDiv">
							<a class="btn btn-dark" href="/campgrounds/details/${campground.id}">View details</a>
						</div>
					</div>
					<p>${campground.reservationInfo}</p>
					<p>${campground.description}</p>
						
				</div>
			</div>`;
		html += htmlSegment;

	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();