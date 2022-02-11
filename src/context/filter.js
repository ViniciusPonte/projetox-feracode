import React, { createContext, useState, useContext, useEffect } from "react";
import { football } from "../config/football-api";
import { api } from "../services/api";
const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [season, setSeason] = useState(null);
  const [league, setLeague] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    async function getSeasons(){
      await api.get('/leagues/seasons', {
        headers: {
          'x-rapidapi-host': football.host,
          'x-rapidapi-key': football.key
        }
      })
      .then(response => setSeasons(response.data.response))
      .catch(err => console.log(err))
    }

    getSeasons();
  }, [])

  useEffect(() => {
    async function getLeagues(){
      setLeagues([]);

      // Resolvi deixar apenas o Brasil filtrado, pois a requisição tava demorando muito pra trazer todas as ligas que existem
      await api.get('/leagues?code=BR', {
        headers: {
          'x-rapidapi-host': football.host,
          'x-rapidapi-key': football.key
        }
      })
      .then(response => response.data.response.map(resp => {
        setLeagues(old => [...old, resp.league])
      }))
      .catch(err => console.log(err))
    }

    getLeagues()
  }, [])

  return (
    <FilterContext.Provider value={{ season, setSeason, league, setLeague, seasons, leagues }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  const { season, setSeason, league, setLeague, seasons, leagues  } = context;
  return { season, setSeason, league, setLeague, seasons, leagues  };
}
