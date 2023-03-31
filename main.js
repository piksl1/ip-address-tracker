//map api
let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker([51.5, -0.09]).addTo(map);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

// IP API
async function getIpInfo(ipAddress) {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_FYrmoB7DGV17bbyAoMtUUmplQKzlj&ipAddress=${ipAddress}`
  );
  const data = await response.json();
  return {
    ip: data.ip,
    location: {
      lat: data.location.lat,
      lng: data.location.lng,
      timezone: data.location.timezone,
      city: data.location.city,
      region: data.location.region,
      postalCode: data.location.postalCode,
    },
    isp: data.isp,
  };
}

async function showIpAddress() {
  const ipAddress = document.getElementById("search-input").value;
  const ipInfo = await getIpInfo(ipAddress);
  updateIpInfo(ipInfo);

  const lat = ipInfo.location.lat;
  const lng = ipInfo.location.lng;
  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

function updateIpInfo(ipInfo) {
  document.getElementById("ip-address").textContent = ipInfo.ip;
  document.getElementById(
    "location"
  ).textContent = `${ipInfo.location.city}, ${ipInfo.location.region} ${ipInfo.location.postalCode}`;
  document.getElementById(
    "timezone"
  ).textContent = `UTC ${ipInfo.location.timezone}`;
  document.getElementById("isp").textContent = ipInfo.isp;
}

document.getElementById("show-ip-btn").addEventListener("click", showIpAddress);
