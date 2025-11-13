# Agent Orbit Map — Visualization Specification

## Purpose
Represent the Codex agent network as a real-time deep-space orbiter system.

---

## Core Concept
Five agents orbit a central core (Overseer).  
Each agent is a pulsating node with a distinct “identity frequency.”

### Center
- Overseer node  
- Emit soft cyan pulse every merge cycle  
- Ring ripple when queue empties  

### Agent Nodes
- UI Agent: cyan, fast orbit
- Content Agent: magenta, medium orbit
- Schema Agent: green, slow orbit
- Functionality Agent: orange, irregular orbit
- Debugger Agent: red, pulse on errors

---

## Dynamics
### Task Received
- Agent node brightens  
- A particle shoots from center → agent  

### Output Created
- A particle shoots from agent → queue node  

### Merge
- Overseer emits a full-screen ripple  
- All agents dim slightly then return to stable glow  

---

## Visual Language
- React Three Fiber  
- Semi-transparent orbital rings  
- Floating dust particles  
- Slow-quality motion  
- Black-hole lens warping at center  

---

## Agent State Signals
| State          | Visual Effect                  |
|----------------|--------------------------------|
| Idle           | Soft low glow                  |
| Processing     | Rapid pulsing                  |
| Error          | Red flash + ring distortion    |
| Queue Active   | Orbit speed increases slightly |
| Merge Success  | Cyan ripple outward            |
| Merge Rejected | Violent red ripple inward      |

---

## Data Sources
- `codex_tasks` table  
- `codex_outputs` table  
- `codex_overseer_log` table  
- local watchers (fallback)  
