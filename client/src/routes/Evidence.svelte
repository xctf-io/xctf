<script lang="ts">
import {onMount} from 'svelte';
import {ctfg} from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import Svelvet from "svelvet";
import { writable, Writable, derived } from 'svelte/store';

let evidence: string = '';
let source: number = 0;
let destination: number = 0;

let graph: Writable<GetDiscoveredEvidenceResponse> = writable({
    connections: [],
    evidence: []
});

const initialNodes = derived(graph, $graph => $graph.evidence.map(e => ({
    id: e.id,
    data: { label: e.name },
    position: {
        x: 100,
        y: 100
    },
    height: 100,
    width: 100
})));

const initialEdges = derived(graph, $graph => $graph.connections.map(c => ({
    id: `${c.source}-${c.destination}`,
    source: c.source,
    target: c.destination
})));

onMount(async () => {
    try {
        const resp = await ctfg.GetDiscoveredEvidence({});
        graph.set(resp);
    } catch (e) {
        console.error(e);
        return;
    }
});

async function submitEvidence() {
    const resp = await ctfg.SubmitEvidence({
        evidence: evidence,
    })
    console.log(resp);
}

async function submitConnection() {
    const resp = await ctfg.SubmitEvidenceConnection({
        source: source,
        destination: destination
    })
    console.log(resp);
}
</script>

<div>
    <label for="flag">Evidence</label>
    <input id="flag" type="text" bind:value={evidence} />
    <button on:click={submitEvidence}>Submit</button>

    <div class="connection-input">
        <div>
            <label for="source">Source</label>
            <select id="source" bind:value={source}>
                {#if $graph !== null }
                {#each $graph.evidence as evidence}
                    <option value={evidence.id}>{evidence.name}</option>
                {/each}
                {/if}
            </select>
        </div>
        <div>
            <label for="destination">Destination</label>
            <select id="destination" bind:value={destination}>
                {#if $graph !== null }
                {#each $graph.evidence as evidence}
                    <option value={evidence.id}>{evidence.name}</option>
                {/each}
                {/if}
            </select>
        </div>
    </div>
    <button on:click={submitConnection}>Submit</button>
    {#if $initialNodes.length > 0}
        <Svelvet nodes={$initialNodes} edges={$initialEdges} background />
    {/if}
</div>

<style>
    .connection-input {
        display: flex;
    }

    .connection-input > div {
        width: 50%;
    }
</style>