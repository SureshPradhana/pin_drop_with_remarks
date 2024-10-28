<script lang="ts">
	import List from './List.svelte';
	import SearchComponent from './SearchComponent.svelte';
	import CurrentInfo from './CurrentInfo.svelte';
	import { coordinates } from '$lib/stores/store';
	import { selectedItemStore } from '$lib/stores/store'; 
	import { onDestroy } from 'svelte';
	import Map from './Map.svelte';
 export let data;
	let selectedItem: { lat: number; lng: number; address: string; remarks: string } | null = null;
	const unsubscribe = selectedItemStore.subscribe((value) => {
		selectedItem = value;
	});

	onDestroy(() => {
		unsubscribe(); 
	});

	function handleSelect(event: CustomEvent) {
		const newSelectedItem = event.detail;
		selectedItemStore.set(newSelectedItem);
		const { lat, lng } = newSelectedItem;
		coordinates.set({ lat, lng });
	}
  </script>
  
<div class="flex flex-col md:flex-row">
	<Map {data} />
	<div class="p-4 border border-gray-200 shadow-lg rounded-lg">
		<SearchComponent {data} />
		<CurrentInfo />
		<List on:select={handleSelect} />
	</div>
</div>
