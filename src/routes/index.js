import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import PokemonInformation from '../pages/PokemonInformation';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route
        path="/pokemon-informations/:pokemon_name+"
        component={PokemonInformation}
      />
    </Switch>
  );
};

export default Routes;
