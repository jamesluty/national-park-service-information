
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
		let htmlSegment = 
			`<div class="campground">
				<img class="listImg" src="${campground.images[0].url}"/>
				<div class="listDetails">
					<h1 class="listTitle">${campground.name}</h1>
					<p>${campground.description}</p>
					<div class="btnDiv">
						<a class="btn btn-dark" href="/campgrounds/details/${campground.states}">View details</a>
					</div>						
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();