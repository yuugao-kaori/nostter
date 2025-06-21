import { writable, type Writable } from 'svelte/store';
import type { Event } from '../routes/types';
import type { EventItem } from '$lib/Items';

export const events: Writable<EventItem[]> = writable([]);
export const eventsPool: Writable<EventItem[]> = writable([]);
export const searchEvents: Writable<Event[]> = writable([]);
export const userTimelineEvents: Writable<EventItem[]> = writable([]);
export const cachedEvents: Writable<Map<string, Event>> = writable(new Map());
