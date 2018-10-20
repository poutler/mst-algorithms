import React, { Component } from "react";
import "./prim.css";
import Graph, { V, E } from "../Graph";
import Edge from "../Graph/Edge";
import Vertex from "../Graph/Vertex";
import Button from "../components/Button";

import { createAdjMatrix } from "../Graph/util";

import Description from "./Description";

class PrimPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         edges: [],
         selectedEdges: [],
         algoStarted: false,
         algoComplete: false
      };
   }
   componentWillMount = () => {
      let edges = E.map(e => {
         let firstEndpoint = V.find(v => v.label === e.from);
         let secondEndpoint = V.find(v => v.label === e.to);

         return {
            id: `${e.from}-${e.to}`,
            weight: e.weight,
            x1: firstEndpoint.x,
            y1: firstEndpoint.y,
            x2: secondEndpoint.x,
            y2: secondEndpoint.y,
            selected: false
         };
      });

      this.setState({ edges });
   };

   render() {
      const { algoStarted, algoComplete } = this.state;

      return (
         <div className="prim-main">
            <div class="grapharea column">
               <Graph>
                  {this.state.edges.map(e => (
                     <Edge key={e.id} {...e} />
                  ))}
                  {V.map(v => (
                     <Vertex
                        key={`${v.x}-${v.y}`}
                        x={v.x}
                        y={v.y}
                        label={v.label}
                     />
                  ))}
               </Graph>
            </div>
            <div className="textarea column">
               {!algoStarted && <Description />}
               {algoComplete && <h2>Complete!</h2>}
               <div class="buttonarea">
                  {!algoStarted && <StartButton onClick={this.createMatrix} />}
               </div>
            </div>
         </div>
      );
   }

   startAlgorithm = () => {
      console.log("start press");
      this.setState({ algoStarted: true });
   };

   createMatrix = () => {
      let matrix = createAdjMatrix(V, E);
      console.log(matrix);
   };
}

const StartButton = ({ onClick }) => <Button onClick={onClick} label="Start" />;

export default PrimPage;
