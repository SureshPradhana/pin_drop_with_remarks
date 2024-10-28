<script>
	import { selectedItemStore } from '$lib/stores/store'; 
	import { onDestroy } from 'svelte';

	let selectedItem = null;

	const unsubscribe = selectedItemStore.subscribe((value) => {
		selectedItem = value;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div>
	{#if selectedItem}
		<div>
			<h1>{selectedItem.typ === 'search' ? 'Search Results:' : 'Selected Info:'}</h1>
			<p>Latitude: {selectedItem.lat}</p>
			<p>Longitude: {selectedItem.lng}</p>
			<p>Address: {selectedItem.address}</p>
			<p>Remarks: {selectedItem.remarks}</p>
		</div>
	{/if}
</div>
