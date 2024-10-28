// src/store.ts
import { writable } from 'svelte/store';

interface Coordinates {
	lat: number | null;
	lng: number | null;
}

export const coordinates = writable<Coordinates>({ lat: null, lng: null });
export const selectedItemStore = writable(null);

// Check if listData exists in localStorage and parse it safely
const storedData = typeof window !== 'undefined' ? localStorage.getItem('listData') : null;
const initialListData = storedData ? (JSON.parse(storedData) as unknown) : [];

// Verify if parsed data is an array before using it
export const listData = writable(Array.isArray(initialListData) ? initialListData : []);

// Sync with localStorage whenever listData changes
listData.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('listData', JSON.stringify(value));
	}
});
