<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount, createEventDispatcher } from 'svelte';
	import { listData } from '$lib/stores/store';
	const dispatch = createEventDispatcher();

	let isLoading = true;

	// Example data format
	// data = [
	//     { lat: 12.9715987, lng: 77.594566, address: "Bangalore, India", remarks: "City center" },
	//     ...
	// ];

	// Simulate loading data
	// After loading, you could fetch data here
	setTimeout(() => (isLoading = false), 2000); // Adjust time as needed

	function selectItem(item) {
		// Emit the selected item to the parent component
		dispatch('select', item);
	}
</script>

<div>
	{#if isLoading}
		<!-- Display Skeletons while loading -->
		{#each Array(5) as _}
			<Skeleton height="2rem" class="my-2" />
			<Separator />
		{/each}
	{:else}
		<!-- Display Data when loaded -->
		{#each $listData as item, index}
			<button on:click={() => selectItem(item)} class="cursor-pointer p-2">
				<p><strong>Latitude:</strong> {item.lat}</p>
				<p><strong>Longitude:</strong> {item.lng}</p>
				<p><strong>Address:</strong> {item.address}</p>
				<p><strong>Remarks:</strong> {item.remarks}</p>
			</button>
			{#if index < $listData.length - 1}
				<Separator />
			{/if}
		{/each}
	{/if}
</div>

<style>
	.cursor-pointer:hover {
		background-color: #e0e0e0;
	}
	div {
		margin: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #f9f9f9;
	}

	.cursor-pointer:hover {
		background-color: #e0e0e0;
	}
</style>
