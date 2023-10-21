import {stepsHandler} from "./steps/stepHandler.js";
import {joinForm} from "./navigation.js";


stepsHandler().then(data => joinForm(data))



