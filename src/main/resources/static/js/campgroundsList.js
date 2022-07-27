
let state = document.getElementById("stateAbr").innerText
async function getCampgrounds(){
	
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
	if(campgrounds.length===0){
		let htmlSegment = 
			`<div class="text-center">
				<p class="fs-4 fst-italic text-color">*** No Campgrounds Available ***</p>
			</div>`
		html += htmlSegment;
	}
	for(let campground of campgrounds){
		if(campground.addresses.length>0){
			if(campground.addresses[0].stateCode===state){

				let images = campground.images;
				let image = "";
				let city = "";
				let state = "";
				let reservationInfo = "";
				
				if (images.length>=1){
					image = images[0].url;
				}else{
					image = "https://vipvoice.files.wordpress.com/2021/06/arrowhead.jpg";
				}
				
				if (campground.addresses.length>0){
					city = campground.addresses[0].city + ",";
					state = campground.addresses[0].stateCode;
				}
				
				if (campground.reservationInfo.length>0){
					reservationInfo = campground.reservationInfo;
				}
				
				let htmlSegment = 
					`<div class="campground">
						<div class="imgSize">
							<img class="listImg" src="${image}" alt="No Image Available"/>
						</div>
						<div class="listDetails">
							<div class="listHeader">
								<div>			
									<h3 class="">${campground.name}</h3>
									<p><i>${city} ${state}</i></p>
								</div>
								<div class="btnDiv">
									<a class="btn btn-dark" href="/campgrounds/details/${campground.id}">View details</a>
								</div>
							</div>
							<p>${reservationInfo}</p>
							<p>${campground.description}</p>
								
						</div>
					</div>`;
				html += htmlSegment;
			}else{
				let htmlSegment = 
					`<div class="text-center">
						<p class="fs-4 fst-italic text-color">*** No Campgrounds Available ***</p>
					</div>`
				html += htmlSegment;
				break;
			} 
		}else{
				let htmlSegment = 
					`<div class="text-center">
						<p class="fs-4 fst-italic text-color">*** No Campgrounds Available ***</p>
					</div>`
				html += htmlSegment;
				break;
		}

	}
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();