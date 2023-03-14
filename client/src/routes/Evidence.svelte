<script lang="ts">
import {onMount} from 'svelte';
import {ctfg} from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import Svelvet from "svelvet";
import { writable, Writable, derived } from 'svelte/store';
import { Alert, Input, Select, Button, ButtonGroup, Checkbox } from 'flowbite-svelte';
  import { error } from 'console';

let evidence: string = '';
let source: number = 0;
let destination: number = 0;
let report: Writable<string> = writable('');
let submittingFlag = true;
let successMsg: Writable<string> = writable<string|null>(null);
let errorMsg: Writable<string> = writable<string|null>(null);
let selectedEvidence: Writable<string> = writable<string|null>(null);

let graph: Writable<GetDiscoveredEvidenceResponse> = writable({
    report: '',
    connections: [],
    evidence: []
});

type Node = {
    data: {
        label: string
    },
    position: {
        x: number
        y: number
    }
}

async function loadDiscoveredEvidence() {
    try {
        const resp = await ctfg.GetDiscoveredEvidence({});
        graph.set(resp);
        report.set(resp.report);
    } catch (e) {
        console.error(e);
        return;
    }
}

const graphData = derived(graph, $graph => {
    const nodes = $graph.evidence.map((e) => ({
        id: e.id,
        data: { label: e.name },
        position: {
            x: e.x,
            y: e.y
        },
        bgColor: e.challengeID ? '#B9F3E4' : 'white',
        height: 100,
        width: 100,
        clickCallback: async (node: Node) => {
            // try {
            //     const resp = await ctfg.SubmitEvidence({
            //         evidence: evidence,
            //         x: Math.floor(node.position.x),
            //         y: Math.floor(node.position.y),
            //         isFlag: submittingFlag,
            //         remove: false,
            //     })
            //     await loadDiscoveredEvidence();
            //     successMsg.set('submitted evidence');
            // } catch(e) {
            //     errorMsg.set(e)
            // }
        }
    }));

    const edges = $graph.connections.map(c => ({
        id: `${c.source}-${c.destination}`,
        source: c.source,
        target: c.destination
    }));

    return {
        nodes,
        edges
    }
});

onMount(async () => {
    await loadDiscoveredEvidence();
});

async function submitEvidence(remove: boolean) {
    try {
        const resp = await ctfg.SubmitEvidence({
            evidence: evidence,
            x: 100,
            y: 100,
            isFlag: submittingFlag,
            remove: remove
        });
        console.log(resp);
        await loadDiscoveredEvidence();
        successMsg.set('submitted evidence!');
    } catch (e) {
        console.error(e);
        errorMsg.set(e);
    }
}

async function submitConnection(remove?: boolean) {
    try {
        const resp = await ctfg.SubmitEvidenceConnection({
            source: source,
            destination: destination,
            remove: remove,
        })
        await loadDiscoveredEvidence();
        successMsg.set('created connection!');
    } catch (e) {
        errorMsg.set(e);
    }
}

async function saveReport() {
    try {
        const resp = await ctfg.SubmitEvidenceReport({
            url: $report
        });
        successMsg.set('saved report!');
    } catch (e) {
        errorMsg.set(e);
    }
}
</script>

<div>
    <div class="mb-3">
        {#if $successMsg}
            <Alert color="green" dismissable>{$successMsg}</Alert>
        {/if}
        {#if $errorMsg}
            <Alert color="red" dismissable>{$errorMsg}</Alert>
        {/if}
    </div>
    <!-- <div class="mb-3">
        <label for="report">Report URL</label>
        <ButtonGroup class="w-full">
            <Input id="report" type="text" bind:value={$report} />
            <Button color="blue" on:click={saveReport}>Save</Button>
        </ButtonGroup>
    </div> -->
    <div class="grid grid-cols-2 gap-4">
        <div>
            <div class="mb-3">
                <label for="flag">Evidence</label>
                <Input id="flag" type="text" bind:value={evidence} />
            </div>
            <div class="mb-3">
                <label for="submitting-flag">Submitting a flag?</label>
                <input id="submitting-flag" type="checkbox" bind:checked={submittingFlag}>
            </div>
            <Button on:click={() => submitEvidence(false)}>Submit</Button>
            <Button color="red" on:click={() => submitEvidence(true)}>Delete</Button>
        </div>
        <div>
            <div class="mb-3">
                <label for="source">Source</label>
                {#if $graph !== null }
                    <Select id="source" items={$graph.evidence.map(e => ({ value: e.id, name: e.name }))} bind:value={source} />
                {/if}
            </div>
            <div class="mb-3">
                <label for="destination">Destination</label>
                {#if $graph !== null }
                    <Select id="source" items={$graph.evidence.map(e => ({ value: e.id, name: e.name }))} bind:value={destination} />
                {/if}
            </div>
            <Button on:click={() => submitConnection(false)}>Submit</Button>
            <Button color="red" on:click={() => submitConnection(true)}>Delete</Button>
        </div>
    </div>
    {#if $graphData.nodes.length > 0}
        <Svelvet nodes={$graphData.nodes} edges={$graphData.edges} background />
    {/if}
</div>