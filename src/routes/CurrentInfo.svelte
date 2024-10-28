<script>
	import { selectedItemStore } from '$lib/stores/store'; 
	import { onDestroy } from 'svelte';
    import {Skeleton} from "$lib/components/ui/skeleton"
	let selectedItem = null;

	const unsubscribe = selectedItemStore.subscribe((value) => {
		selectedItem = value;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="m-2 p-2">
	{#if selectedItem}
		<div>
			<h1 class="font-bold">{selectedItem.typ === 'search' ? 'Search Results:' : 'Selected Info:'}</h1>
			
			<p><strong>Latitude:</strong> {selectedItem.lat}</p>
			<p><strong>Longitude:</strong> {selectedItem.lng}</p>
			<p><strong>Address:</strong> {selectedItem.address}</p>
			<p><strong>Remarks:</strong> {selectedItem.remarks}</p>
		</div>
	{:else}
	<div class="flex items-center space-x-4">
		<Skeleton class="h-12 w-12 rounded-full" />
		<div class="space-y-2">
		  <Skeleton class="h-4 w-[250px]" />
		  <Skeleton class="h-4 w-[200px]" />
		</div>
	  </div>
	  {/if}
</div>
