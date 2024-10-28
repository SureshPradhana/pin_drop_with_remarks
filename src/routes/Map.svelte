<script context="module">
	import maplibregl from 'maplibre-gl';
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { coordinates } from '$lib/stores/store';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	let map;
	let marker;
	let drawerOpen = false;
	let remarks = '';
	$: ({ lat: latt, lng: lngg } = $coordinates);

	onMount(async () => {
		map = new maplibregl.Map({
			container: 'map',
			style:
				'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
			center: [lngg, latt],
			zoom: 8
		});

		marker = new maplibregl.Marker().setLngLat([lngg, latt]).addTo(map);
		map.on('click', (e) => {
			const clickedLngLat = e.lngLat; 
			lngg = clickedLngLat.lng; 
			latt = clickedLngLat.lat;

			marker.setLngLat(clickedLngLat);

			coordinates.set({ lat: latt, lng: lngg });

			setTimeout(() => {
				remarks = ''; 
				drawerOpen = true; 
			}, 1000);
		});
	});

	$: if (map) {
		map.setCenter([lngg, latt]);
		marker.setLngLat([lngg, latt]);
	}

	async function fetchAddress(lat: number, lng: number): Promise<string> {
		const response = await fetch(
			`https://api.maptiler.com/geocoding/${lng},${lat}.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL`
		);
		const data = await response.json();
		return data.features.length > 0 ? data.features[0].place_name : 'Unknown location';
	}

	async function handleSubmit() {
		const address = await fetchAddress(latt, lngg);

		const data = {
			remarks,
			lat: latt,
			lng: lngg,
			address
		};

		const existingData = JSON.parse(localStorage.getItem('listData') || '[]');

		existingData.push(data);
		localStorage.setItem('listData', JSON.stringify(existingData));

		console.log('Submitted data:', data);
		drawerOpen = false;
	}
</script>

<div class="magical-tracker">
	<div id="map" style="width: 100%; height: 400px;"></div>
	<Drawer.Root open={drawerOpen} onOpenChange={(open) => (drawerOpen = open)}>
		<Drawer.Content>
			<div class="mx-auto w-full max-w-sm">
				<Drawer.Header>
					<Drawer.Title>Enter Remarks</Drawer.Title>
				</Drawer.Header>
				<div class="p-4 pb-0">
					<textarea
						placeholder="Optional remarks..."
						bind:value={remarks}
						rows="4"
						style="width: 100%; resize: none;"
					></textarea>
				</div>
				<Drawer.Footer>
					<Button on:click={handleSubmit}>Submit</Button>
					<Drawer.Close asChild let:builder>
						<Button builders={[builder]} variant="outline">Cancel</Button>
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>

<style>
	.magical-tracker {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	#map {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		position: relative;
		z-index: 1;
	}

	
</style>
