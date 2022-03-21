import React from "react";
import { Switch, Route } from "react-router";

import AddComponent from "../../components/AddComponent/AddComponent";
import HomeComponent from "./../../components/HomeComponent/HomeComponent";

const StructureContainer = () => {
  return (
    <Switch>
      {/* Add Component */}
      <Route path="/Add" exact component={AddComponent} />
      {/* Home Component */}
      <Route path="/" exact component={HomeComponent} />
    </Switch>
  );
};

export default StructureContainer;
