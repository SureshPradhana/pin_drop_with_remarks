<script>
	let areaSearch = '';
	import { coordinates } from '$lib/stores/store';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { selectedItemStore } from '$lib/stores/store'; 
	export let data;
	let apikey =data.PUBLIC_MAPLIBRE_API

	async function searchArea(event) {
		event.preventDefault();
		const response = await fetch(
			`https://api.maptiler.com/geocoding/${encodeURIComponent(areaSearch)}.json?key=`+apikey
		);
		const data = await response.json();
		let place_name = data.features.length > 0 ? data.features[0].place_name : 'Unknown location';
		if (data.features && data.features.length > 0) {
			const { center } = data.features[0]; 
			const [lng, lat] = center;

			coordinates.set({ lat, lng });
			const selectedItem = {
				lat,
				lng,
				address: place_name,
				remarks: '',
				typ: 'search'
			};

			selectedItemStore.set(selectedItem);
		} else {
			alert('Location not found. Please try a different search.');
		}
	}
</script>

<div>
	<form class="flex w-full max-w-sm items-center space-x-2">
		<Input type="text" bind:value={areaSearch} placeholder="Enter Area/Location" />
		<Button type="submit" on:click={searchArea}>Search</Button>
	</form>
</div>

<style>
	
</style>
