import { useState, useEffect } from "react";

export default function LeagueHistory() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(
        `https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/${process.env.REACT_APP_LEAGUE_ID}?seasonId=${process.env.REACT_APP_SEASON}`,
            {
                credentials: 'include',
                headers: {
                    Cookie: `swid=${process.env.REACT_APP_SWID};espn_s2=${process.env.REACT_APP_ESPN_S2}`
                }
            }
        )
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
                {item.id}
            </li>
          ))}
        </ul>
      );
    }
  }