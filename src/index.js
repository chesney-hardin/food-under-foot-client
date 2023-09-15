import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import '/Users/chesneyhardin/workspace/food-under-foot/food-under-foot-client/src/index.css'
import {FoodUnderFoot} from './FoodUnderFoot';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FoodUnderFoot />
  </BrowserRouter>
);

