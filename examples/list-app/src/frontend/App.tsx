import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import { List } from "../models/List";

const App = (): JSX.Element => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      const lists = await (
        await fetch(
   ""
        )
      ).json();

      setLists(lists);
    };

    fetchLists();

    return;
  }, []);

  return (
    <>
      <div>
        <h1>
          An app of many Lists
          <br />
          <small>Made easy with @mrgrain/cdk-esbuild</small>
        </h1>
      </div>
      <div>{lists.map(list => (<div>
        {list.title ? <h2>{list.title}</h2> : <></>}
        <ul>
          {list.items.map(item => (
            <li>{item.count ?? ''} {item.value} </li>
          ))}
        </ul>
      </div>))}</div>
    </>
  );
};

export default App;
