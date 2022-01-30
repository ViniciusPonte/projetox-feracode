import React, { createContext, useState, useContext } from "react";
const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [season, setSeason] = useState(null);
  const [league, setLeague] = useState(null);

  const seasons = [
    {
        label: "2019",
        value: 2019,
    },
    {
        label: "2020",
        value: 2020,
    },
    {
        label: "2021",
        value: 2021,
    },
    {
        label: "2022",
        value: 2022,
    },
  ]

  const leagues = [
      {
          label: "Premier League",
          value: 39,
      }
  ]

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
