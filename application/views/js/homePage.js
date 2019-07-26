var members = [
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
    "name": "Venish",
    "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    },
    {
      "name": "Venish",
      "points": "120"
    }
];

let names = members.map((u, index) => {
  return [<div key={"name"+index} className="entry">{u.name}</div>, <div key={"point"+index} className="entry">{u.points}</div>];
});

let memberTable = [<div key="name" className="entry"><b>Name</b></div>,<div key="point"className="entry"><b>Points</b></div>, names];

ReactDOM.render(memberTable,
  document.getElementById('pointTable'));
