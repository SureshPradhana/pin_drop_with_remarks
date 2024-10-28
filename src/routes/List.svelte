<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount, createEventDispatcher } from 'svelte';
	import { listData } from '$lib/stores/store';
	const dispatch = createEventDispatcher();

	let isLoading = true;

	setTimeout(() => (isLoading = false), 2000); 

	function selectItem(item) {
		dispatch('select', item);
	}
</script>
<div>
	{#if isLoading}
		{#each Array(5) as _}
			<div class="flex items-center space-x-4">
				<Skeleton class="h-12 w-12 rounded-full" />
				<div class="space-y-2">
				  <Skeleton class="h-4 w-[250px]" />
				  <Skeleton class="h-4 w-[200px]" />
				</div>
			  </div>
		{/each}
	{:else}
		<!-- Display Data when loaded -->
		{#each $listData as item, index}
			<button on:click={() => selectItem(item)} class="cursor-pointer p-2 text-left">
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
