import React, { useEffect } from 'react';
import { ctfg } from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import Svelvet from "svelvet";
import { useState, useRef, MutableRefObject } from 'react';
import { Alert, Input, Select, Button, ButtonGroup } from 'flowbite-svelte';
import { error } from 'console';

type Node = {
  data: {
    label: string
  },
  position: {
    x: number
    y: number
  }
}

let evidence: string = '';
let source: number = 0;
let destination: number = 0;
let report: string = '';
let submittingFlag = true;

export default function MyComponent() {
  const [graph, setGraph] = useState<GetDiscoveredEvidenceResponse>({
    report: '',
    connections: [],
    evidence: []
  });
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const graphRef: MutableRefObject<GetDiscoveredEvidenceResponse> = useRef<GetDiscoveredEvidenceResponse>({
    report: '',
    connections: [],
    evidence: []
  });

  async function loadDiscoveredEvidence() {
    try {
      const resp = await ctfg.GetDiscoveredEvidence({});
      graphRef.current = resp;
      setGraph(resp);
      report = resp.report; // report is not a state variable, so we update it directly
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadDiscoveredEvidence();
  }, []);

  const nodes = graph.evidence.map((e) => {
    return {
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
    };
  });

  const edges = graph.connections.map(c => ({
    id: `${c.source}-${c.destination}`,
    source: c.source,
    target: c.destination
  }));

  function submitEvidence(remove: boolean) {
    ctfg.SubmitEvidence({
      evidence: evidence,
      x: 100,
      y: 100,
      isFlag: submittingFlag,
      remove: remove
    }).then(resp => {
      console.log(resp);
      loadDiscoveredEvidence().then(() => {
        setSuccessMsg('submitted evidence!');
      });
    }).catch(e => {
      console.error(e);
      setErrorMsg(e);
    });
  }

  function submitConnection(remove?: boolean) {
    ctfg.SubmitEvidenceConnection({
      source: source,
      destination: destination,
      remove: remove,
    }).then(resp => {
      loadDiscoveredEvidence().then(() => {
        setSuccessMsg('created connection!');
      });
    }).catch(e => {
      setErrorMsg(e);
    });
  }

  async function saveReport() {
    try {
      const resp = await ctfg.SubmitEvidenceReport({
        url: report
      });
      setSuccessMsg('saved report!')
    } catch (e) {
      setErrorMsg(e);
    }
  }

  return (
    <div>
      <div className="mb-3">
        {successMsg && <Alert color="green" dismissable>{successMsg}</Alert>}
        {errorMsg && <Alert color="red" dismissable>{errorMsg}</Alert>}
      </div>
      {/* <div class="mb-3">
        <label for="report">Report URL</label>
        <ButtonGroup class="w-full">
            <Input id="report" type="text" bind:value={$report} />
            <Button color="blue" on:click={saveReport}>Save</Button>
        </ButtonGroup>
    </div> */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-3">
            <label htmlFor="flag">Evidence</label>
            <Input id="flag" type="text" value={evidence} onChange={e => evidence = e.target.value} />
          </div>
          <div className="mb-3">
            <label htmlFor="submitting-flag">Submitting a flag?</label>
            <input id="submitting-flag" type="checkbox" checked={submittingFlag} onChange={e => submittingFlag = e.target.checked} />
          </div>
          <Button onClick={() => submitEvidence(false)}>Submit</Button>
          <Button color="red" onClick={() => submitEvidence(true)}>Delete</Button>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="source">Source</label>
            {graph.evidence && graph.evidence.length > 0 &&
              <Select id="source" items={graph.evidence.map(e => ({ value: e.id, name: e.name }))} value={source} onChange={e => source = e.target.value} />
            }
          </div>
          <div className="mb-3">
            <label htmlFor="destination">Destination</label>
            {graph.evidence && graph.evidence.length > 0 &&
              <Select id="source" items={graph.evidence.map(e => ({ value: e.id, name: e.name }))} value={destination} onChange={e => destination = e.target.value} />
            }
          </div>
          <Button onClick={() => submitConnection(false)}>Submit</Button>
          <Button color="red" onClick={() => submitConnection(true)}>Delete</Button>
        </div>
      </div>
      {nodes.length > 0 &&
        <Svelvet nodes={nodes} edges={edges} background />
      }
    </div>
  );
}