import React, { useCallback } from "react";
import { ctfg } from "../service";
import type { GetDiscoveredEvidenceResponse } from "../rpc/ctfg";
import ReactFlow, { Background, Controls, MarkerType, MiniMap, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Alert, TextInput, Select, Button, Checkbox } from 'flowbite-react';
import dagre from 'dagre';

let evidence: string = '';
let report: string = '';

export default function MyComponent() {
  const [graph, setGraph] = useState<GetDiscoveredEvidenceResponse>({
    report: '',
    connections: [],
    evidence: []
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittingFlag, setSubmittingFlag] = useState<boolean>(true);
  const [source, setSource] = useState<number>(0);
  const [destination, setDestination] = useState<number>(0);

  const graphRef: MutableRefObject<GetDiscoveredEvidenceResponse> = useRef<GetDiscoveredEvidenceResponse>({
    report: '',
    connections: [],
    evidence: []
  });

  const dagreGraph = new dagre.graphlib.Graph();
  const nodeWidth = 172;
  const nodeHeight = 36;
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const getLayoutedElements = (nodes, edges) => {
    dagreGraph.setGraph({ rankdir: 'TB' });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    dagre.layout(dagreGraph);
    
    nodes.forEach((node) => {
      const n = dagreGraph.node(node.id);
      node.targetPosition = 'top';
      node.sourcePosition = 'bottom';
      node.position = {
        x: n.x - nodeWidth / 2,
        y: n.y - nodeHeight / 2,
      }
    });
    return { nodes, edges };
  };

  async function loadDiscoveredEvidence() {
    try {
      const resp = await ctfg.GetDiscoveredEvidence({});
      graphRef.current = resp;
      setGraph(resp);
      setSource(resp.evidence[0].id);
      setDestination(resp.evidence[0].id);
      const tempNodes = resp.evidence.map((e) => {
        return {
          id: e.id.toString(),
          data: { label: e.name },
          position: {
            x: e.x,
            y: e.y
          }
        };
      });
      const tempEdges = resp.connections.map(c => ({
        id: `${c.source}-${c.destination}`,
        source: c.source.toString(),
        target: c.destination.toString(),
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20
        }
      }));
      const { nodes, edges } = getLayoutedElements(tempNodes, tempEdges);
      setNodes(nodes);
      setEdges(edges);
      report = resp.report; // report is not a state variable, so we update it directly
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadDiscoveredEvidence();
  }, []);

  const initialNodes = graph.evidence.map((e) => {
    return {
      id: e.id.toString(),
      data: { label: e.name },
      position: {
        x: e.x,
        y: e.y
      }
    };
  });
  const [nodes, setNodes] = useState(initialNodes);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const initialEdges = graph.connections.map(c => ({
    id: `${c.source}-${c.destination}`,
    source: c.source.toString(),
    target: c.destination.toString(),
  }));
  const [edges, setEdges] = useState(initialEdges);

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
        {successMsg && <Alert color="green">{successMsg}</Alert>}
        {errorMsg && <Alert color="red" >{errorMsg}</Alert>}
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
            <TextInput id="flag" type="text" onChange={e => evidence = e.target.value} />
          </div>
          <div className="mb-3">
            <label htmlFor="submitting-flag">Submitting a flag?</label>
            <Checkbox id="submitting-flag" checked={submittingFlag} onChange={e => setSubmittingFlag(e.target.checked)} />
          </div>
          <Button onClick={() => submitEvidence(false)}>Submit</Button>
          <Button color="red" onClick={() => submitEvidence(true)}>Delete</Button>
        </div>
        <div>
          <div className="mb-3">
            <label htmlFor="source">Source</label>
            {graph.evidence && graph.evidence.length > 0 &&
              <Select id="source" value={source} onChange={e => setSource(Number(e.target.value))} >
                {graph.evidence.map(e => <option value={e.id}>{e.name}</option>)}
              </Select>
            }
          </div>
          <div className="mb-3">
            <label htmlFor="destination">Destination</label>
            {graph.evidence && graph.evidence.length > 0 &&
              <Select id="destination" value={destination} onChange={e => setDestination(Number(e.target.value))} >
                {graph.evidence.map(e => <option value={e.id}>{e.name}</option>)}
              </Select>
            }
          </div>
          <Button onClick={() => submitConnection(false)}>Submit</Button>
          <Button color="red" onClick={() => submitConnection(true)}>Delete</Button>
        </div>
      </div>
      {nodes.length > 0 &&
        <div className="mt-8 border border-gray-900 w-full h-[400px]">
        <ReactFlow nodes={nodes} onNodesChange={onNodesChange} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
        </div>
      }
    </div>
  );
}