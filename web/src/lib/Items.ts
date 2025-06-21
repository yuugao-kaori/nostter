import { nip57, type Event, nip19 } from 'nostr-tools';
import type { pubkey } from './Types';
import { filterTags } from './EventHelper';

export interface Item {
	readonly event: Event;
}

export class EventItem implements Item {
	constructor(public readonly event: Event) {}

	public get replyToPubkeys(): pubkey[] {
		return [...new Set(filterTags('p', this.event.tags))];
	}
}

export class Metadata implements Item {
	public readonly content: MetadataContent | undefined;
	private _zapUrl: URL | null | undefined;
	constructor(public readonly event: Event) {
		try {
			this.content = JSON.parse(event.content);
		} catch (error) {
			console.warn('[invalid metadata item]', error, event);
		}
	}

	get name(): string {
		if (this.content?.name !== undefined && this.content.name !== '') {
			return this.content.name;
		} else if (this.content?.display_name !== undefined && this.content.display_name !== '') {
			return this.content.display_name;
		} else {
			return nip19.npubEncode(this.event.pubkey).slice(0, 'npub1'.length + 7);
		}
	}

	get displayName(): string {
		if (this.content?.display_name !== undefined && this.content.display_name !== '') {
			return this.content.display_name;
		} else if (this.content?.name !== undefined && this.content.name !== '') {
			return this.content.name;
		} else {
			return nip19.npubEncode(this.event.pubkey).slice(0, 'npub1'.length + 7);
		}
	}

	get picture(): string {
		return this.content?.picture !== undefined && this.content.picture !== ''
			? this.content.picture
			: `https://robohash.org/${nip19.npubEncode(this.event.pubkey)}?set=set4`;
	}

	get canZap(): boolean {
		return !(!this.content?.lud16 && !this.content?.lud06);
	}

	public async zapUrl(): Promise<URL | null> {
		if (this._zapUrl !== undefined) {
			return this._zapUrl;
		}

		const url = await nip57.getZapEndpoint(this.event);
		if (url !== null) {
			try {
				this._zapUrl = new URL(url);
			} catch (error) {
				console.warn('[invalid zap url]', url);
				this._zapUrl = null;
			}
		} else {
			this._zapUrl = null;
		}
		return this._zapUrl;
	}
}

export interface MetadataContent {
	name: string;
	display_name: string;
	nip05: string;
	picture: string;
	banner: string;
	website: string;
	about: string;
	lud06: string;
	lud16: string;
}
